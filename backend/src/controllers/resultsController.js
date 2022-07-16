const controller = {}

const Result = require('../model/Result');
const {QueryTypes, where} = require('sequelize');
const sequelize = require("sequelize");


controller.create = async (req,res) => {
  // data
  const {traineeId,simulationId, matches,swap,contr,gasp,mismatches,GA,Diag,Subseq,Precision,Recall,Specificity,Accuracy,F1,Nota
  } = req.body;

  console.log("Ha pasado por aqui")

    
  // create
  const data = await Result.create({
      traineeId: traineeId,
      simulationId: simulationId,
      matches:matches,
      swap:swap,
      contr:contr,
      gasp:gasp,
      mismatches:mismatches,
      GA:GA,
      Diag:Diag,
      Subseq:Subseq,
      Preci:Precision,
      Recall:Recall,
      Specificity:Specificity,
      Accuracy:Accuracy,
      F1:F1,
      Nota:Nota
    
  })
  .then(function(data){
    console.log("Ha pasado por aqui")
    return data;
  })
  .catch(error =>{
    console.log("Ha pasado por aqui2")
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
  const data = await sequelize.query(`select actionId from results where traineeId="${traineeId}" && simulationId="${simulationId}"`,{ type: QueryTypes.SELECT})
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
    const data = await result.findAll({
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


module.exports = controller;