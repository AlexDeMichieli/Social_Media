const express = require ('express')
const router = express.Router()

// public auth route
router.get('/', (req,res) => res.send('Auth Route'))

module.exports = router;