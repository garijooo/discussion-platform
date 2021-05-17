const User = require('../models/User');

exports.getUser = async (req, res, next) => {
    const { id } = req.params;
    try {
        const user = await User.findById(id);
        if (!user) return next(new ErrorResponse("No user found", 401));
        res.status(200).json({
            success: true,
            username: user.username
        });
    } catch (error) {
        next(error);
    }
}