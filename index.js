import express from "express";
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import cookieParser from "cookie-parser";
import cors from 'cors'

import userRouter from "./routes/user.js";

const app = express()

dotenv.config()

app.use(cors())
app.use(cookieParser())
app.use(express.json())

app.use('/user', userRouter)


mongoose.connect(process.env.MONGO_URI)
.then(conn=>console.log(`mongoose connected`))
.catch(err=>console.error(`mongoose not connected`))

 
app.listen(process.env.PORT, ()=>{
    console.log(`Connected to backend at port ${process.env.PORT}`);
})