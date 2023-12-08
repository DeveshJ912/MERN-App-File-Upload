const Files = require("../models/filesModel");
const path = require("path");
const fs = require('fs');

exports.uploadFile = async (req, resp) => {

    const username = req.body.username;
    const filepath = req.file.destination + '/' + req.file.filename;
    const filename = req.file.originalname;
    const transformedFilename = req.file.filename;

    try {
        const file = await Files.create({ username, filepath, filename, transformedFilename });
        resp.status(201).json({
            status: "success",
            statusCode: 201,
            code:file.code
        })
    } catch (error) {
        resp.status(400).json({
            status: "fail",
            statusCode: 400,
            message: error.message
        })
    }
}

exports.getFiles = async (req, resp) => {

    const username = req.body.username;
    try {
        const files = await Files.find({ username });
        resp.status(200).json({
            status: "success",
            statusCode: 200,
            data: files
        })
    } catch (error) {
        resp.status(400).json({
            status: "fail",
            statusCode: 400,
            message: error.message
        })
    }
}



exports.downloadFile = async (req, resp) => {
    const transformedFilename = req.body.filename;
    const username = req.body.username;
    const code = req.body.code;
    try {
        const files = await Files.find({ transformedFilename, username });
        if (!files.length) {
            return next(new Error("No file found"));
        }
        const fileitem = files[0];
        if(code !=fileitem.code){
            return resp.status(400).json({
                status: "fail",
                statusCode: 400,
                message: "code did not match"
            })
        }

        const filePath = path.join(__dirname, `../${fileitem.filepath}`);
        resp.json({ status: "success",
               statusCode: 200,
               filePath,
               filename:fileitem.filename
        });

    } catch (error) {
        resp.status(400).json({
            status: "fail",
            statusCode: 400,
            message: error.message
        })
    }

}


exports.deleteFile = async (req, resp) => {
    const transformedFilename = req.body.transformedFilename;
    const username = req.body.username;
    const filepath = req.body.filepath;
    try {
        fs.unlinkSync(filepath)
        const files = await Files.findOneAndDelete({ transformedFilename, username });
        resp.json({ status: "success",
                statusCode: 200,
                message:"File Deleted Successfully",
                
        });

    } catch (error) {
        resp.status(400).json({
            status: "fail",
            statusCode: 400,
            message: error.message
        })
    }

}
