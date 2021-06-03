//express express-validator bcryptjs config gravatar jsonwebtoken mongoose request nodemon concurrently

const express = require('express')
const router = express.Router()
const connectDB = require ('./config/db')

const app = express()

//connect DB
connectDB()

//Initialise Middleware
app.use(express.json({extended: false}))
//app.use(bodyParser.json())


// app.get('/', (req, res)=> res.send('API RUNNING'))

//Setting port
const PORT = process.env.PORT || 5000
app.listen(PORT, ()=> console.log('listening'))
app.use(express.static(__dirname + '/public'));

//Import Routes
app.use('/api/users', require ('./routes/api/users'))
app.use('/api/profile', require ('./routes/api/profile'))
app.use('/api/posts', require ('./routes/api/posts'))
app.use('/api/auth', require ('./routes/api/auth'))
