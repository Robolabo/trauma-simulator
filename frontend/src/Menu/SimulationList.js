import React from 'react';
import axios from 'axios';
import { withTranslation } from 'react-i18next';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import Inform from '../Information/Document'
import { Link,Redirect } from "react-router-dom";
import { Alert } from 'reactstrap';
import '../Simulations/simulation.css'
import { ThemeConsumer } from 'react-bootstrap/esm/ThemeProvider';
import { getToken, removeUserSession, setUserSession } from '../Utils/Common';
//import { each } from 'jquery';
var finish = false
class SimulationList extends React.Component  {
  constructor(props){
    super(props);
    this.state = {
      listSimulation:[],
      isTrainer: this.props.location.state.isTrainer,
      roleId:this.props.location.state.roleId,
      traineeId:this.props.location.state.traineeId,
      simulationId:this.props.location.state.simulationId,
      alert: false,
      redirect: false,
      id: this.props.location.state.id,
      refresh: false, 
      check: true,
      check1:false,
      nTrainings: 0,
      matches: "",
      swap:"",
      contr: "",
      gasp: "",
      mismatches:"",
      GA:"",
      Diag:"",
      Subseq:"",
      Precision:"",
      Recall:"",
      Specificity:"",
      Accuracy:"",
      F1:"",
      Nota:"",
      

      
      
    }
  }


  
  handleLogout = () => {
    var i = this.props.location.state.id;
    var train = this.state.isTrainer? "trainer": "trainee";
    
      axios.get("http://localhost:8080/"+train+"/logout/"+ i)
      
      .catch(error=>{
        alert("Error server "+error)
      })
      removeUserSession();
}

