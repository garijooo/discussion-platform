const crypto = require('crypto');
const User = require('../models/User');
const ErrorResponse = require('../utils/errorResponse');
const sendEmail = require('../utils/sendEmail'); 
const keys = require('../config/keys');

exports.signUp = async (req, res, next) => {
    const { username, email, password } = req.body;
    try {
        const user = await User.create({
            username, email, password
        });
        sendToken(user, 201, res);
    } catch(e){
        next(e);
    }
};

exports.signIn = async (req, res, next) => {
    const { email, password } = req.body;
    if(!email || !password) return next(new ErrorResponse("Please provide an email and password", 400));
    
    try {
        const user = await User.findOne({ email }).select("+password");

        if(!user) return next(new ErrorResponse("Invalid credentials", 401));

        const isMatch = await user.matchPassword(password);

        if(!isMatch) return next(new ErrorResponse("Invalid credentials", 401))

       sendToken(user, 200, res);
    } catch(e) {
        next(e);
    }
};

exports.forgotPass = async (req, res, next) => {
    const { email } = req.body;

    try{
        const user = await User.findOne({ email });
        if(!user) return next(new ErrorResponse("Email could not be send", 404));

        const resetToken = user.getResetPasswordToken();
        await user.save();

        const resetUrl = `${keys.RESET_URL}${resetToken}`;
        const message = `
            <h1>You have requested a password reset</h1>
            <p>Please go to this link to reset your password</p>
            <a href=${resetUrl} clicktracking=off>${resetUrl}</a>
        `;

        try{
            await sendEmail({
                to: user.email,
                subject: "Password Reset Request",
                text: message
            });

            res.status(200).json({ success: true, data: "Email sent" });
        } catch(e) {
            user.resetPasswordToken = undefined;
            user.resetPasswordExpire = undefined;
            await user.save();
            return next(new ErrorResponse("Email could not be sent", 500))
        }
    } catch(e) {
        next(e);
    }
};

exports.resetPass = async (req, res, next) => {
    const resetPasswordToken = crypto.createHash("sha256").update(req.params.resetToken).digest("hex");

    try{
        const user = await User.findOne({
            resetPasswordToken,
            resetPasswordExpire: { $gt: Date.now() }
        });

        if(!user) return next(new ErrorResponse("Invalid Reset Token", 400));

        user.password = req.body.password; 
        user.resetPasswordToken = undefined;
        user.resetPasswordExpire = undefined;
        await user.save();
 
        res.status(201).json({
            success: true,
            data: "Password Reset Success"
        });
    } catch(e) {
        next(e);
    }
};

const sendToken = (user, statusCode, res) => {
    const token = user.getSignedToken();
        res.status(statusCode).json({
        success: true, 
        token: token,
        user
    });
}