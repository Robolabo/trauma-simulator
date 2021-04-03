import React, { Component } from 'react'
import Alert from 'react-bootstrap/Alert'
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
var heartRateBlock = false
var diastolicPressureBlock = false
var sistolicPressureBlock = false
var saturationBlock = false
var breathingRateBlock = false


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
var heartRateFinalValue
var saturationFinalValue
var breathingRateFinalValue
var sistolicPressureFinalValue
var diastolicPressureFinalValue

export default class LoginForm extends Component {
    constructor(props){
      super(props);
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
        show:true,
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
        phase: ""
      }
    }

    componentDidMount(){
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
                    document: []
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
        heartRateValue = heartRateBlock ? heartRateValue : 2
        breathingRateValue = breathingRateBlock ? breathingRateValue : 0.8
        saturationValue = saturationBlock ? saturationValue : -0.4
        sistolicPressureValue = sistolicPressureBlock ? sistolicPressureValue : -1.5
        diastolicPressureValue = diastolicPressureBlock ? diastolicPressureValue : -1.5
      }
      if (this.state.timeSim > 300 && this.state.timeSim <=900 ) {
        heartRateValue = heartRateBlock ? heartRateValue : 1.5
        breathingRateValue = breathingRateBlock ? breathingRateValue : 1.1
        saturationValue = saturationBlock ? saturationValue : -0.6
        sistolicPressureValue = sistolicPressureBlock ? sistolicPressureValue : -2.3
        diastolicPressureValue = diastolicPressureBlock ? diastolicPressureValue : -1.6
      }
      if (this.state.timeSim > 900 && this.state.timeSim <= 1320) {
        heartRateValue = heartRateBlock ? heartRateValue : -2.0
        breathingRateValue = breathingRateBlock ? breathingRateValue : -3.71
        saturationValue = saturationBlock ? saturationValue : -0.7
        sistolicPressureValue = sistolicPressureBlock ? sistolicPressureValue : -5.0
        diastolicPressureValue = diastolicPressureBlock ? diastolicPressureValue : -1.86
      }
      if (this.state.timeSim > 1320) {
        heartRateValue = heartRateBlock ? heartRateValue : -7.255
        breathingRateValue = breathingRateBlock ? breathingRateValue : -0.75
        saturationValue = saturationBlock ? saturationValue : -0.5
        sistolicPressureValue = sistolicPressureBlock ? sistolicPressureValue : -1.75
        diastolicPressureValue = diastolicPressureBlock ? diastolicPressureValue  : -1.25
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
          heartRateValue = 2
          breathingRateValue = 0.8
          saturationValue = -0.4
          sistolicPressureValue = -1.5
          diastolicPressureValue = -1.5
          break;
        case 2:
          heartRateValue = 1.5
          diastolicPressureValue = -1.6
          breathingRateValue = 1.1
          saturationValue = -0.6
          sistolicPressureValue = -2.3
          break;
        case 3:
          heartRateValue = -2
          diastolicPressureValue = -1.86
          breathingRateValue = -3.71
          saturationValue = -0.7
          sistolicPressureValue = -5
          break;
        case 4:
          heartRateValue= -7.225
          diastolicPressureValue = -1.25
          breathingRateValue = -0.75
          saturationValue = -0.5
          sistolicPressureValue = -1.75
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
      eval(parameter + "Block = true")
      eval(parameter + "Value = "+ initialValue)
      eval(parameter + "FinalValue = "+ finalValue)
      eval("this."+parameter+ "Timer = setTimeout(this.unBlockChangeValue"+
      ".bind(this,parameter, finalValue, finalTime), finalTime*1000)") 
      
    }

    unBlockChangeValue(parameter, finalValue){
      eval("clearTimeout(this."+parameter+"Timer)")
      switch (finalValue) {
        case -1:
          eval(parameter+"Block = false")
          break;
        case 0:
          eval(parameter+"Value  = 0")
          break;
        default:
          eval(parameter+"Value  = "+ finalValue)
          break;
      }
    }

    change(parameter,value, time, type, latency){
      this.changeAction = setTimeout(this.changeAux.bind(this,parameter,value, time, type), (latency * 1000))
    }
    changeAux(parameter,value, duration, type) {
      eval(parameter + "FinalTime = this.state.timeSim + duration")
      let initialValue
      switch (type) {
        //sube o baja value[puntos/min] en tiempo [segundos], luego vuelve a la evolución normal
        case 1:
          this.blockChangeValue(parameter, duration, value, -1)
          break; 
        //sube hasta value[valor concreto] en x [segundos]  y se mantiene
        // meto el caso 6 aquí puesto que suponemos al final que la ventilación con bolsa se mantiene fija
        case 2:
          initialValue = (value - eval("this.state."+parameter))/duration*60
          this.blockChangeValue(parameter, duration, initialValue, 0)
          break;
      //Se mantiene tiempo [segundos] y después se modifica value [puntos/min] hasta el final
        case 3:
          this.blockChangeValue(parameter, duration, 0, value)
          break;
      //sube o baja hasta que se realiza una acción concreta
        case 4:
          break;
      //Acelera (o Ralentiza si es un número menor que cero) la subida o bajada de un parameter
      //value multiplica al valor actual de subida o bajada
        case 5:
          initialValue = value * eval(parameter+"Value")
          this.blockChangeValue(parameter, duration, initialValue, initialValue)
          break;
        //sube o baja value[puntos/min] en tiempo [segundos] y se mantiene
        case 6:
          this.blockChangeValue(parameter, duration, value, 0)
          break;         
        default:
          break;
      }
  }
 
  
    
    sendInformation(variant, msg){  


        var alertMsg =  <Alert id="alert" variant={variant} show={this.state.show}>
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

        setTimeout(() => {
          this.setState({
            showingAlert: false,
            alert: null
          });
        }, 4000);
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
                    toogle = {() => this.toogle()}/>
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
                        id = {this.props.location.state.id}
                        simulationId = {this.props.match.params.id}
                        timeSim = {this.state.timeSim}
                        sendData = {(next) => this.sendData(next)}
                        toogleCrono = {(next) => this.toogleCrono(next)}
                        data = {initialData}
                        test = {() => this.test()}
                        testData = {testData} />

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
