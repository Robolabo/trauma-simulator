const express = require('express');
const router = express.Router();

//importing controllers
const simulationController = require('../controllers/simulationController')

router.get('/list',simulationController.list );
router.get('/listTrainer/:id',simulationController.listByTrainerId);
router.get('/listTrainee/:id',simulationController.listByTraineeId);
router.get('/listo/:id',simulationController.listo);
// Añado una nueva ruta
router.get('/listTraineeAndTrainer',simulationController.listByTraineeAndTrainer);
router.get('/createData', simulationController.testdata)
router.post('/create',simulationController.create);
router.get('/get/:id',simulationController.get);
router.get('/getTestData/:id',simulationController.getTestData);
router.post('/update/:id', simulationController.update);
router.post('/delete',simulationController.delete);
router.post('/deleteSimulations', simulationController.deleteAllByUser)


module.exports = router;