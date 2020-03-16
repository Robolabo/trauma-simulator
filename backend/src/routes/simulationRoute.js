const express = require('express');
const router = express.Router();

//importing controllers
const simulationController = require('../controllers/simulationController')

router.get('/list',simulationController.list );
router.get('/testdata', simulationController.testdata)
router.post('/create',simulationController.create);
router.get('/get/:id',simulationController.get);
router.post('/update/:id', simulationController.update);
router.post('/delete',simulationController.delete);


module.exports = router;