 //crea las simulaciones de prueba
  handleRandomCreate(){
    var arrSimulations = [];

  var request = {
    params: {
      idTrainer: 2,
       idTrainee: this.props.location.state.id,
       roleId: this.props.location.state.roleId
    }
  }
       //const baseGetURL = "http://localhost:8080/simulation/listByTraineeAndTrainer";
       // Comprobar que el trainee no tenga ya las simulaciones creadas
      const baseGetUrl = "http://localhost:8080/simulation/listTraineeAndTrainer/";
        
        axios.get(baseGetUrl,request)
        .then(res => {
          
          const data = res.data.data;
          //si data tiene contenido esq tengo simulaciones ya creadas
          if (data.length>0) {
              this.setState({ listSimulation:data });
          } else {
            
            const baseUrl = "http://localhost:8080/simulation/create"
           
            // Sustituir por datos de simulaciones que proponga Fernando
       
       // sex:1 es mujer, sex:0 es hombre
       // Caso clínico 2 con fase prehospitlaria
        var datapost1 = {
            trainerId: 2,
            traineeId: this.props.location.state.id,
            roleId: this.props.location.state.roleId,
            sex: 0,
            age: 33,
            weight: 80,
            traumaType: "pelvico",
            partBody: "pelvis",
            bloodLoss: 100,
            sistolicPressure: 141,
            diastolicPressure: 89,
            heartRate: 135,
            breathingRate: 41,
            urineOutput: 12,
            saturation: 90,
            mentalStatus: "normal",
            phase: "prehospitalaria",
            temperature: 34,
            time: 30,
            rxPelvis:"2"
            
            
        }
        // Caso clínico 2 con fase hospitlaria
        var datapost2 = {
          trainerId: 2,
          traineeId: this.props.location.state.id,
          roleId: this.props.location.state.roleId,
          sex: 0,
          age: 33,
          weight: 80,
          traumaType: "pelvico",
          partBody: "pelvis",
          bloodLoss: 100,
          sistolicPressure: 141,
          diastolicPressure: 89,
          heartRate: 135,
          breathingRate: 41,
          urineOutput: 12,
          saturation: 90,
          mentalStatus: "normal",
          phase: "hospitalaria",
          temperature: 34,
          time: 30,
          rxPelvis:"2"
          
      }

      // Caso clínico 3 con fase prehospitlaria
         var datapost3 = {
            trainerId: 2,
            traineeId: this.props.location.state.id,
            roleId: this.props.location.state.roleId,
            sex: 0,
            age: 50,
            weight: 90, 
            traumaType: "pelvico",
            partBody: "pelvis", 
            bloodLoss: 100,
            sistolicPressure: 141,
            diastolicPressure: 89,
            heartRate: 120,
            breathingRate: 28,
            urineOutput: 12, 
            saturation: 92, 
            mentalStatus: "normal", 
            phase: "prehospitalaria",
            temperature: 34,
            time: 30,
            rxPelvis:"3"
            
         }
        // Caso clínico 3 con fase hospitlaria
         var datapost4 = {
          trainerId: 2,
          traineeId: this.props.location.state.id,
          roleId: this.props.location.state.roleId,
          sex: 0,
          age: 50,
          weight: 90, 
          traumaType: "pelvico",
          partBody: "pelvis", 
          bloodLoss: 100,
          sistolicPressure: 141,
          diastolicPressure: 89,
          heartRate: 120,
          breathingRate: 28,
          urineOutput: 12, 
          saturation: 92, 
          mentalStatus: "normal", 
          phase: "hospitalaria",
          temperature: 34,
          time: 30,
          rxPelvis:"3"
          
       }
        // Caso clínico 4 con fase prehospitlaria

          var datapost5 = {
            trainerId: 2,
            traineeId: this.props.location.state.id,
            roleId: this.props.location.state.roleId,
            sex: 0,
            age: 82,
            weight: 80,
            traumaType: "pelvico",
            partBody: "pelvis",
            bloodLoss: 100, 
            sistolicPressure: 141,
            diastolicPressure: 91,
            heartRate: 120,
            breathingRate: 28,
            urineOutput: 12,
            saturation: 95,
            mentalStatus: "normal",
            phase: "prehospitalaria",
            temperature:34,
            time: 30,
            rxPelvis:"4"
            
            }
          // Caso clínico 4 con fase hospitlaria
            var datapost6 = {
              trainerId: 2,
              traineeId: this.props.location.state.id,
              roleId: this.props.location.state.roleId,
              sex: 0,
              age: 82,
              weight: 80,
              traumaType: "pelvico",
              partBody: "pelvis",
              bloodLoss: 100, 
              sistolicPressure: 141,
              diastolicPressure: 91,
              heartRate: 120,
              breathingRate: 28,
              urineOutput: 12,
              saturation: 95,
              mentalStatus: "normal",
              phase: "hospitalaria",
              temperature: 34,
              time: 30,
              rxPelvis:"4"
              
              }

            // Caso clínico 9 con fase hospitlaria
            var datapost7 = {
              trainerId: 2,
              traineeId: this.props.location.state.id,
              roleId: this.props.location.state.roleId,
              sex: 0,
              age: 33,
              weight: 80,
              traumaType: "inferior",
              partBody: "leftLeg",
              bloodLoss: 100, 
              sistolicPressure: 141,
              diastolicPressure: 89,
              heartRate: 135,
              breathingRate: 41,
              urineOutput: 12,
              saturation: 90,
              mentalStatus: "normal",
              phase: "hospitalaria",
              temperature: 34,
              time: 30,
              rxPelvis:"6"
              
              }
            var datapost8 = {
              trainerId: 2,
              traineeId: this.props.location.state.id,
              roleId: this.props.location.state.roleId,
              sex: 0,
              age: 33,
              weight: 80,
              traumaType: "inferior",
              partBody: "leftLeg",
              bloodLoss: 100, 
              sistolicPressure: 141,
              diastolicPressure: 89,
              heartRate: 135,
              breathingRate: 41,
              urineOutput: 12,
              saturation: 90,
              mentalStatus: "normal",
              phase: "prehospitalaria",
              temperature: 34,
              time: 30,
              rxPelvis:null
              
              }  
            // Caso clínico 10 con fase hospitlaria
            var datapost9 = {
              trainerId: 2,
              traineeId: this.props.location.state.id,
              roleId: this.props.location.state.roleId,
              sex: 0,
              age: 50,
              weight: 80,
              traumaType: "inferior",
              partBody: "leftLeg",
              bloodLoss: 100, 
              sistolicPressure: 141,
              diastolicPressure: 89,
              heartRate: 120,
              breathingRate: 28,
              urineOutput: 12,
              saturation: 92,
              mentalStatus: "normal",
              phase: "hospitalaria",
              temperature: 34,
              time: 30,
              rxPelvis:"7"
              
              }
              var datapost10 = {
                trainerId: 2,
                traineeId: this.props.location.state.id,
                roleId: this.props.location.state.roleId,
                sex: 0,
                age: 50,
                weight: 80,
                traumaType: "inferior",
                partBody: "leftLeg",
                bloodLoss: 100, 
                sistolicPressure: 141,
                diastolicPressure: 89,
                heartRate: 120,
                breathingRate: 28,
                urineOutput: 12,
                saturation: 92,
                mentalStatus: "normal",
                phase: "prehospitalaria",
                temperature: 34,
                time: 30,
                rxPelvis:null
                
                }
            // Caso clínico 11 con fase hospitlaria
            var datapost11 = {
              trainerId: 2,
              traineeId: this.props.location.state.id,
              roleId: this.props.location.state.roleId,
              sex: 0,
              age: 82,
              weight: 80,
              traumaType: "inferior",
              partBody: "leftLeg",
              bloodLoss: 100, 
              sistolicPressure: 141,
              diastolicPressure: 91,
              heartRate: 120,
              breathingRate: 28,
              urineOutput: 12,
              saturation: 95,
              mentalStatus: "normal",
              phase: "hospitalaria",
              temperature: 34,
              time: 30,
              rxPelvis:"8"
              
              }
              var datapost12 = {
                trainerId: 2,
                traineeId: this.props.location.state.id,
                roleId: this.props.location.state.roleId,
                sex: 0,
                age: 82,
                weight: 80,
                traumaType: "inferior",
                partBody: "leftLeg",
                bloodLoss: 100, 
                sistolicPressure: 141,
                diastolicPressure: 91,
                heartRate: 120,
                breathingRate: 28,
                urineOutput: 12,
                saturation: 95,
                mentalStatus: "normal",
                phase: "prehospitalaria",
                temperature: 34,
                time: 30,
                rxPelvis: null
                
                }
            
      // Añado cada uno de los datapost creados al array
      arrSimulations.push(datapost1);
      arrSimulations.push(datapost2);
      arrSimulations.push(datapost3);
      arrSimulations.push(datapost4);
      arrSimulations.push(datapost5);
      arrSimulations.push(datapost6);
      arrSimulations.push(datapost7);
      arrSimulations.push(datapost8);
      arrSimulations.push(datapost9);
      arrSimulations.push(datapost10);
      arrSimulations.push(datapost11);
      arrSimulations.push(datapost12);
      console.log("RoleId1" + this.props.location.state.roleId)
      
        arrSimulations.forEach(dataPost => {
          // Envio al backend y se genera en la base de datos si todo va bien
          axios.post(baseUrl, dataPost)
            .then(response => {
              if (response.data.success === true) {
                //Una vez se hayan creado las simulaciones, las obtengo para mostrarlas por pantalla
                axios.get(baseGetUrl, request)
                  .then(res => {
                    const data = res.data.data;
                    if (data) {
                      this.setState({ listSimulation: data });
                    }
                  }).catch(error => {
                    alert("Error 34 " + error);
                  })
              }
              else {
                alert(response.data.message)
                
              }
            })
            .catch(error => {
              alert("Error 34 " + error)
            })
       


      })}
          
          
        })
        .catch(error => {
          alert(error)
        })

         //this.setState({ listSimulation: arrSimulations });
     
}

createCases(){
  var request = {
    params: {
      idTrainer: 1,
      idTrainee: this.props.location.state.id,
      roleId: this.props.location.state.roleId
      
    }
  }
  const baseUrlCreate = "http://localhost:8080/simulation/create"
  const baseGetUrl = "http://localhost:8080/simulation/listTraineeAndTrainer/"
  axios.get(baseGetUrl,request)
  .then(res => {
    const data = res.data.data;
    //si data tiene contenido esq tengo simulaciones ya creadas
    if (data.length>0) {
        this.filterData(data)
        this.setState({ listSimulation:data });
    } else {
      var datapost1 = {
        trainerId: 1,
        traineeId: this.props.location.state.id,
        roleId: this.props.location.state.roleId,
        sex: 0,
        age: 21,
        weight: 90,
        traumaType: "pelvico", 
        partBody: "pelvis", 
        bloodLoss: 100,
        sistolicPressure: 141,
        diastolicPressure: 89,
        heartRate: 110,
        breathingRate: 26,
        urineOutput: 10, 
        saturation: 98, 
        mentalStatus: "normal", 
        phase: "prehospitalaria",
        temperature: 34,
        time: 30,
        rxPelvis:null
      }

      var datapost2 = {
        trainerId: 1,
        traineeId: this.props.location.state.id,
        roleId: this.props.location.state.roleId,
        sex: 0,
        age: 22,
        weight: 90,
        traumaType: "pelvico", 
        partBody: "pelvis", 
        bloodLoss: 100,
        sistolicPressure: 141,
        diastolicPressure: 89,
        heartRate: 110,
        breathingRate: 26,
        urineOutput: 10, 
        saturation: 98, 
        mentalStatus: "normal", 
        phase: "hospitalaria",
        temperature: 34,
        time: 30,
        rxPelvis:"1"
      }

      var datapost3 = {
        trainerId: 1,
        traineeId: this.props.location.state.id,
        roleId: this.props.location.state.roleId,
        sex: 0,
        age: 23,
        weight: 90,
        traumaType: "pelvico", 
        partBody: "pelvis", 
        bloodLoss: 100,
        sistolicPressure: 141,
        diastolicPressure: 89,
        heartRate: 110,
        breathingRate: 26,
        urineOutput: 10, 
        saturation: 98, 
        mentalStatus: "normal", 
        phase: "prehospitalaria",
        temperature: 34,
        time: 30,
        rxPelvis:null
      }

      var datapost4 = {
        trainerId: 1,
        traineeId: this.props.location.state.id,
        roleId: this.props.location.state.roleId,
        sex: 0,
        age: 24,
        weight: 90,
        traumaType: "pelvico", 
        partBody: "pelvis", 
        bloodLoss: 100,
        sistolicPressure: 141,
        diastolicPressure: 89,
        heartRate: 110,
        breathingRate: 26,
        urineOutput: 10, 
        saturation: 98, 
        mentalStatus: "normal", 
        phase: "hospitalaria",
        temperature: 34,
        time: 30,
        rxPelvis:"1"
      }

      // Caso clínico 8 con fase hospitlaria
      var datapost5 = {
        trainerId: 1,
        traineeId: this.props.location.state.id,
        roleId: this.props.location.state.roleId,
        sex: 0,
        age: 21,
        weight: 80,
        traumaType: "inferior",
        partBody: "leftLeg",
        bloodLoss: 100, 
        sistolicPressure: 141,
        diastolicPressure: 89,
        heartRate: 110,
        breathingRate: 26,
        urineOutput: 12,
        saturation: 98,
        mentalStatus: "normal",
        phase: "prehospitalaria",
        temperature: 34,
        time: 30,
        rxPelvis:null
        
        }
      var datapost6 = {
        trainerId: 1,
        traineeId: this.props.location.state.id,
        roleId: this.props.location.state.roleId,
        sex: 0,
        age: 22,
        weight: 80,
        traumaType: "inferior",
        partBody: "leftLeg",
        bloodLoss: 100, 
        sistolicPressure: 141,
        diastolicPressure: 89,
        heartRate: 110,
        breathingRate: 26,
        urineOutput: 12,
        saturation: 98,
        mentalStatus: "normal",
        phase: "hospitalaria",
        temperature: 34,
        time: 30,
        rxPelvis:"5"
        
        }
        var datapost7 = {
          trainerId: 1,
          traineeId: this.props.location.state.id,
          roleId: this.props.location.state.roleId,
          sex: 0,
          age: 23,
          weight: 80,
          traumaType: "inferior",
          partBody: "leftLeg",
          bloodLoss: 100, 
          sistolicPressure: 141,
          diastolicPressure: 89,
          heartRate: 110,
          breathingRate: 26,
          urineOutput: 12,
          saturation: 98,
          mentalStatus: "normal",
          phase: "prehospitalaria",
          temperature: 34,
          time: 30,
          rxPelvis:null
          
          }
        var datapost8 = {
          trainerId: 1,
          traineeId: this.props.location.state.id,
          roleId: this.props.location.state.roleId,
          sex: 0,
          age: 24,
          weight: 80,
          traumaType: "inferior",
          partBody: "leftLeg",
          bloodLoss: 100, 
          sistolicPressure: 141,
          diastolicPressure: 89,
          heartRate: 110,
          breathingRate: 26,
          urineOutput: 12,
          saturation: 98,
          mentalStatus: "normal",
          phase: "hospitalaria",
          temperature: 34,
          time: 30,
          rxPelvis:"5"
          
          }
      var exam = []
      exam.push(datapost1)
      exam.push(datapost2)
      exam.push(datapost3)
      exam.push(datapost4)
      exam.push(datapost5)
      exam.push(datapost6)
      exam.push(datapost7)
      exam.push(datapost8)
      exam.forEach(dataPost => {
        // Envio al backend y se genera en la base de datos si todo va bien
        axios.post(baseUrlCreate, dataPost)
          .then(response => {
            if (response.data.success === true) {
              //Una vez se hayan creado las simulaciones, las obtengo para mostrarlas por pantalla
              axios.get(baseGetUrl, request)
                .then(res => {
                  const data = res.data.data;
                  if (data) {
                    this.filterData(data)
                    this.setState({ listSimulation: data });
                  }
                }).catch(error => {
                  alert("Error 34 " + error);
                })
            }
            else {
              alert(response.data.message)
            }
          })
          .catch(error => {
            alert("Error 34 " + error)
          })
      })
    }
  })
}

getSimulations(traineeId){
  let nTrainings = 0
  var check = false
  const url = "http://localhost:8080/inform/getSimulations"
  axios.get("http://localhost:8080/inform/getSimulations", {
      params: {
          traineeId: traineeId
          //añadir edad 
      }
  })
  .then(res => {
      if (res.data.success) {
          const data = res.data.data
          console.log(data)
          if(data > 12){
            check = false
          }
          
          this.setState({ check: check });
          nTrainings = data
          
      }
      else {
      alert("Error web service")
      }
  })
  .catch(error=>{
      alert("Error server "+error)
  })

  return nTrainings

}

checkTrainingCompleted(){
  var request = {
    params: {
      idTrainer: 2,
      idTrainee: this.props.location.state.id
    }
  }

  var check = true
  var check1 
  const baseGetUrl = "http://localhost:8080/simulation/listTraineeAndTrainer/";
  //this.getSimulations(this.props.location.state.id)

        
  axios.get(baseGetUrl,request)
  .then(res => {
    
    const data = res.data.data;

    //si data tiene contenido esq tengo simulaciones ya creadas
    if (data.length>0) {
      data.map(data =>{
        if (data.inform === null){
          check = false
        }
      })
      this.setState({ check: check });
    } else{
      check = false
      this.setState({ check: check });
    }
  })

  axios.get("http://localhost:8080/inform/getSimulations", {
      params: {
          traineeId: this.props.location.state.id
          //añadir edad 
      }
  })
  .then(res => {
      if (res.data.success) {
          const data = res.data.data
          console.log(data)
          if(data >= 12){
            check1 = true
          }
          
          this.setState({ check1: check1 });          
      }
      else {
      alert("Error web service")
      }
  })
  .catch(error=>{
      alert("Error server "+error)
  })
} 

filterData(data){

  data.sort((a,b) => a.age - b.age)
  if(data[0].inform === null || data[1].inform === null ||
     data[2].inform === null || data[3].inform === null){
      data.splice(4,4)
  } else{
    this.checkTrainingCompleted()
    if(this.state.check === true){
      data.splice(0,4)
    }else{
      data.splice(0,8)
    }
      
  }
  console.log(this.state.check)
  
}
  componentDidMount(){
    if (this.state.isTrainer) {
      axios.get("http://localhost:8080/simulation/listTrainer/"+this.props.location.state.id)
      .then(res => {
        const data = res.data.data;
        if (this.props.location.state.trainerList) {
          this.setState({ listSimulation:data });
        }else {
          this.filterData(data)
          this.setState({ listSimulation:data });
        }
        
      })
      .catch(error => {
        alert(error)
      })
    } else {
      if (this.props.location.state.trainerList) {
        this.handleRandomCreate();
      }else {
        this.createCases();
      }
    }
    var train = this.state.isTrainer? "trainer": "trainee";
  
    var i = this.props.location.state.id;
    window.onbeforeunload  = function(e) {
        axios.get("http://localhost:8080/"+train+"/logout/"+ i)
              .then(res => {
               if(res.data.success){
                removeUserSession();
              }
              
              })
              .catch(error=>{
                alert("Error server "+error)
              })

        
        e.returnValue = "message to user";
        setTimeout(function () { setTimeout(CancelSelected, 1000); }, 100);
        
    
    
    function CancelSelected() {
        
        axios.get("http://localhost:8080/"+train+"/log/"+ i)
        .then(res => {
         if(res.data.success){
          getToken();
          setUserSession();
          
          
        }
        
        })
        .catch(error=>{
          alert("Error server "+error)
        })

    }
  }
  
  
}

