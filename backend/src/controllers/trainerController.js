const controller = {}
var Trainer = require('../model/Trainer');
var Role = require('../model/Role');
var sequelize = require ('../model/database')
const { QueryTypes } = require('sequelize');


controller.testdata = async ( req, res) => {
  
  const response = await sequelize.sync().then(function() {
     const data =  Trainer.findAll()
     return data;
  })
  .catch(err => {
    return err;
  });
  res.json({success: true})

}   
controller.list = async (req, res) => {

  const data = await Trainer.findAll({
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
//create
controller.create = async (req,res) => {
  // data
  const { name, surname, password, email, workplace, roleId } = req.body;
  // create
  const data = await Trainer.create({
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
//read
controller.get = async (req,res) => {
  const { id } = req.params;
  const data = await Trainer.findAll({
      where: { trainerId: id },
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
//update
controller.update = async (req,res) => {
  // parameter get id
  const { id } = req.params;
  // parameter POST
  const { name, surname, password, email, workplace, roleId } = req.body;
  // Update data
  const data = await Trainer.update({
    name: name,
    surname: surname,
    email: email,
    password: password,
    workplace: workplace,
    roleId: roleId
  },
  {
    where: { trainerId: id}
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
  const del = await Trainer.destroy({
    where: { trainerId: id}
  })
  res.json({success:true,deleted:del,message:"Deleted successful"});
}

controller.login = async (req,res) => {
  const { email } = req.params;
  const data = await sequelize.query(
    `select trainerId, password from trainers where email="${email}"`,
    { type: QueryTypes.SELECT }
  )
  .then(function(data){
    return data;
  })
  .catch(error =>{
    return error;
  })

  res.json({ success: true, data: data });
}  


controller.salir = async (req, res) => {

  try{
  const as = req.params; 
  const a = await Trainer.findOne({where:as});
  console.log(a.session);
  if (a.session == true) {
      Trainer.update({
          session: false
      }, {
          where: as
      })
      return res.status(200).json({success: true})   
  
  }else{
      return res.status(200).json({success: false})
  }
 }catch(error){
     console.log('Error :' + error)
 }
}

controller.session = async (req, res) => {
  try {
    const as = req.params;
    console.log(as);
    const a = await Trainer.findOne({where: as}); 
    if(a == null){
      return res.status(200).json({success: "2"});
    }
    else{
    console.log(a);
      if (a.session == false) { 
          return res.status(200).json({success: true});
      } else { 
          return res.status(200).json({success: false}); 
      }
  }
  } catch (error) {
      console.log('Error :' + error);

  } 
} 
controller.ses = async (req, res) => {
  try{
  const as = req.params; 
  const a= await Trainer.findOne({where:as});
  console.log(as);
  if (a.session == false) {
      Trainer.update({
          session: true
      }, {
          where: as
      })
      return res.status(200).json({success: true})   
  
  }else{
      return res.status(200).json({success: false})
  }
 }catch(error){
     console.log('Error :' + error)
 }
}


controller.logout = async(req, res) => {
  const {id} = req.params;
  
  console.log("id" +id);
  Trainer.update({
      session: false }, {
          where: {
              trainerId: id
          }
      })
  return res.status(200).json({success: true}) 

}
controller.log = async(req, res) => {
  const {id} = req.params;
  
  console.log("id" +id);
  Trainer.update({
      session: true }, {
          where: {
              trainerId: id
          }
      })
  return res.status(200).json({success: true}) 

}

module.exports = controller;