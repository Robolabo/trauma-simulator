const controller = {}
var Trainee = require('../model/Trainee');
var Role = require('../model/Role');
var sequelize = require('../model/database');
var Utils = require('../utils');
const {QueryTypes, where} = require('sequelize');
const Sequelize = require("sequelize");


controller.testdata = async (req, res) => {

    const response = await sequelize.sync().then(function () {
        const data = Trainee.findAll()
        return data;
    }).catch(err => {
        return err;
    });
    res.json({success: true})

} 
controller.list = async (req, res) => {

    const data = await Trainee.findAll({include: [Role]}).then(function (data) {
        return data;
    }).catch(error => {
        return error;
    });

    res.json({success: true, data: data});

} 
controller.create = async (req, res) => { // data
    const {
        name,
        surname,
        password,
        email,
        workplace,
        roleId
    } = req.body;

    let user = Trainee.build({
        name,
        surname,
        password,
        email,
        workplace,
        roleId
    });
    try {
        user = await user.save({
            fields: [
                "name",
                "surname",
                "password",
                "email",
                "workplace",
                "roleId"
            ]
        });
        res.status(200).json({success: true, message: "Se ha guardado bien"})
    } catch (error) {
        if (error instanceof Sequelize.UniqueConstraintError) {
            res.status(200).json({success: false, message: "Ese correo ya existe"})
        } else {
            next(error);
        }
    }
} 
controller.get = async (req, res) => {
    const {id} = req.params;
    const data = await Trainee.findAll({
        where: {
            traineeId: id
        },
        include: [Role]
    }).then(function (data) {
        return data;
    }).catch(error => {
        return error;
    })
    res.json({success: true, data: data});
} 
controller.update = async (req, res) => { // parameter get id
    const {id} = req.params;
    // parameter POST
    const {
        name,
        surname,
        password,
        email,
        workplace,
        roleId
    } = req.body;
    // Update data
    const data = await Trainee.update({
        name: name,
        surname: surname,
        email: email,
        password: password,
        workplace: workplace,
        roleId: roleId
    }, {
        where: {
            traineeId: id
        }
    }).then(function (data) {
        return data;
    }).catch(error => {
        return error;
    })
    res.json({success: true, data: data, message: "Updated successful"});
} 
controller.delete = async (req, res) => { // parameter post
    const {id} = req.body;
    // delete sequelize
    const del = await Trainee.destroy({
        where: {
            traineeId: id
        }
    })
    res.json({success: true, deleted: del, message: "Deleted successful"});
} 
controller.login = async (req, res) => {
    const {email} = req.params;

    const data = await sequelize.query(`select traineeId, password from trainees where email="${email}"`, {type: QueryTypes.SELECT}).then(function (data) {
        return data;
    }).catch(error => {
        return error;
    })
    console.log('1 antes token');
    const userData = req.body
    console.log('user data: ' + userData);
    // generate token
    const token = Utils.generateToken(userData);
    console.log(token)
    // get basic user details
    const userObj = Utils.getCleanUser(userData);
    // return the token along with user details
    return res.json({success: true, data: data, user: userObj, token});
    // res.json({ success: true, data: data });
} 
controller.session = async (req, res) => {
    try {
      const as = req.params;
      console.log(as);
      const a = await Trainee.findOne({where: as}); 
      if(a == null){
          console.log("No carga"); 
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
    const a= await Trainee.findOne({where:as});
    console.log(as);
    if (a.session == false) {
        Trainee.update({
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

controller.salir = async (req, res) => {

    try{
    const as = req.params; 
    const a = await Trainee.findOne({where:as});
    console.log(a.session);
    if (a.session == true) {
        Trainee.update({
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

controller.logout = async(req, res) => {
    const {id} = req.params;
    
    console.log("id" +id);
    Trainee.update({
        session: false }, {
            where: {
                traineeId: id
            }
        })
    return res.status(200).json({success: true}) 

}
controller.log = async(req, res) => {
    const {id} = req.params;
    
    console.log("id" +id);
    Trainee.update({
        session: true }, {
            where: {
                traineeId: id
            }
        })
    return res.status(200).json({success: true}) 

}


module.exports = controller;
