const controller = {}
var Trainee = require('../model/Trainee');
var Role = require('../model/Role');
var sequelize = require ('../model/database');
var Utils = require('../utils');
const { QueryTypes } = require('sequelize');


controller.testdata = async ( req, res) => {
  
  const response = await sequelize.sync().then(function() {
     const data =  Trainee.findAll()
     return data;
  })
  .catch(err => {
    return err;
  });
  res.json({success: true})

}  

controller.list = async (req, res) => {

  const data = await Trainee.findAll({
    include: [ Role ]
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
  const { name, surname, password, email, workplace, roleId } = req.body;
  // create
  const data = await Trainee.create({
    name: name,
    surname: surname,
    email: email,
    password: password,
    workplace: workplace,
    roleId: roleId
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
  const data = await Trainee.findAll({
      where: { traineeId: id },
      include: [ Role ]
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
  const { name, surname, password, email, workplace, roleId } = req.body;
  // Update data
  const data = await Trainee.update({
    name: name,
    surname: surname,
    email: email,
    password: password,
    workplace: workplace,
    roleId: roleId
  },
  {
    where: { traineeId: id}
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
  const del = await Trainee.destroy({
    where: { traineeId: id}
  })
  res.json({success:true,deleted:del,message:"Deleted successful"});
}

controller.login = async (req,res) => {
  const { email } = req.params;
  const data = await sequelize.query(
    `select traineeId, password from trainees where email="${email}"`,
    { type: QueryTypes.SELECT }
  )
  .then(function(data){
    return data;
  })
  .catch(error =>{
    return error;
  })
  const userData = req.body
  // generate token
  const token = Utils.generateToken(userData);
  // get basic user details
  const userObj = Utils.getCleanUser(duserData);
  // return the token along with user details
  return res.json({ success: true, data: data, user: userObj, token });
  //res.json({ success: true, data: data });
}
  

module.exports = controller;