  deleteSimulations(id){
    const baseUrl = "http://localhost:8080/simulation/deleteSimulations"    // parameter data post
    // network
    var ok = false
    axios.post(baseUrl,{
      id: id
    })
    .then(response =>{
      if (response.data.success) {
        ok = true
      }
    })
    .catch ( error => {
      alert("Error 325 " + error)
    })

    return ok
  }
  alert(type, msg) {
    return(
        <Alert color={type} isOpen={this.state.alert} toggle={() => this.setState({alert:false, redirect:true, refresh:true})}>
            {msg}
        </Alert>
    );
}

getPartBody(partBody){ //ESTO ES PARA SOLUCIONAR EL ERROR DEL MENSAJE 
  var returnValue;

  switch(partBody){
      case 'pelvis':
          returnValue = 'new-simulation.pelvis'
          break;
      case 'rightArm':
          returnValue = 'new-simulation.right-a'
          break;
      case 'leftArm':
          returnValue = 'new-simulation.left-a'
          break;
      case 'rightLeg':
          returnValue = 'new-simulation.right-l'
          break;

      case 'bothLeg':
            returnValue = 'new-simulation.both-l'
            break;
      case 'leftLeg':
        returnValue = 'new-simulation.left-l'
        break;

      default:
          returnValue = 'new-simulation.left-l'
          break;
      
  }
  return returnValue; 

}






