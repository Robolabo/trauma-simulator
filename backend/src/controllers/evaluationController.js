const controller = {}

const Evaluation = require('../model/Evaluation');
const {QueryTypes, where} = require('sequelize');
const sequelize = require("sequelize");


controller.create = async (req,res) => {
  // data
  const {traineeId, trainerId, roleId, simulationId, phase, actionId, actionName, minute, second, heartRate, breathingRate,sistolicPressure,
      diastolicPressure, saturation, partBody, mentalStatus,age
  } = req.body;

    
  // create
  const data = await Evaluation.create({
      traineeId: traineeId,
      trainerId: trainerId,
      roleId: roleId,
      simulationId: simulationId,
      phase: phase,
      actionId: actionId,
      actionName: actionName,
      minute: minute,
      second: second,
      heartRate: heartRate,
      breathingRate: breathingRate,
      sistolicPressure: sistolicPressure,
      diastolicPressure: diastolicPressure,
      saturation: saturation,
      partBody: partBody,
      mentalStatus: mentalStatus,
      age: age
    
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

controller.getAction = async (req, res) => {
  const { simulationId, traineeId} = req.params;
  const data = await sequelize.query(`select actionId from evaluations where traineeId="${traineeId}" && simulationId="${simulationId}"`,{ type: QueryTypes.SELECT})
  .then(function(data){

    return data;

  }).catch(error =>{
    console.log("ERRORRR",error)
    return error;

  })
   return res.json({success: true, data: data});
}


  //read
  controller.get = async (req,res) => {
    const { id } = req.params;
    const data = await Evaluation.findAll({
        where: { Id: id },
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
    const {traineeeId, trainerId, roleId, simulationId, phase, actionId, actionName, sistolicPressure,
        diastolicPressure, heartRate, breathingRate, saturation, partBody, mentalstatus,age, minute, second} = req.body;
    // Update data
    const data = await Evaluation.update({
        traineeId: traineeeId,
        trainerId: trainerId,
        roleId: roleId,
        simulationId: simulationId,
        phase: phase,
        actionId: actionId,
        actionName: actionName,
        minute: minute,
        second: second,
        heartRate: heartRate,
        breathingRate: breathingRate,
        sistolicPressure: sistolicPressure,
        diastolicPressure: diastolicPressure,
        saturation: saturation,
        partBody: partBody,
        mentalstatus: mentalstatus,
        age: age
    },
    {
      where: { Id: id}
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
    const del = await Evaluation.destroy({
      where: { Id: id}
    })
    res.json({success:true,deleted:del,message:"Deleted successful"});
  }




module.exports = controller;

