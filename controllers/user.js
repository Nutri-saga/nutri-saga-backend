const mongoose = require('mongoose')
const userModel = require('../models/userModel')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

exports.createUser = async (req, res) => {
    try {
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(req.body.password, salt);

        const user = await userModel.create({
            username: req.body.username,
            name: req.body.name,
            password: hash,
        })
        if (user) {
            res.status(200).json({
                message: "user created sucessfully"
            })
        }

    } catch (err) {
        res.status(400).json(err.message)
    }
}

exports.singnIn = async (req, res) => {

    const user = await userModel.findOne({
        username: req.body.username
    });
    if (!user) res.status(404).json("User not found")
    const isPasswordCorrect = await bcrypt.compare(req.body.password, user.password);
    if (!isPasswordCorrect) res.status(400).json("Wrong password or username")
    const token = jwt.sign({
        id: user._id
    }, process.env.JWT)
    const {
        password,
        ...data
    } = user._doc
    res.cookie('isLogin', token).status(200).json(data);

}

exports.updateUser = async (req, res) => {
    try {
        const user = await userModel.findByIdAndUpdate(req.body.id, req.body, {new:true});
        if(user){
        res.status(200).json({
            user:user,
            message: "updated successfully"
        })
    }else{
        res.status(401).json({
            message: "User not found"
        })
    }
    } catch (err) {
        if(err.codeName=="DuplicateKey"){
        res.status(404).json({
            message:"Username already taken.."
        })}else{
            res.status(404).json({
                message:err.message
            })
        }
    }

}

exports.getDashboard = async (req, res) => {
    const user = await userModel.findById(req.user.id);
    const {
        password,
        ...data
    } = user._doc
    res.status(200).json(data)
}

exports.logOut = async (req, res) => {

    res.clearCookie('isLogin').json("logged out success")
}