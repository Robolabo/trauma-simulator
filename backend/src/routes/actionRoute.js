const express = require('express');
const router = express.Router();

//importing controllers
const actionController = require('../controllers/actionController')

router.get('/get/:action',actionController.get );

module.exports = router;