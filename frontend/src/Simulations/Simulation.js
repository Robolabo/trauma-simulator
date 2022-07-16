/* eslint no-eval: 0 */
import React, { Component } from 'react'
import { Alert } from 'reactstrap';
import { createBrowserHistory } from "history";
import axios from 'axios';
import Nav from '../Menu/Nav';
import { Redirect } from "react-router-dom";
import Timer from '../Simulations/Components/Timer'
import Graphic from '../Simulations/Components/Graphic'
import Actions from '../Simulations/Components/Actions'
import Messages from '../Simulations/Components/Messages'
import Evaluation from '../evaluation/Evaluation'
import { Modal, ModalHeader, Card, CardBody, Button } from 'reactstrap'
import { getToken, removeUserSession, setUserSession } from '../Utils/Common';
import './simulation.css'
import SimulationList from '../Menu/SimulationList';
import jsPDF from 'jspdf'
import Swal from 'sweetalert2'
//import { ContinuousColorLegend } from 'react-vis';

const baseUrl = "http://localhost:8080"

var heartRateValue = 0.5
var newHR = 0
var diastolicPressureValue = -0.
var newDP = 0
var breathingRateValue = 0.5
var newBR = 0
var urineOutputValue = -0.5
var saturationValue = -0.4
var newSO = 0
var sistolicPressureValue = -1.5
var newSP = 0
//var bloodLossValue = 0
//var bloodPressureValue = 0
//var urineOutputValue = 0
var heartRateBlock = false
var diastolicPressureBlock = false
var sistolicPressureBlock = false
var saturationBlock = false
var breathingRateBlock = false
//var bloodLossBlock = false 
//var bloodPressureBlock = false
//var urineOutputBlock = false


var breathConstant = [{x: (0.25), y: 500},{x: (0.5), y: 125},{x: 1, y: 0}]
var heartConstant = [{x: 1/12, y: 0.07}, {x: 1/6, y: 0},
                     {x: 4/15, y: 0}, {x: 0.3, y: -0.14}, {x: 11/30, y: 0.96},
                     {x: 13/30, y: -0.24}, {x: 7/15,y:0}, {x: 37/60, y:0},
                     {x: 0.75, y:0.15}, {x: 0.85, y:0}, {x: 1, y: 0}]
var saturationConstant = [{x: 1/6, y: 1}, {x: 1/3, y: 30}, {x: 13/30, y: 35}, {x: 1, y: 0}]
var dHeart = []
var dSaturation = []
var dBreath = []

var start1 = 0
var start2 = 0
var start3 = 0
var timeH = 0
var timeB = 0
var timeS = 0
var heart= 0
var saturation = 0    
var breath = 0
var spaceH = 0
var spaceS = 0
var space2 = 0
var time = 1
var interval= 1
var lengthH, lengthS = 0
var intervalB = 1
var lengthB = 0
var initialData

var testHeartRate = []
var testBreathRate = []
var testDistolic = []
var testSistolic = []
var testUrine = []
var testSaturation = []
var testData = null

var heartRateFinalTime
var saturationFinalTime
var breathingRateFinalTime
var sistolicPressureFinalTime
var diastolicPressureFinalTime
//var bloodLossFinalTime
//var bloodPressureFinalTime
//var urineOutputFinalTime
var heartRateFinalValue
var saturationFinalValue
var breathingRateFinalValue
var sistolicPressureFinalValue
var diastolicPressureFinalValue
//var bloodLossFinalValue
//var bloodPressureFinalValue
//var urineOutputFinalValue

var heartRateN = 0
var saturationN = 0
var breathingRateN = 0
var sistolicPressureN = 0
var diastolicPressureN = 0
//var bloodLossN = 0
//var bloodPressureN = 0
//var urineOutputN = 0
var heartRateActions = []
var breathingRateActions = []
var diastolicPressureActions  = []
var sistolicPressureActions = []
var saturationActions = []
//var bloodLossActions = []
//var bloodPressureActions = []
//var urineOutputActions = []
var valueTot = 0

var heartRateFactorMultiplicativo = 1
var saturationFactorMultiplicativo = 1
var breathingRateFactorMultiplicativo = 1
var sistolicPressureFactorMultiplicativo = 1
var diastolicPressureFactorMultiplicativo = 1
var actionsType4 = []
var blockAdvance = false
var blockAdvanceN = 0


