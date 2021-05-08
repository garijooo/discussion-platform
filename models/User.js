const crypto = require('crypto');
const mongoose = require('mongoose');
const bcrypct = require('bcryptjs');
const jwt = require('jsonwebtoken');
const keys = require('../config/keys');

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, "Please provide a username"]
    },
    email: {
        type: String,
        required: [true, "Please provide an email"],
        unique: true,
        match: [
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            "Please provide a valid email"
        ]
    },
    password: {
        type: String,
        required: [true, "Please add a password"],
        minlength: 6,
        select: false
    },
    role: String, 
    resetPasswordToken: String,
    resetPasswordExpire: Date
});

UserSchema.pre("save", async function(next) {
    if(!this.isModified("password")) {
        next();
    }
    const salt = await bcrypct.genSalt(10);
    this.password = await bcrypct.hash(this.password, salt);
    next();
    }
);
UserSchema.methods.matchPassword = async function(password) {
    return await bcrypct.compare(password, this.password);
}
UserSchema.methods.getSignedToken = function() {
    return jwt.sign({ id: this._id}, keys.JWT_SECRET, { expiresIn: keys.JWT_EXPIRE } );
}
UserSchema.methods.getResetPasswordToken = function() {
    const resetToken = crypto.randomBytes(20).toString('hex');
    this.resetPasswordToken = crypto.createHash("sha256").update(resetToken).digest("hex");

    this.resetPasswordExpire = Date.now() + 10 * 60 * 1000;
    return resetToken; 
}
module.exports =  mongoose.model('User', UserSchema);
