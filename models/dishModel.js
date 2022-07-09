const mongoose = require('mongoose')

const dishSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique:true
    },
    servings: {
        type: String,
        required: true,
        required:true
    },
    energy: {
        type: String,
        default: 0
    },
    protein: {
        type: String,
        default: 0
    },
    fats: {
        type: String,
        default: 0
    },
    calories: {
        type: String,
        default: 0
    },
    image_url: {
        url: {
            type: String,
            default: "wwww.google.com/index.png",
            required:true
        },
        public_id: {
            type: String,
            required:true
        }
    }

})


const dishModel = mongoose.model('Dishes', dishSchema);

module.exports = dishModel