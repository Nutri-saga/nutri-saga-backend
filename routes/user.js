import express from "express";
import { createUser, singnIn, getDashboard, logOut } from "../controllers/user.js";
import {verifyToken} from '../utils/auth.js'

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
.route('/dashboard')
.get(verifyToken, getDashboard)


export default router