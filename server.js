//express express-validator bcryptjs config gravatar jsonwebtoken mongoose request nodemon concurrently

const express = require('express')
const router = express.Router()
const connectDB = require ('./config/db')
const path = require('path');

const app = express()

//connect DB
connectDB()

//Initialise Middleware
app.use(express.json({extended: false}))
//app.use(bodyParser.json())

//Setting port
const PORT = process.env.PORT || 5000

//Import Routes
app.use('/api/users', require ('./routes/api/users'))
app.use('/api/profile', require ('./routes/api/profile'))
app.use('/api/posts', require ('./routes/api/posts'))
app.use('/api/auth', require ('./routes/api/auth'))

if (process.env.NODE_ENV === 'production') {
    // Set static folder
    app.use(express.static('client/build'));
  
    app.get('*', (req, res) => {
      res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    });
  }

  
  app.listen(PORT, ()=> console.log('listening'))
