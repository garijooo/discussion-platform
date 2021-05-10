exports.getPrivateData = (req, res, next) => {
    const user = {
        id: req.user._id,
        email: req.user.email,
        username: req.user.username
    }
    res.status(200).json({
        success: true,
        user
    });
};