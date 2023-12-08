
const express = require('express');
const upload = require('../middleware/multer');
router = express.Router();
const fileController = require('../controllers/FileController');

router.route('/uploadFile').post(upload.single("file"), fileController.uploadFile)
router.route('/getFiles').post(fileController.getFiles)
router.route('/downloadFile').post(fileController.downloadFile)
router.route('/deleteFile').post(fileController.deleteFile)


module.exports = router;
