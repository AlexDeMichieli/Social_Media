//express express-validator bcryptjs config gravatar jsonwebtoken mongoose request nodemon concurrently

const express = require('express')
const router = express.Router()
const connectDB = require ('./config/db')

const app = express()

//connect DB
connectDB()

const PORT = process.env.PORT || 5000

app.listen(PORT, ()=> console.log('listening'))

app.get('/', (req, res)=> res.send('API RUNNING'))
