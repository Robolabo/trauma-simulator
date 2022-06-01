const express = require('express');
const router = express.Router();

//importing controllers
const traineeController = require('../controllers/traineeController')

router.get('/list',traineeController.list );
router.get('/createData', traineeController.testdata)
router.post('/create',traineeController.create);
router.get('/get/:id',traineeController.get);
router.post('/update/:id', traineeController.update);
router.post('/delete',traineeController.delete);
router.get('/login/:email', traineeController.login);
router.post('/update/:id', traineeController.update);
router.get('/session/:email', traineeController.session);
router.get('/ses/:email', traineeController.ses);
router.get('/salir/:email', traineeController.salir);
router.get('/logout/:id', traineeController.logout);
router.get('/log/:id', traineeController.log);

router.get('/cuatromin/:simulationId/:traineeId/',  traineeController.cuatromin);
router.get('/min/:simulationId/:traineeId/',  traineeController.min);
router.get('/delete/:simulationId/:traineeId/',  traineeController.delete);
router.get('/minPH/:simulationId/:traineeId/',  traineeController.minPH);
router.get('/minLH/:simulationId/:traineeId/',  traineeController.minLH);
router.get('/evaluacionLH/:simulationId/:traineeId/',  traineeController.evaluacionLH);
router.get('/evaluacionLP/:simulationId/:traineeId/',  traineeController.evaluacionLP);
router.get('/evaluacionPH/:simulationId/:traineeId/',  traineeController.evaluacionPH);
router.get('/evaluacionPP/:simulationId/:traineeId/',  traineeController.evaluacionPP);
//router.get('/evaluacion',  traineeController.evaluacion);
    
module.exports = router;