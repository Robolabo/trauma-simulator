const express = require('express');
const router = express.Router();

//importing controllers
const informController = require('../controllers/informController')

router.post('/addAction', informController.create);

module.exports = router;