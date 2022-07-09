const dishModel = require('../models/dishModel')
const cloudinary = require('cloudinary')

exports.addDish = async (req, res) => {
    try {
        
        const result = await cloudinary.v2.uploader.upload(req.body.url, {
            folder: 'dishes',
            width: 800,
            crop: "scale"
        })
        
        req.body.image_url = {
            public_id : result.public_id,
            url:result.secure_url
        }

        const dish = await dishModel.create(req.body);

        res.status(200).json({
            success: true,
            dish
        })

    } catch (err) {
        console.log(err)
        res.status(400).json({
            success: false,
            error: err.message
        })
    }
}

exports.updateDish = async (req, res, next) => {
    try {
        const dish = await dishModel.findByIdAndUpdate(req.body.id, req.body, {
            new: true
        })
        if (dish) {
            res.status(200).json({
                success: true,
                dish
            })
        } else {
            res.status(400).json({
                success: false,
                message: "Dish not found"
            })
        }
    } catch (err) {
        res.status(400).json({
            success: false,
            error: err.message
        })
    }
}

exports.getDishes = async (req, res, next) => {
    try {
        const dishes = await dishModel.find();
        res.status(200).json({
            success: true,
            dishes
        })
    } catch (err) {
        console.log(err)
        res.status(400).json({
            success: false,
            error: err.message
        })
    }
}

exports.getDish = async (req, res, next) => {
    try {
        const dish = await dishModel.findOne({
            _id: req.params.id
        });
        if (dish) {
            res.status(200).json({
                success: true,
                dish
            })
        } else {
            res.status(400).json({
                success: true,
                message:"Dish not found with this id."
            })
        }
    } catch (err) {
        console.log(err)
        res.status(400).json({
            success: false,
            error: err.message
        })
    }
}

exports.deleteDish = async (req, res, next) => {
    try {
        const dish = await dishModel.findByIdAndDelete(req.params.id);
        if (dish) {
            res.status(200).json({
                success: true,
                message: "Delted successfully"
            })
        } else {
            res.status(400).json({
                success: false,
                message: "Dish not found"
            })
        }
    } catch (err) {
        console.log(err)
        res.status(400).json({
            success: false,
            error: err.message
        })
    }
}