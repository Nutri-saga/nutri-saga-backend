const express = require('express')
const dotenv = require('dotenv')
const mongoose = require('mongoose')
const cookieParser = require('cookie-parser')
const cors  =  require('cors')
const cloudinary = require('cloudinary')
const fileUpload = require('express-fileupload')


const userRouter = require('./routes/user')
const dishesRouter = require('./routes/dishes')

const app = express()

app.use(cors())

dotenv.config()

app.use(cookieParser())
app.use(express.json({limit:'50mb'}))
app.use(fileUpload())

app.use('/user', userRouter)
app.use('/dishes', dishesRouter)


mongoose.connect(process.env.MONGO_URI)
.then(conn=>console.log(`mongoose connected`))
.catch(err=>console.error(`mongoose not connected`))

cloudinary.config({
    cloud_name: "dzoq7anay",
    api_key: "569565685268925",
    api_secret: "7XeWS0OCNiZhbOfOsD_tsvkzpjE"
})

app.listen(process.env.PORT, ()=>{
    console.log(`Connected to backend at port ${process.env.PORT}`);
})