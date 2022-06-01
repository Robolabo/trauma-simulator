const express = require('express');
const router = express.Router();

//importing controllers
const evaluationController = require('../controllers/evaluationController')

router.post('/add', evaluationController.create);
router.get('/getAction/:simulationId/:traineeId/', evaluationController.getAction);




module.exports = router;