const express = require('express');
const router = express.Router();

//importing controllers
const trainerController = require('../controllers/trainerController')

router.get('/list',trainerController.list );
router.get('/testdata', trainerController.testdata)
router.get('/test',trainerController.testdata);
router.post('/create',trainerController.create);
router.get('/get/:id',trainerController.get);
router.post('/update/:id', trainerController.update);
router.post('/delete',trainerController.delete);
router.get('/login/:email', trainerController.login)


module.exports = router;