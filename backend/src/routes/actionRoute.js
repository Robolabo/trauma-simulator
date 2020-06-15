const express = require('express');
const router = express.Router();

//importing controllers
const actionController = require('../controllers/actionController')

router.get('/getMsg', actionController.getMsg);

module.exports = router;