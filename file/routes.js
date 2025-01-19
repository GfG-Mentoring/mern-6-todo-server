const { Router } = require('express');
const { upload } = require('../utils/storage');
const { FileModel } = require('./model');
const formatResponseAndSend = require('../utils/formatResponse');


const fileRouter = Router();

fileRouter.post('/', upload.single('file'), async (req, res) => {
    try {
        const newfile = new FileModel();
        newfile.path = req.file?.path;
        newfile.createdBy = req.user.id;

        const data = await newfile.save();
        formatResponseAndSend(res, 'File uploaded', data);
    } catch (e) {
        formatResponseAndSend(res, null, null, e, 400);
    }
});

fileRouter.get('/:id', async (req, res) => {
    const id = req.params.id;
    try {
        const file = await FileModel.findById(id);
        if (!file) {
            formatResponseAndSend(res, 'File not found', null, Error('File not found'), 404);
        };
        res.sendFile(file.path);
    } catch (e) {

    }



})




module.exports = { fileRouter }