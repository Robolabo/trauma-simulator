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
    
module.exports = router;