const express = require('express')
const {createUser, singnIn, getDashboard, logOut, updateUser} = require('../controllers/user')

const {verifyToken} = require('../utils/auth')

const router = express.Router();

router
.route('/signup')
.post(createUser)

router
.route('/login')
.post(singnIn)

router
.route('/logout')
.get(logOut)

router
.route('/update')
.put(updateUser)

router
.route('/dashboard')
.get(verifyToken, getDashboard)

module.exports =  router;