const mongoose = require('mongoose');
const { Users } = require('../users/user.model');

const todoSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
    },
    isCompleted: {
        type: Boolean,
        default: false
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
        required: 'user is required'
    }
});

const Todo = mongoose.model('Todos', todoSchema);

module.exports = Todo;