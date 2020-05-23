const express = require ('express')
const router = express.Router()

// public user route
router.get('/', (req,res) => res.send ('User Route'))

module.exports = router;