  render(){
    const { t } = this.props
  
    return (
      
      <div>
        <Link type="button"  to="/" onClick={() => this.handleLogout()}>Logout</Link><br/>
        
        {this.state.alert ? this.alert("success","El caso clínico ha sido eliminado.") : null}
        {(this.state.check || this.state.check1) ?
        <table className="table table-hover table-striped">
          <thead className="thead-dark">
            <tr>
              <th scope="col"></th>
              {this.state.isTrainer
              ? <th scope="col">{t('list-simulation.trainee')}</th>
              : <th scope="col">Fase</th>}
              
              <th scope="col">{t('list-simulation.sex')}</th>

              <th scope="col">{t('list-simulation.age')}</th>
              <th scope="col">Tipo de Traumatismo</th>
              <th scope="col">{t('list-simulation.trauma')}</th>
              <th scope="col">{t('list-simulation.time')}</th>
              
              <th scope="col">Evaluación</th>
              <th scope="col">{t('list-simulation.action')}</th>
              
              
            </tr>
          </thead>
          <tbody>
            {this.loadFillData()}
          </tbody>
        </table>
        :
        <div> 
          <table className="table table-hover table-striped">
            <thead className="thead-dark">
              <tr>
                <th scope="col"></th>
                {this.state.isTrainer
                ? <th scope="col">{t('list-simulation.trainee')}</th>
                : <th scope="col">Fase</th>}
                
                <th scope="col">{t('list-simulation.sex')}</th>

                <th scope="col">{t('list-simulation.age')}</th>
                <th scope="col">Tipo de Traumatismo</th>
                <th scope="col">{t('list-simulation.trauma')}</th>
                <th scope="col">{t('list-simulation.time')}</th>
                <th scope="col">{t('list-simulation.action')}</th>
              </tr>
            </thead>
            <tbody>
            </tbody>
          </table>
          <div className="messageTraining">
          Debes terminar los entrenamientos antes de continuar con los exámenes.
          </div> 
        </div>}
        {((this.state.redirect && !this.state.alert) ||finish) ? <Redirect to={{
                                                        pathname: '/listSimulation',
                                                        state: { id: this.state.id,
                                                                  isTrainer: this.state.isTrainer,
                                                                  simulationId:0,
                                                                  trainerId:0,
                                                                  partBody:"",
                                                                  phase:"" }
                                                    }}/>
                                    : null}
      </div>
  );

  }


