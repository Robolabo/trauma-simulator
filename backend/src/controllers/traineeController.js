const controller = {}
var Trainee = require('../model/Trainee');
const Evaluation = require('../model/Evaluation');
var Role = require('../model/Role');
var sequelize = require('../model/database');
var Utils = require('../utils');
const {QueryTypes, where, and} = require('sequelize');
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

    const data = await sequelize.query(`select traineeId, roleId, password from trainees where email="${email}"`, {type: QueryTypes.SELECT}).then(function (data) {
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

controller.cuatromin = async (req, res) => {
    const { simulationId, traineeId} = req.params;
    const data = await sequelize.query(`select actionId from evaluations where traineeId="${traineeId}" && simulationId="${simulationId}"`,{ type: QueryTypes.SELECT})
    .then(function(data){
      return data;
  
    }).catch(error =>{
      console.log("ERRORRR",error)
      return error;
    })

   
    let min =[29,30,50,52,53];
    let faltan =[29,30,50,52,53];
    
    data.forEach(function(elemento) {
        min.forEach(function(secuencia){
            if(secuencia == elemento.actionId){
                console.log("Secuencia " + secuencia)
                console.log("BBDD " + elemento.actionId)
                
                var indice = faltan.indexOf(secuencia)
                console.log("indice " + indice)
                faltan.splice(indice,1)
                console.log("Faltan "+faltan)
            }
            
        })

    })
    
    
    let aerea=0;
    let circulacion=0;
    faltan.forEach(function(elemento, indice){
      if(elemento==29 || elemento== 30){
          aerea=aerea+1;
      }else if(elemento ==50 || elemento==52 || elemento==53 ){
          circulacion=circulacion+1;
      }
    })
    if(faltan.lenght <1){
        return res.json({ success: true})
    }else{
        return res.json({ success: false, aera: aerea,circulacion: circulacion})
    }
    
  }

  controller.borrar = async (req, res) => {
    const {traineeId} = req.params;
    console.log("id"+traineeId)
    
       
      const del = await Evaluation.destroy({
        where: {traineeId: traineeId }})
      
  
      res.json({success:true,message:"Deleted successful"});


    
     

  }

    
   

  controller.min = async (req, res) => {
    const { simulationId, traineeId} = req.params;

    const data = await sequelize.query(`select actionId from evaluations where traineeId="${traineeId}" && simulationId="${simulationId}"`,{ type: QueryTypes.SELECT})
    .then(function(data){
      return data;
  
    }).catch(error =>{
      console.log("ERRORRR",error)
      return error;
    })

   
    let min =[29,30,50,52,53,130,8,67,69,70];
    let faltan =[29,30,50,52,53,130,8,67,69,70];
    
    data.forEach(function(elemento) {
        min.forEach(function(secuencia){
            if(secuencia == elemento.actionId){                
                var indice = faltan.indexOf(secuencia)
                faltan.splice(indice,1)
                
            }
            
        })

    })
    
    
    let aerea=0;
    let circulacion=0;
    let exposicion =0;
    let inmovilizacion=0;
    let farmacos=0;
   
    faltan.forEach(function(elemento, indice){
      if(elemento==29 || elemento== 30){
          aerea=aerea+1;
      }else if(elemento ==50 || elemento==52|| elemento==53 ){
          circulacion=circulacion+1;
      }else if(elemento ==130){
          exposicion=exposicion+1;
      }else if(elemento==8){
          inmovilizacion=inmovilizacion+1;
      }else if(elemento==67 || elemento==69 || elemento==70){
        farmacos=farmacos+1;
    }
    })
    if(faltan.lenght <1){
        return res.json({ success: true})
    }else{
        return res.json({ success: false, aera: aerea,circulacion: circulacion, exposicion:exposicion,inmovilizacion:inmovilizacion,farmacos:farmacos})
    }
    
  }

  controller.minPH = async (req, res) => {
    const { simulationId, traineeId} = req.params;
    const data = await sequelize.query(`select actionId from evaluations where traineeId="${traineeId}" && simulationId="${simulationId}"`,{ type: QueryTypes.SELECT})
    .then(function(data){
      return data;
  
    }).catch(error =>{
      console.log("ERRORRR",error)
      return error;
    })

   
    let min =[29,30,50,52,53,130,12,8,67,69,70,16];
    let faltan =[29,30,50,52,53,130,12,8,67,69,70,16];
    
    data.forEach(function(elemento) {
        min.forEach(function(secuencia){
            if(secuencia == elemento.actionId){
                console.log("Secuencia " + secuencia)
                console.log("BBDD " + elemento.actionId)
                
                var indice = faltan.indexOf(secuencia)
                console.log("indice " + indice)
                faltan.splice(indice,1)
                console.log("Faltan "+faltan)
            }
            
        })

    })
    
    let aerea=0;
    let circulacion=0;
    let exposicion =0;
    let inmovilizacion=0;
    let farmacos=0;
    let pruebas=0;
    faltan.forEach(function(elemento, indice){
      if(elemento==29 || elemento== 30){
          aerea=aerea+1;
      }else if(elemento ==50 || elemento==52|| elemento==53 ){
          circulacion=circulacion+1;
      }else if(elemento ==130){
          exposicion=exposicion+1;
      }else if(elemento==8 || elemento == 12){
          inmovilizacion=inmovilizacion+1;
      }else if(elemento==67 || elemento==69 || elemento==70){
        farmacos=farmacos+1;
      }else if(elemento==16){
        pruebas=pruebas+1;
      }
    })
    if(faltan.lenght <1){
        return res.json({ success: true})
    }else{
        return res.json({ success: false, aera: aerea,circulacion: circulacion, exposicion:exposicion,inmovilizacion:inmovilizacion,farmacos:farmacos, pruebas: pruebas})
    }
    
  }


  controller.minLH = async (req, res) => {
    const { simulationId, traineeId} = req.params;
    const data = await sequelize.query(`select actionId from evaluations where traineeId="${traineeId}" && simulationId="${simulationId}"`,{ type: QueryTypes.SELECT})
    .then(function(data){
      return data;
  
    }).catch(error =>{
      console.log("ERRORRR",error)
      return error;
    })

   
    let min =[29,30,50,52,53,130,8,67,69,70,16];
    let faltan =[29,30,50,52,53,130,8,67,69,70,16];
    
    data.forEach(function(elemento) {
        min.forEach(function(secuencia){
            if(secuencia == elemento.actionId){
                console.log("Secuencia " + secuencia)
                console.log("BBDD " + elemento.actionId)
                
                var indice = faltan.indexOf(secuencia)
                console.log("indice " + indice)
                faltan.splice(indice,1)
                console.log("Faltan "+faltan)
            }
            
        })

    })
    
    let aerea=0;
    let circulacion=0;
    let exposicion =0;
    let inmovilizacion=0;
    let farmacos=0;
    let pruebas=0;
    faltan.forEach(function(elemento, indice){
      if(elemento==29 || elemento== 30){
          aerea=aerea+1;
      }else if(elemento ==50 || elemento==52|| elemento==53 ){
          circulacion=circulacion+1;
      }else if(elemento ==130){
          exposicion=exposicion+1;
      }else if(elemento==8 || elemento == 12){
          inmovilizacion=inmovilizacion+1;
      }else if(elemento==67 || elemento==69 || elemento==70){
        farmacos=farmacos+1;
      }else if(elemento==16){
        pruebas=pruebas+1;
      }
    })
    if(faltan.lenght <1){
        return res.json({ success: true})
    }else{
        return res.json({ success: false, aera: aerea,circulacion: circulacion, exposicion:exposicion,inmovilizacion:inmovilizacion,farmacos:farmacos, pruebas: pruebas})
    }
    
  }




  controller.evaluacionLH = async (req, res) => {
    //const { simulationId, traineeId, phase, partbody} = req.body;
    const { simulationId, traineeId} = req.params;
    const data = await sequelize.query(`select actionId from evaluations where traineeId="${traineeId}" && simulationId="${simulationId}"`,{ type: QueryTypes.SELECT})
    .then(function(data){
  
      return data;
  
    }).catch(error =>{
      console.log("ERRORRR",error)
      return error;
  
    })

    let secuencia =[]; 

    data.forEach(function(elemento,indice) {
        secuencia[indice]=elemento.actionId;
        })   
    console.log(secuencia);

 let storeLines = [];
   let storeErrors = []
    new Promise(function (success, nosuccess) {

        const {spawn} = require('child_process');
        const pyprog = spawn('py', ['./evaluation_lh.py',secuencia], {shell: true}); // add shell:true so node will spawn it with your system shell.
        console.log("Data1")
         // store the printed rows from the script
         // store errors occurred
        pyprog.stdout.on('data', function (data) {
            storeLines.push(data);
            array = data.toString().split('\r\n');
            console.log(array)
            return res.json({success:true, matches: array[0], swap:array[1],contr:array[2],gasp:array[3],mismatches:array[4],GA:array[5],Diag:array[6],Subseq:array[7] ,Precision:array[8],Recall:array[9],Specificity:array[10],Accuracy:array[11],F1:array[12],Nota:array[13] })
           // return res.send(array)
        });

        pyprog.stderr.on('data', (data) => {
            storeErrors.push(data);
            console.log("Data3"+data)
        });
        pyprog.on('close', () => {
            // if we have errors will reject the promise and we'll catch it later
            if (storeErrors.length) {
               // nosuccess(new Error(Buffer.concat(storeErrors).toString()));
               return res.json({success:false})
                
            } else {
                success(storeLines);
            }
        })
    })

    
    
    
  }

  controller.evaluacionLP = async (req, res) => {
    //const { simulationId, traineeId, phase, partbody} = req.body;
    const { simulationId, traineeId} = req.params;
    const data = await sequelize.query(`select actionId from evaluations where traineeId="${traineeId}" && simulationId="${simulationId}"`,{ type: QueryTypes.SELECT})
    .then(function(data){
  
      return data;
  
    }).catch(error =>{
      console.log("ERRORRR",error)
      return error;
  
    })

    let secuencia =[]; 

    data.forEach(function(elemento,indice) {
        secuencia[indice]=elemento.actionId;
        })   
    console.log(secuencia);
    

   
 let storeLines = [];
   let storeErrors = []
    new Promise(function (success, nosuccess) {

        const {spawn} = require('child_process');
        const pyprog = spawn('py', ['./evaluation_lp.py',secuencia], {shell: true}); // add shell:true so node will spawn it with your system shell.
        console.log("Data1")
         // store the printed rows from the script
         // store errors occurred
        pyprog.stdout.on('data', function (data) {
            storeLines.push(data);
            console.log("Data2 "+storeLines)
           array = data.toString().split('\r\n');
           return res.json({success:true, matches: array[0], swap:array[1],contr:array[2],gasp:array[3],mismatches:array[4],GA:array[5],Diag:array[6],Subseq:array[7] ,Precision:array[8],Recall:array[9],Specificity:array[10],Accuracy:array[11],F1:array[12],Nota:array[13] })
        });

        pyprog.stderr.on('data', (data) => {
            storeErrors.push(data);
            console.log("Data3"+data)
        });
        pyprog.on('close', () => {
            // if we have errors will reject the promise and we'll catch it later
            if (storeErrors.length) {
               // nosuccess(new Error(Buffer.concat(storeErrors).toString()));
               return res.json({success:false})
            } else {
                success(storeLines);
            }
        })
    })

    
    
    
  }

  controller.evaluacionPH = async (req, res) => {
    //const { simulationId, traineeId, phase, partbody} = req.body;
    const { simulationId, traineeId} = req.params;
    const data = await sequelize.query(`select actionId from evaluations where traineeId="${traineeId}" && simulationId="${simulationId}" `,{ type: QueryTypes.SELECT})
    
    
    .then(function(data){
  
      return data;
  
    }).catch(error =>{
      console.log("ERRORRR",error)
      return error;
  
    })

    let secuencia =[]; 

    data.forEach(function(elemento,indice) {
        secuencia[indice]=elemento.actionId;
        })   
    console.log(secuencia);
    
   
 let storeLines = [];
   let storeErrors = []
    new Promise(function (success, nosuccess) {

        const {spawn} = require('child_process');
        const pyprog = spawn('py', ['./evaluation_ph.py',secuencia], {shell: true}); // add shell:true so node will spawn it with your system shell.
        console.log("Data1")
         // store the printed rows from the script
         // store errors occurred
        pyprog.stdout.on('data', function (data) {
            storeLines.push(data);
            console.log("Data2 "+storeLines)
           // x = String.fromCharCode(...storeLines)
           
            //return res.json({ success: true})
           // return res.send(data)
           array = data.toString().split('\r\n');
           console.log(array.length)
           return res.json({success:true, matches: Number(array[0]), swap:array[1],contr:array[2],gasp:array[3],mismatches:array[4],GA:array[5],Diag:array[6],Subseq:array[7] ,Precision:array[8],Recall:array[9],Specificity:array[10],Accuracy:array[11],F1:array[12],Nota:array[13] })
        });

        pyprog.stderr.on('data', (data) => {
            storeErrors.push(data);
            console.log("Data3"+data)
        });
        pyprog.on('close', () => {
            // if we have errors will reject the promise and we'll catch it later
            if (storeErrors.length) {
               // nosuccess(new Error(Buffer.concat(storeErrors).toString()));
               return res.json({success:false})
            } else {
                success(storeLines);
            }
        })
    })

    
    
    
  }
  controller.evaluacionPP = async (req, res) => {
    //const { simulationId, traineeId, phase, partbody} = req.body;
    const { simulationId, traineeId} = req.params;
    const data = await sequelize.query(`select actionId from evaluations where traineeId="${traineeId}" && simulationId="${simulationId}"`,{ type: QueryTypes.SELECT})
    .then(function(data){
  
      return data;
  
    }).catch(error =>{
      console.log("ERRORRR",error)
      return error;
  
    })

    let secuencia =[]; 

    data.forEach(function(elemento,indice) {
        secuencia[indice]=elemento.actionId;
        })   
    console.log(secuencia);
   
 let storeLines = [];
   let storeErrors = []
    new Promise(function (success, nosuccess) {

        const {spawn} = require('child_process');
        const pyprog = spawn('py', ['./evaluation_pp.py',secuencia], {shell: true}); // add shell:true so node will spawn it with your system shell.
        console.log("Data1")
         // store the printed rows from the script
         // store errors occurred
        pyprog.stdout.on('data', function (data) {
            storeLines.push(data);
            console.log("Data2 "+storeLines)
           // x = String.fromCharCode(...storeLines)
           
            //return res.json({ success: true})
           // return res.send(data)
           array = data.toString().split('\r\n');
           console.log(array)
           return res.json({success:true, matches: array[0], swap:array[1],contr:array[2],gasp:array[3],mismatches:array[4],GA:array[5],Diag:array[6],Subseq:array[7] ,Precision:array[8],Recall:array[9],Specificity:array[10],Accuracy:array[11],F1:array[12],Nota:array[13] })
        });

        pyprog.stderr.on('data', (data) => {
            storeErrors.push(data);
            console.log("Data3"+data)
        });
        pyprog.on('close', () => {
            // if we have errors will reject the promise and we'll catch it later
            if (storeErrors.length) {
               // nosuccess(new Error(Buffer.concat(storeErrors).toString()));
               return res.json({success:false})
            } else {
                success(storeLines);
            }
        })
    })
}

    controller.results = async (req, res) => {
        //const { simulationId, traineeId, phase, partbody} = req.body;
        const { simulationId, traineeId} = req.params;
        const data = await sequelize.query(`select matches,swap,contr,gasp,mismatches,GA,Diag,Subseq,Preci,Recall,Specificity,Accuracy,F1, Nota from results where traineeId="${traineeId}" && simulationId="${simulationId}" order by id DESC`,{ type: QueryTypes.SELECT})
        
       
        
        .then(function(data){
      
            return res.json({success:true, data: data})
      
        }).catch(error =>{
          console.log("ERRORRR",error)
          return error;
      
        })
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
