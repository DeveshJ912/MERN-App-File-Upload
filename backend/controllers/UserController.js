const User = require("../models/userModel");

exports.signUp = async (req, resp) => {
    try {
        const username = req.body.username;
        console.log(username)
        const checkExistingUser = await User.findOne({username});
        if(checkExistingUser){
            return  resp.status(400).json({
                status: "fail",
                statusCode: 400,
                message: 'User already exists, please login!'
            })
        }

        const newUser = await User.create(req.body);
        resp.status(201).json({
            status: "success",
            statusCode: 201,
            data: newUser
        })
    }
    catch (error) {
        resp.status(400).json({
            status: "fail",
            statusCode: 400,
            message: error.message
        })
    }
}

exports.login = async (req, resp) => {
    try {
        const username = req.body.username;
        const password = req.body.password;
        const user = await User.findOne({ username }).select('+password')//{email} same as {email:email}
        const isMatch = await user.comparePasswordInDb(password, user.password)
        if (!isMatch) {
            throw new Error("Password did not match, please try again");
        }
        resp.status(201).json({
            status: "success",
            statusCode: 200,
            data: user
        })
    }
    catch (error) {
        if (error.message == "Cannot read properties of null (reading 'comparePasswordInDb')") {
            resp.status(400).json({
                status: "fail",
                statusCode: 400,
                message: "User does not exist with that username"
            })
        } else {
            resp.status(400).json({
                status: "fail",
                statusCode: 400,
                message: error.message
            })
        }
    }
}

exports.uploadImage = async (req, resp) => {
    const body = req.body;
    try {
        const newImage = await User.findByIdAndUpdate(body.id, {profileImage:body.profileImage})
        resp.status(201).json({
            msg: "Profile Image Uploaded...!",
            status: "success",
            statusCode: 200,
            newImage
        })
    } catch (error) {
        resp.status(409).json({ message: error.message })
    }
}