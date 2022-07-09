const express = require('express')
const {addDish, updateDish, getDishes, getDish, deleteDish} = require('../controllers/dishes')


const router = express.Router();

router
.get('/', getDishes)
.get('/:id', getDish)
.put('/', updateDish)
.post('/', addDish)
.delete('/:id', deleteDish)

module.exports =  router;