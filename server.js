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

//Setting port
const PORT = process.env.PORT || 5000

//Import Routes
app.use('/api/users', require ('./routes/api/users'))
app.use('/api/profile', require ('./routes/api/profile'))
app.use('/api/posts', require ('./routes/api/posts'))
app.use('/api/auth', require ('./routes/api/auth'))

if (process.env.NODE_ENV === 'production') {
    // Serve any static files
    app.use(express.static(path.join(__dirname, 'client/build')));
  // Handle React routing, return all requests to React app
    app.get('*', function(req, res) {
      res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
    });
  }
  app.listen(PORT, ()=> console.log('listening'))
