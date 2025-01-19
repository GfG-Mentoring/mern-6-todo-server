const mongoose = require('mongoose');


const FileSchema = mongoose.Schema({
    path: {
        type: String,
        required: true,
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

const File = mongoose.model('File', FileSchema);


module.exports = { FileModel: File };