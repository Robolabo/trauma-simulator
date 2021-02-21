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

  module.exports = controller;