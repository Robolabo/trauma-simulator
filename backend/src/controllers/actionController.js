const controller = {}
var sequelize = require ('../model/database')
const { QueryTypes } = require('sequelize');
const Action = require('../model/actions');

controller.getMsg = async (req, res) => {
  const data = await sequelize.query(
    `Select distinct message, photo, time from actions where actionId = '${req.query.actionId}' and 
    ((bloodLossMin != -1 and ${req.query.bloodLoss} > bloodLossMin and ${req.query.bloodLoss} < bloodLossMax) or 
    (sistolicPressureMin != -1 and ${req.query.sistolicPressure} > sistolicPressureMin and ${req.query.sistolicPressure} < sistolicPressureMax) or 
    (diastolicPressureMin != -1 and ${req.query.diastolicPressure} > diastolicPressureMin and ${req.query.diastolicPressure} < diastolicPressureMax) or 
    (heartRateMin != -1 and ${req.query.heartRate} > heartRateMin and ${req.query.heartRate} < heartRateMax) or 
    (breathingRateMin != -1 and ${req.query.breathingRate} > breathingRateMin and ${req.query.breathingRate} < breathingRateMax) or 
    (urineOutputMin != -1 and ${req.query.urineOutput} > urineOutputMin and ${req.query.urineOutput} < urineOutputMax) or 
    (saturationMin != -1 and ${req.query.saturation} > saturationMin and ${req.query.saturation} < saturationMax) or 
    (temperatureMin != -1 and ${req.query.temperature} > temperatureMin and ${req.query.temperature} < temperatureMax) or 
    (mentalStatus = '${req.query.mentalStatus}' and mentalStatus != '-1') or 
    (partBody = '${req.query.partBody}' and partBody != '-1') or 
    (age = '${req.query.age}') or (phase = '${req.query.phase}' and phase != '-1') or
    (traumatype = '${req.query.traumatype}' and traumatype != '-1') or 
    (bloodLossMin = -1 and sistolicPressureMin = -1 and saturationMin = -1
      and diastolicPressureMin = -1 and heartRateMin = -1 and breathingRateMin = -1 and 
      urineOutputMin = -1 and saturationMin = -1 and temperatureMin = -1 and mentalStatus = '-1'
      and partBody = '-1' and age= '-1')) `,
    { type: QueryTypes.SELECT }
  )// añadir edad
  .then(function(data){
    if (data[0].photo){
      //Aqui query para sacar imagen
    }
    return data;
  })
  .catch(error =>{
    console.log("ERRORRR",error)
    return error;

  })
  res.json({ success: true, data: data });
}

//create
controller.create = async (req,res) => {
  // data
  const { actionName, message, photo, bloodLossMin, bloodLossMax, sistolicPressureMin, sistolicPressureMax, diastolicPressureMin, diastolicPressureMax, heartRateMin, heartRateMax, breathingRateMin, breathingRateMax, urineOutputMin, urineOutputMax, saturationMin, saturationMax, temperatureMin, temperatureMax, partBody, mentalStatus, time, age} = req.body;
  // create
  const data = await Action.create({
    actionName: actionName,
    message: message,
    photo: photo,
    bloodLossMin: bloodLossMin,
    bloodLossMax: bloodLossMax,
    sistolicPressureMin: sistolicPressureMin,
    sistolicPressureMax: sistolicPressureMax,
    diastolicPressureMin: diastolicPressureMin,
    diastolicPressureMax: diastolicPressureMax,
    heartRateMin: heartRateMin,
    heartRateMax: heartRateMax,
    breathingRateMin:  breathingRateMin,
    breathingRateMax: breathingRateMax,
    urineOutputMin: urineOutputMin,
    urineOutputMax: urineOutputMax,
    saturationMin: saturationMin,
    saturationMax: saturationMax,
    temperatureMin: temperatureMin,
    temperatureMax: temperatureMax,
    partBody: partBody,
    mentalStatus: mentalStatus,
    time: time,
    age: age

  })
  .then(function(data){
    return data;
  })
  .catch(error =>{
    console.log("Errorazo "+error)
    return error;
  })
  res.status(200).json({
    success: true,
    message:"Guardo exitosamente",
    data: data
  });
}

// read 
controller.get = async (req,res) => {
  const { id } = req.params;
  const data = await Action.findAll({
      where: { actionId: id }
  })
  .then(function(data){
    return data;
  })
  .catch(error =>{
    return error;
  })
  res.json({ success: true, data: data });
}

//update
controller.update = async (req,res) => {
  // parameter get id
  const { id } = req.params;
  // parameter POST
  const {actionName, message, photo, bloodLossMin, bloodLossMax, sistolicPressureMin, sistolicPressureMax, diastolicPressureMin, diastolicPressureMax, heartRateMin, heartRateMax, breathingRateMin, breathingRateMax, urineOutputMin, urineOutputMax, saturationMin, saturationMax, temperatureMin, temperatureMax, partBody, mentalStatus, time, age} = req.body;
  // Update data
  const data = await Action.update({
    actionName: actionName,
    message: message,
    photo: photo,
    bloodLossMin: bloodLossMin,
    bloodLossMax: bloodLossMax,
    sistolicPressureMin: sistolicPressureMin,
    sistolicPressureMax: sistolicPressureMax,
    diastolicPressureMin: diastolicPressureMin,
    diastolicPressureMax: diastolicPressureMax,
    heartRateMin: heartRateMin,
    heartRateMax: heartRateMax,
    breathingRateMin:  breathingRateMin,
    breathingRateMax: breathingRateMax,
    urineOutputMin: urineOutputMin,
    urineOutputMax: urineOutputMax,
    saturationMin: saturationMin,
    saturationMax: saturationMax,
    temperatureMin: temperatureMin,
    temperatureMax: temperatureMax,
    partBody: partBody,
    mentalStatus: mentalStatus,
    time: time,
    age: age
  },
  {
    where: { actionId: id}
  })
  .then( function(data){
    return data;
  })
  .catch(error => {
    return error;
  }) 
  res.json({success:true, data:data, message:"Updated successful"});
}
//delete
controller.delete = async (req, res) => {
  // parameter post
  const { id } = req.body;
  // delete sequelize
  const del = await Action.destroy({
    where: { actionId: id}
  })
  res.json({success:true,deleted:del,message:"Deleted successful"});
}

module.exports = controller;