  loadFillData() {
    const { t } = this.props
    
    if (this.state.listSimulation) {
      
    return this.state.listSimulation.map((data)=>{
      return(
        <tr key="ha">
          <th></th>
          {this.state.isTrainer
          ? <td>{data.trainee.name} {data.trainee.surname}</td>
          :data.phase==="prehospitalaria"?

          <td>Pre Hospitalaria </td>: <td>Hospitalaria</td>}
          
          <th>{(data.sex === 0) ? t('new-simulation.male') : t('new-simulation.female')}</th>
          <td>{data.age}</td>
          <td>{(data.traumaType === "inferior") ? t('new-simulation.inferior') : t('new-simulation.pelvico')}</td>
          <td>{t(this.getPartBody(data.partBody))}</td>
          <td>{data.time}</td>
          {
            console.log(data.simulationId)
          }
          <td>
            
            {data.listo?
          <Link className="btn btn-outline-info " 
                    to={{
                        pathname: "/evaluar/"+data.simulationId,
                        state: { simulationId: data.simulationId,
                          traineeId:data.traineeId,
                          name:data.trainee.name,
                          surname:data.trainee.surname},
                        
                    }} > Evaluar </Link>: <p>Pendiente</p>}

         
           
          </td>
          <td>
            {(data.listo)  ?
                this.props.location.state.trainerList ===true?
                    <Link className="btn btn-outline-info " 
                    to={{
                        pathname: "/simulation/"+data.simulationId,
                        state: { id: this.props.location.state.id,
                          trainerList:this.props.location.state.trainerList},
                        
                    }} > Volver a Entrar
                    </Link> :
                    <p>Entrar</p>
             
             :
             
          this.state.isTrainer 
            ? 
                <Link className="btn btn-outline-danger" to={"/listSimulation/"} onClick={()=>this.sendDelete(data.simulationId)}> {t('list-simulation.delete')} </Link>
             
            : <Link className="btn btn-outline-info " 
            to={{
                pathname: "/simulation/"+data.simulationId,
                state: { id: this.props.location.state.id,
                  trainerList:this.props.location.state.trainerList},
                
            }} >{t('list-simulation.enter')}
            </Link>}
          </td>

          
        </tr>
      )
    });
  }
 
}
  sendDelete(simulationId)
  {
    // url de backend
    const baseUrl = "http://localhost:8080/simulation/delete"    // parameter data post
    // network
    
    axios.post(baseUrl,{
      id: simulationId
    })
    .then(response =>{
      if (response.data.success) {
        this.setState({ alert: true});
      }
    })
    .catch ( error => {
      alert("Error 325 " + error)
    })
  }

