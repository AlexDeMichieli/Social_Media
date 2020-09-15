//express express-validator bcryptjs config gravatar jsonwebtoken mongoose request nodemon concurrently

const express = require('express')
const router = express.Router()
const connectDB = require ('./config/db')
const cors = require('cors');

const app = express()

//connect DB
connectDB()

//Initialise Middleware
app.use(express.json({extended: false}))
app.use(cors())
//app.use(bodyParser.json())


app.get('/', (req, res)=> res.send('API RUNNING'))

//Setting port
const PORT = process.env.PORT || 5000
app.listen(PORT, ()=> console.log('listening'))

//Import Routes
app.use('/api/users', require ('./routes/api/users'))
app.use('/api/profile', require ('./routes/api/profile'))
app.use('/api/posts', require ('./routes/api/posts'))
app.use('/api/auth', require ('./routes/api/auth'))
