const express = require('express')
const router = express.Router()

const app = express()
const PORT = process.env.PORT || 5000

app.listen(PORT, ()=> console.log('listening'))

app.get('/', (req, res)=> res.send('API RUNNING'))
