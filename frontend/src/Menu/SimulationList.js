import React from 'react';
import axios from 'axios';
import { withTranslation } from 'react-i18next';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import Inform from '../Information/Document'
import { Link } from "react-router-dom";
import { Redirect } from "react-router-dom"
import { Alert } from 'reactstrap';
//import { each } from 'jquery';
var finish = false

class SimulationList extends React.Component  {
  constructor(props){
    super(props);
    this.state = {
      listSimulation:[],
      isTrainer: this.props.location.state.isTrainer,
      alert: false,
      redirect: false,
      id: this.props.location.state.id,
      refresh: false    }
  }
  
 //crea las simulaciones de prueba
  handleRandomCreate(){
    var arrSimulations = [];

  var request = {
    params: {
      idTrainer: 2,
       idTrainee: this.props.location.state.id
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
            sex: 0,
            age: 33,
            weight: 80,
            partBody: "rightLeg",
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
          sex: 0,
          age: 33,
          weight: 80,
          partBody: "rightLeg",
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
            sex: 0,
            age: 50,
            weight: 90, 
            partBody: "bothLeg", 
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
          sex: 0,
          age: 50,
          weight: 90, 
          partBody: "bothLeg", 
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
            sex: 0,
            age: 82,
            weight: 80,
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
            temperature:34,
            time: 30,
            rxPelvis:"4"
            
            }
          // Caso clínico 4 con fase hospitlaria
            var datapost6 = {
              trainerId: 2,
              traineeId: this.props.location.state.id,
              sex: 0,
              age: 82,
              weight: 80,
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
              rxPelvis:"4"
              
              }
      // Añado cada uno de los datapost creados al array
      arrSimulations.push(datapost1);
      arrSimulations.push(datapost2);
      arrSimulations.push(datapost3);
      arrSimulations.push(datapost4);
      arrSimulations.push(datapost5);
      arrSimulations.push(datapost6);
    
      
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
      idTrainee: this.props.location.state.id
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
        sex: 0,
        age: 21,
        weight: 90, 
        partBody: "rightLeg", 
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
        sex: 0,
        age: 22,
        weight: 90, 
        partBody: "rightLeg", 
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
        sex: 0,
        age: 23,
        weight: 90, 
        partBody: "rightLeg", 
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
        sex: 0,
        age: 24,
        weight: 90, 
        partBody: "rightLeg", 
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
      var exam = []
      exam.push(datapost1)
      exam.push(datapost2)
      exam.push(datapost3)
      exam.push(datapost4)
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

filterData(data){
  data.sort((a,b) => a.rxPelvis - b.rxPelvis)
  if(data[0].inform === null || data[2].inform === null){
    data.splice(1,1)
    data.splice(2,1)
  } else{
    data.splice(0,1)
    data.splice(1,1)
  }
  
}
  componentDidMount(){
    if (this.state.isTrainer) {
      axios.get("http://localhost:8080/simulation/listTrainer/"+this.props.location.state.id)
      .then(res => {
        const data = res.data.data;
        this.setState({ listSimulation:data });
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
        console.log("OK")
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
        {this.state.alert ? this.alert("success","El caso clínico ha sido eliminado.") : null}
        <table className="table table-hover table-striped">
          <thead className="thead-dark">
            <tr>
              <th scope="col"></th>
              {this.state.isTrainer
              ? <th scope="col">{t('list-simulation.trainee')}</th>
              : <th scope="col">Fase</th>}
              
              <th scope="col">{t('list-simulation.sex')}</th>

              <th scope="col">{t('list-simulation.age')}</th>
              <th scope="col">{t('list-simulation.trauma')}</th>
              <th scope="col">{t('list-simulation.time')}</th>
              <th scope="col">Informe</th>
              <th scope="col">{t('list-simulation.action')}</th>
            </tr>
          </thead>
          <tbody>
            {this.loadFillData()}
          </tbody>
        </table>
        {((this.state.redirect && !this.state.alert) ||finish) ? <Redirect to={{
                                                        pathname: '/listSimulation',
                                                        state: { id: this.state.id,
                                                                  isTrainer: this.state.isTrainer }
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
          <td>{t(this.getPartBody(data.partBody))}</td>
          <td>{data.time}</td>
          <td><Inform simulationId = {data.simulationId}
                      surname = {data.trainee.surname}/> 
          </td>
          <td>
            {(data.inform) !== null ?
                this.props.location.state.trainerList ===true?
                    <Link className="btn btn-outline-info " 
                    to={{
                        pathname: "/simulation/"+data.simulationId,
                        state: { id: this.props.location.state.id,
                          trainerList:this.props.location.state.trainerList},
                        
                    }} >Volver a entrar
                    </Link> :
                    <p>Simulación Finalizada</p>
             
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
    const baseUrl = "http://138.100.21.252:5000/simulation/delete"    // parameter data post
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
}
export default withTranslation()(SimulationList);