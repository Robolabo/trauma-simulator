const express = require('express');
const router = express.Router();

//importing controllers
const trainerController = require('../controllers/trainerController')

router.get('/list',trainerController.list );
router.get('/createData', trainerController.testdata)
router.post('/create',trainerController.create);
router.get('/get/:id',trainerController.get);
router.post('/update/:id', trainerController.update);
router.post('/delete',trainerController.delete);
router.get('/login/:email', trainerController.login)
router.get('/session/:email', trainerController.session);
router.get('/ses/:email', trainerController.ses);
router.get('/salir/:email', trainerController.salir);
router.get('/logout/:id', trainerController.logout);
router.get('/log/:id', trainerController.log);


module.exports = router;

