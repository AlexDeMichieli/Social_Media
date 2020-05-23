const express = require ('express')
const router = express.Router()

// public posts route
router.get('/', (req,res) => res.send ('Posts Route'))

module.exports = router;