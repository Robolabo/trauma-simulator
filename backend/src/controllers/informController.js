const controller = {}
const { QueryTypes } = require('sequelize');
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

controller.getSimulations = async (req, res) => {
  var nTrainings = 1
  const data = await sequelize.query(
    `select simulations.simulationId, minute, second from informs inner join 
    simulations ON informs.simulationId= simulations.simulationId where 
    simulations.trainerId=2 and simulations.traineeId='${req.query.traineeId}'`,
    { type: QueryTypes.SELECT }
  )// añadir edad
  .then(function(data){
    for(var i=0;i<data.length-1; i++){
      if(data[i+1].simulationId !== data[i].simulationId){
        nTrainings++
      } else{
        var t1 = data[i+1].minute *60 + data[i+1].second
        var t2 = data[i].minute *60 + data[i].second
        if (t1<t2){
          nTrainings++
        }
      }
      
    }
    return nTrainings;
  })
  .catch(error =>{
    console.log("ERRORRR",error)
    return error;

  })
  res.json({ success: true, data: nTrainings });
}

module.exports = controller;

