const mongoose = require('mongoose');

const ThreadCommentSchema = new mongoose.Schema({
    target: {
        type: String,
        required: [true, '']
    },
    text: {
        type: String,
        required: [true, 'Please provide the text of your thread']
    }
});

exports.ThreadCommentSchema = ThreadCommentSchema;