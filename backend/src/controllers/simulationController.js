const controller = {}
var Simulation = require('../model/Simulation')
var sequelize = require ('../model/database')
var Trainer = require('../model/Trainer')
var Trainee = require('../model/Trainee')

controller.testdata = async ( req, res) => {
  
  const response = await sequelize.sync().then(function() {
     const data =  Simulation.findAll()
     return data;
  })
  .catch(err => {
    return err;
  });
  res.json({success: true})

}  
controller.list = async (req, res) => {

  const data = await Simulation.findAll({
    include: [ Trainer ]
  })
  .then(function(data){
    return data;
  })
  .catch(error => {
    return error;
  }); 

  res.json({success : true, data : data});

}
controller.create = async (req,res) => {
  // data
  const { sex, age, weight, partBody, bloodLoss, diastolicPressure, sistolicPressure, temperature, heartRate, breathingRate, urineOutput,
            saturation, mentalStatus, time, traineeId, trainerId } = req.body;
    
  // create
  const data = await Simulation.create({
    sex: sex,
    age: age,
    weight: weight,
    partBody: partBody,
    bloodLoss: bloodLoss,
    sistolicPressure: sistolicPressure,
    diastolicPressure: diastolicPressure,
    heartRate: heartRate,
    breathingRate: breathingRate,
    urineOutput: urineOutput,
    temperature: temperature,
    saturation: saturation,
    mentalStatus: mentalStatus,
    time: time,
    traineeId: traineeId,
    trainerId: trainerId
  })
  .then(function(data){
    return data;
  })
  .catch(error =>{
    console.log("Errorazo "+error)
    return error;
  })
  // return res
  res.status(200).json({
    success: true,
    message:"Guardo exitosamente",
    data: data
  });
}

controller.get = async (req,res) => {
  const { id } = req.params;
  const data = await Simulation.findAll({
      where: { simulationId: id }
  })
  .then(function(data){
    return data;
  })
  .catch(error =>{
    return error;
  })
  res.json({ success: true, data: data });
}

controller.update = async (req,res) => {
  // parameter get id
  const { id } = req.params;
  // parameter POST
  const { sex, age, weight, partBody, bloodLoss, diastolicPressure, sistolicPressure, temperature, heartRate, breathingRate, urineOutput,
    saturation, mentalStatus, time, traineeId, trainerId } = req.body;
  // Update data
  const data = await Simulation.update({
    sex: sex,
    age: age,
    weight: weight,
    partBody: partBody,
    bloodLoss: bloodLoss,
    sistolicPressure: sistolicPressure,
    diastolicPressure: diastolicPressure,
    heartRate: heartRate,
    breathingRate: breathingRate,
    urineOutput: urineOutput,
    temperature: temperature,
    saturation: saturation,
    mentalStatus: mentalStatus,
    time: time,
    traineeId: traineeId,
    trainerId: trainerId
  },
  {
    where: { simulationId: id}
  })
  .then( function(data){
    return data;
  })
  .catch(error => {
    return error;
  }) 
  res.json({success:true, data:data, message:"Updated successful"});
}

controller.delete = async (req, res) => {
  // parameter post
  const { id } = req.body;
  // delete sequelize
  const del = await Simulation.destroy({
    where: { simulationId: id}
  })
  res.json({success:true,deleted:del,message:"Deleted successful"});
}

controller.list = async (req, res) => {

  const data = await Simulation.findAll({
    include: [ { model: Trainer, as: 'trainee' } ]
  })
  .then(function(data){
    return data;
  })
  .catch(error => {
    return error;
  }); 

  res.json({success : true, data : data});

}

controller.listByTrainerId = async (req, res) => {
  const { id } = req.params;
  
  const data = await Simulation.findAll({
    include: [ { model: Trainer, as: 'trainer' },
               { model: Trainee, as: 'trainee' } ],
    where: { trainerId: id}
  })
  .then(function(data){
    return data;
  })
  .catch(error => {
    return error;
  }); 

  res.json({success : true, data : data});
}

controller.listByTraineeId = async (req, res) => {
  const { id } = req.params;
  
  const data = await Simulation.findAll({
    include: [ { model: Trainer, as: 'trainer' },
               { model: Trainee, as: 'trainee' } ],
    where: { traineeId: id}
  })
  .then(function(data){
    return data;
  })
  .catch(error => {
    return error;
  }); 

  res.json({success : true, data : data});
}
  

module.exports = controller;