  rellenar(simulationId,traineeId){
     axios.get("http://localhost:8080/trainee/results/"+simulationId+"/"+traineeId)
    .then(res =>{
      this.setState({matches: res.data.data[0].matches, swap: res.data.data[0].swap, contr: res.data.data[0].contr, gasp: res.data.data[0].gasp, mismatches: res.data.data[0].mismatches,GA:res.data.data[0].GA, Diag: res.data.data[0].Diag, Subseq: res.data.data[0].Subseq, Precision:res.data.data[0].Preci,Recall: res.data.data[0].Recall,Specificity:res.data.data[0].Specificity,Accuracy:res.data.data[0].Accuracy,F1:res.data.data[0].F1,Nota:res.data.data[0].Nota
      });      
    })
      .catch(error=>{
        alert("Error server "+error)
      })
      this.redireccion(simulationId);
    }
  
  
    redireccion(simulationId){
      

      
        /* return (<Navigate to={{
        pathname: '/evaluation/'+simulationId,
        state: {
        matches: this.state.matches,
        swap:this.state.swap,
        contr: this.state.contr,
        gasp: this.state.gasp,
        mismatches:this.state.mismatches,
        GA:this.state.GA,
        Diag:this.state.Diag,
        Subseq:this.state.Subseq,
        Precision:this.state.Precision,
        Recall:this.state.Recall,
        Specificity:this.state.Specificity,
        Accuracy:this.state.Accuracy,
        F1:this.state.F1,
        Nota:this.state.Nota}
       }
    } />);
     navigate('/evaluation'+simulationId,{
      matches: this.state.matches,
        swap:this.state.swap,
        contr: this.state.contr,
        gasp: this.state.gasp,
        mismatches:this.state.mismatches,
        GA:this.state.GA,
        Diag:this.state.Diag,
        Subseq:this.state.Subseq,
        Precision:this.state.Precision,
        Recall:this.state.Recall,
        Specificity:this.state.Specificity,
        Accuracy:this.state.Accuracy,
        F1:this.state.F1,
        Nota:this.state.Nota
    });*/

    }
}
export default withTranslation()(SimulationList);