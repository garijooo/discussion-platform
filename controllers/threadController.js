const { Thread } = require('../models/Thread');

exports.createThread = async (req, res, next) => {
    const { authorId, heading, text } = req.body;
    try {   
        const thread = await Thread.create({ authorId, heading, text });
        res.status(201).json({
            success: true, 
            id: thread._id
        });
    } catch (error) {
        next(error);
    }
}

exports.deleteThread = async (req, res, next) => {
    const _id = req.params.id;
    try {
        await Thread.deleteOne({ _id });
        res.status(200).json({
            success: true
        });
    } catch (error) {
        next(error);
    }
}

exports.fetchThread = async (req, res, next) => {
    const { id } = req.params;
    try {
        const thread = await Thread.findById(id);
        res.status(200).json({
            success: true,
            thread
        }); 
    } catch (error) {
        next(error);
    }
}

exports.fetchThreads = async (req, res, next) => {
    const { counter } = req.body;
    let count = !counter ? 1 : counter; 
    try {
        const threads = await Thread.find({}).limit(count * 20);
        res.status(200).json({
            success: true,
            threads
        });
    } catch (error) {
        next(error);
    }
}