export default class LoginForm extends Component {
    constructor(props){
      super(props);
      this.information=[]
      this.timeSim=1;
      this.state = {
        sex: 0,
        age: 0,
        weight: 0.0,
        traumaType:"",
        partBody: "",
        sistolicPressure: 0,
        diastolicPressure: 0.0,
        temperature: 0.0,
        bloodLoss: 0.0,
        heartRate: 0.0,
        breathingRate: 0.0,
        urineOutput: 0.0,
        saturation: 0.0,
        mentalStatus: "",
        time: 0,
        timeSim:-1,
        dataHeartRate: [],
        dataSaturation: [],
        dataBreathingRate: [],
        start: false,
        confirm: true,
        alert: null,
        showingAlert:true,
        header:null,
        content: null,
        num:0,
        type:null,
        id: null,
        crono:false,
        timeCrono:0,
        finish:false,
        fordward: true,
        deadModal: false,
        phase: "",
        rxPelvis:"",
        traineeId:"",
        trainerId:"",
        roleId:1,
        matches: "0",
        swap:"0",
        contr: "0",
        gasp: "0",
        mismatches: "0",
        GA:"0",
        Diag:"0",
        Subseq:"0",
        Precision:"0",
        Recall:"0",
        Specificity:"0",
        Accuracy:"0",
        F1:"0",
        Nota:"0",
        dataresults:[]
        
        
      }
      
    }
    
    
    componentDidMount(){

      const { history } = this.props;
      var i = this.props.location.state.id;
      window.onbeforeunload  = function(e) {
          axios.get("http://localhost:8080/trainee/logout/"+ i)
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
          
      }
      
      function CancelSelected() {
          
          axios.get("http://localhost:8080/trainee/log/"+ i)
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
      




    history.listen((newLocation, action) => {
      if (action === "PUSH") {
      } else {
        // Send user back if they try to navigate back
        history.go(1);
        
  
        this.setState({
          finish: true
        })

      }
    });
        let simulationId = this.props.match.params.id;
        const url = baseUrl+"/simulation/get/"+simulationId
        axios.get(url)
        .then(res=>{
            if (res.data.success) {
                const data = res.data.data[0]
                //añadir constantes del caso clínico creado
                this.setState({
                    sex: data.sex,
                    age: data.age,
                    weight: data.weight,
                    traumaType: data.traumaType,
                    partBody: data.partBody,
                    bloodLoss: data.bloodLoss,
                    sistolicPressure: data.sistolicPressure,
                    diastolicPressure: data.diastolicPressure,
                    heartRate: data.heartRate,
                    breathingRate: data.breathingRate,
                    urineOutput: data.urineOutput,
                    saturation: data.saturation,
                    mentalStatus: data.mentalStatus,
                    time: data.time,
                    temperature: data.temperature,
                    phase: data.phase,
                    document: [],
                    rxPelvis: data.rxPelvis,
                    traineeId:data.traineeId,
                    trainerId: data.trainerId,
                    roleId: data.roleId
                })
                initialData = data
            }
            else {
            alert("Error web service")
            }
        })
        .catch(error=>{
            alert("Error server "+error)
        })
    }

    //Esta función empieza cuando se pulsa el botón de start
    start () {

        if ( this.state.confirm) {

          axios.get("http://localhost:8080/trainee/deletes/"+ this.state.traineeId)
          .then(res => {
            if(res.data.success){
            
           }
           })
           .catch(error=>{
             alert("Error server "+error)
           })


            this.setState(( { start }) => ( {
                start: !start,
                confirm: false
            }))
            //Se actualizan las gráficas cada segundo
            this.changeGraphs = setInterval(this.intervalGraphs.bind(this) , 1000)
            //Se actualizan los valores cada segundo
            this.changeConstants = setInterval(this.intervalConstants.bind(this),1000)
        }
    }

    intervalConstants(){
      //Curva de los 30 minutos si no se pulsa ninguna acción
      if (this.state.timeSim <=300 ) {
        heartRateValue = heartRateBlock ? heartRateValue : (2 * heartRateFactorMultiplicativo)
        breathingRateValue = breathingRateBlock ? breathingRateValue : (0.8 * breathingRateFactorMultiplicativo)
        saturationValue = saturationBlock ? saturationValue : (-0.4 * saturationFactorMultiplicativo)
        sistolicPressureValue = sistolicPressureBlock ? sistolicPressureValue : (-1.5 * sistolicPressureFactorMultiplicativo)
        diastolicPressureValue = diastolicPressureBlock ? diastolicPressureValue : (-1.5 * diastolicPressureFactorMultiplicativo)
      }
      if (this.state.timeSim > 300 && this.state.timeSim <=900 ) {
        heartRateValue = heartRateBlock ? heartRateValue : (1.5 * heartRateFactorMultiplicativo)
        breathingRateValue = breathingRateBlock ? breathingRateValue : (1.1 * breathingRateFactorMultiplicativo)
        saturationValue = saturationBlock ? saturationValue : (-0.6 * saturationFactorMultiplicativo)
        sistolicPressureValue = sistolicPressureBlock ? sistolicPressureValue : (-2.3 * sistolicPressureFactorMultiplicativo)
        diastolicPressureValue = diastolicPressureBlock ? diastolicPressureValue : (-1.6 * diastolicPressureFactorMultiplicativo)
      }
      if (this.state.timeSim > 900 && this.state.timeSim <= 1320) {
        heartRateValue = heartRateBlock ? heartRateValue : (-2.0 * heartRateFactorMultiplicativo)
        breathingRateValue = breathingRateBlock ? breathingRateValue : (-3.71 * breathingRateFactorMultiplicativo)
        saturationValue = saturationBlock ? saturationValue : (-0.7 * saturationFactorMultiplicativo)
        sistolicPressureValue = sistolicPressureBlock ? sistolicPressureValue : (-5.0 * sistolicPressureFactorMultiplicativo)
        diastolicPressureValue = diastolicPressureBlock ? diastolicPressureValue : (-1.86 * diastolicPressureFactorMultiplicativo)
      }
      if (this.state.timeSim > 1320) {
        heartRateValue = heartRateBlock ? heartRateValue : (-7.255 * heartRateFactorMultiplicativo)
        breathingRateValue = breathingRateBlock ? breathingRateValue : (-0.75  * breathingRateFactorMultiplicativo)
        saturationValue = saturationBlock ? saturationValue : (-0.5 * saturationFactorMultiplicativo)
        sistolicPressureValue = sistolicPressureBlock ? sistolicPressureValue : (-1.75 * sistolicPressureFactorMultiplicativo)
        diastolicPressureValue = diastolicPressureBlock ? diastolicPressureValue  : (-1.25 * diastolicPressureFactorMultiplicativo)
      }
      // Se obtiene el valor actual de cada constante y se le suma la variación.
        let newHR = this.state.heartRate + (heartRateValue/60)
        let HR = (newHR >= 50 && newHR <= 160) ? newHR : this.state.heartRate
        let newSP = this.state.sistolicPressure + (sistolicPressureValue/60)
        let SP = (newSP >= 60 && newSP <= 190) ? newSP : this.state.sistolicPressure
        let newDP = this.state.diastolicPressure + (diastolicPressureValue/60)
        let DP = (newDP >= 30 && newDP <= 90) ? newDP : this.state.diastolicPressure
        let newBR = this.state.breathingRate + (breathingRateValue/60)
        let BR = (newBR >= 0 && newBR <= 60) ? newBR : this.state.breathingRate
        let UO = this.state.urineOutput + (urineOutputValue/60)
        let newSO = this.state.saturation + (saturationValue/60)
        let SO = (newSO >= 70 && newSO <= 100 ) ? newSO : this.state.saturation
        // Se actualiza el estado con los nuevos valores.
        this.setState({
            heartRate: HR,
            sistolicPressure: SP,
            diastolicPressure: DP ,
            breathingRate: BR,
            urineOutput: UO,
            saturation: SO
        })
    }

    transitionValues(interval){
      switch(interval){
        case 1:
          heartRateValue = 2 * heartRateFactorMultiplicativo
          breathingRateValue = 0.8  * breathingRateFactorMultiplicativo
          saturationValue = -0.4 * saturationFactorMultiplicativo
          sistolicPressureValue = -1.5 * sistolicPressureFactorMultiplicativo
          diastolicPressureValue = -1.5 * diastolicPressureFactorMultiplicativo
          break;
        case 2:
          heartRateValue = 1.5 * heartRateFactorMultiplicativo
          diastolicPressureValue = -1.6 * diastolicPressureFactorMultiplicativo
          breathingRateValue = 1.1  * breathingRateFactorMultiplicativo
          saturationValue = -0.6 * saturationFactorMultiplicativo
          sistolicPressureValue = -2.3 * sistolicPressureFactorMultiplicativo
          break;
        case 3:
          heartRateValue = -2 * heartRateFactorMultiplicativo
          diastolicPressureValue = -1.86 * diastolicPressureFactorMultiplicativo
          breathingRateValue = -3.71  * breathingRateFactorMultiplicativo
          saturationValue = -0.7 * saturationFactorMultiplicativo
          sistolicPressureValue = -5 * sistolicPressureFactorMultiplicativo
          break;
        case 4:
          heartRateValue= -7.225 * heartRateFactorMultiplicativo
          diastolicPressureValue = -1.25 * diastolicPressureFactorMultiplicativo
          breathingRateValue = -0.75  * breathingRateFactorMultiplicativo
          saturationValue = -0.5 * saturationFactorMultiplicativo
          sistolicPressureValue = -1.75 * sistolicPressureFactorMultiplicativo
          break;
        default:
          break;
      }
    }

    addConstants(time, constants){
      newHR += (heartRateValue/60)*time
      newBR += (breathingRateValue/60)*time
      newSO += (saturationValue/60)*time
      newSP += (sistolicPressureValue/60)*time
      newDP += (diastolicPressureValue/60)*time
      constants.forEach(element => this.addConstant(element, -time))
    }

    addConstant(constant, time){
      switch(constant){
        case("breathingRate"):
          newBR += (breathingRateValue/60)*time
          break;
        case("heartRate"):
          newHR += (heartRateValue/60)*time
          break;
        case("saturation"):
          newSO += (saturationValue/60)*time
          break;
        case("diastolicPressure"):
          newDP += (diastolicPressureValue/60)*time
          break;
        case("sistolicPressure"):
          newSP += (sistolicPressureValue/60)*time
          break;
        default:
          break;
      }  
    }

    normalTransition(constant, currentTime, finalTime){
      if(currentTime >= 0 && currentTime < 300){
          
        if( finalTime >= 0 && finalTime < 300){
          this.transitionValues(1)
          this.addConstant(constant,finalTime-currentTime) 
        }
        else if( finalTime >= 300 && finalTime < 900){
          this.transitionValues(1)
          this.addConstant(constant,300-currentTime)
          this.transitionValues(2)
          this.addConstant(constant,finalTime-300)
        }else if( finalTime >= 900 && finalTime < 1320){
          this.transitionValues(1)
          this.addConstant(constant,300-currentTime)
          this.transitionValues(2)
          this.addConstant(constant, 600)
          this.transitionValues(3)
          this.addConstant(constant,finalTime-900)
        }else if( finalTime >= 1320 && finalTime < 1800){
          this.transitionValues(1)
          this.addConstant(constant,300-currentTime)
          this.transitionValues(2)
          this.addConstant(constant,600)
          this.transitionValues(3)
          this.addConstant(constant,420)
          this.transitionValues(4)
          this.addConstant(constant,finalTime-1320)
        }
      }

      else if(currentTime >= 300 && currentTime < 900){
        if( finalTime >= 300 && finalTime < 900){
          this.transitionValues(2)
          this.addConstant(constant,finalTime-currentTime)
        }else if( finalTime >= 900 && finalTime < 1320){
          this.transitionValues(2)
          this.addConstant(constant,900-currentTime)
          this.transitionValues(3)
          this.addConstant(constant,finalTime-900)
        }else if( finalTime >= 1320 && finalTime < 1800){
          this.transitionValues(2)
          this.addConstant(constant,900-currentTime)
          this.transitionValues(3)
          this.addConstant(constant,420)
          this.transitionValues(4)
          this.addConstant(constant,finalTime-1320)
        }
      }

      else if(currentTime >= 900 && currentTime < 1320){
        if( finalTime >= 900 && finalTime < 1320){
          this.transitionValues(3)
          this.addConstant(constant,finalTime-currentTime)
        }else if( finalTime >= 1320 && finalTime < 1800){
          this.transitionValues(3)
          this.addConstant(constant,1320-currentTime)
          this.transitionValues(4)
          this.addConstant(constant,finalTime-1320)
        }
      }

      else if(currentTime >= 1320 && currentTime < 1800){
        this.transitionValues(4)
        this.addConstant(constant,finalTime-currentTime)
      }
    }

    //Este intervalo sirve para generar las gráficas
    intervalGraphs() {
        this.setState({
            crono: false,
            timeCrono:0
        })

        var period = 60/this.state.heartRate
        var breathT = 60/this.state.breathingRate
        lengthH = this.state.dataHeartRate.length
        lengthS = this.state.dataSaturation.length
        lengthB = this.state.dataBreathingRate.length

        while( timeH < time && (timeS < time || timeS === time)) {
          //heartRate y saturation

          for (var i = start1; (i < 11 && timeH < time); i++){
            dHeart.push({x:timeH, y:heart})
            timeH = ((heartConstant[i].x * period) + (spaceH))
            heart = heartConstant[i].y
            spaceH = (i === 10) ? timeH : spaceH
            start1 = (i === 10 ? 0 : i + 1)
          }

          for (var h = start3; (h < 4 &&  timeS < time); h++){

              dSaturation.push({x:timeS, y:saturation})
              timeS = ((saturationConstant[h].x * period) + (spaceS))

              if (h === 0){
                  saturation = this.state.saturation
              } else {
                  saturation = saturationConstant[h].y
              }

              spaceS = (h === 3) ? timeS : spaceS
              start3 = (h === 3 ? 0 : h + 1)
          }

          //breathRate
          for (var j = start2; j < 3 && timeB < time; j++){
            dBreath.push({x:timeB, y:breath})

            timeB = ((breathConstant[j].x * breathT) + (space2))
            breath = breathConstant[j].y

            space2 = (j === 2) ? timeB : space2
            start2 = (j === 2 ? 0 : j+1)
          }
        }
        time += 1
        
        //Eliminar datos
        interval +=1
        intervalB +=1

        switch(interval){

        case 1:
            var acumH1 = dHeart.length - lengthH
            var acumS1 = dSaturation.length - lengthS
            if(time > 6){
            this.state.dataHeartRate.splice(0,acumH1)
            this.state.dataSaturation.splice(0,acumS1)
            }
            break;
        case 2:
            var acumH2 = dHeart.length - lengthH
            var acumS2 = dSaturation.length - lengthS
            if(time > 6){
            this.state.dataHeartRate.splice(0,acumH2)
            this.state.dataSaturation.splice(0,acumS2)
            }
            break;
        case 3:
            var acumH3 = dHeart.length - lengthH
            var acumS3 = dSaturation.length - lengthS
            if(time > 6){
            this.state.dataHeartRate.splice(0,acumH3)
            this.state.dataSaturation.splice(0,acumS3)
            }
            break;
        case 4:
            var acumH4 = dHeart.length - lengthH
            var acumS4 = dSaturation.length - lengthS
            if(time > 6){
            this.state.dataHeartRate.splice(0,acumH4)
            this.state.dataSaturation.splice(0,acumS4)
            }
            break;
        case 5:
            var acumH5 = dHeart.length - lengthH
            var acumS5 = dSaturation.length - lengthS
            if(time > 6){
            this.state.dataHeartRate.splice(0,acumH5)
            this.state.dataSaturation.splice(0,acumS5)
            }
            interval = 0
            break;

        default:
            break;
        }

        switch(intervalB){

        case 1:
            var acumB1 = dBreath.length - lengthB
            if(time > 11){
            this.state.dataBreathingRate.splice(0,acumB1)
            }
            break;

        case 2:
            var acumB2 = dBreath.length - lengthB
            if(time > 11){
            this.state.dataBreathingRate.splice(0,acumB2)
            }
            break;

        case 3:
            var acumB3 = dBreath.length - lengthB
            if(time > 11){
            this.state.dataBreathingRate.splice(0,acumB3)
            }
            break;

        case 4:
            var acumB4 = dBreath.length - lengthB
            if(time > 11){
            this.state.dataBreathingRate.splice(0,acumB4)
            }
            break;

        case 5:
            var acumB5 = dBreath.length - lengthB
            if(time > 11){
            this.state.dataBreathingRate.splice(0,acumB5)
            }
            break;

        case 6:
            var acumB6 = dBreath.length - lengthB
            if(time > 11){
            this.state.dataBreathingRate.splice(0,acumB6)
            }
            break;

        case 7:
            var acumB7 = dBreath.length - lengthB
            if(time > 11){
            this.state.dataBreathingRate.splice(0,acumB7)
            }
            break;

        case 8:
            var acumB8 = dBreath.length - lengthB
            if(time > 11){
            this.state.dataBreathingRate.splice(0,acumB8)
            }
            break;

        case 9:
            var acumB9 = dBreath.length - lengthB
            if(time > 11){
            this.state.dataBreathingRate.splice(0,acumB9)
            }
            break;

        case 10:
            var acumB10 = dBreath.length - lengthB
            if(time > 11){
            this.state.dataBreathingRate.splice(0,acumB10)
            }
            intervalB = 0
            break;

        default:
            break;
        }

        this.setState({
            dataHeartRate: dHeart,
            dataSaturation: dSaturation,
            dataBreathingRate: dBreath
        })

        this.setState(( { timeSim }) => ( {
          timeSim: timeSim + 1
        }))

    }

   //Función que se utiliza cuando se adelanta el cronómetro
    toogleCrono(time){
      if (this.state.start){
        this.setState({
            crono: true,
            timeCrono:time
        })
        clearInterval(this.changeGraphs)

        newHR = this.state.heartRate
        newSP = this.state.sistolicPressure
        newDP = this.state.diastolicPressure
        newBR = this.state.breathingRate
        newSO = this.state.saturation
        
        let currentTime = this.state.timeSim
        let finalTime = currentTime + (time * 60)
        let constants = []
        let br = { 'parameter': 'breathingRate' , 'block' : breathingRateBlock,
                   'finalTime': breathingRateFinalTime, 'finalValue': breathingRateFinalValue};
        let dp = { 'parameter': 'diastolicPressure' , 'block' : diastolicPressureBlock,
                   'finalTime': diastolicPressureFinalTime, 'finalValue': diastolicPressureFinalValue};
        let sp = { 'parameter': 'sistolicPressure' , 'block' : sistolicPressureBlock,
                   'finalTime': sistolicPressureFinalTime, 'finalValue': sistolicPressureFinalValue};
        let so = { 'parameter': 'saturation' , 'block' : saturationBlock,
                   'finalTime': saturationFinalTime, 'finalValue': saturationFinalValue};
        let hr = { 'parameter': 'heartRate' , 'block' : heartRateBlock,
                   'finalTime': heartRateFinalTime, 'finalValue': heartRateFinalValue};
        let blocks = [br, dp, sp, so, hr]
        let breathingRateV = null
        let heartRateV = null
        let sistolicPressureV = null
        let diastolicPressureV = null
        let saturationV = null

        blocks.forEach(element => {
          if(element.block){
            clearTimeout(eval("this."+element.constant+"Timer"))
            if (eval(element.parameter+"N === 0")){
              if(finalTime <= element.finalTime){
                this.addConstant(element.parameter, finalTime - currentTime)
                eval("this."+element.parameter+"Timer = setTimeout(this.unBlockChangeValue.bind(this, element.parameter, element.finalValue) , ((element.finalTime - finalTime) * 1000))")
                eval(element.parameter+"V = "+element.parameter+"Value")
              }else{
                this.addConstant(element.parameter, element.finalTime - currentTime)
                this.unBlockChangeValue.bind(this,element.parameter, element.finalValue)
                this.normalTransition(element.parameter, element.finalTime, finalTime)
              }
              constants.push(element.parameter)
            } else {
              clearTimeout(eval("this."+element.parameter+"Timer"))
              var nTimes = 0
              var timeAction = currentTime
              valueTot = 0
              for(var i = 0; i<(eval(element.parameter+"Actions.length")); i++){
                if(eval(element.parameter+"Actions[i].finalTime") < finalTime){
                  //element.parameter = eval(element.parameter+"Actions[i].value")
                  if(eval(element.parameter+"Actions[i].value") === 0){ 
                    valueTot = 1
                    this.addConstant(element.parameter, (eval(element.parameter+"Actions[i].finalTime - "+timeAction)))
                    eval(element.parameter+"Actions[i].duration = 1800")
                    eval(element.parameter+"Actions[i].finalTime = 1800")
                    this.addConstant(element.parameter,  finalTime - currentTime)
                    eval(element.parameter+"Actions[i].value ="+element.parameter+"Actions[i].finalValue")
                    if(i<(eval(element.parameter+"Actions.length +1"))){
                      for(i = i+1 ; i<(eval(element.parameter+"Actions.length")); i++){
                        if (eval(element.parameter+"Actions[i].value") === 0) {
                          eval(element.parameter+"Actions.splice(i,1);")
                          eval(element.parameter+"N -= 1")
                        }
                        else if(eval(element.parameter+"Actions[i].finalValue") === 0){
                          eval(element.parameter+"Actions.splice(i,1);")
                          eval(element.parameter+"N -= 1")
                        }
                        else if (eval(element.parameter+"Actions[i].finalValue === -1")){
                          eval(element.parameter+"Actions.splice(i,1);")
                          eval(element.parameter+"N -= 1")
                        }
                      }
                    }
                    else if(i!==0){
                      for(i = i-1 ; i<(eval(element.parameter+"Actions.length")); i++){
                        eval(element.parameter+"Actions.splice(i,1);")
                          eval(element.parameter+"N -= 1")
                      }
                    }
                    break;
                  }
                  else if (eval(element.parameter+"Actions[i].finalValue") === 0) {
                    valueTot = 2
                    this.addConstant(element.parameter, (eval(element.parameter+"Actions[i].finalTime - "+timeAction)))
                    eval(element.parameter+"Actions[i].duration = 1800")
                    eval(element.parameter+"Actions[i].finalTime = 1800")
                    eval(element.parameter+"Actions[i].value = 0")
                    if(i<(eval(element.parameter+"Actions.length +1"))){
                      for(i = i+1 ; i<(eval(element.parameter+"Actions.length")); i++){
                        if(eval(element.parameter+"Actions[i].finalValue") === 0){
                          eval(element.parameter+"Actions.splice(i,1);")
                          eval(element.parameter+"N -= 1")
                        }
                        else if (eval(element.parameter+"Actions[i].finalValue === -1")){
                          eval(element.parameter+"Actions.splice(i,1);")
                          eval(element.parameter+"N -= 1")
                        }
                      }
                    }
                    else if(i!==0){
                      for(i = i-1 ; i<(eval(element.parameter+"Actions.length")); i++){
                        eval(element.parameter+"Actions.splice(i,1);")
                          eval(element.parameter+"N -= 1")
                      }
                    }
                    break;
                  }
                  else if (eval(element.parameter+"Actions[i].finalValue === -1")){
                    this.addConstant(element.parameter, (eval(element.parameter+"Actions[i].finalTime - "+timeAction)))
                    eval(element.parameter+"N -= 1")
                    if(eval(element.parameter+"N === 0")){ 
                      this.unBlockChangeValue.bind(this,element.parameter, element.finalValue)
                      eval(element.parameter+"N += 1")
                      eval(element.parameter+"Block = false")
                      this.normalTransition(element.parameter, eval(element.parameter+"Actions[i].finalTime"), finalTime)
                      eval(element.parameter+"Actions.splice(0, "+element.parameter+"Actions.length)")
                    }
                    else{
                      eval(element.parameter+"Value -= "+element.parameter+"Actions[0].value")
                      timeAction = eval(element.parameter+"Actions[0].finalTime")
                      eval(element.parameter+"Actions.splice(0,1);")
                      i -= 1 // al eliminar una acción, se mueve el array y hay que volver a recorrer esa posición
                      eval(element.parameter+"Actions.sort((a, b) => a.finalTime - b.finalTime);")
                    }
                  }
                } else {
                  if (actionsType4.length > 0 && eval(element.parameter+"Actions[i].duration") === "ventilacionBolsa"){
                    this.addConstant(element.parameter, time*60)
                    eval(element.parameter+"V = "+element.parameter+"Value")
                    break;
                  }
                  else if (eval(element.parameter+"Actions[i].value") === 0){ 
                    valueTot = 1
                    this.addConstant(element.parameter, (eval(element.parameter+"Actions[i].finalTime - "+timeAction)))
                    if(i<(eval(element.parameter+"Actions.length +1"))){
                      for(i = i+1 ; i<(eval(element.parameter+"Actions.length")); i++){
                        if (eval(element.parameter+"Actions[i].value") === 0) {
                          eval(element.parameter+"Actions.splice(i,1);")
                          eval(element.parameter+"N -= 1")
                        }
                        else if(eval(element.parameter+"Actions[i].finalValue") === 0){
                          eval(element.parameter+"Actions.splice(i,1);")
                          eval(element.parameter+"N -= 1")
                        }
                        else if (eval(element.parameter+"Actions[i].finalValue === -1")){
                          eval(element.parameter+"Actions.splice(i,1);")
                          eval(element.parameter+"N -= 1")
                        }
                      }
                    }
                    else if(i!==0){
                      for(i = i-1 ; i<(eval(element.parameter+"Actions.length")); i++){
                        eval(element.parameter+"Actions.splice(i,1);")
                          eval(element.parameter+"N -= 1")
                      }
                    }
                      eval("this."+element.parameter+"Timer = setTimeout(this.unBlockChangeValue.bind(this, element.parameter, "+element.parameter+"Actions[0].finalValue) , ((("+element.parameter+"Actions[0].finalTime) - finalTime) * 1000))") 
                    
                    break;
                  }
                  else if (eval(element.parameter+"Actions[i].finalValue") === 0) {
                    valueTot = 2
                    this.addConstant(element.parameter,  finalTime - currentTime)
                    if(i<(eval(element.parameter+"Actions.length + 1"))){
                      for(i = i+1 ; i<(eval(element.parameter+"Actions.length")); i++){
                        if(eval(element.parameter+"Actions[i].finalValue") === 0){
                          eval(element.parameter+"Actions.splice(i,1);")
                          eval(element.parameter+"N -= 1")
                        }
                        else if (eval(element.parameter+"Actions[i].finalValue === -1")){
                          eval(element.parameter+"Actions.splice(i,1);")
                          eval(element.parameter+"N -= 1")
                        }
                      }
                    }
                    else if(i!==0){
                      for(i = i-1 ; i<(eval(element.parameter+"Actions.length")); i++){
                        eval(element.parameter+"Actions.splice(i,1);")
                          eval(element.parameter+"N -= 1")
                      }
                    eval("this."+element.parameter+"Timer = setTimeout(this.unBlockChangeValue.bind(this, element.parameter, "+element.parameter+"Actions[i].finalValue) , ((("+element.parameter+"Actions[i].finalTime) - finalTime) * 1000))") 
                  }
                  else if (eval(element.parameter+"Actions[i].finalValue === -1")){
                    if (eval(element.parameter+"Actions[i].finalValue") !== 0 && eval(element.parameter+"Actions[i].finalValue") !== -1 && eval(element.parameter+"Actions[i].value")!== 0) {
                      this.normalTransition(element.parameter,timeAction , finalTime)
                      break;
                    }
                    this.addConstant(element.parameter,  finalTime - currentTime)
                    
                    if(nTimes === 0 && eval(element.parameter+"Actions.length")){eval("this."+element.parameter+"Timer = setTimeout(this.unBlockChangeValue.bind(this, element.parameter, "+element.parameter+"Actions[i].finalValue) , ((("+element.parameter+"Actions[i].finalTime) - finalTime) * 1000))")}
                    nTimes += 1
                  }
                }
              }
              if( valueTot === 1){
                valueTot = eval(element.parameter+"Actions[i].value")
              }
              else if(valueTot === 2){ 
                valueTot = eval(element.parameter+"Actions[i].value") }
              else{
                for(let i = 0; i<(eval(element.parameter+"Actions.length")); i++){
                    valueTot += eval(element.parameter+"Actions[i].value")
                  }
              }
              eval(element.parameter+"Value = valueTot")
              if(eval(element.parameter+"N !== 0") && eval(element.parameter+"Actions.length") > 0){eval(element.parameter+"V = "+element.parameter+"Value")}
              eval(element.parameter+"Actions.sort((a, b) => a.finalTime - b.finalTime);")
              if(nTimes === 0 && eval(element.parameter+"Actions.length") >0){eval("this."+element.parameter+"Timer = setTimeout(this.unBlockChangeValue.bind(this, element.parameter, "+element.parameter+"Actions[0].finalValue) , ((("+element.parameter+"Actions[0].finalTime) - finalTime) * 1000))")}
              constants.push(element.parameter)
            }
          }
          }
        });

        if(currentTime >= 0 && currentTime < 300){
          
          if( finalTime >= 0 && finalTime < 300){
            this.transitionValues(1)
            this.addConstants(finalTime-currentTime, constants) 
          }
          else if( finalTime >= 300 && finalTime < 900){
            this.transitionValues(1)
            this.addConstants(300-currentTime,constants)
            this.transitionValues(2)
            this.addConstants(finalTime-300,constants)
          }else if( finalTime >= 900 && finalTime < 1320){
            this.transitionValues(1)
            this.addConstants(300-currentTime,constants)
            this.transitionValues(2)
            this.addConstants(600,constants)
            this.transitionValues(3)
            this.addConstants(finalTime-900,constants)
          }else if( finalTime >= 1320 && finalTime < 1800){
            this.transitionValues(1)
            this.addConstants(300-currentTime,constants)
            this.transitionValues(2)
            this.addConstants(600,constants)
            this.transitionValues(3)
            this.addConstants(420,constants)
            this.transitionValues(4)
            this.addConstants(finalTime-1320,constants)
          }
        }

        else if(currentTime >= 300 && currentTime < 900){
          if( finalTime >= 300 && finalTime < 900){
            this.transitionValues(2)
            this.addConstants(finalTime-currentTime,constants)
          }else if( finalTime >= 900 && finalTime < 1320){
            this.transitionValues(2)
            this.addConstants(900-currentTime,constants)
            this.transitionValues(3)
            this.addConstants(finalTime-900,constants)
          }else if( finalTime >= 1320 && finalTime < 1800){
            this.transitionValues(2)
            this.addConstants(900-currentTime,constants)
            this.transitionValues(3)
            this.addConstants(420,constants)
            this.transitionValues(4)
            this.addConstants(finalTime-1320,constants)
          }
        }

        else if(currentTime >= 900 && currentTime < 1320){
          if( finalTime >= 900 && finalTime < 1320){
            this.transitionValues(3)
            this.addConstants(finalTime-currentTime,constants)
          }else if( finalTime >= 1320 && finalTime < 1800){
            this.transitionValues(3)
            this.addConstants(1320-currentTime,constants)
            this.transitionValues(4)
            this.addConstants(finalTime-1320,constants)
          }
        }

        else if(currentTime >= 1320 && currentTime < 1800){
          this.transitionValues(4)
          this.addConstants(finalTime-currentTime,constants)
        }

        

        //Esto se dispara cuando el paciente se muere.
        if( newHR === 160 && newSP === 60 && newDP === 30 && newBR === 60 && newSO === 75 ){
              breathConstant = [{x: (0.25), y: 0},{x: (0.5), y: 0},{x: 1, y: 0}]
              heartConstant = [{x: 1/12, y: 0}, {x: 1/6, y: 0},
                  {x: 4/15, y: 0}, {x: 0.3, y: 0}, {x: 11/30, y: 0},
                  {x: 13/30, y: 0}, {x: 7/15,y:0}, {x: 37/60, y:0},
                  {x: 0.75, y:0}, {x: 0.85, y:0}, {x: 1, y: 0}]
              saturationConstant = [{x: 1/6, y: 0}, {x: 1/3, y: 0}, {x: 13/30, y: 0}, {x: 1, y: 0}]
              this.setState({
                  deadModal:true,
                  saturation: 0,
                  sistolicPressure: 0,
                  breathingRate: 0,
                  heartRate:0,
                  diastolicPressure:0

              })
            }
        if( newHR <= 63 && newSP <= 61 && newDP <= 42 && newSO <= 81){
            breathConstant = [{x: (0.25), y: 0},{x: (0.5), y: 0},{x: 1, y: 0}]
            heartConstant = [{x: 1/12, y: 0}, {x: 1/6, y: 0},
                {x: 4/15, y: 0}, {x: 0.3, y: 0}, {x: 11/30, y: 0},
                {x: 13/30, y: 0}, {x: 7/15,y:0}, {x: 37/60, y:0},
                {x: 0.75, y:0}, {x: 0.85, y:0}, {x: 1, y: 0}]
            saturationConstant = [{x: 1/6, y: 0}, {x: 1/3, y: 0}, {x: 13/30, y: 0}, {x: 1, y: 0}]
            this.setState({
                deadModal:true,
                saturation: 0,
                sistolicPressure: 0,
                breathingRate: 0,
                heartRate:0,
                diastolicPressure:0

            })
        }
        breathingRateValue = (breathingRateV !== null) ? breathingRateV : breathingRateValue
        heartRateValue = (heartRateV !== null) ? heartRateV : heartRateValue
        saturationValue = (saturationV !== null) ? saturationV : saturationValue
        sistolicPressureValue = (sistolicPressureV !== null) ? sistolicPressureV : sistolicPressureValue
        diastolicPressureValue = (diastolicPressureV !== null) ? diastolicPressureV : diastolicPressureValue
        
        let HR = (newHR <= 160) ? newHR : 160
        let SP = (newSP <= 190) ? newSP : 190
        let DP = (newDP <= 90) ? newDP : 90
        let BR = (newBR <= 60) ? newBR : 60
        let SO = (newSO <= 100) ? newSO : 100
        if(newHR < 50){
          HR = 50
        }
        if(newSP < 60){
          SP = 60 
        }
        if(newDP < 30){
          DP = 30
        }
        if(newBR < 0){
          BR = 0
        }
        if(newSO < 70){
          SO = 70
        }
        this.setState({
          heartRate: HR,
          breathingRate: BR,
          diastolicPressure: DP,
          sistolicPressure: SP,
          saturation: SO,
          timeSim: finalTime
        })
        this.changeGraphs = setInterval(this.intervalGraphs.bind(this) , 1000)
      }

  }

 
    //Función para enviar el informe
    sendData(next){
        this.setState({
            document: next
        })
    }

    blockChangeValue(parameter, finalTime, initialValue, finalValue){
      if (typeof finalTime === 'string'){
        eval(parameter + "Block = true")
        eval(parameter + "Value = "+ initialValue)
      } else{
        eval(parameter + "Block = true")
        eval(parameter + "Value = "+ initialValue)
        eval(parameter + "FinalValue = "+ finalValue)
        eval("this."+parameter+ "Timer = setTimeout(this.unBlockChangeValue"+
        ".bind(this,parameter, finalValue, finalTime), finalTime*1000)")
      } 
      
    }

    unBlockChangeValue(parameter, finalValue){
      eval("clearTimeout(this."+parameter+"Timer)")
      switch (finalValue) {
        case -1:
          eval(parameter+"Block = false")
          this.simultaneousActions(parameter,0, 0, 0, -1, 0)
          break;
        case 0:
          eval(parameter+"Value  = 0")
          this.simultaneousActions(parameter,1800, 1800, 0, -1, 2)
          break;
        default:
          eval(parameter+"Value  = "+ finalValue)
          this.simultaneousActions(parameter,1800, 1800, finalValue, finalValue, 2)
          break;
      }
    }
  

    simultaneousActions(parameter, duration, tFin, value, finalValue, type){
      valueTot = 0
      var factor = 1
      switch (type){
        
        //Añadir al array de acciones simultáneas de una constante
        case 1:
        
          let obj = {'parameter': parameter, 'duration' : duration, 'finalTime': tFin,'value' : value, 'finalValue': finalValue}
          eval(parameter+"Actions.push(obj);")
          for(var i = 0; i<(eval(parameter+"Actions.length")); i++){
            if(eval(parameter+"Actions[i].value")=== 0){ 
              valueTot = 0
              break;
            }
            else if (eval(parameter+"Actions[i].finalValue") ===0) {
              valueTot = eval(parameter+"Actions[i].value")
              break;
            }
            else if (eval(parameter+"Actions[i].finalValue") !== 0 && eval(parameter+"Actions[i].finalValue") !== -1 && eval(parameter+"Actions[i].value")!== 0) {
              valueTot -= eval(parameter+"Actions[i].value")
              factor = eval(parameter+"Actions[i].value")
            }
            valueTot += eval(parameter+"Actions[i].value")
            valueTot = valueTot* factor
          }
          eval(parameter+"Value = valueTot")
          eval(parameter+"Actions.sort((a, b) => a.finalTime-b.finalTime);")
          if(eval(parameter+"Actions[0].duration") === 'ventilacionBolsa'){break;}
          eval("this."+parameter+ "Timer = setTimeout(this.unBlockChangeValue.bind(this,"+parameter+"Actions[0].parameter, "+parameter+"Actions[0].finalValue), ("+parameter+"Actions[0].duration)*1000)")
          break; 
        //Eliminar acciones del array de acciones de una constante vital        
        case 0: 
          eval(parameter+"Actions.splice(0,1);")
          eval(parameter + "N -= 1")
          if(eval(parameter + "N") > 0){
            eval(parameter+"Block = true")
            for(let i = 0; i<(eval(parameter+"Actions.length")); i++){
              if(eval(parameter + "N") === 1 && eval(parameter+"Actions[i].finalValue") !== 0 && eval(parameter+"Actions[i].finalValue") !== -1 && eval(parameter+"Actions[i].value")!== 0 ){
                eval(parameter+"Block = false")
                break;
              }
              if (eval(parameter+"Actions[i].finalValue") !== 0 && eval(parameter+"Actions[i].finalValue") !== -1 && eval(parameter+"Actions[i].value")!== 0) {
                valueTot -= eval(parameter+"Actions[i].value")
                factor = eval(parameter+"Actions[i].value")
              }
              valueTot += eval(parameter+"Actions[i].value")
              valueTot = valueTot* factor
            }
            eval(parameter+"Value = valueTot")
            if (eval(parameter+"Actions.length") === 0){
              eval(parameter + "N = 0 ") 
              eval(parameter+"Block = false")
              break;
            }
            eval(parameter+"Actions.sort((a, b) => a.finalTime -b.finalTime);")
           console.log("valor"+ breathingRateActions[0])
           eval("this."+parameter+ "Timer = setTimeout(this.unBlockChangeValue.bind(this,"+parameter+"Actions[0].parameter, "+parameter+"Actions[0].finalValue), ("+parameter+"Actions[0].duration)*1000)")
          }
          else{
            eval(parameter+"Block = false")
            eval(parameter+"Actions.splice(0, "+parameter+"Actions.length)")
          }
          break;
        // Cuando una acción tiene dos valores, se cambia de valor en la funcion unblock y se modifica
        // el objeto del array de acciones cin un nuevo valor para la acción y un nuevo tiempofinal y duración
        case 2:
          eval(parameter+"Actions[0].duration = "+duration)
          eval(parameter+"Actions[0].finalTime = "+tFin)
          eval(parameter+"Actions[0].value = "+value)
          for(let i = 0; i<(eval(parameter+"Actions.length")); i++){
            valueTot += eval(parameter+"Actions[i].value")
          }
          eval(parameter+"Value = valueTot")
          eval(parameter+"Actions.sort((a, b) => a.finalTime-b.finalTime);")
          eval("this."+parameter+ "Timer = setTimeout(this.unBlockChangeValue.bind(this,"+parameter+"Actions[0].parameter, "+parameter+"Actions[0].finalValue), ("+parameter+"Actions[0].duration)*1000)")
        break;

        case 4:
          let obj1 = {'parameter': "saturation", 'duration' : "ventilacionBolsa", 'finalTime': 1800,'value' : -6, 'finalValue': -1}
          eval(parameter+"Actions.splice("+parameter+"Actions.indexOf(obj1),1);")
          eval(parameter + "N -= 1")
          if(eval(parameter + "N") > 0){
            eval(parameter+"Block = true")
            for(let i = 0; i<(eval(parameter+"Actions.length")); i++){
              if(eval(parameter + "N") === 1 && eval(parameter+"Actions[i].finalValue") !== 0 && eval(parameter+"Actions[i].finalValue") !== -1 && eval(parameter+"Actions[i].value")!== 0 ){
                eval(parameter+"Block = false")
                break;
              }
              if (eval(parameter+"Actions[i].finalValue") !== 0 && eval(parameter+"Actions[i].finalValue") !== -1 && eval(parameter+"Actions[i].value")!== 0) {
                valueTot -= eval(parameter+"Actions[i].value")
                factor = eval(parameter+"Actions[i].value")
              }
              valueTot += eval(parameter+"Actions[i].value")
              valueTot = valueTot* factor
            }
            eval(parameter+"Value = valueTot")
            eval(parameter+"Actions.sort((a, b) => a.finalTime -b.finalTime);")
            console.log("Valor"+ breathingRateActions[0].parameter)
            eval("this."+parameter+ "Timer = setTimeout(this.unBlockChangeValue.bind(this,"+parameter+"Actions[0].parameter, "+parameter+"Actions[0].finalValue), ("+parameter+"Actions[0].duration)*1000)")
          }
          else{
            eval(parameter+"Block = false")
            eval(parameter+"Actions.splice(0, "+parameter+"Actions.length)")
          }
        break;

        default:
          break;
        }    
    }

    change(parameter,value, time, type, latency){
      blockAdvanceN += 1
      blockAdvance = true
      this.changeAction = setTimeout(this.changeAux.bind(this,parameter,value, time, type), (latency * 1000))
    }
    changeAux(parameter,value, duration, type) {
      blockAdvanceN -= 1
      blockAdvance = (blockAdvanceN < 1) ? false : true
      if (typeof duration === 'string'){
        eval(parameter + "FinalTime = 1800")
      } else{
        eval(parameter + "FinalTime = this.state.timeSim + duration")
      }
      let initialValue
      switch (type) {
        //sube o baja value[puntos/min] en tiempo [segundos], luego vuelve a la evolución normal
        case 1:
          if((eval(parameter + "N")) === 0) {
            this.blockChangeValue(parameter, duration, value, -1)
            eval("clearTimeout(this."+parameter+"Timer)")
            eval(parameter + "N += 1")
            this.simultaneousActions(parameter, duration, eval(parameter+"FinalTime"), value, -1, 1)
          }
          else{
            eval(parameter + "N += 1")
            this.simultaneousActions(parameter, duration, eval(parameter+"FinalTime"), value, -1, 1)
          }
          break; 
        //sube hasta value[valor concreto] en x [segundos]  y se mantiene
        // meto el caso 6 aquí puesto que suponemos al final que la ventilación con bolsa se mantiene fija
        case 2:
          initialValue = (value - eval("this.state."+parameter))/duration*60
          if((eval(parameter + "N")) === 0) {
            this.blockChangeValue(parameter, duration, initialValue, 0)
            eval(parameter + "N += 1")
            this.simultaneousActions(parameter, duration, eval(parameter+"FinalTime"), initialValue, 0, 1)
          }
          else{
            eval(parameter + "N += 1")
            this.simultaneousActions(parameter, duration, eval(parameter+"FinalTime"), initialValue, 0, 1)
          }
          break;
      //Se mantiene tiempo [segundos] y después se modifica value [puntos/min] hasta el final
        case 3:
          if((eval(parameter + "N")) === 0) {
            this.blockChangeValue(parameter, duration, 0, value)
            eval(parameter + "N += 1")
            this.simultaneousActions(parameter, duration, eval(parameter+"FinalTime"), 0, value, 1)
          }
          else{ 
            eval(parameter + "N += 1")
            this.simultaneousActions(parameter, duration, eval(parameter+"FinalTime"), 0, value, 1)
          }
          break;
      //sube o baja hasta que se realiza una acción concreta
        case 4:
          if((eval(parameter + "N")) === 0) {
            actionsType4.push(duration)
            this.blockChangeValue(parameter, duration, value, -1)
            eval(parameter + "N += 1")
            this.simultaneousActions(parameter, duration, eval(parameter+"FinalTime"), value, -1, 1)
          }
          else{
            actionsType4.push(duration)
            eval(parameter + "N += 1")
            this.simultaneousActions(parameter, duration, eval(parameter+"FinalTime"), value, -1, 1)
          }
          break;
      //Acelera (o Ralentiza si es un número menor que cero) la subida o bajada de un parameter
      //value multiplica al valor actual de subida o bajada
        case 5:
          if((eval(parameter + "N")) === 0) {
            /*initialValue = value * eval(parameter+"Value")
            this.blockChangeValue(parameter, duration, initialValue, initialValue)
            duration = 1800
            eval(parameter + "FinalTime = this.state.timeSim + duration")
            this.simultaneousActions(parameter, duration, eval(parameter+"FinalTime"), value, initialValue, 1)*/
            eval(parameter + "N += 1")
            eval(parameter + "FactorMultiplicativo *= value")
          }
          else{
            eval(parameter + "N += 1")
            duration = 1800
            eval(parameter + "FinalTime = this.state.timeSim + duration")
            eval(parameter + "FactorMultiplicativo *= value")
            this.simultaneousActions(parameter, duration, eval(parameter+"FinalTime"), value, initialValue, 1)
          }
          break;
        //sube o baja value[puntos/min] en tiempo [segundos] y se mantiene
        case 6:
          if((eval(parameter + "N")) === 0) {
            this.blockChangeValue(parameter, duration, value, 0)
            eval(parameter + "N += 1")
            this.simultaneousActions(parameter, duration, eval(parameter+"FinalTime"), value, 0, 1)
          }
          else{
            eval(parameter + "N += 1")
            this.simultaneousActions(parameter, duration, eval(parameter+"FinalTime"), value, 0, 1)
          }
          break;         
        default:
          break;
      }
  }
 
  
    
    sendInformation(variant, msg){  

      const closeAlert = () => this.toogle()
        var alertMsg =  <Alert id="alert" color={variant} isOpen={true} toggle={closeAlert}>
                                {msg}
                        </Alert>

        this.setState({
            alert: alertMsg
        });
    }

    sendModal(id, type, header, content){
        this.setState(({ num }) => ({
            header: header,
            content: content,
            num: num + 1,
            type: type,
            id: id
        }));

    }


    toogle() {
      this.setState({
        showingAlert: false,
        alert: null
      });
    }
   // rellenar(){
      
    //}




    finish(){

      axios.get("http://localhost:8080/simulation/listo/"+this.props.match.params.id)
      .then(res=>{
        
      })
      .catch(error=>{
      alert(error)
      })
      if( this.state.partBody=='leftLeg' && this.state.phase=='hospitalaria') {
        axios.get("http://localhost:8080/trainee/evaluacionLH/"+this.props.match.params.id+"/"+this.state.traineeId)
          
            .then(res => {
              if(res.data.Nota<0){
                this.setState({matches: res.data.matches, swap: res.data.swap, contr: res.data.contr, gasp: res.data.gasp, mismatches: res.data.mismatches,GA:res.data.GA, Diag: res.data.Diag, Subseq: res.data.Subseq, Precision:res.data.Precision,Recall: res.data.Recall,Specificity:res.data.Specificity,Accuracy:res.data.Accuracy,F1:res.data.F1,Nota:0
                 });
                }else{
                  this.setState({matches: res.data.matches, swap: res.data.swap, contr: res.data.contr, gasp: res.data.gasp, mismatches: res.data.mismatches,GA:res.data.GA, Diag: res.data.Diag, Subseq: res.data.Subseq, Precision:res.data.Precision,Recall: res.data.Recall,Specificity:res.data.Specificity,Accuracy:res.data.Accuracy,F1:res.data.F1,Nota:res.data.Nota
                  });

                }
                 const datapost = {
                  traineeId:this.state.traineeId,
                  simulationId:this.props.match.params.id,
                  matches: this.state.matches,
                  swap:this.state.swap,
                  contr:this.state.contr,
                  gasp:this.state.gasp,
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
              }         
                axios.post("http://localhost:8080/results/create", datapost)
                .then(res => {
                  this.setState({
                    finish: true
                })
                 
                 })
                 .catch(error=>{
                   alert("Error server "+error)
                 })
             
                        
       var imgData = 'data:image/jpeg;base64,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IABGADQAMQAwADAAIABzAGUAcgBpAGUAcwAAADhCSU0EOwAAAAABsgAAABAAAAABAAAAAAAScHJpbnRPdXRwdXRPcHRpb25zAAAAEgAAAABDcHRuYm9vbAAAAAAAQ2xicmJvb2wAAAAAAFJnc01ib29sAAAAAABDcm5DYm9vbAAAAAAAQ250Q2Jvb2wAAAAAAExibHNib29sAAAAAABOZ3R2Ym9vbAAAAAAARW1sRGJvb2wAAAAAAEludHJib29sAAAAAABCY2tnT2JqYwAAAAEAAAAAAABSR0JDAAAAAwAAAABSZCAgZG91YkBv4AAAAAAAAAAAAEdybiBkb3ViQG/gAAAAAAAAAAAAQmwgIGRvdWJAb+AAAAAAAAAAAABCcmRUVW50RiNSbHQAAAAAAAAAAAAAAABCbGQgVW50RiNSbHQAAAAAAAAAAAAAAABSc2x0VW50RiNQeGxAWADEgAAAAAAAAAp2ZWN0b3JEYXRhYm9vbAEAAAAAUGdQc2VudW0AAAAAUGdQcwAAAABQZ1BDAAAAAExlZnRVbnRGI1JsdAAAAAAAAAAAAAAAAFRvcCBVbnRGI1JsdAAAAAAAAAAAAAAAAFNjbCBVbnRGI1ByY0BZAAAAAAAAOEJJTQPtAAAAAAAQAGADEgABAAIAYAMSAAEAAjhCSU0EJgAAAAAADgAAAAAAAAAAAAA/gAAAOEJJTQQNAAAAAAAEAAAAeDhCSU0EGQAAAAAABAAAAB44QklNA/MAAAAAAAkAAAAAAAAAAAEAOEJJTScQAAAAAAAKAAEAAAAAAAAAAjhCSU0D9QAAAAAASAAvZmYAAQBsZmYABgAAAAAAAQAvZmYAAQChmZoABgAAAAAAAQAyAAAAAQBaAAAABgAAAAAAAQA1AAAAAQAtAAAABgAAAAAAAThCSU0D+AAAAAAAcAAA/////////////////////////////wPoAAAAAP////////////////////////////8D6AAAAAD/////////////////////////////A+gAAAAA/////////////////////////////wPoAAA4QklNBAAAAAAAAAIABThCSU0EAgAAAAAADAAAAAAAAAAAAAAAADhCSU0EMAAAAAAABgEBAQEBAThCSU0ELQAAAAAABgABAAAACThCSU0ECAAAAAAAEAAA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cy5hZG9iZS5jb20veGFwLzEuMC8APD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4gPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgNS4wLWMwNjAgNjEuMTM0Nzc3LCAyMDEwLzAyLzEyLTE3OjMyOjAwICAgICAgICAiPiA8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPiA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtbG5zOmRjPSJodHRwOi8vcHVybC5vcmcvZGMvZWxlbWVudHMvMS4xLyIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0RXZ0PSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VFdmVudCMiIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczpwaG90b3Nob3A9Imh0dHA6Ly9ucy5hZG9iZS5jb20vcGhvdG9zaG9wLzEuMC8iIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNSBXaW5kb3dzIiB4bXA6Q3JlYXRlRGF0ZT0iMjAxOC0xMS0xN1QxMjozODoxNCswMTowMCIgeG1wOk1ldGFkYXRhRGF0ZT0iMjAxOC0xMS0xN1QxMjo0MDoxNCswMTowMCIgeG1wOk1vZGlmeURhdGU9IjIwMTgtMTEtMTdUMTI6NDA6MTQrMDE6MDAiIGRjOmZvcm1hdD0iaW1hZ2UvanBlZyIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDo5MUMwMEQ0NTVERUFFODExQjc5NEE2QTYwMjc4Q0Y5MCIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDo4RUMwMEQ0NTVERUFFODExQjc5NEE2QTYwMjc4Q0Y5MCIgeG1wTU06T3JpZ2luYWxEb2N1bWVudElEPSJ4bXAuZGlkOjhFQzAwRDQ1NURFQUU4MTFCNzk0QTZBNjAyNzhDRjkwIiBwaG90b3Nob3A6Q29sb3JNb2RlPSIzIiBwaG90b3Nob3A6SUNDUHJvZmlsZT0iQXBwbGUgUkdCIj4gPHhtcE1NOkhpc3Rvcnk+IDxyZGY6U2VxPiA8cmRmOmxpIHN0RXZ0OmFjdGlvbj0iY3JlYXRlZCIgc3RFdnQ6aW5zdGFuY2VJRD0ieG1wLmlpZDo4RUMwMEQ0NTVERUFFODExQjc5NEE2QTYwMjc4Q0Y5MCIgc3RFdnQ6d2hlbj0iMjAxOC0xMS0xN1QxMjozODoxNCswMTowMCIgc3RFdnQ6c29mdHdhcmVBZ2VudD0iQWRvYmUgUGhvdG9zaG9wIENTNSBXaW5kb3dzIi8+IDxyZGY6bGkgc3RFdnQ6YWN0aW9uPSJzYXZlZCIgc3RFdnQ6aW5zdGFuY2VJRD0ieG1wLmlpZDo4RkMwMEQ0NTVERUFFODExQjc5NEE2QTYwMjc4Q0Y5MCIgc3RFdnQ6d2hlbj0iMjAxOC0xMS0xN1QxMjo0MCswMTowMCIgc3RFdnQ6c29mdHdhcmVBZ2VudD0iQWRvYmUgUGhvdG9zaG9wIENTNSBXaW5kb3dzIiBzdEV2dDpjaGFuZ2VkPSIvIi8+IDxyZGY6bGkgc3RFdnQ6YWN0aW9uPSJzYXZlZCIgc3RFdnQ6aW5zdGFuY2VJRD0ieG1wLmlpZDo5MEMwMEQ0NTVERUFFODExQjc5NEE2QTYwMjc4Q0Y5MCIgc3RFdnQ6d2hlbj0iMjAxOC0xMS0xN1QxMjo0MDoxNCswMTowMCIgc3RFdnQ6c29mdHdhcmVBZ2VudD0iQWRvYmUgUGhvdG9zaG9wIENTNSBXaW5kb3dzIiBzdEV2dDpjaGFuZ2VkPSIvIi8+IDxyZGY6bGkgc3RFdnQ6YWN0aW9uPSJjb252ZXJ0ZWQiIHN0RXZ0OnBhcmFtZXRlcnM9ImZyb20gYXBwbGljYXRpb24vdm5kLmFkb2JlLnBob3Rvc2hvcCB0byBpbWFnZS9qcGVnIi8+IDxyZGY6bGkgc3RFdnQ6YWN0aW9uPSJkZXJpdmVkIiBzdEV2dDpwYXJhbWV0ZXJzPSJjb252ZXJ0ZWQgZnJvbSBhcHBsaWNhdGlvbi92bmQuYWRvYmUucGhvdG9zaG9wIHRvIGltYWdlL2pwZWciLz4gPHJkZjpsaSBzdEV2dDphY3Rpb249InNhdmVkIiBzdEV2dDppbnN0YW5jZUlEPSJ4bXAuaWlkOjkxQzAwRDQ1NURFQUU4MTFCNzk0QTZBNjAyNzhDRjkwIiBzdEV2dDp3aGVuPSIyMDE4LTExLTE3VDEyOjQwOjE0KzAxOjAwIiBzdEV2dDpzb2Z0d2FyZUFnZW50PSJBZG9iZSBQaG90b3Nob3AgQ1M1IFdpbmRvd3MiIHN0RXZ0OmNoYW5nZWQ9Ii8iLz4gPC9yZGY6U2VxPiA8L3htcE1NOkhpc3Rvcnk+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOjkwQzAwRDQ1NURFQUU4MTFCNzk0QTZBNjAyNzhDRjkwIiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOjhFQzAwRDQ1NURFQUU4MTFCNzk0QTZBNjAyNzhDRjkwIiBzdFJlZjpvcmlnaW5hbERvY3VtZW50SUQ9InhtcC5kaWQ6OEVDMDBENDU1REVBRTgxMUI3OTRBNkE2MDI3OENGOTAiLz4gPHBob3Rvc2hvcDpEb2N1bWVudEFuY2VzdG9ycz4gPHJkZjpCYWc+IDxyZGY6bGk+eG1wLmRpZDpEQzc3MkEyODFGMjA2ODExOTJCMDk2MURDQjQ3MzFCNzwvcmRmOmxpPiA8L3JkZjpCYWc+IDwvcGhvdG9zaG9wOkRvY3VtZW50QW5jZXN0b3JzPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8P3hwYWNrZXQgZW5kPSJ3Ij8+/+ICOElDQ19QUk9GSUxFAAEBAAACKEFEQkUCEAAAbW50clJHQiBYWVogB88ABgADAAAAAAAAYWNzcEFQUEwAAAAAbm9uZQAAAAAAAAAAAAAAAAAAAAEAAPbWAAEAAAAA0y1BREJFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAKY3BydAAAAPwAAAAyZGVzYwAAATAAAABkd3RwdAAAAZQAAAAUYmtwdAAAAagAAAAUclRSQwAAAbwAAAAOZ1RSQwAAAcwAAAAOYlRSQwAAAdwAAAAOclhZWgAAAewAAAAUZ1hZWgAAAgAAAAAUYlhZWgAAAhQAAAAUdGV4dAAAAABDb3B5cmlnaHQgMTk5OSBBZG9iZSBTeXN0ZW1zIEluY29ycG9yYXRlZAAAAGRlc2MAAAAAAAAACkFwcGxlIFJHQgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABYWVogAAAAAAAA81EAAQAAAAEWzFhZWiAAAAAAAAAAAAAAAAAAAAAAY3VydgAAAAAAAAABAc0AAGN1cnYAAAAAAAAAAQHNAABjdXJ2AAAAAAAAAAEBzQAAWFlaIAAAAAAAAHm9AABBUgAABLlYWVogAAAAAAAAVvgAAKwvAAAdA1hZWiAAAAAAAAAmIgAAEn8AALFw/+4ADkFkb2JlAGRAAAAAAf/bAIQAAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQICAgICAgICAgICAwMDAwMDAwMDAwEBAQEBAQEBAQEBAgIBAgIDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMD/8AAEQgAlwESAwERAAIRAQMRAf/dAAQAI//EAaIAAAAGAgMBAAAAAAAAAAAAAAcIBgUECQMKAgEACwEAAAYDAQEBAAAAAAAAAAAABgUEAwcCCAEJAAoLEAACAQMEAQMDAgMDAwIGCXUBAgMEEQUSBiEHEyIACDEUQTIjFQlRQhZhJDMXUnGBGGKRJUOhsfAmNHIKGcHRNSfhUzaC8ZKiRFRzRUY3R2MoVVZXGrLC0uLyZIN0k4Rlo7PD0+MpOGbzdSo5OkhJSlhZWmdoaWp2d3h5eoWGh4iJipSVlpeYmZqkpaanqKmqtLW2t7i5usTFxsfIycrU1dbX2Nna5OXm5+jp6vT19vf4+foRAAIBAwIEBAMFBAQEBgYFbQECAxEEIRIFMQYAIhNBUQcyYRRxCEKBI5EVUqFiFjMJsSTB0UNy8BfhgjQlklMYY0TxorImNRlUNkVkJwpzg5NGdMLS4vJVZXVWN4SFo7PD0+PzKRqUpLTE1OT0laW1xdXl9ShHV2Y4doaWprbG1ub2Z3eHl6e3x9fn90hYaHiImKi4yNjo+DlJWWl5iZmpucnZ6fkqOkpaanqKmqq6ytrq+v/aAAwDAQACEQMRAD8A3+Pfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691/9Df49+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3X/0d/j37r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvdf/S3+Pfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691/9Pf49+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3X/1N/j37r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvdf/V3+PfuvdV5fzKfl9v74V9G7Z7U692ttLd2VzXZ2E2NW47eRzK42DHZXbu6sw9bAcJXUFSKyOpwESDU5TRI3F7e5k9j/bfafdDmu/2DedwuLe3isHnVodGoskkSaTrVhSkhOBWoGeoW99PcrePa3lTb+YNlsLa5uZb9LcrPr0hXimfUNDKdQMYGTShPRRv5eH8zTvb5u777a62zGyOodj7g2v1PVb22NkcdDvKtxlTuCLO47BxU+56Sqz71c2CWbLQtKKR4agLfS17D3I3vN7F8p+1e08vb5b7ruV1ZT7isE6sYQ4jMbSExER0ElEYDWCteI6jX2Y9+ecPdXeOYtgn2nbLS+g21p4HUTshlEiRgSgyEmOsg1aCGpWh8uhS+E3zl+TXdnys7k+L/wAjuoOvurdxdSbDrtzVse05N0S1lZkafdW2cJRT01Tm8pXUWR2vmMXnTV0lVCg88bRsGALL7IPdL2p5F5W9v+WufOSuZLy/stxu1iUy+EFCmKVyCERWWVHj0OrHtOoU4HoQ+1Pu1z3zZ7g8z8hc7ct2W33u22bSsIfF1FxLEgIMjsrROkmtHUdwKkGnVmnbO7K/YPVnZe+sXTUtZk9l9f7y3bjqSu8v2NVX7c27kcxR01YIJIpzST1FGqyaHV9BNiDY+8bbqVoLa4mUVZI2YfaAT1ldyxtcO+cy8vbLcyMlteX0EDstNSrLKkbFagjUAxIqCK8R1o9p/wAKpvmoUUnoL4x3KqT/ALj+0fqRzx/p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TrPYey94b1yHY+6drbVwuC3Bv7LQy0+T3jl8bQw0tduOvgmrcjLFV5aojaZ1aomIZjd2+vvGTmHcbLd993fdNu2tLKwuLh5I7dCCsKMxKxqQqghBgUVeHAdZO8t7bfbNsGz7Vue7SX+429ukclw4Ied1UBpGBZiC5yas3HiehB9k/R31737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3X//09/j37r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvdf/U3+Pfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691/9Xf49+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3X/1t/j37r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvdf/X3+Pfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691/9Df49+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3X/0d/j37r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvdf/Z'
       var doc = new jsPDF()
 
       doc.addImage(imgData, 'JPEG', 150, 0, 50, 25)
       //title
       doc.setFontSize(16)
       doc.setFont('helvetica')
       doc.setFont(undefined, 'bold')
       doc.text(20, 30, 'Informe Final')
       doc.text(20,30, '____________')
 
       //info
       doc.setFontSize(12)
       doc.setFont('helvetica')
       doc.setFont(undefined, 'bold')
       doc.text(20, 40, 'Estudiante:')
       doc.text(20, 45, 'Instructor:')
       doc.text(20, 50, 'Duración de la simulación:')
       doc.text(20, 55, 'Límite de tiempo:')
       doc.text(20, 60, 'Constantes iniciales del paciente:')
       doc.setFont(undefined, 'normal')
       doc.text(45, 40, `${initialData.trainee.name} ${initialData.trainee.surname}`)
       doc.text(43, 45, `${initialData.trainer.name} ${initialData.trainer.surname}`)
       doc.text(75, 50, `${Math.trunc((this.state.timeSim-1)/60)} minutos ${(this.state.timeSim-1)%60} segundos`)
       doc.text(58, 55, `${this.state.time} minutos`)
       doc.text(89, 60, `${Math.round(this.state.heartRate,-1)} puls/min, ${Math.round(this.state.breathingRate,-1)} resp/min,`)
       doc.text(20, 65, `${Math.round(this.state.sistolicPressure,-1)} mmHg, ${Math.round(this.state.diastolicPressure,-1)} mmHg, ${Math.round(this.state.saturation,-1)} SatO2`)
 
       //Simulation
       doc.setFontSize(14)
       doc.setFont('helvetica')
       doc.setFont(undefined, 'normal')
       doc.text(20, 75, 'Desarrollo de la simulación:')
       doc.text(20, 75, '______________________')
       //eee = {min:0, seg:5, msg:"Mascarilla oxígeno",constants:[130,35, 90, 60, 85, 10, 200,34.2]}
       var i= 78
       var j = 80
       //content
       doc.setFontSize(12)
       //acciones
       this.information.forEach(e => {
           doc.rect(24, i, 2, 2, 'F');
           doc.text(30, j, `Tiempo ${e.min}:${(e.seg < 10 ? '0'+e.seg : e.seg)}`)
           doc.setFont(undefined, 'bold')
           doc.text(60, j, e.msg)
           doc.setFont(undefined, 'normal')
           i += 5
           j += 5
           doc.text(30, j,`${e.constants[0]} puls/min, ${e.constants[1]} resp/min, ${e.constants[2]} mmHg, ${e.constants[3]} mmHg, ${e.constants[4]} % SatO2`)
           i += 7
           j += 7
           if(i === 270 || i > 270){
               doc.addPage()
               i=24
               j=26
           }
       });
       console.log(i);
       j=26
       doc.addPage()
       doc.setFontSize(16)
       doc.setFont('helvetica')
       doc.setFont(undefined, 'bold')
       doc.text(20, j, 'Evaluación:')
       doc.text(20, j, '_________')
       j=j+10
       doc.setFontSize(14)
       doc.setFont('helvetica')
       doc.setFont(undefined, 'bold')
       doc.text(20,j,`Nota: ${this.state.Nota}` )
       doc.text(48,j,`%` )
       j=j+10
       doc.setFontSize(14)
       doc.setFont('helvetica')
       doc.setFont(undefined, 'bold')
       doc.text(20,j,'Sección 1')
       doc.text(20, j, '________')
       j=j+10
       doc.setFontSize(11)
       doc.setFont(undefined, 'normal')
       doc.text(20, j, `Número de acciones correctas realizadas: ${this.state.matches}`)
       j=j+7
       doc.text(20, j, `Número de veces que no has actuado: ${this.state.gasp}`)
       j=j+7
       doc.text(20,j,`Número de acciones intercambiadas realizadas: ${this.state.swap}`)
       j=j+7
       doc.text(20,j,`Número de acciones incorrectas realizadas: ${this.state.mismatches}`)
       j=j+7
       doc.text(20,j,`Número de acciones contrarias realizadas: ${this.state.contr}`)
       j=j+7
       doc.text(20,j,`Balance entre acciones correctas e incorrectas:  ${this.state.GA}%`)
       j=j+10
       doc.setFontSize(14)
       doc.setFont('helvetica')
       doc.setFont(undefined, 'bold')
       doc.text(20,j,'Sección 2')
       doc.text(20, j, '________')
       j=j+10
       doc.setFontSize(11)
       doc.setFont(undefined, 'normal')
       doc.text(20,j,`Acciones realizadas en el momento oportuno: ${Math.round(this.state.Diag,-1)}%`)
       j=j+5
       doc.text(19,j,` Acciones realizadas de forma secuencial: ${this.state.GA}%`)
       j=j+10
       doc.setFontSize(14)
       doc.setFont('helvetica')
       doc.setFont(undefined, 'bold')
       doc.text(20,j,'Sección 3')
       doc.text(20, j, '________')
       j=j+10
       doc.setFontSize(10)
       doc.setFont(undefined, 'normal')
       doc.text(20,j,`Porcentaje de acciones que debían realizarse y se realizaron: ${this.state.Recall}%`)
       j=j+5
       doc.text(20,j,`Porcentaje de acciones que deberían realizarse y se realizaron y que no debían realizarse y no se realizaron:${this.state.Accuracy}%`)
       j=j+5
       doc.text(20,j,`Porcentaje de acciones que deberían realizarse con respecto a todas las acciones que se han llevado a cabo: ${this.state.Precision}%`)
       j=j+5
       doc.text(20,j,`Porcentaje de acciones que no deberían realizarse y no se realizaron:  ${this.state.Specificity}%`)
       
      
       
      

       
       // Save the Data
       var file = btoa(doc.output())                
       const baseUrl = "http://localhost:8080/simulation/update/"+this.props.match.params.id
       // parametros de datos post
       const datapost2 = {
           inform: file,
           testDataJSON: JSON.stringify(testData)
       }
   
       axios.post(baseUrl,datapost2)
       .then(response=>{
           if (response.data.success===true) {
              // alert(response.data.message)
              
           
             
               
           }
           else {
               alert("Error")
           }
           })
       .catch(error=>{
           alert("Error 34 "+error)
       })
               })
               .catch(error=>{
                 alert("Error server "+error)
               })
            }
          
      else if( this.state.partBody=='leftLeg' && this.state.phase=='prehospitalaria') {
        axios.get("http://localhost:8080/trainee/evaluacionLP/"+this.props.match.params.id+"/"+this.state.traineeId)
        .then(res => {
          if(res.data.Nota<0){
            this.setState({matches: res.data.matches, swap: res.data.swap, contr: res.data.contr, gasp: res.data.gasp, mismatches: res.data.mismatches,GA:res.data.GA, Diag: res.data.Diag, Subseq: res.data.Subseq, Precision:res.data.Precision,Recall: res.data.Recall,Specificity:res.data.Specificity,Accuracy:res.data.Accuracy,F1:res.data.F1,Nota:0
             });
            }else{
              this.setState({matches: res.data.matches, swap: res.data.swap, contr: res.data.contr, gasp: res.data.gasp, mismatches: res.data.mismatches,GA:res.data.GA, Diag: res.data.Diag, Subseq: res.data.Subseq, Precision:res.data.Precision,Recall: res.data.Recall,Specificity:res.data.Specificity,Accuracy:res.data.Accuracy,F1:res.data.F1,Nota:res.data.Nota
              });

            }
             const datapost = {
              traineeId:this.state.traineeId,
              simulationId:this.props.match.params.id,
              matches: this.state.matches,
              swap:this.state.swap,
              contr:this.state.contr,
              gasp:this.state.gasp,
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
          }
      
      
      
            axios.post("http://localhost:8080/results/create", datapost)
            .then(res => {
              this.setState({
                finish: true
            })
             
             })
             .catch(error=>{
               alert("Error server "+error)
             })
             
             
             
             var imgData = 'data:image/jpeg;base64,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IABGADQAMQAwADAAIABzAGUAcgBpAGUAcwAAADhCSU0EOwAAAAABsgAAABAAAAABAAAAAAAScHJpbnRPdXRwdXRPcHRpb25zAAAAEgAAAABDcHRuYm9vbAAAAAAAQ2xicmJvb2wAAAAAAFJnc01ib29sAAAAAABDcm5DYm9vbAAAAAAAQ250Q2Jvb2wAAAAAAExibHNib29sAAAAAABOZ3R2Ym9vbAAAAAAARW1sRGJvb2wAAAAAAEludHJib29sAAAAAABCY2tnT2JqYwAAAAEAAAAAAABSR0JDAAAAAwAAAABSZCAgZG91YkBv4AAAAAAAAAAAAEdybiBkb3ViQG/gAAAAAAAAAAAAQmwgIGRvdWJAb+AAAAAAAAAAAABCcmRUVW50RiNSbHQAAAAAAAAAAAAAAABCbGQgVW50RiNSbHQAAAAAAAAAAAAAAABSc2x0VW50RiNQeGxAWADEgAAAAAAAAAp2ZWN0b3JEYXRhYm9vbAEAAAAAUGdQc2VudW0AAAAAUGdQcwAAAABQZ1BDAAAAAExlZnRVbnRGI1JsdAAAAAAAAAAAAAAAAFRvcCBVbnRGI1JsdAAAAAAAAAAAAAAAAFNjbCBVbnRGI1ByY0BZAAAAAAAAOEJJTQPtAAAAAAAQAGADEgABAAIAYAMSAAEAAjhCSU0EJgAAAAAADgAAAAAAAAAAAAA/gAAAOEJJTQQNAAAAAAAEAAAAeDhCSU0EGQAAAAAABAAAAB44QklNA/MAAAAAAAkAAAAAAAAAAAEAOEJJTScQAAAAAAAKAAEAAAAAAAAAAjhCSU0D9QAAAAAASAAvZmYAAQBsZmYABgAAAAAAAQAvZmYAAQChmZoABgAAAAAAAQAyAAAAAQBaAAAABgAAAAAAAQA1AAAAAQAtAAAABgAAAAAAAThCSU0D+AAAAAAAcAAA/////////////////////////////wPoAAAAAP////////////////////////////8D6AAAAAD/////////////////////////////A+gAAAAA/////////////////////////////wPoAAA4QklNBAAAAAAAAAIABThCSU0EAgAAAAAADAAAAAAAAAAAAAAAADhCSU0EMAAAAAAABgEBAQEBAThCSU0ELQAAAAAABgABAAAACThCSU0ECAAAAAAAEAAA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cy5hZG9iZS5jb20veGFwLzEuMC8APD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4gPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgNS4wLWMwNjAgNjEuMTM0Nzc3LCAyMDEwLzAyLzEyLTE3OjMyOjAwICAgICAgICAiPiA8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPiA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtbG5zOmRjPSJodHRwOi8vcHVybC5vcmcvZGMvZWxlbWVudHMvMS4xLyIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0RXZ0PSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VFdmVudCMiIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczpwaG90b3Nob3A9Imh0dHA6Ly9ucy5hZG9iZS5jb20vcGhvdG9zaG9wLzEuMC8iIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNSBXaW5kb3dzIiB4bXA6Q3JlYXRlRGF0ZT0iMjAxOC0xMS0xN1QxMjozODoxNCswMTowMCIgeG1wOk1ldGFkYXRhRGF0ZT0iMjAxOC0xMS0xN1QxMjo0MDoxNCswMTowMCIgeG1wOk1vZGlmeURhdGU9IjIwMTgtMTEtMTdUMTI6NDA6MTQrMDE6MDAiIGRjOmZvcm1hdD0iaW1hZ2UvanBlZyIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDo5MUMwMEQ0NTVERUFFODExQjc5NEE2QTYwMjc4Q0Y5MCIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDo4RUMwMEQ0NTVERUFFODExQjc5NEE2QTYwMjc4Q0Y5MCIgeG1wTU06T3JpZ2luYWxEb2N1bWVudElEPSJ4bXAuZGlkOjhFQzAwRDQ1NURFQUU4MTFCNzk0QTZBNjAyNzhDRjkwIiBwaG90b3Nob3A6Q29sb3JNb2RlPSIzIiBwaG90b3Nob3A6SUNDUHJvZmlsZT0iQXBwbGUgUkdCIj4gPHhtcE1NOkhpc3Rvcnk+IDxyZGY6U2VxPiA8cmRmOmxpIHN0RXZ0OmFjdGlvbj0iY3JlYXRlZCIgc3RFdnQ6aW5zdGFuY2VJRD0ieG1wLmlpZDo4RUMwMEQ0NTVERUFFODExQjc5NEE2QTYwMjc4Q0Y5MCIgc3RFdnQ6d2hlbj0iMjAxOC0xMS0xN1QxMjozODoxNCswMTowMCIgc3RFdnQ6c29mdHdhcmVBZ2VudD0iQWRvYmUgUGhvdG9zaG9wIENTNSBXaW5kb3dzIi8+IDxyZGY6bGkgc3RFdnQ6YWN0aW9uPSJzYXZlZCIgc3RFdnQ6aW5zdGFuY2VJRD0ieG1wLmlpZDo4RkMwMEQ0NTVERUFFODExQjc5NEE2QTYwMjc4Q0Y5MCIgc3RFdnQ6d2hlbj0iMjAxOC0xMS0xN1QxMjo0MCswMTowMCIgc3RFdnQ6c29mdHdhcmVBZ2VudD0iQWRvYmUgUGhvdG9zaG9wIENTNSBXaW5kb3dzIiBzdEV2dDpjaGFuZ2VkPSIvIi8+IDxyZGY6bGkgc3RFdnQ6YWN0aW9uPSJzYXZlZCIgc3RFdnQ6aW5zdGFuY2VJRD0ieG1wLmlpZDo5MEMwMEQ0NTVERUFFODExQjc5NEE2QTYwMjc4Q0Y5MCIgc3RFdnQ6d2hlbj0iMjAxOC0xMS0xN1QxMjo0MDoxNCswMTowMCIgc3RFdnQ6c29mdHdhcmVBZ2VudD0iQWRvYmUgUGhvdG9zaG9wIENTNSBXaW5kb3dzIiBzdEV2dDpjaGFuZ2VkPSIvIi8+IDxyZGY6bGkgc3RFdnQ6YWN0aW9uPSJjb252ZXJ0ZWQiIHN0RXZ0OnBhcmFtZXRlcnM9ImZyb20gYXBwbGljYXRpb24vdm5kLmFkb2JlLnBob3Rvc2hvcCB0byBpbWFnZS9qcGVnIi8+IDxyZGY6bGkgc3RFdnQ6YWN0aW9uPSJkZXJpdmVkIiBzdEV2dDpwYXJhbWV0ZXJzPSJjb252ZXJ0ZWQgZnJvbSBhcHBsaWNhdGlvbi92bmQuYWRvYmUucGhvdG9zaG9wIHRvIGltYWdlL2pwZWciLz4gPHJkZjpsaSBzdEV2dDphY3Rpb249InNhdmVkIiBzdEV2dDppbnN0YW5jZUlEPSJ4bXAuaWlkOjkxQzAwRDQ1NURFQUU4MTFCNzk0QTZBNjAyNzhDRjkwIiBzdEV2dDp3aGVuPSIyMDE4LTExLTE3VDEyOjQwOjE0KzAxOjAwIiBzdEV2dDpzb2Z0d2FyZUFnZW50PSJBZG9iZSBQaG90b3Nob3AgQ1M1IFdpbmRvd3MiIHN0RXZ0OmNoYW5nZWQ9Ii8iLz4gPC9yZGY6U2VxPiA8L3htcE1NOkhpc3Rvcnk+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOjkwQzAwRDQ1NURFQUU4MTFCNzk0QTZBNjAyNzhDRjkwIiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOjhFQzAwRDQ1NURFQUU4MTFCNzk0QTZBNjAyNzhDRjkwIiBzdFJlZjpvcmlnaW5hbERvY3VtZW50SUQ9InhtcC5kaWQ6OEVDMDBENDU1REVBRTgxMUI3OTRBNkE2MDI3OENGOTAiLz4gPHBob3Rvc2hvcDpEb2N1bWVudEFuY2VzdG9ycz4gPHJkZjpCYWc+IDxyZGY6bGk+eG1wLmRpZDpEQzc3MkEyODFGMjA2ODExOTJCMDk2MURDQjQ3MzFCNzwvcmRmOmxpPiA8L3JkZjpCYWc+IDwvcGhvdG9zaG9wOkRvY3VtZW50QW5jZXN0b3JzPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8P3hwYWNrZXQgZW5kPSJ3Ij8+/+ICOElDQ19QUk9GSUxFAAEBAAACKEFEQkUCEAAAbW50clJHQiBYWVogB88ABgADAAAAAAAAYWNzcEFQUEwAAAAAbm9uZQAAAAAAAAAAAAAAAAAAAAEAAPbWAAEAAAAA0y1BREJFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAKY3BydAAAAPwAAAAyZGVzYwAAATAAAABkd3RwdAAAAZQAAAAUYmtwdAAAAagAAAAUclRSQwAAAbwAAAAOZ1RSQwAAAcwAAAAOYlRSQwAAAdwAAAAOclhZWgAAAewAAAAUZ1hZWgAAAgAAAAAUYlhZWgAAAhQAAAAUdGV4dAAAAABDb3B5cmlnaHQgMTk5OSBBZG9iZSBTeXN0ZW1zIEluY29ycG9yYXRlZAAAAGRlc2MAAAAAAAAACkFwcGxlIFJHQgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABYWVogAAAAAAAA81EAAQAAAAEWzFhZWiAAAAAAAAAAAAAAAAAAAAAAY3VydgAAAAAAAAABAc0AAGN1cnYAAAAAAAAAAQHNAABjdXJ2AAAAAAAAAAEBzQAAWFlaIAAAAAAAAHm9AABBUgAABLlYWVogAAAAAAAAVvgAAKwvAAAdA1hZWiAAAAAAAAAmIgAAEn8AALFw/+4ADkFkb2JlAGRAAAAAAf/bAIQAAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQICAgICAgICAgICAwMDAwMDAwMDAwEBAQEBAQEBAQEBAgIBAgIDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMD/8AAEQgAlwESAwERAAIRAQMRAf/dAAQAI//EAaIAAAAGAgMBAAAAAAAAAAAAAAcIBgUECQMKAgEACwEAAAYDAQEBAAAAAAAAAAAABgUEAwcCCAEJAAoLEAACAQMEAQMDAgMDAwIGCXUBAgMEEQUSBiEHEyIACDEUQTIjFQlRQhZhJDMXUnGBGGKRJUOhsfAmNHIKGcHRNSfhUzaC8ZKiRFRzRUY3R2MoVVZXGrLC0uLyZIN0k4Rlo7PD0+MpOGbzdSo5OkhJSlhZWmdoaWp2d3h5eoWGh4iJipSVlpeYmZqkpaanqKmqtLW2t7i5usTFxsfIycrU1dbX2Nna5OXm5+jp6vT19vf4+foRAAIBAwIEBAMFBAQEBgYFbQECAxEEIRIFMQYAIhNBUQcyYRRxCEKBI5EVUqFiFjMJsSTB0UNy8BfhgjQlklMYY0TxorImNRlUNkVkJwpzg5NGdMLS4vJVZXVWN4SFo7PD0+PzKRqUpLTE1OT0laW1xdXl9ShHV2Y4doaWprbG1ub2Z3eHl6e3x9fn90hYaHiImKi4yNjo+DlJWWl5iZmpucnZ6fkqOkpaanqKmqq6ytrq+v/aAAwDAQACEQMRAD8A3+Pfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691/9Df49+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3X/0d/j37r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvdf/S3+Pfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691/9Pf49+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3X/1N/j37r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvdf/V3+PfuvdV5fzKfl9v74V9G7Z7U692ttLd2VzXZ2E2NW47eRzK42DHZXbu6sw9bAcJXUFSKyOpwESDU5TRI3F7e5k9j/bfafdDmu/2DedwuLe3isHnVodGoskkSaTrVhSkhOBWoGeoW99PcrePa3lTb+YNlsLa5uZb9LcrPr0hXimfUNDKdQMYGTShPRRv5eH8zTvb5u777a62zGyOodj7g2v1PVb22NkcdDvKtxlTuCLO47BxU+56Sqz71c2CWbLQtKKR4agLfS17D3I3vN7F8p+1e08vb5b7ruV1ZT7isE6sYQ4jMbSExER0ElEYDWCteI6jX2Y9+ecPdXeOYtgn2nbLS+g21p4HUTshlEiRgSgyEmOsg1aCGpWh8uhS+E3zl+TXdnys7k+L/wAjuoOvurdxdSbDrtzVse05N0S1lZkafdW2cJRT01Tm8pXUWR2vmMXnTV0lVCg88bRsGALL7IPdL2p5F5W9v+WufOSuZLy/stxu1iUy+EFCmKVyCERWWVHj0OrHtOoU4HoQ+1Pu1z3zZ7g8z8hc7ct2W33u22bSsIfF1FxLEgIMjsrROkmtHUdwKkGnVmnbO7K/YPVnZe+sXTUtZk9l9f7y3bjqSu8v2NVX7c27kcxR01YIJIpzST1FGqyaHV9BNiDY+8bbqVoLa4mUVZI2YfaAT1ldyxtcO+cy8vbLcyMlteX0EDstNSrLKkbFagjUAxIqCK8R1o9p/wAKpvmoUUnoL4x3KqT/ALj+0fqRzx/p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TrPYey94b1yHY+6drbVwuC3Bv7LQy0+T3jl8bQw0tduOvgmrcjLFV5aojaZ1aomIZjd2+vvGTmHcbLd993fdNu2tLKwuLh5I7dCCsKMxKxqQqghBgUVeHAdZO8t7bfbNsGz7Vue7SX+429ukclw4Ied1UBpGBZiC5yas3HiehB9k/R31737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3X//09/j37r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvdf/U3+Pfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691/9Xf49+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3X/1t/j37r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvdf/X3+Pfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691/9Df49+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3X/0d/j37r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvdf/Z'
             var doc = new jsPDF()
 
             doc.addImage(imgData, 'JPEG', 150, 0, 50, 25)
             //title
             doc.setFontSize(16)
             doc.setFont('helvetica')
             doc.setFont(undefined, 'bold')
             doc.text(20, 30, 'Informe Final')
             doc.text(20,30, '____________')
       
             //info
             doc.setFontSize(12)
             doc.setFont('helvetica')
             doc.setFont(undefined, 'bold')
             doc.text(20, 40, 'Estudiante:')
             doc.text(20, 45, 'Instructor:')
             doc.text(20, 50, 'Duración de la simulación:')
             doc.text(20, 55, 'Límite de tiempo:')
             doc.text(20, 60, 'Constantes iniciales del paciente:')
             doc.setFont(undefined, 'normal')
             doc.text(45, 40, `${initialData.trainee.name} ${initialData.trainee.surname}`)
             doc.text(43, 45, `${initialData.trainer.name} ${initialData.trainer.surname}`)
             doc.text(75, 50, `${Math.trunc((this.state.timeSim-1)/60)} minutos ${(this.state.timeSim-1)%60} segundos`)
             doc.text(58, 55, `${this.state.time} minutos`)
             doc.text(89, 60, `${Math.round(this.state.heartRate,-1)} puls/min, ${Math.round(this.state.breathingRate,-1)} resp/min,`)
             doc.text(20, 65, `${Math.round(this.state.sistolicPressure,-1)} mmHg, ${Math.round(this.state.diastolicPressure,-1)} mmHg, ${Math.round(this.state.saturation,-1)} SatO2`)
       
             //Simulation
             doc.setFontSize(14)
             doc.setFont('helvetica')
             doc.setFont(undefined, 'normal')
             doc.text(20, 75, 'Desarrollo de la simulación:')
             doc.text(20, 75, '______________________')
             //eee = {min:0, seg:5, msg:"Mascarilla oxígeno",constants:[130,35, 90, 60, 85, 10, 200,34.2]}
             var i= 78
             var j = 80
             //content
             doc.setFontSize(12)
             //acciones
             this.information.forEach(e => {
                 doc.rect(24, i, 2, 2, 'F');
                 doc.text(30, j, `Tiempo ${e.min}:${(e.seg < 10 ? '0'+e.seg : e.seg)}`)
                 doc.setFont(undefined, 'bold')
                 doc.text(60, j, e.msg)
                 doc.setFont(undefined, 'normal')
                 i += 5
                 j += 5
                 doc.text(30, j,`${e.constants[0]} puls/min, ${e.constants[1]} resp/min, ${e.constants[2]} mmHg, ${e.constants[3]} mmHg, ${e.constants[4]} % SatO2`)
                 i += 7
                 j += 7
                 if(i === 270 || i > 270){
                     doc.addPage()
                     i=24
                     j=26
                 }
             });
             console.log(i);
             j=26
             doc.addPage()
             doc.setFontSize(16)
             doc.setFont('helvetica')
             doc.setFont(undefined, 'bold')
             doc.text(20, j, 'Evaluación:')
             doc.text(20, j, '_________')
             j=j+10
             doc.setFontSize(14)
             doc.setFont('helvetica')
             doc.setFont(undefined, 'bold')
             doc.text(20,j,`Nota:${this.state.Nota}` )
             doc.text(48,j,`%` )
      
             j=j+10
             doc.setFontSize(14)
             doc.setFont('helvetica')
             doc.setFont(undefined, 'bold')
             doc.text(20,j,'Sección 1')
             doc.text(20, j, '________')
             j=j+10
             doc.setFontSize(11)
             doc.setFont(undefined, 'normal')
             doc.text(20, j, `Número de acciones correctas realizadas: ${this.state.matches}`)
             j=j+7
             doc.text(20, j, `Número de veces que no has actuado: ${this.state.gasp}`)
             j=j+7
             doc.text(20,j,`Número de acciones intercambiadas realizadas: ${this.state.swap}`)
             j=j+7
             doc.text(20,j,`Número de acciones incorrectas realizadas: ${this.state.mismatches}`)
             j=j+7
             doc.text(20,j,`Número de acciones contrarias realizadas: ${this.state.contr}`)
             j=j+7
             doc.text(20,j,`Balance entre acciones correctas e incorrectas:  ${this.state.GA}%`)
             j=j+10
             doc.setFontSize(14)
             doc.setFont('helvetica')
             doc.setFont(undefined, 'bold')
             doc.text(20,j,'Sección 2')
             doc.text(20, j, '________')
             j=j+10
             doc.setFontSize(11)
             doc.setFont(undefined, 'normal')
             doc.text(20,j,`Acciones realizadas en el momento oportuno: ${Math.round(this.state.Diag,-1)}%`)
             j=j+5
             doc.text(19,j,` Acciones realizadas de forma secuencial: ${this.state.GA}%`)
             j=j+10
             doc.setFontSize(14)
             doc.setFont('helvetica')
             doc.setFont(undefined, 'bold')
             doc.text(20,j,'Sección 3')
             doc.text(20, j, '________')
             j=j+10
             doc.setFontSize(10)
             doc.setFont(undefined, 'normal')
             doc.text(20,j,`Porcentaje de acciones que debían realizarse y se realizaron: ${this.state.Recall}%`)
             j=j+5
             doc.text(20,j,`Porcentaje de acciones que deberían realizarse y se realizaron y que no debían realizarse y no se realizaron:${this.state.Accuracy}%`)
             j=j+5
             doc.text(20,j,`Porcentaje de acciones que deberían realizarse con respecto a todas las acciones que se han llevado a cabo: ${this.state.Precision}%`)
             j=j+5
             doc.text(20,j,`Porcentaje de acciones que no deberían realizarse y no se realizaron:  ${this.state.Specificity}%`)
             

             
             // Save the Data
             var file = btoa(doc.output())                
             const baseUrl = "http://localhost:8080/simulation/update/"+this.props.match.params.id
             // parametros de datos post
             const datapost2 = {
                 inform: file,
                 testDataJSON: JSON.stringify(testData)
             }
         
             axios.post(baseUrl,datapost2)
             .then(response=>{
                 if (response.data.success===true) {
                    // alert(response.data.message)
                    
                 
                   
                     
                 }
                 else {
                     alert("Error")
                 }
                 })
             .catch(error=>{
                 alert("Error 34 "+error)
             })
            
           })
           .catch(error=>{
             alert("Error server "+error)
           })
      }
      else if( this.state.partBody=='pelvis' && this.state.phase=='hospitalaria') {
        axios.get("http://localhost:8080/trainee/evaluacionPH/"+this.props.match.params.id+"/"+this.state.traineeId)
          .then(res => {
            if(res.data.Nota<0){
              this.setState({matches: res.data.matches, swap: res.data.swap, contr: res.data.contr, gasp: res.data.gasp, mismatches: res.data.mismatches,GA:res.data.GA, Diag: res.data.Diag, Subseq: res.data.Subseq, Precision:res.data.Precision,Recall: res.data.Recall,Specificity:res.data.Specificity,Accuracy:res.data.Accuracy,F1:res.data.F1,Nota:0
               });
              }else{
                this.setState({matches: res.data.matches, swap: res.data.swap, contr: res.data.contr, gasp: res.data.gasp, mismatches: res.data.mismatches,GA:res.data.GA, Diag: res.data.Diag, Subseq: res.data.Subseq, Precision:res.data.Precision,Recall: res.data.Recall,Specificity:res.data.Specificity,Accuracy:res.data.Accuracy,F1:res.data.F1,Nota:res.data.Nota
                });

              }
             const datapost = {
              traineeId:this.state.traineeId,
              simulationId:this.props.match.params.id,
              matches: this.state.matches,
              swap:this.state.swap,
              contr:this.state.contr,
              gasp:this.state.gasp,
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
          }
      
      
      
            axios.post("http://localhost:8080/results/create", datapost)
            .then(res => {
              this.setState({
                finish: true
            })
             
             })
             .catch(error=>{
               alert("Error server "+error)
             })
             
             
             var imgData = 'data:image/jpeg;base64,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IABGADQAMQAwADAAIABzAGUAcgBpAGUAcwAAADhCSU0EOwAAAAABsgAAABAAAAABAAAAAAAScHJpbnRPdXRwdXRPcHRpb25zAAAAEgAAAABDcHRuYm9vbAAAAAAAQ2xicmJvb2wAAAAAAFJnc01ib29sAAAAAABDcm5DYm9vbAAAAAAAQ250Q2Jvb2wAAAAAAExibHNib29sAAAAAABOZ3R2Ym9vbAAAAAAARW1sRGJvb2wAAAAAAEludHJib29sAAAAAABCY2tnT2JqYwAAAAEAAAAAAABSR0JDAAAAAwAAAABSZCAgZG91YkBv4AAAAAAAAAAAAEdybiBkb3ViQG/gAAAAAAAAAAAAQmwgIGRvdWJAb+AAAAAAAAAAAABCcmRUVW50RiNSbHQAAAAAAAAAAAAAAABCbGQgVW50RiNSbHQAAAAAAAAAAAAAAABSc2x0VW50RiNQeGxAWADEgAAAAAAAAAp2ZWN0b3JEYXRhYm9vbAEAAAAAUGdQc2VudW0AAAAAUGdQcwAAAABQZ1BDAAAAAExlZnRVbnRGI1JsdAAAAAAAAAAAAAAAAFRvcCBVbnRGI1JsdAAAAAAAAAAAAAAAAFNjbCBVbnRGI1ByY0BZAAAAAAAAOEJJTQPtAAAAAAAQAGADEgABAAIAYAMSAAEAAjhCSU0EJgAAAAAADgAAAAAAAAAAAAA/gAAAOEJJTQQNAAAAAAAEAAAAeDhCSU0EGQAAAAAABAAAAB44QklNA/MAAAAAAAkAAAAAAAAAAAEAOEJJTScQAAAAAAAKAAEAAAAAAAAAAjhCSU0D9QAAAAAASAAvZmYAAQBsZmYABgAAAAAAAQAvZmYAAQChmZoABgAAAAAAAQAyAAAAAQBaAAAABgAAAAAAAQA1AAAAAQAtAAAABgAAAAAAAThCSU0D+AAAAAAAcAAA/////////////////////////////wPoAAAAAP////////////////////////////8D6AAAAAD/////////////////////////////A+gAAAAA/////////////////////////////wPoAAA4QklNBAAAAAAAAAIABThCSU0EAgAAAAAADAAAAAAAAAAAAAAAADhCSU0EMAAAAAAABgEBAQEBAThCSU0ELQAAAAAABgABAAAACThCSU0ECAAAAAAAEAAA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cy5hZG9iZS5jb20veGFwLzEuMC8APD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4gPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgNS4wLWMwNjAgNjEuMTM0Nzc3LCAyMDEwLzAyLzEyLTE3OjMyOjAwICAgICAgICAiPiA8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPiA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtbG5zOmRjPSJodHRwOi8vcHVybC5vcmcvZGMvZWxlbWVudHMvMS4xLyIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0RXZ0PSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VFdmVudCMiIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczpwaG90b3Nob3A9Imh0dHA6Ly9ucy5hZG9iZS5jb20vcGhvdG9zaG9wLzEuMC8iIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNSBXaW5kb3dzIiB4bXA6Q3JlYXRlRGF0ZT0iMjAxOC0xMS0xN1QxMjozODoxNCswMTowMCIgeG1wOk1ldGFkYXRhRGF0ZT0iMjAxOC0xMS0xN1QxMjo0MDoxNCswMTowMCIgeG1wOk1vZGlmeURhdGU9IjIwMTgtMTEtMTdUMTI6NDA6MTQrMDE6MDAiIGRjOmZvcm1hdD0iaW1hZ2UvanBlZyIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDo5MUMwMEQ0NTVERUFFODExQjc5NEE2QTYwMjc4Q0Y5MCIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDo4RUMwMEQ0NTVERUFFODExQjc5NEE2QTYwMjc4Q0Y5MCIgeG1wTU06T3JpZ2luYWxEb2N1bWVudElEPSJ4bXAuZGlkOjhFQzAwRDQ1NURFQUU4MTFCNzk0QTZBNjAyNzhDRjkwIiBwaG90b3Nob3A6Q29sb3JNb2RlPSIzIiBwaG90b3Nob3A6SUNDUHJvZmlsZT0iQXBwbGUgUkdCIj4gPHhtcE1NOkhpc3Rvcnk+IDxyZGY6U2VxPiA8cmRmOmxpIHN0RXZ0OmFjdGlvbj0iY3JlYXRlZCIgc3RFdnQ6aW5zdGFuY2VJRD0ieG1wLmlpZDo4RUMwMEQ0NTVERUFFODExQjc5NEE2QTYwMjc4Q0Y5MCIgc3RFdnQ6d2hlbj0iMjAxOC0xMS0xN1QxMjozODoxNCswMTowMCIgc3RFdnQ6c29mdHdhcmVBZ2VudD0iQWRvYmUgUGhvdG9zaG9wIENTNSBXaW5kb3dzIi8+IDxyZGY6bGkgc3RFdnQ6YWN0aW9uPSJzYXZlZCIgc3RFdnQ6aW5zdGFuY2VJRD0ieG1wLmlpZDo4RkMwMEQ0NTVERUFFODExQjc5NEE2QTYwMjc4Q0Y5MCIgc3RFdnQ6d2hlbj0iMjAxOC0xMS0xN1QxMjo0MCswMTowMCIgc3RFdnQ6c29mdHdhcmVBZ2VudD0iQWRvYmUgUGhvdG9zaG9wIENTNSBXaW5kb3dzIiBzdEV2dDpjaGFuZ2VkPSIvIi8+IDxyZGY6bGkgc3RFdnQ6YWN0aW9uPSJzYXZlZCIgc3RFdnQ6aW5zdGFuY2VJRD0ieG1wLmlpZDo5MEMwMEQ0NTVERUFFODExQjc5NEE2QTYwMjc4Q0Y5MCIgc3RFdnQ6d2hlbj0iMjAxOC0xMS0xN1QxMjo0MDoxNCswMTowMCIgc3RFdnQ6c29mdHdhcmVBZ2VudD0iQWRvYmUgUGhvdG9zaG9wIENTNSBXaW5kb3dzIiBzdEV2dDpjaGFuZ2VkPSIvIi8+IDxyZGY6bGkgc3RFdnQ6YWN0aW9uPSJjb252ZXJ0ZWQiIHN0RXZ0OnBhcmFtZXRlcnM9ImZyb20gYXBwbGljYXRpb24vdm5kLmFkb2JlLnBob3Rvc2hvcCB0byBpbWFnZS9qcGVnIi8+IDxyZGY6bGkgc3RFdnQ6YWN0aW9uPSJkZXJpdmVkIiBzdEV2dDpwYXJhbWV0ZXJzPSJjb252ZXJ0ZWQgZnJvbSBhcHBsaWNhdGlvbi92bmQuYWRvYmUucGhvdG9zaG9wIHRvIGltYWdlL2pwZWciLz4gPHJkZjpsaSBzdEV2dDphY3Rpb249InNhdmVkIiBzdEV2dDppbnN0YW5jZUlEPSJ4bXAuaWlkOjkxQzAwRDQ1NURFQUU4MTFCNzk0QTZBNjAyNzhDRjkwIiBzdEV2dDp3aGVuPSIyMDE4LTExLTE3VDEyOjQwOjE0KzAxOjAwIiBzdEV2dDpzb2Z0d2FyZUFnZW50PSJBZG9iZSBQaG90b3Nob3AgQ1M1IFdpbmRvd3MiIHN0RXZ0OmNoYW5nZWQ9Ii8iLz4gPC9yZGY6U2VxPiA8L3htcE1NOkhpc3Rvcnk+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOjkwQzAwRDQ1NURFQUU4MTFCNzk0QTZBNjAyNzhDRjkwIiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOjhFQzAwRDQ1NURFQUU4MTFCNzk0QTZBNjAyNzhDRjkwIiBzdFJlZjpvcmlnaW5hbERvY3VtZW50SUQ9InhtcC5kaWQ6OEVDMDBENDU1REVBRTgxMUI3OTRBNkE2MDI3OENGOTAiLz4gPHBob3Rvc2hvcDpEb2N1bWVudEFuY2VzdG9ycz4gPHJkZjpCYWc+IDxyZGY6bGk+eG1wLmRpZDpEQzc3MkEyODFGMjA2ODExOTJCMDk2MURDQjQ3MzFCNzwvcmRmOmxpPiA8L3JkZjpCYWc+IDwvcGhvdG9zaG9wOkRvY3VtZW50QW5jZXN0b3JzPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8P3hwYWNrZXQgZW5kPSJ3Ij8+/+ICOElDQ19QUk9GSUxFAAEBAAACKEFEQkUCEAAAbW50clJHQiBYWVogB88ABgADAAAAAAAAYWNzcEFQUEwAAAAAbm9uZQAAAAAAAAAAAAAAAAAAAAEAAPbWAAEAAAAA0y1BREJFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAKY3BydAAAAPwAAAAyZGVzYwAAATAAAABkd3RwdAAAAZQAAAAUYmtwdAAAAagAAAAUclRSQwAAAbwAAAAOZ1RSQwAAAcwAAAAOYlRSQwAAAdwAAAAOclhZWgAAAewAAAAUZ1hZWgAAAgAAAAAUYlhZWgAAAhQAAAAUdGV4dAAAAABDb3B5cmlnaHQgMTk5OSBBZG9iZSBTeXN0ZW1zIEluY29ycG9yYXRlZAAAAGRlc2MAAAAAAAAACkFwcGxlIFJHQgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABYWVogAAAAAAAA81EAAQAAAAEWzFhZWiAAAAAAAAAAAAAAAAAAAAAAY3VydgAAAAAAAAABAc0AAGN1cnYAAAAAAAAAAQHNAABjdXJ2AAAAAAAAAAEBzQAAWFlaIAAAAAAAAHm9AABBUgAABLlYWVogAAAAAAAAVvgAAKwvAAAdA1hZWiAAAAAAAAAmIgAAEn8AALFw/+4ADkFkb2JlAGRAAAAAAf/bAIQAAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQICAgICAgICAgICAwMDAwMDAwMDAwEBAQEBAQEBAQEBAgIBAgIDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMD/8AAEQgAlwESAwERAAIRAQMRAf/dAAQAI//EAaIAAAAGAgMBAAAAAAAAAAAAAAcIBgUECQMKAgEACwEAAAYDAQEBAAAAAAAAAAAABgUEAwcCCAEJAAoLEAACAQMEAQMDAgMDAwIGCXUBAgMEEQUSBiEHEyIACDEUQTIjFQlRQhZhJDMXUnGBGGKRJUOhsfAmNHIKGcHRNSfhUzaC8ZKiRFRzRUY3R2MoVVZXGrLC0uLyZIN0k4Rlo7PD0+MpOGbzdSo5OkhJSlhZWmdoaWp2d3h5eoWGh4iJipSVlpeYmZqkpaanqKmqtLW2t7i5usTFxsfIycrU1dbX2Nna5OXm5+jp6vT19vf4+foRAAIBAwIEBAMFBAQEBgYFbQECAxEEIRIFMQYAIhNBUQcyYRRxCEKBI5EVUqFiFjMJsSTB0UNy8BfhgjQlklMYY0TxorImNRlUNkVkJwpzg5NGdMLS4vJVZXVWN4SFo7PD0+PzKRqUpLTE1OT0laW1xdXl9ShHV2Y4doaWprbG1ub2Z3eHl6e3x9fn90hYaHiImKi4yNjo+DlJWWl5iZmpucnZ6fkqOkpaanqKmqq6ytrq+v/aAAwDAQACEQMRAD8A3+Pfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691/9Df49+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3X/0d/j37r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvdf/S3+Pfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691/9Pf49+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3X/1N/j37r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvdf/V3+PfuvdV5fzKfl9v74V9G7Z7U692ttLd2VzXZ2E2NW47eRzK42DHZXbu6sw9bAcJXUFSKyOpwESDU5TRI3F7e5k9j/bfafdDmu/2DedwuLe3isHnVodGoskkSaTrVhSkhOBWoGeoW99PcrePa3lTb+YNlsLa5uZb9LcrPr0hXimfUNDKdQMYGTShPRRv5eH8zTvb5u777a62zGyOodj7g2v1PVb22NkcdDvKtxlTuCLO47BxU+56Sqz71c2CWbLQtKKR4agLfS17D3I3vN7F8p+1e08vb5b7ruV1ZT7isE6sYQ4jMbSExER0ElEYDWCteI6jX2Y9+ecPdXeOYtgn2nbLS+g21p4HUTshlEiRgSgyEmOsg1aCGpWh8uhS+E3zl+TXdnys7k+L/wAjuoOvurdxdSbDrtzVse05N0S1lZkafdW2cJRT01Tm8pXUWR2vmMXnTV0lVCg88bRsGALL7IPdL2p5F5W9v+WufOSuZLy/stxu1iUy+EFCmKVyCERWWVHj0OrHtOoU4HoQ+1Pu1z3zZ7g8z8hc7ct2W33u22bSsIfF1FxLEgIMjsrROkmtHUdwKkGnVmnbO7K/YPVnZe+sXTUtZk9l9f7y3bjqSu8v2NVX7c27kcxR01YIJIpzST1FGqyaHV9BNiDY+8bbqVoLa4mUVZI2YfaAT1ldyxtcO+cy8vbLcyMlteX0EDstNSrLKkbFagjUAxIqCK8R1o9p/wAKpvmoUUnoL4x3KqT/ALj+0fqRzx/p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TrPYey94b1yHY+6drbVwuC3Bv7LQy0+T3jl8bQw0tduOvgmrcjLFV5aojaZ1aomIZjd2+vvGTmHcbLd993fdNu2tLKwuLh5I7dCCsKMxKxqQqghBgUVeHAdZO8t7bfbNsGz7Vue7SX+429ukclw4Ied1UBpGBZiC5yas3HiehB9k/R31737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3X//09/j37r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvdf/U3+Pfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691/9Xf49+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3X/1t/j37r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvdf/X3+Pfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691/9Df49+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3X/0d/j37r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvdf/Z'
             var doc = new jsPDF()
 
             doc.addImage(imgData, 'JPEG', 150, 0, 50, 25)
             //title
             doc.setFontSize(16)
             doc.setFont('helvetica')
             doc.setFont(undefined, 'bold')
             doc.text(20, 30, 'Informe Final')
             doc.text(20,30, '____________')
       
             //info
             doc.setFontSize(12)
             doc.setFont('helvetica')
             doc.setFont(undefined, 'bold')
             doc.text(20, 40, 'Estudiante:')
             doc.text(20, 45, 'Instructor:')
             doc.text(20, 50, 'Duración de la simulación:')
             doc.text(20, 55, 'Límite de tiempo:')
             doc.text(20, 60, 'Constantes iniciales del paciente:')
             doc.setFont(undefined, 'normal')
             doc.text(45, 40, `${initialData.trainee.name} ${initialData.trainee.surname}`)
             doc.text(43, 45, `${initialData.trainer.name} ${initialData.trainer.surname}`)
             doc.text(75, 50, `${Math.trunc((this.state.timeSim-1)/60)} minutos ${(this.state.timeSim-1)%60} segundos`)
             doc.text(58, 55, `${this.state.time} minutos`)
             doc.text(89, 60, `${Math.round(this.state.heartRate,-1)} puls/min, ${Math.round(this.state.breathingRate,-1)} resp/min,`)
             doc.text(20, 65, `${Math.round(this.state.sistolicPressure,-1)} mmHg, ${Math.round(this.state.diastolicPressure,-1)} mmHg, ${Math.round(this.state.saturation,-1)} SatO2`)
       
             //Simulation
             doc.setFontSize(14)
             doc.setFont('helvetica')
             doc.setFont(undefined, 'normal')
             doc.text(20, 75, 'Desarrollo de la simulación:')
             doc.text(20, 75, '______________________')
             //eee = {min:0, seg:5, msg:"Mascarilla oxígeno",constants:[130,35, 90, 60, 85, 10, 200,34.2]}
             var i= 78
             var j = 80
             //content
             doc.setFontSize(12)
             //acciones
             this.information.forEach(e => {
                 doc.rect(24, i, 2, 2, 'F');
                 doc.text(30, j, `Tiempo ${e.min}:${(e.seg < 10 ? '0'+e.seg : e.seg)}`)
                 doc.setFont(undefined, 'bold')
                 doc.text(60, j, e.msg)
                 doc.setFont(undefined, 'normal')
                 i += 5
                 j += 5
                 doc.text(30, j,`${e.constants[0]} puls/min, ${e.constants[1]} resp/min, ${e.constants[2]} mmHg, ${e.constants[3]} mmHg, ${e.constants[4]} % SatO2`)
                 i += 7
                 j += 7
                 if(i === 270 || i > 270){
                     doc.addPage()
                     i=24
                     j=26
                 }
             });
             console.log(i);
             j=26
             doc.addPage()
             doc.setFontSize(16)
             doc.setFont('helvetica')
             doc.setFont(undefined, 'bold')
             doc.text(20, j, 'Evaluación:')
             doc.text(20, j, '_________')
             j=j+10
             doc.setFontSize(14)
             doc.setFont('helvetica')
             doc.setFont(undefined, 'bold')
             doc.text(20,j,`Nota:${this.state.Nota}` )
             doc.text(48,j,`%` )
      
             j=j+10
             doc.setFontSize(14)
             doc.setFont('helvetica')
             doc.setFont(undefined, 'bold')
             doc.text(20,j,'Sección 1')
             doc.text(20, j, '________')
             j=j+10
             doc.setFontSize(11)
             doc.setFont(undefined, 'normal')
             doc.text(20, j, `Número de acciones correctas realizadas: ${this.state.matches}`)
             j=j+7
             doc.text(20, j, `Número de veces que no has actuado: ${this.state.gasp}`)
             j=j+7
             doc.text(20,j,`Número de acciones intercambiadas realizadas: ${this.state.swap}`)
             j=j+7
             doc.text(20,j,`Número de acciones incorrectas realizadas: ${this.state.mismatches}`)
             j=j+7
             doc.text(20,j,`Número de acciones contrarias realizadas: ${this.state.contr}`)
             j=j+7
             doc.text(20,j,`Balance entre acciones correctas e incorrectas:  ${this.state.GA}%`)
             j=j+10
             doc.setFontSize(14)
             doc.setFont('helvetica')
             doc.setFont(undefined, 'bold')
             doc.text(20,j,'Sección 2')
             doc.text(20, j, '________')
             j=j+10
             doc.setFontSize(11)
             doc.setFont(undefined, 'normal')
             doc.text(20,j,`Acciones realizadas en el momento oportuno: ${Math.round(this.state.Diag,-1)}%`)
             j=j+5
             doc.text(19,j,` Acciones realizadas de forma secuencial: ${this.state.GA}%`)
             j=j+10
             doc.setFontSize(14)
             doc.setFont('helvetica')
             doc.setFont(undefined, 'bold')
             doc.text(20,j,'Sección 3')
             doc.text(20, j, '________')
             j=j+10
             doc.setFontSize(10)
             doc.setFont(undefined, 'normal')
             doc.text(20,j,`Porcentaje de acciones que debían realizarse y se realizaron: ${this.state.Recall}%`)
             j=j+5
             doc.text(20,j,`Porcentaje de acciones que deberían realizarse y se realizaron y que no debían realizarse y no se realizaron:${this.state.Accuracy}%`)
             j=j+5
             doc.text(20,j,`Porcentaje de acciones que deberían realizarse con respecto a todas las acciones que se han llevado a cabo: ${this.state.Precision}%`)
             j=j+5
             doc.text(20,j,`Porcentaje de acciones que no deberían realizarse y no se realizaron:  ${this.state.Specificity}%`)
            
             
            
             
            
             
            /* doc.text(20, j, `Acciones intercambiadas: ${this.state.swap}`)
             j=+5
             doc.text(20, j, `Acciones contrarias: ${this.state.contr}`)
             j=+5
             doc.text(30, j, `Acciones no realizadas: ${this.state.gasp}`)
             j=+5
             doc.text(30, j, `Acciones erróneas: ${this.state.mismatches}`)
             j=+5
             doc.text(30, j, `Acciones erróneas: ${this.state.GA}`)*/
             
             // Save the Data
             var file = btoa(doc.output())                
             const baseUrl = "http://localhost:8080/simulation/update/"+this.props.match.params.id
             // parametros de datos post
             const datapost2 = {
                 inform: file,
                 testDataJSON: JSON.stringify(testData)
             }
         
             axios.post(baseUrl,datapost2)
             .then(response=>{
                 if (response.data.success===true) {
                    // alert(response.data.message)
                    
                 
                   
                     
                 }
                 else {
                     alert("Error")
                 }
                 })
             .catch(error=>{
                 alert("Error 34 "+error)
             })
            
           })
           .catch(error=>{
             alert("Error server "+error)
           })
      }
      else if( this.state.partBody=='pelvis' && this.state.phase=='prehospitalaria') {
        axios.get("http://localhost:8080/trainee/evaluacionPP/"+this.props.match.params.id+"/"+this.state.traineeId)
        .then(res => {
          if(res.data.Nota<0){
            this.setState({matches: res.data.matches, swap: res.data.swap, contr: res.data.contr, gasp: res.data.gasp, mismatches: res.data.mismatches,GA:res.data.GA, Diag: res.data.Diag, Subseq: res.data.Subseq, Precision:res.data.Precision,Recall: res.data.Recall,Specificity:res.data.Specificity,Accuracy:res.data.Accuracy,F1:res.data.F1,Nota:0
             });
            }else{
              this.setState({matches: res.data.matches, swap: res.data.swap, contr: res.data.contr, gasp: res.data.gasp, mismatches: res.data.mismatches,GA:res.data.GA, Diag: res.data.Diag, Subseq: res.data.Subseq, Precision:res.data.Precision,Recall: res.data.Recall,Specificity:res.data.Specificity,Accuracy:res.data.Accuracy,F1:res.data.F1,Nota:res.data.Nota
              });

            }
             const datapost = {
              traineeId:this.state.traineeId,
              simulationId:this.props.match.params.id,
              matches: this.state.matches,
              swap:this.state.swap,
              contr:this.state.contr,
              gasp:this.state.gasp,
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
          }
      
      
      
            axios.post("http://localhost:8080/results/create", datapost)
            .then(res => {
              this.setState({
                finish: true
            })
             
             })
             .catch(error=>{
               alert("Error server "+error)
             })
             
       var imgData = 'data:image/jpeg;base64,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IABGADQAMQAwADAAIABzAGUAcgBpAGUAcwAAADhCSU0EOwAAAAABsgAAABAAAAABAAAAAAAScHJpbnRPdXRwdXRPcHRpb25zAAAAEgAAAABDcHRuYm9vbAAAAAAAQ2xicmJvb2wAAAAAAFJnc01ib29sAAAAAABDcm5DYm9vbAAAAAAAQ250Q2Jvb2wAAAAAAExibHNib29sAAAAAABOZ3R2Ym9vbAAAAAAARW1sRGJvb2wAAAAAAEludHJib29sAAAAAABCY2tnT2JqYwAAAAEAAAAAAABSR0JDAAAAAwAAAABSZCAgZG91YkBv4AAAAAAAAAAAAEdybiBkb3ViQG/gAAAAAAAAAAAAQmwgIGRvdWJAb+AAAAAAAAAAAABCcmRUVW50RiNSbHQAAAAAAAAAAAAAAABCbGQgVW50RiNSbHQAAAAAAAAAAAAAAABSc2x0VW50RiNQeGxAWADEgAAAAAAAAAp2ZWN0b3JEYXRhYm9vbAEAAAAAUGdQc2VudW0AAAAAUGdQcwAAAABQZ1BDAAAAAExlZnRVbnRGI1JsdAAAAAAAAAAAAAAAAFRvcCBVbnRGI1JsdAAAAAAAAAAAAAAAAFNjbCBVbnRGI1ByY0BZAAAAAAAAOEJJTQPtAAAAAAAQAGADEgABAAIAYAMSAAEAAjhCSU0EJgAAAAAADgAAAAAAAAAAAAA/gAAAOEJJTQQNAAAAAAAEAAAAeDhCSU0EGQAAAAAABAAAAB44QklNA/MAAAAAAAkAAAAAAAAAAAEAOEJJTScQAAAAAAAKAAEAAAAAAAAAAjhCSU0D9QAAAAAASAAvZmYAAQBsZmYABgAAAAAAAQAvZmYAAQChmZoABgAAAAAAAQAyAAAAAQBaAAAABgAAAAAAAQA1AAAAAQAtAAAABgAAAAAAAThCSU0D+AAAAAAAcAAA/////////////////////////////wPoAAAAAP////////////////////////////8D6AAAAAD/////////////////////////////A+gAAAAA/////////////////////////////wPoAAA4QklNBAAAAAAAAAIABThCSU0EAgAAAAAADAAAAAAAAAAAAAAAADhCSU0EMAAAAAAABgEBAQEBAThCSU0ELQAAAAAABgABAAAACThCSU0ECAAAAAAAEAAA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cy5hZG9iZS5jb20veGFwLzEuMC8APD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4gPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgNS4wLWMwNjAgNjEuMTM0Nzc3LCAyMDEwLzAyLzEyLTE3OjMyOjAwICAgICAgICAiPiA8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPiA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtbG5zOmRjPSJodHRwOi8vcHVybC5vcmcvZGMvZWxlbWVudHMvMS4xLyIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0RXZ0PSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VFdmVudCMiIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczpwaG90b3Nob3A9Imh0dHA6Ly9ucy5hZG9iZS5jb20vcGhvdG9zaG9wLzEuMC8iIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNSBXaW5kb3dzIiB4bXA6Q3JlYXRlRGF0ZT0iMjAxOC0xMS0xN1QxMjozODoxNCswMTowMCIgeG1wOk1ldGFkYXRhRGF0ZT0iMjAxOC0xMS0xN1QxMjo0MDoxNCswMTowMCIgeG1wOk1vZGlmeURhdGU9IjIwMTgtMTEtMTdUMTI6NDA6MTQrMDE6MDAiIGRjOmZvcm1hdD0iaW1hZ2UvanBlZyIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDo5MUMwMEQ0NTVERUFFODExQjc5NEE2QTYwMjc4Q0Y5MCIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDo4RUMwMEQ0NTVERUFFODExQjc5NEE2QTYwMjc4Q0Y5MCIgeG1wTU06T3JpZ2luYWxEb2N1bWVudElEPSJ4bXAuZGlkOjhFQzAwRDQ1NURFQUU4MTFCNzk0QTZBNjAyNzhDRjkwIiBwaG90b3Nob3A6Q29sb3JNb2RlPSIzIiBwaG90b3Nob3A6SUNDUHJvZmlsZT0iQXBwbGUgUkdCIj4gPHhtcE1NOkhpc3Rvcnk+IDxyZGY6U2VxPiA8cmRmOmxpIHN0RXZ0OmFjdGlvbj0iY3JlYXRlZCIgc3RFdnQ6aW5zdGFuY2VJRD0ieG1wLmlpZDo4RUMwMEQ0NTVERUFFODExQjc5NEE2QTYwMjc4Q0Y5MCIgc3RFdnQ6d2hlbj0iMjAxOC0xMS0xN1QxMjozODoxNCswMTowMCIgc3RFdnQ6c29mdHdhcmVBZ2VudD0iQWRvYmUgUGhvdG9zaG9wIENTNSBXaW5kb3dzIi8+IDxyZGY6bGkgc3RFdnQ6YWN0aW9uPSJzYXZlZCIgc3RFdnQ6aW5zdGFuY2VJRD0ieG1wLmlpZDo4RkMwMEQ0NTVERUFFODExQjc5NEE2QTYwMjc4Q0Y5MCIgc3RFdnQ6d2hlbj0iMjAxOC0xMS0xN1QxMjo0MCswMTowMCIgc3RFdnQ6c29mdHdhcmVBZ2VudD0iQWRvYmUgUGhvdG9zaG9wIENTNSBXaW5kb3dzIiBzdEV2dDpjaGFuZ2VkPSIvIi8+IDxyZGY6bGkgc3RFdnQ6YWN0aW9uPSJzYXZlZCIgc3RFdnQ6aW5zdGFuY2VJRD0ieG1wLmlpZDo5MEMwMEQ0NTVERUFFODExQjc5NEE2QTYwMjc4Q0Y5MCIgc3RFdnQ6d2hlbj0iMjAxOC0xMS0xN1QxMjo0MDoxNCswMTowMCIgc3RFdnQ6c29mdHdhcmVBZ2VudD0iQWRvYmUgUGhvdG9zaG9wIENTNSBXaW5kb3dzIiBzdEV2dDpjaGFuZ2VkPSIvIi8+IDxyZGY6bGkgc3RFdnQ6YWN0aW9uPSJjb252ZXJ0ZWQiIHN0RXZ0OnBhcmFtZXRlcnM9ImZyb20gYXBwbGljYXRpb24vdm5kLmFkb2JlLnBob3Rvc2hvcCB0byBpbWFnZS9qcGVnIi8+IDxyZGY6bGkgc3RFdnQ6YWN0aW9uPSJkZXJpdmVkIiBzdEV2dDpwYXJhbWV0ZXJzPSJjb252ZXJ0ZWQgZnJvbSBhcHBsaWNhdGlvbi92bmQuYWRvYmUucGhvdG9zaG9wIHRvIGltYWdlL2pwZWciLz4gPHJkZjpsaSBzdEV2dDphY3Rpb249InNhdmVkIiBzdEV2dDppbnN0YW5jZUlEPSJ4bXAuaWlkOjkxQzAwRDQ1NURFQUU4MTFCNzk0QTZBNjAyNzhDRjkwIiBzdEV2dDp3aGVuPSIyMDE4LTExLTE3VDEyOjQwOjE0KzAxOjAwIiBzdEV2dDpzb2Z0d2FyZUFnZW50PSJBZG9iZSBQaG90b3Nob3AgQ1M1IFdpbmRvd3MiIHN0RXZ0OmNoYW5nZWQ9Ii8iLz4gPC9yZGY6U2VxPiA8L3htcE1NOkhpc3Rvcnk+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOjkwQzAwRDQ1NURFQUU4MTFCNzk0QTZBNjAyNzhDRjkwIiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOjhFQzAwRDQ1NURFQUU4MTFCNzk0QTZBNjAyNzhDRjkwIiBzdFJlZjpvcmlnaW5hbERvY3VtZW50SUQ9InhtcC5kaWQ6OEVDMDBENDU1REVBRTgxMUI3OTRBNkE2MDI3OENGOTAiLz4gPHBob3Rvc2hvcDpEb2N1bWVudEFuY2VzdG9ycz4gPHJkZjpCYWc+IDxyZGY6bGk+eG1wLmRpZDpEQzc3MkEyODFGMjA2ODExOTJCMDk2MURDQjQ3MzFCNzwvcmRmOmxpPiA8L3JkZjpCYWc+IDwvcGhvdG9zaG9wOkRvY3VtZW50QW5jZXN0b3JzPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8P3hwYWNrZXQgZW5kPSJ3Ij8+/+ICOElDQ19QUk9GSUxFAAEBAAACKEFEQkUCEAAAbW50clJHQiBYWVogB88ABgADAAAAAAAAYWNzcEFQUEwAAAAAbm9uZQAAAAAAAAAAAAAAAAAAAAEAAPbWAAEAAAAA0y1BREJFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAKY3BydAAAAPwAAAAyZGVzYwAAATAAAABkd3RwdAAAAZQAAAAUYmtwdAAAAagAAAAUclRSQwAAAbwAAAAOZ1RSQwAAAcwAAAAOYlRSQwAAAdwAAAAOclhZWgAAAewAAAAUZ1hZWgAAAgAAAAAUYlhZWgAAAhQAAAAUdGV4dAAAAABDb3B5cmlnaHQgMTk5OSBBZG9iZSBTeXN0ZW1zIEluY29ycG9yYXRlZAAAAGRlc2MAAAAAAAAACkFwcGxlIFJHQgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABYWVogAAAAAAAA81EAAQAAAAEWzFhZWiAAAAAAAAAAAAAAAAAAAAAAY3VydgAAAAAAAAABAc0AAGN1cnYAAAAAAAAAAQHNAABjdXJ2AAAAAAAAAAEBzQAAWFlaIAAAAAAAAHm9AABBUgAABLlYWVogAAAAAAAAVvgAAKwvAAAdA1hZWiAAAAAAAAAmIgAAEn8AALFw/+4ADkFkb2JlAGRAAAAAAf/bAIQAAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQICAgICAgICAgICAwMDAwMDAwMDAwEBAQEBAQEBAQEBAgIBAgIDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMD/8AAEQgAlwESAwERAAIRAQMRAf/dAAQAI//EAaIAAAAGAgMBAAAAAAAAAAAAAAcIBgUECQMKAgEACwEAAAYDAQEBAAAAAAAAAAAABgUEAwcCCAEJAAoLEAACAQMEAQMDAgMDAwIGCXUBAgMEEQUSBiEHEyIACDEUQTIjFQlRQhZhJDMXUnGBGGKRJUOhsfAmNHIKGcHRNSfhUzaC8ZKiRFRzRUY3R2MoVVZXGrLC0uLyZIN0k4Rlo7PD0+MpOGbzdSo5OkhJSlhZWmdoaWp2d3h5eoWGh4iJipSVlpeYmZqkpaanqKmqtLW2t7i5usTFxsfIycrU1dbX2Nna5OXm5+jp6vT19vf4+foRAAIBAwIEBAMFBAQEBgYFbQECAxEEIRIFMQYAIhNBUQcyYRRxCEKBI5EVUqFiFjMJsSTB0UNy8BfhgjQlklMYY0TxorImNRlUNkVkJwpzg5NGdMLS4vJVZXVWN4SFo7PD0+PzKRqUpLTE1OT0laW1xdXl9ShHV2Y4doaWprbG1ub2Z3eHl6e3x9fn90hYaHiImKi4yNjo+DlJWWl5iZmpucnZ6fkqOkpaanqKmqq6ytrq+v/aAAwDAQACEQMRAD8A3+Pfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691/9Df49+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3X/0d/j37r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvdf/S3+Pfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691/9Pf49+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3X/1N/j37r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvdf/V3+PfuvdV5fzKfl9v74V9G7Z7U692ttLd2VzXZ2E2NW47eRzK42DHZXbu6sw9bAcJXUFSKyOpwESDU5TRI3F7e5k9j/bfafdDmu/2DedwuLe3isHnVodGoskkSaTrVhSkhOBWoGeoW99PcrePa3lTb+YNlsLa5uZb9LcrPr0hXimfUNDKdQMYGTShPRRv5eH8zTvb5u777a62zGyOodj7g2v1PVb22NkcdDvKtxlTuCLO47BxU+56Sqz71c2CWbLQtKKR4agLfS17D3I3vN7F8p+1e08vb5b7ruV1ZT7isE6sYQ4jMbSExER0ElEYDWCteI6jX2Y9+ecPdXeOYtgn2nbLS+g21p4HUTshlEiRgSgyEmOsg1aCGpWh8uhS+E3zl+TXdnys7k+L/wAjuoOvurdxdSbDrtzVse05N0S1lZkafdW2cJRT01Tm8pXUWR2vmMXnTV0lVCg88bRsGALL7IPdL2p5F5W9v+WufOSuZLy/stxu1iUy+EFCmKVyCERWWVHj0OrHtOoU4HoQ+1Pu1z3zZ7g8z8hc7ct2W33u22bSsIfF1FxLEgIMjsrROkmtHUdwKkGnVmnbO7K/YPVnZe+sXTUtZk9l9f7y3bjqSu8v2NVX7c27kcxR01YIJIpzST1FGqyaHV9BNiDY+8bbqVoLa4mUVZI2YfaAT1ldyxtcO+cy8vbLcyMlteX0EDstNSrLKkbFagjUAxIqCK8R1o9p/wAKpvmoUUnoL4x3KqT/ALj+0fqRzx/p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TrPYey94b1yHY+6drbVwuC3Bv7LQy0+T3jl8bQw0tduOvgmrcjLFV5aojaZ1aomIZjd2+vvGTmHcbLd993fdNu2tLKwuLh5I7dCCsKMxKxqQqghBgUVeHAdZO8t7bfbNsGz7Vue7SX+429ukclw4Ied1UBpGBZiC5yas3HiehB9k/R31737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3X//09/j37r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvdf/U3+Pfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691/9Xf49+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3X/1t/j37r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvdf/X3+Pfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691/9Df49+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3X/0d/j37r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvdf/Z'
       var doc = new jsPDF()
 
       doc.addImage(imgData, 'JPEG', 150, 0, 50, 25)
       //title
       doc.setFontSize(16)
       doc.setFont('helvetica')
       doc.setFont(undefined, 'bold')
       doc.text(20, 30, 'Informe Final')
       doc.text(20,30, '____________')
 
       //info
       doc.setFontSize(12)
       doc.setFont('helvetica')
       doc.setFont(undefined, 'bold')
       doc.text(20, 40, 'Estudiante:')
       doc.text(20, 45, 'Instructor:')
       doc.text(20, 50, 'Duración de la simulación:')
       doc.text(20, 55, 'Límite de tiempo:')
       doc.text(20, 60, 'Constantes iniciales del paciente:')
       doc.setFont(undefined, 'normal')
       doc.text(45, 40, `${initialData.trainee.name} ${initialData.trainee.surname}`)
       doc.text(43, 45, `${initialData.trainer.name} ${initialData.trainer.surname}`)
       doc.text(75, 50, `${Math.trunc((this.state.timeSim-1)/60)} minutos ${(this.state.timeSim-1)%60} segundos`)
       doc.text(58, 55, `${this.state.time} minutos`)
       doc.text(89, 60, `${Math.round(this.state.heartRate,-1)} puls/min, ${Math.round(this.state.breathingRate,-1)} resp/min,`)
       doc.text(20, 65, `${Math.round(this.state.sistolicPressure,-1)} mmHg, ${Math.round(this.state.diastolicPressure,-1)} mmHg, ${Math.round(this.state.saturation,-1)} SatO2`)
 
       //Simulation
       doc.setFontSize(14)
       doc.setFont('helvetica')
       doc.setFont(undefined, 'normal')
       doc.text(20, 75, 'Desarrollo de la simulación:')
       doc.text(20, 75, '______________________')
       //eee = {min:0, seg:5, msg:"Mascarilla oxígeno",constants:[130,35, 90, 60, 85, 10, 200,34.2]}
       var i= 78
       var j = 80
       //content
       doc.setFontSize(12)
       //acciones
       this.information.forEach(e => {
           doc.rect(24, i, 2, 2, 'F');
           doc.text(30, j, `Tiempo ${e.min}:${(e.seg < 10 ? '0'+e.seg : e.seg)}`)
           doc.setFont(undefined, 'bold')
           doc.text(60, j, e.msg)
           doc.setFont(undefined, 'normal')
           i += 5
           j += 5
           doc.text(30, j,`${e.constants[0]} puls/min, ${e.constants[1]} resp/min, ${e.constants[2]} mmHg, ${e.constants[3]} mmHg, ${e.constants[4]} % SatO2`)
           i += 7
           j += 7
           if(i === 270 || i > 270){
               doc.addPage()
               i=24
               j=26
           }
       });
       console.log(i);
       j=26
       doc.addPage()
       doc.setFontSize(16)
       doc.setFont('helvetica')
       doc.setFont(undefined, 'bold')
       doc.text(20, j, 'Evaluación:')
       doc.text(20, j, '_________')
       j=j+10
       doc.setFontSize(14)
       doc.setFont('helvetica')
       doc.setFont(undefined, 'bold')
       doc.text(20,j,`Nota:${this.state.Nota}` )
       doc.text(48,j,`%` )

       j=j+10
       doc.setFontSize(14)
       doc.setFont('helvetica')
       doc.setFont(undefined, 'bold')
       doc.text(20,j,'Sección 1')
       doc.text(20, j, '________')
       j=j+10
       doc.setFontSize(11)
       doc.setFont(undefined, 'normal')
       doc.text(20, j, `Número de acciones correctas realizadas: ${this.state.matches}`)
       j=j+7
       doc.text(20, j, `Número de veces que no has actuado: ${this.state.gasp}`)
       j=j+7
       doc.text(20,j,`Número de acciones intercambiadas realizadas: ${this.state.swap}`)
       j=j+7
       doc.text(20,j,`Número de acciones incorrectas realizadas: ${this.state.mismatches}`)
       j=j+7
       doc.text(20,j,`Número de acciones contrarias realizadas: ${this.state.contr}`)
       j=j+7
       doc.text(20,j,`Balance entre acciones correctas e incorrectas:  ${this.state.GA}%`)
       j=j+10
       doc.setFontSize(14)
       doc.setFont('helvetica')
       doc.setFont(undefined, 'bold')
       doc.text(20,j,'Sección 2')
       doc.text(20, j, '________')
       j=j+10
       doc.setFontSize(11)
       doc.setFont(undefined, 'normal')
       doc.text(20,j,`Acciones realizadas en el momento oportuno: ${Math.round(this.state.Diag,-1)}%`)
       j=j+5
       doc.text(19,j,` Acciones realizadas de forma secuencial: ${this.state.GA}%`)
       j=j+10
       doc.setFontSize(14)
       doc.setFont('helvetica')
       doc.setFont(undefined, 'bold')
       doc.text(20,j,'Sección 3')
       doc.text(20, j, '________')
       j=j+10
       doc.setFontSize(10)
       doc.setFont(undefined, 'normal')
       doc.text(20,j,`Porcentaje de acciones que debían realizarse y se realizaron: ${this.state.Recall}%`)
       j=j+5
       doc.text(20,j,`Porcentaje de acciones que deberían realizarse y se realizaron y que no debían realizarse y no se realizaron:${this.state.Accuracy}%`)
       j=j+5
       doc.text(20,j,`Porcentaje de acciones que deberían realizarse con respecto a todas las acciones que se han llevado a cabo: ${this.state.Precision}%`)
       j=j+5
       doc.text(20,j,`Porcentaje de acciones que no deberían realizarse y no se realizaron:  ${this.state.Specificity}%`)
       
      
       
      
     
      
     /* doc.text(20, j, `Acciones intercambiadas: ${this.state.swap}`)
      j=+5
      doc.text(20, j, `Acciones contrarias: ${this.state.contr}`)
      j=+5
      doc.text(30, j, `Acciones no realizadas: ${this.state.gasp}`)
      j=+5
      doc.text(30, j, `Acciones erróneas: ${this.state.mismatches}`)
      j=+5
      doc.text(30, j, `Acciones erróneas: ${this.state.GA}`)*/
      
      // Save the Data
      var file = btoa(doc.output())                
      const baseUrl = "http://localhost:8080/simulation/update/"+this.props.match.params.id
      // parametros de datos post
      const datapost2 = {
          inform: file,
          testDataJSON: JSON.stringify(testData)
      }
  
      axios.post(baseUrl,datapost2)
      .then(response=>{
          if (response.data.success===true) {
             // alert(response.data.message)
             
          
            
              
          }
          else {
              alert("Error")
          }
          })
      .catch(error=>{
          alert("Error 34 "+error)
      })
            
           })
           .catch(error=>{
             alert("Error server "+error)
           })

           
      }




         clearInterval(this.changeGraphs)
   
  }


    
      /*  axios.get("http://localhost:8080/trainee/evaluacion", datapost)
        .then(res => {
          alert(res.data)
          
         
         })
         .catch(error=>{
           alert("Error server "+error)
         })
        clearInterval(this.changeGraphs)
    }*/

    disableFordward(){
        this.setState({
            fordward: false
        })
    }

    test(){
        testHeartRate.push({x: this.state.timeSim, y: this.state.heartRate})
        testBreathRate.push({x: this.state.timeSim, y: this.state.breathingRate})
        testDistolic.push({x: this.state.timeSim, y: this.state.diastolicPressure})
        testSistolic.push({x: this.state.timeSim, y: this.state.sistolicPressure})
        testUrine.push({x: this.state.timeSim, y: this.state.urineOutput})
        testSaturation.push({x: this.state.timeSim, y: this.state.saturation})
        testData = {
            testHeartRate: testHeartRate,
            testBreathRate: testBreathRate,
            testDistolic: testDistolic,
            testSistolic: testSistolic,
            testUrine: testUrine,
            testSaturation: testSaturation
        }
        if(this.state.timeSim === 18004){
          console.log(heartRateN,saturationN,breathingRateN,sistolicPressureN,diastolicPressureN,
            heartRateActions,breathingRateActions,diastolicPressureActions,sistolicPressureActions,
            saturationActions)
        }
    }

    render() {
       
        
      return(

        <div>
            <Modal isOpen={this.state.deadModal} >
                <ModalHeader>Información</ModalHeader>
                <Card>
                    <CardBody>
                        El paciente ha fallecido.
                    </CardBody>
                    <Button onClick={() => this.finish()}>Aceptar</Button>
                </Card>
            </Modal>
            <Nav header = {this.state.header}
                 content = {this.state.content}
                 num= {this.state.num}
                 changeNum = {() => this.changeNum()}
                 type = {this.state.type}
                 id = {this.state.id}
            >
            </Nav>
            <Messages alert = {this.state.alert}
                    toogle = {() => this.toogle()}
                    information = {this.information}
            />
            <div className="timer">
                <Timer time = {this.state.time}
                    start = {this.state.start}
                    finish = {this.state.finish}
                    crono = {this.state.crono}
                    timeCrono= {this.state.timeCrono}
                    simulationId = {this.props.match.params.id}
                    traineeId={this.state.traineeId}
                    partBody = {this.state.partBody}
                    phase={this.state.phase}
                    finishAction = {() => this.finish()}
                    disableFordward = {() => this.disableFordward()


                    } />
            </div>


            <div className="main">
                <Actions change = {(first, second, third, fourth, fifth) => this.change(first, second, third, fourth, fifth)}
                        send = {(variant,msg) => this.sendInformation(variant, msg)}
                        sendModal = {(id, type, header,content) => this.sendModal(id, type, header, content)}
                        time = {this.state.time}
                        trainerId ={this.state.trainerId}
                        traineeId={this.state.traineeId}
                        roleId={this.state.roleId}
                        mentalStatus = {this.state.mentalStatus}
                        diastolicPressure = {this.state.diastolicPressure}
                        heartRate = {this.state.heartRate}
                        sistolicPressure = {this.state.sistolicPressure}
                        saturation = {this.state.saturation}
                        urineOutput = {this.state.urineOutput}
                        breathingRate = {this.state.breathingRate}
                        traumaType = {this.state.traumaType}
                        partBody = {this.state.partBody}
                        temperature = {this.state.temperature}
                        bloodLoss = {this.state.bloodLoss}
                        start = {this.state.start}
                        startClick = {() => this.start()}
                        finish = {this.state.finish}
                        finish_interconsultations= {() => this.finish()}//paso la rutina al fichero actions
                        id = {this.props.location.state.id}
                        simulationId = {this.props.match.params.id}
                        timeSim = {this.state.timeSim}
                        sendData = {(next) => this.sendData(next)}
                        toogleCrono = {(next) => this.toogleCrono(next)}
                        data = {initialData}
                        test = {() => this.test()}
                        testData = {testData} 
                        age = {this.state.age}
                        sex = {this.state.sex}
                        phase = {this.state.phase}
                        trainerList={this.props.location.state.trainerList}//props viene del componente anterior
                        rxPelvis={this.state.rxPelvis}
                        actionsType4={actionsType4}
                        simultaneousActions = {(parameter, duration, tFin, value, finalValue, type) => this.simultaneousActions(parameter, duration, tFin, value, finalValue, type)}
                        information = {this.information}
                        matches={this.state.matches}
                        swap={this.state.swap}
                        contr={this.state.contr}
                        gasp={this.state.gasp}
                        mismatches={this.state.mismatches}
                        GA={this.state.GA}
                        Diag={this.state.Diag}
                        Subseq={this.state.Subseq}
                        Precision={this.state.Precision}
                        Recall={this.state.Recall}
                        Specificity={this.state.Specificity}
                        Accuracy={this.state.Accuracy}
                        F1={this.state.F1}
                        Nota={this.state.Nota}

                        
                />
               
                <Graphic 
                        diastolicPressure = {this.state.diastolicPressure}
                        heartRate = {this.state.heartRate}
                        sistolicPressure = {this.state.sistolicPressure}
                        saturation = {this.state.saturation}
                        urineOutput = {this.state.urineOutput}
                        breathingRate = {this.state.breathingRate}
                        dataHeartRate = {this.state.dataHeartRate}
                        dataBreathingRate = {this.state.dataBreathingRate}
                        dataSaturation = {this.state.dataSaturation}
                        confirm = {this.state.confirm}
                        xDomain1 = {this.state.xDomain1}
                        xDomain2 = {this.state.xDomain2}
                        toogleCrono = {(next) => this.toogleCrono(next)}
                        start={this.state.start}
                        finish = {() => this.finish()}
                        rellenar = {() => this.rellenar()}
                        fordward = {this.state.fordward}
                        time = {this.state.time}
                        test = {() => this.test()}
                        testData = {testData} 
                        age = {this.state.age}
                        sex = {this.state.sex}
                        phase = {this.state.phase}
                        trainerList={this.props.location.state.trainerList}
                        blockAdvance ={blockAdvance}
                />
       

            </div>
        </div>
      )

    }

}
