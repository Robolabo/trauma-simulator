import React, { Component } from 'react'
import { Alert } from 'reactstrap';
import axios from 'axios';
import Nav from '../Menu/Nav'
import Timer from '../Simulations/Components/Timer'
import Graphic from '../Simulations/Components/Graphic'
import Actions from '../Simulations/Components/Actions'
import Messages from '../Simulations/Components/Messages'
import { Modal, ModalHeader, Card, CardBody, Button } from 'reactstrap'
import './simulation.css'
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


export default class LoginForm extends Component {
    constructor(props){
      super(props);
      this.information=[]
      this.timeSim=1;
      this.state = {
        sex: 0,
        age: 0,
        weight: 0.0,
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
        rxPelvis:""
      }
    }

    componentDidMount(){
        let simulationId = this.props.match.params.id;
        const url = baseUrl+"/simulation/get/"+simulationId
        axios.get(url)
        .then(res=>{
            if (res.data.success) {
                const data = res.data.data[0]
                console.log("DATOS DEVUELTOS",data.rxPelvis)
                //añadir constantes del caso clínico creado
                this.setState({
                    sex: data.sex,
                    age: data.age,
                    weight: data.weight,
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
                    rxPelvis: data.rxPelvis
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
        let HR = this.state.heartRate + (heartRateValue/60)
        let SP = this.state.sistolicPressure + (sistolicPressureValue/60)
        let DP = this.state.diastolicPressure + (diastolicPressureValue/60)
        let BR = this.state.breathingRate + (breathingRateValue/60)
        let UO = this.state.urineOutput + (urineOutputValue/60)
        let newSO = this.state.saturation + (saturationValue/60)
        let SO = (newSO < 100 ) ? newSO : this.state.saturation
        // Se actualiza el estado con los nuevos valores.
        this.setState({
            heartRate: HR,
            sistolicPressure: SP,
            diastolicPressure: DP ,
            breathingRate: BR,
            urineOutput: UO,
            saturation: SO
        })
      //Comprobaciones
      if(this.state.timeSim === 135 || this.state.timeSim === 136){
        console.log("Fin acción")
      }
      if(this.state.timeSim === 300){
        console.log("Cambio a la segunda fase")
      }
      if(this.state.timeSim === 315 || this.state.timeSim === 316){
        console.log("Fin de los 5 min")
      }   
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
                    else if(i!=0){
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
                    else if(i!=0){
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
                  if (eval(element.parameter+"Actions[i].value") === 0){ 
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
                    else if(i!=0){
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
                    else if(i!=0){
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
                for(var i = 0; i<(eval(element.parameter+"Actions.length")); i++){
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
        this.setState({
          heartRate: newHR,
          breathingRate: newBR,
          diastolicPressure: newDP,
          sistolicPressure: newSP,
          saturation: newSO,
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
          eval("this."+parameter+ "Timer = setTimeout(this.unBlockChangeValue"+".bind(this,"+parameter+"Actions[0].parameter, "+parameter+"Actions[0].finalValue), ("+parameter+"Actions[0].duration)*1000)")
          break; 
        //Eliminar acciones del array de acciones de una constante vital        
        case 0: 
          eval(parameter+"Actions.splice(0,1);")
          eval(parameter + "N -= 1")
          if(eval(parameter + "N") > 0){
            eval(parameter+"Block = true")
            for(var i = 0; i<(eval(parameter+"Actions.length")); i++){
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
            eval("this."+parameter+ "Timer = setTimeout(this.unBlockChangeValue"+".bind(this,"+parameter+"Actions[0].parameter, "+parameter+"Actions[0].finalValue), ("+parameter+"Actions[0].duration)*1000)")
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
          for(var i = 0; i<(eval(parameter+"Actions.length")); i++){
            valueTot += eval(parameter+"Actions[i].value")
          }
          eval(parameter+"Value = valueTot")
          eval(parameter+"Actions.sort((a, b) => a.finalTime-b.finalTime);")
          eval("this."+parameter+ "Timer = setTimeout(this.unBlockChangeValue"+".bind(this,"+parameter+"Actions[0].parameter, "+parameter+"Actions[0].finalValue), ("+parameter+"Actions[0].duration)*1000)")
        break;

        case 4:
          let obj1 = {'parameter': "saturation", 'duration' : "ventilacionBolsa", 'finalTime': 1800,'value' : -6, 'finalValue': -1}
          eval(parameter+"Actions.splice("+parameter+"Actions.indexOf(obj1),1);")
          eval(parameter + "N -= 1")
          if(eval(parameter + "N") > 0){
            eval(parameter+"Block = true")
            for(var i = 0; i<(eval(parameter+"Actions.length")); i++){
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
            eval("this."+parameter+ "Timer = setTimeout(this.unBlockChangeValue"+".bind(this,"+parameter+"Actions[0].parameter, "+parameter+"Actions[0].finalValue), ("+parameter+"Actions[0].duration)*1000)")
          }
          else{
            eval(parameter+"Block = false")
            eval(parameter+"Actions.splice(0, "+parameter+"Actions.length)")
          }
        break;
        }    
    }


    change(parameter,value, time, type, latency){
      this.changeAction = setTimeout(this.changeAux.bind(this,parameter,value, time, type), (latency * 1000))
    }
    changeAux(parameter,value, duration, type) {
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
        console.log("PARAMETROSS",id, type, header, content)
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

    finish(){
        this.setState({
            finish: true
        })
        clearInterval(this.changeGraphs)
    }

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
                    finishAction = {() => this.finish()}
                    disableFordward = {() => this.disableFordward()} />
            </div>
            <div className="main">
                <Actions change = {(first, second, third, fourth, fifth) => this.change(first, second, third, fourth, fifth)}
                        send = {(variant,msg) => this.sendInformation(variant, msg)}
                        sendModal = {(id, type, header,content) => this.sendModal(id, type, header, content)}
                        time = {this.state.time}
                        mentalStatus = {this.state.mentalStatus}
                        diastolicPressure = {this.state.diastolicPressure}
                        heartRate = {this.state.heartRate}
                        sistolicPressure = {this.state.sistolicPressure}
                        saturation = {this.state.saturation}
                        urineOutput = {this.state.urineOutput}
                        breathingRate = {this.state.breathingRate}
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
                        fordward = {this.state.fordward}
                        time = {this.state.time}
                        test = {() => this.test()}
                        testData = {testData} 
                        age = {this.state.age}
                        sex = {this.state.sex}
                        phase = {this.state.phase}
                        trainerList={this.props.location.state.trainerList}
                />

            </div>
        </div>
      )

    }

}
