const controller = {}
var sequelize = require ('../model/database')
const { QueryTypes } = require('sequelize');

controller.getMsg = async (req, res) => {
  console.log("QUERY",req.query.age)
  const data = await sequelize.query(
    `Select distinct message, photo, time from actions where actionName = '${req.query.actionName}' and 
    ((bloodLossMin != -1 and ${req.query.bloodLoss} > bloodLossMin and ${req.query.bloodLoss} < bloodLossMax) or 
    (sistolicPressureMin != -1 and ${req.query.sistolicPressure} > sistolicPressureMin and ${req.query.sistolicPressure} < sistolicPressureMax) or 
    (diastolicPressureMin != -1 and ${req.query.diastolicPressure} > diastolicPressureMin and ${req.query.diastolicPressure} < diastolicPressureMax) or 
    (heartRateMin != -1 and ${req.query.heartRate} > heartRateMin and ${req.query.heartRate} < heartRateMax) or 
    (breathingRateMin != -1 and ${req.query.breathingRate} > breathingRateMin and ${req.query.breathingRate} < breathingRateMax) or 
    (urineOutputMin != -1 and ${req.query.urineOutput} > urineOutputMin and ${req.query.urineOutput} < urineOutputMax) or 
    (saturationMin != -1 and ${req.query.saturation} > saturationMin and ${req.query.saturation} < saturationMax) or 
    (temperatureMin != -1 and ${req.query.temperature} > temperatureMin and ${req.query.temperature} < temperatureMax) or 
    (mentalStatus = '${req.query.mentalStatus}' and mentalStatus != '-1') or 
    (age = '${req.query.age}') or
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
  console.log(data)
  res.json({ success: true, data: data });
}

module.exports = controller;