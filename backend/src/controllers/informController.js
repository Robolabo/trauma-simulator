const controller = {}
var Inform = require('../model/Inform')
var sequelize = require ('../model/database')

controller.create = async (req,res) => {
    // data
    const { simulationId, message, minute, second, heartRate, breathingRate, sistolicPressure,
            diastolicPressure, urineOutput, saturation,temperature, bloodLoss
    } = req.body;

      
    // create
    const data = await Inform.create({
        simulationId: simulationId,
        message: message,
        minute: minute,
        second: second,
        heartRate: heartRate,
        breathingRate: breathingRate,
        sistolicPressure: sistolicPressure,
        diastolicPressure: diastolicPressure,
        urineOutput: urineOutput,
        saturation: saturation,
        temperature: temperature,
        bloodLoss: bloodLoss
      
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
  //read
  controller.get = async (req,res) => {
    const { id } = req.params;
    const data = await Inform.findAll({
        where: { actId: id },
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
    const { simulationId, message, minute, second, heartRate, breathingRate, sistolicPressure,
      diastolicPressure, urineOutput, saturation,temperature, bloodLoss} = req.body;
    // Update data
    const data = await Inform.update({
      simulationId: simulationId,
      message: message,
      minute: minute,
      second: second,
      heartRate: heartRate,
      breathingRate: breathingRate,
      sistolicPressure: sistolicPressure,
      diastolicPressure: diastolicPressure,
      urineOutput: urineOutput,
      saturation: saturation,
      temperature: temperature,
      bloodLoss: bloodLoss
    },
    {
      where: { actId: id}
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
    const del = await Inform.destroy({
      where: { actId: id}
    })
    res.json({success:true,deleted:del,message:"Deleted successful"});
  }
  module.exports = controller;