const mongoose = require('mongoose');
const { ThreadCommentSchema } = require('./ThreadComment');

const ThreadSchema = new mongoose.Schema({
    authorId: {
        type: mongoose.SchemaTypes.ObjectId, 
        ref: 'User',
        required: [true, 'No author here']
    },
    text: {
        type: String,
        required: [true, 'Please provide the text of your thread']
    },
    comments: [ThreadCommentSchema],
    rating: {
        type: Number,
        default: 0
    },
    list: [{
        type: mongoose.SchemaTypes.ObjectId, 
        ref: 'User'
    }] 
});

const Thread =  mongoose.model('Thread', ThreadSchema);
exports.Thread = Thread;
exports.ThreadSchema = ThreadSchema;