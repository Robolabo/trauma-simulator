const express = require('express');
const router = express.Router();

//importing controllers
const resultsController = require('../controllers/resultsController')

router.post('/create', resultsController.create);
router.get('/getAction/:simulationId/:traineeId/', resultsController.getAction);




module.exports = router;