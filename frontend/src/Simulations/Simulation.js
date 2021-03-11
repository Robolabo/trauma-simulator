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

const baseUrl = "http://localhost:8080"

var heartRateValue = 2.0
var diastolicPressureValue = -1.5
var breathingRateValue = 0.8
var urineOutputValue = -0.5
var saturationValue = -0.4
var sistolicPressureValue = -1.5
var blockHR = false
var blockDP = false
var blockSP = false
var blockUO = false
var blockSO = false
var blockBR = false
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

var heartRateValue1 = 2.0
//var diastolicPressureValue1 = -1.5
//var breathingRateValue1 = 0.8
//var urineOutputValue = -0.5
//var saturationValue1 = -0.4
//var sistolicPressureValue1 = -1.5
var heartRateValue2 = 1.5
var diastolicPressureValue2 = -1.6
var breathingRateValue2 = 1.1
//var urineOutputValue2 = -0.5
var saturationValue2 = -0.6
var sistolicPressureValue2 = -2.3
var heartRateValue3 = -2
var diastolicPressureValue3 = -1.86
var breathingRateValue3 = -3.71
//var urineOutputValue3 = -0.5
var saturationValue3 = -0.7
var sistolicPressureValue3 = -5
var heartRateValue4 = -7.225
var diastolicPressureValue4 = -1.25
var breathingRateValue4 = -0.75
//var urineOutputValue4 = -0.5
var saturationValue4 = -0.5
var sistolicPressureValue4 = -1.75

var newParameter = 0

var tFinHR = 0
//var tFinSP = 0
//var tFinDP = 0
//var tFinBR = 0
//var tFinSO = 0
//var tFinUO = 0

export default class LoginForm extends Component {
    constructor(props){
      super(props);
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
        deadModal: false
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
        heartRateValue = blockHR ? heartRateValue : 2
        breathingRateValue = blockBR ? breathingRateValue : 0.8
        saturationValue = blockSO ? saturationValue : -0.4
        sistolicPressureValue = blockSP ? sistolicPressureValue : -1.5
        diastolicPressureValue = blockDP ? diastolicPressureValue : -1.5
      }
      if (this.state.timeSim > 300 && this.state.timeSim <=900 ) {
        heartRateValue = blockHR ? heartRateValue : 1.5
        breathingRateValue = blockBR ? breathingRateValue : 1.1
        saturationValue = blockSO ? saturationValue : -0.6
        sistolicPressureValue = blockSP ? sistolicPressureValue : -2.3
        diastolicPressureValue = blockDP ? diastolicPressureValue : -1.6
      }
      if (this.state.timeSim > 900 && this.state.timeSim <= 1320) {
        heartRateValue = blockHR ? heartRateValue : -2.0
        breathingRateValue = blockBR ? breathingRateValue : -3.71
        saturationValue = blockSO ? saturationValue : -0.7
        sistolicPressureValue = blockSP ? sistolicPressureValue : -5.0
        diastolicPressureValue = blockDP ? diastolicPressureValue : -1.86
      }
      if (this.state.timeSim > 1320) {
        heartRateValue = blockHR ? heartRateValue : -7.255
        breathingRateValue = blockBR ? breathingRateValue : -0.75
        saturationValue = blockSO ? saturationValue : -0.5
        sistolicPressureValue = blockSP ? sistolicPressureValue : -1.75
        diastolicPressureValue = blockDP ? diastolicPressureValue  : -1.25
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

    toogleBlock(timeSimOld, parameter, value, value1, value2, blocked, tFin){
      let interm1 = parameter
      let interm2 = parameter
       let dif = 0
       let x = 0
       let y = 0

          if (timeSimOld > 0 && timeSimOld <= 300){
               x= tFin - timeSimOld
               dif = 300 - tFin
              if(dif < 0){dif = 0}
              let y = (timeSimOld + 300) - (tFin - dif)
              if(x > (timeSimOld + 300)){
                x = 300
                y = 0
              }
              else{
                blocked = false
              }
              interm1 = parameter + ((value/60) * x)
              if(dif=== 0){interm2 = 0}
              else  {interm2 = ((value1/60) * dif) }
              newParameter = interm1 + interm2 + (y*(value2/60))
            }
          if (timeSimOld > 300 && timeSimOld <= 900){
             x = tFin - timeSimOld
             dif = timeSimOld + 300 - tFin
             if ( dif > 0){
               blocked = false
             }
             else {  dif = 0 }
             if (900 <= (timeSimOld + 300)){
               if(tFin <= 900){
                  dif = 900 - tFin
                  y = (timeSimOld + 300) - 900
                  blocked = false
                }
                else if (tFin > 900 && tFin < (timeSimOld + 300)) {
                  dif = 0
                  y = (timeSimOld + 300) - tFin
                  blocked = false
                }
                else{
                  x = 300
                  dif = 0
                  y = 0
                }
            }
            else {
              y = 0
            }
             interm1 = parameter + ((value/60) * x)
             if(dif === 0){interm2 = 0}
             else  {interm2 =  ((value1/60) * dif) }
            newParameter = interm1 + interm2 + (y*(value2/60))
           }

           if (timeSimOld > 900 && timeSimOld <= 1320){
              x = tFin - timeSimOld
              dif = timeSimOld + 300 - tFin
              if ( dif > 0){
                blocked = false
              }
              else {  dif = 0 }
              if (1320 <= (timeSimOld + 300)){
                if(tFin <= 1320){
                   dif = 1320 - tFin
                   y = (timeSimOld + 300) - 1320
                   blocked = false
                 }
                 else if (tFin > 1320 && tFin < (timeSimOld + 300)) {
                   dif = 0
                   y = (timeSimOld + 300) - tFin
                   blocked = false
                 }
                 else{
                   x = 300
                   dif = 0
                   y = 0
                 }
             }
             else {
               y = 0
             }
              interm1 = parameter + ((value/60) * x)
              if(dif === 0){interm2 = 0}
              else  {interm2 =  ((value1/60) * dif) }
              newParameter = interm1 + interm2 + (y*(value2/60))
            }

            if (timeSimOld > 1320 && timeSimOld <= 1800){
               x = tFin - timeSimOld
               dif = timeSimOld + 300 - tFin
               if ( dif > 0){
                 blocked = false
               }
               else {  dif = 0 }
               if (1800 <= (timeSimOld + 300)){
                 if(tFin <= 1800){
                    dif = 1800 - tFin
                    y = (timeSimOld + 300) - 1800
                    blocked = false
                  }
                  else if (tFin > 1800 && tFin < (timeSimOld + 300)) {
                    dif = 0
                    y = (timeSimOld + 300) - tFin
                    blocked = false
                  }
                  else{
                    x = 300
                    dif = 0
                    y = 0
                  }
              }
              else {
                y = 0
              }
               interm1 = parameter + ((value/60) * x)
                if(dif === 0){interm2 = 0}
                 else {interm2 = ((value1/60) * dif) }
               newParameter = interm1 + interm2 + (y*(value2/60))
             }
    }

    //Función que se utiliza cuando se adelanta el cronómetro
    toogleCrono(next){
        if (this.state.start){

            this.setState({
                crono: true,
                timeCrono:next
            })
            clearInterval(this.changeGraphs)

            let intermSP = this.state.sistolicPressure
            let intermDP = this.state.diastolicPressure
            let intermBR = this.state.breathingRate
            let intermUO = this.state.urineOutput
            let intermSO = this.state.saturation
            let newHR = this.state.heartRate
            let newSP = this.state.sistolicPressure
            let newDP = this.state.diastolicPressure
            let newBR = this.state.breathingRate
            let newUO = this.state.urineOutput
            let newSO = this.state.saturation

            let dif = 0
            let x = 0
            let timeSimOld = this.state.timeSim

            if (timeSimOld > 0 && timeSimOld <= 300){
               dif = 300 - timeSimOld

////////////////// ------------------------------------------- REVISARRRRRRRR: timeSimOld, parameter, value, value1, value2, blocked, tFin
               this.toogleBlock(timeSimOld, this.state.heartRate, heartRateValue, heartRateValue1, heartRateValue2, blockHR, tFinHR)
               newHR = blockHR ? newParameter : this.state.heartRate + ((heartRateValue/60) * dif)  + (timeSimOld*(heartRateValue2/60))

               intermSP = this.state.sistolicPressure + ((sistolicPressureValue/60)* dif)
               newSP = intermSP + (timeSimOld*(sistolicPressureValue2/60))

               intermDP = this.state.diastolicPressure + ((diastolicPressureValue/60)* dif)
               newDP = intermDP + (timeSimOld*(diastolicPressureValue2/60))

               intermBR = this.state.breathingRate + ((breathingRateValue/60)* dif)
               newBR = intermBR + (timeSimOld*(breathingRateValue2/60))

               intermUO = this.state.urineOutput + ((urineOutputValue/60)* dif)
               newUO =  intermUO + (timeSimOld*(-0.5/60))

               intermSO = this.state.saturation + ((saturationValue/60)* dif)
               newSO = intermSO + (timeSimOld*(saturationValue2/60))

            }
            if (timeSimOld > 300 && timeSimOld <= 900){
               dif = 900 - timeSimOld
               if ((300 - dif) > 0){ x = (300 - dif) }
               else {  dif = 300 }

               this.toogleBlock(timeSimOld, this.state.heartRate, heartRateValue, heartRateValue2, heartRateValue3, blockHR, tFinHR)
               newHR = blockHR? newParameter : this.state.heartRate + ((heartRateValue/60) * dif) + (x*(heartRateValue3/60))

               intermSP = this.state.sistolicPressure + ((sistolicPressureValue/60)* dif)
               newSP = intermSP + (x*(sistolicPressureValue3/60))

               intermDP = this.state.diastolicPressure + ((diastolicPressureValue/60)* dif)
               newDP = intermDP + (x*(diastolicPressureValue3/60))

               intermBR = this.state.breathingRate + ((breathingRateValue/60)* dif)
               newBR = intermBR + (x*(breathingRateValue3/60))

               intermUO = this.state.urineOutput + ((urineOutputValue/60)* dif)
               newUO =  intermUO + (x*(-0.5/60))

               intermSO = this.state.saturation + ((saturationValue/60)* dif)
               newSO = intermSO + (x*(saturationValue3/60))

            }

            if (timeSimOld > 900 && timeSimOld <= 1320){
               dif = 1320 - timeSimOld
               if ((300 - dif) > 0){ x = (300 - dif) }
                else { dif = 300 }

               this.toogleBlock(timeSimOld, this.state.heartRate, heartRateValue, heartRateValue3, heartRateValue4, blockHR, tFinHR)
               newHR =  blockHR? newParameter : this.state.heartRate + ((heartRateValue/60) * dif) + (x*(heartRateValue4/60))

               intermSP = this.state.sistolicPressure + ((sistolicPressureValue/60)* dif)
               newSP = intermSP + (x*(sistolicPressureValue4/60))

               intermDP = this.state.diastolicPressure + ((diastolicPressureValue/60)* dif)
               newDP = intermDP + (x*(diastolicPressureValue4/60))

               intermBR = this.state.breathingRate + ((breathingRateValue/60)* dif)
               newBR = intermBR + (x*(breathingRateValue4/60))

               intermUO = this.state.urineOutput + ((urineOutputValue/60)* dif)
               newUO =  intermUO + (x*(-0.5/60))

               intermSO = this.state.saturation + ((saturationValue/60)* dif)
               newSO = intermSO + (x*(saturationValue4/60))
            }
            if (timeSimOld > 1320 && timeSimOld <= 1800){
               dif = 1800 - timeSimOld
               if ((300 - dif) > 0){ x = (300 - dif) }
                else { dif = 300 }

              this.toogleBlock(timeSimOld, this.state.heartRate, heartRateValue, heartRateValue4, heartRateValue4, blockHR, tFinHR)
               newHR = blockHR? newParameter : this.state.heartRate + ((heartRateValue/60) * dif) + (x*(heartRateValue4/60))

               intermSP = this.state.sistolicPressure + ((sistolicPressureValue/60)* dif)
               newSP = intermSP + (x*(sistolicPressureValue4/60))

               intermDP = this.state.diastolicPressure + ((diastolicPressureValue/60)* dif)
               newDP = intermDP + (x*(diastolicPressureValue4/60))

               intermBR = this.state.breathingRate + ((breathingRateValue/60)* dif)
               newBR = intermBR + (x*(breathingRateValue4/60))

               intermUO = this.state.urineOutput + ((urineOutputValue/60)* dif)
               newUO =  intermUO + (x*(-0.5/60))

               intermSO = this.state.saturation + ((saturationValue/60)* dif)
               newSO = intermSO + (x*(saturationValue4/60))
            }

            let SO = (newSO > 100 ) ? 100 : newSO

            this.state.timeSim += (next * 60)
            this.setState({
                heartRate: newHR,
                sistolicPressure: newSP,
                diastolicPressure: newDP ,
                breathingRate: newBR,
                //urineOutput: newUO,
                saturation: SO
            })
            //Esto se dispara cuando el paciente se muere.
            if( newHR === 160 && newSP === 60 && newDP === 30 && newBR === 60 && SO === 75 ){
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
            if( newHR <= 63 && newSP <= 61 && newDP <= 42 && SO <= 81){
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
            this.changeGraphs = setInterval(this.intervalGraphs.bind(this) , 1000)
        }

    }
 
    //Función para enviar el informe
    sendData(next){

        this.setState({
            document: next
        })
    }
    blockChangeValue(parameter){
      switch(parameter){
        case "heartRate":
          blockHR = true
            break;
        case "sistolicPressure":
          blockSP = true
            break;
        case "diastolicPressure":
          blockDP = true
            break;
        case "breathingRate":
          blockBR = true
            break;
        case "urineOutput":
          blockUO = true
            break;
        case "saturation":
          blockSO = true
            break;
        default:
          break;
      }
    }

    unBlockChangeValue(parameter, type, value){
      switch(parameter){
        case "heartRate":
          blockHR = false
          // HR1, 2 ,3 ...
          switch (type) {
            case 1:
              clearTimeout(this.blockHR1Value)
              break;
            case 2:
              clearTimeout(this.blockHR2Value)
              this.blockChangeValue(parameter)
              heartRateValue  = 0
              break;
            case 3:
              clearTimeout(this.blockHR3Value)
              this.blockChangeValue(parameter)
              heartRateValue = value
              break;
            case 4:
              break;
            case 5:
              break;
            case 6:
              clearTimeout(this.blockHR6Value)
              this.blockChangeValue(parameter)
              heartRateValue  = 0
              break;
            default:
              break;
          }
            break;
        case "sistolicPressure":
          blockSP = false
          switch (type) {
            case 1:
              clearTimeout(this.blockSP1Value)
              break;
            case 2:
              clearTimeout(this.blockSP2Value)
              this.blockChangeValue(parameter)
              sistolicPressureValue  = 0
              break;
            case 3:
              clearTimeout(this.blockSP3Value)
              this.blockChangeValue(parameter)
              sistolicPressureValue = value
              break;
            case 4:
              break;
            case 5:
              break;
            case 6:
              clearTimeout(this.blockSP6Value)
              this.blockChangeValue(parameter)
              sistolicPressureValue  = 0
              break;
            default:
              break;
          }
            break;
        case "diastolicPressure":
          blockDP = false
          switch (type) {
            case 1:
              clearTimeout(this.blockDP1Value)
              break;
            case 2:
              clearTimeout(this.blockDP2Value)
              this.blockChangeValue(parameter)
              diastolicPressureValue  = 0
              break;
            case 3:
              clearTimeout(this.blockDP3Value)
              this.blockChangeValue(parameter)
              diastolicPressureValue = value
              break;
            case 4:
              break;
            case 5:
              break;
            case 6:
              clearTimeout(this.blockDP6Value)
              this.blockChangeValue(parameter)
              diastolicPressureValue  = 0
              break;
            default:
              break;
          }
            break;
        case "breathingRate":
          blockBR = false
          switch (type) {
            case 1:
              clearTimeout(this.blockBR1Value)
              break;
            case 2:
              clearTimeout(this.blockBR2Value)
              this.blockChangeValue(parameter)
              breathingRateValue  = 0
              break;
            case 3:
              clearTimeout(this.blockBR3Value)
              this.blockChangeValue(parameter)
              breathingRateValue = value
              break;
            case 4:
              break;
            case 5:
              break;
            case 6:
              clearTimeout(this.blockBR6Value)
              this.blockChangeValue(parameter)
              breathingRateValue  = 0
              break;
            default:
              break;
          }
            break;
       case "urineOutput":
          blockUO = false
          switch (type) {
            case 1:
              clearTimeout(this.blockUO1Value)
              break;
            case 2:
              clearTimeout(this.blockUO2Value)
              this.blockChangeValue(parameter)
              urineOutputValue  = 0
              break;
            case 3:
              clearTimeout(this.blockUO3Value)
              this.blockChangeValue(parameter)
              urineOutputValue = value
              break;
            case 4:
              break;
            case 5:
              break;
            case 6:
              clearTimeout(this.blockUO6Value)
              this.blockChangeValue(parameter)
              urineOutputValue  = 0
              break;
            default:
              break;
          }
            break;
        case "saturation":
          blockSO = false
          switch (type) {
            case 1:
              clearTimeout(this.blockSO1Value)
              break;
            case 2:
              clearTimeout(this.blockSO2Value)
              this.blockChangeValue(parameter)
              saturationValue  = 0
              break;
            case 3:
              clearTimeout(this.blockSO3Value)
              this.blockChangeValue(parameter)
              saturationValue = value
              break;
            case 4:
              break;
            case 5:
              break;
            case 6:
              clearTimeout(this.blockSO6Value)
              this.blockChangeValue(parameter)
              saturationValue = 0
              break;
            default:
              break;
          }
            break;
        default:
          break;
      }
    }

    change(parameter,value, duration, type, latency){
      this.changeAction = setTimeout(this.changeAux.bind(this,parameter,value, duration, type, latency), (latency * 1000))
    }
    changeAux(parameter,value, duration, type, latency) {
      switch (type) {

        //sube o baja value[puntos/min] en tiempo [segundos]
        case 1:
          switch(parameter){
            case "heartRate":
              tFinHR = duration + latency + this.state.timeSim
              this.blockChangeValue(parameter)
              heartRateValue = value
              this.blockHR1Value = setTimeout(this.unBlockChangeValue.bind(this, parameter, type, value) , (duration * 1000))
                break;

            case "sistolicPressure":
            //  tFinSP = duration + latency + this.state.timeSim
                this.blockChangeValue(parameter)
                sistolicPressureValue  = value
                this.blockSP1Value = setTimeout(this.unBlockChangeValue.bind(this, parameter, type, value) , (duration * 1000))
                break;

            case "diastolicPressure":
            //  tFinDP = duration + latency + this.state.timeSim
                this.blockChangeValue(parameter)
                diastolicPressureValue  = value
                this.blockDP1Value = setTimeout(this.unBlockChangeValue.bind(this, parameter , type, value) , (duration * 1000))
                break;

            case "breathingRate":
            //  tFinBR = duration + latency + this.state.timeSim
              this.blockChangeValue(parameter)
              breathingRateValue  = value
              this.blockBR1Value = setTimeout(this.unBlockChangeValue.bind(this, parameter, type, value) , (duration * 1000))
                break;
            case "urineOutput":
              this.blockChangeValue(parameter)
              urineOutputValue   = value
              this.blockUO1Value = setTimeout(this.unBlockChangeValue.bind(this, parameter, type, value) , (duration * 1000))
                break;
            case "saturation":
            //  tFinSO = duration + latency + this.state.timeSim
              this.blockChangeValue(parameter)
              saturationValue  = value
              this.blockSO1Value = setTimeout(this.unBlockChangeValue.bind(this, parameter, type, value) , (duration * 1000))
                break;

            default:
               break;
          }
            break;

        //sube hasta value[valor concreto] en x [segundos]  y se mantiene
        // meto el caso 6 aquí puesto que suponemos al final que la ventilación con bolsa se mantiene fija
        case 2:
          switch(parameter){
            case "heartRate":
              tFinHR =  1800
              this.blockChangeValue(parameter)
              heartRateValue = (((value - this.state.heartRate)*60)/ duration)
              this.blockHR2Value = setTimeout(this.unBlockChangeValue.bind(this, parameter, type, value) , (duration * 1000))

                break;

            case "sistolicPressure":
            //  tFinSP = 1800
              this.blockChangeValue(parameter)
              sistolicPressureValue  = (((value - this.state.sistolicPressure)*60)/ duration)
                console.log("subiendo sp "+this.state.timeSim)
              this.blockSP2Value = setTimeout(this.unBlockChangeValue.bind(this, parameter, type, value) , (duration * 1000))

                break;

            case "diastolicPressure":
              //tFinDP = 1800
              this.blockChangeValue(parameter)
              diastolicPressureValue  = (((value - this.state.diastolicPressure)*60)/ duration)
              console.log("subiendo dp "+this.state.timeSim)
              this.blockDP2Value = setTimeout(this.unBlockChangeValue.bind(this, parameter, type, value) , (duration * 1000))

                break;

            case "breathingRate":
            //  tFinBR = 1800
              this.blockChangeValue(parameter)
              breathingRateValue  = (((value - this.state.breathingRate)*60)/ duration)
              this.blockBR2Value = setTimeout(this.unBlockChangeValue.bind(this, parameter, type, value) , (duration * 1000))

                break;

            case "urineOutput":
              this.blockChangeValue(parameter)
              urineOutputValue   = (((value - this.state.urineOutput)*60)/ duration)
              this.blockUO2Value = setTimeout(this.unBlockChangeValue.bind(this, parameter, type, value) , (duration * 1000))

                break;

            case "saturation":
            //  tFinSO = 1800
              this.blockChangeValue(parameter)
              saturationValue  = (((value - this.state.saturation)*60)/ duration)
              this.blockSO2Value = setTimeout(this.unBlockChangeValue.bind(this, parameter, type, value) , (duration * 1000))

                break;

            default:
               break;
          }
            break;

      //Se mantiene tiempo [segundos] y después se modifica value [puntos/min] hasta el final

        case 3:
          switch(parameter){
            case "heartRate":
              tFinHR = 1800
              this.blockChangeValue(parameter)
              heartRateValue = 0
              this.blockHR3Value = setTimeout(this.unBlockChangeValue.bind(this, parameter, type, value) , (duration * 1000))

                break;

            case "sistolicPressure":
            //  tFinSP = 1800
              this.blockChangeValue(parameter)
              sistolicPressureValue  = 0
              this.blockSP3Value = setTimeout(this.unBlockChangeValue.bind(this, parameter, type, value) , (duration * 1000))

                break;

            case "diastolicPressure":
            //  tFinDP = 1800
              this.blockChangeValue(parameter)
              diastolicPressureValue  = 0

              this.blockDP3Value = setTimeout(this.unBlockChangeValue.bind(this, parameter, type, value) , (duration * 1000))

                break;

            case "breathingRate":
            //  tFinBR = 1800
              this.blockChangeValue(parameter)
              breathingRateValue  = 0
              this.blockBR3Value = setTimeout(this.unBlockChangeValue.bind(this, parameter, type, value) , (duration * 1000))

                break;

            case "urineOutput":
              this.blockChangeValue(parameter)
              urineOutputValue   = 0
              this.blockUO3Value = setTimeout(this.unBlockChangeValue.bind(this, parameter, type, value) , (duration * 1000))

                break;

            case "saturation":
            //  tFinSO = 1800
              this.blockChangeValue(parameter)
              saturationValue  = 0
              this.blockSO3Value = setTimeout(this.unBlockChangeValue.bind(this, parameter, type, value) , (duration * 1000))

                break;

            default:
               break;
          }
            break;

      //sube o baja hasta que se realiza una acción concreta
        case 4:
          break;

      //Acelera (o Ralentiza si es un número menor que cero) la subida o bajada de un parameter
      //value multiplica al valor actual de subida o bajada
        case 5:
          switch(parameter){
            case "heartRate":
              tFinHR = 1800
              this.blockChangeValue(parameter)
              heartRateValue = heartRateValue*value
                break;

            case "sistolicPressure":
            //  tFinSP = 1800
              this.blockChangeValue(parameter)
              sistolicPressureValue  = sistolicPressureValue*value
                break;

            case "diastolicPressure":
            //  tFinDP = 1800
              this.blockChangeValue(parameter)
              diastolicPressureValue  = diastolicPressureValue*value
                break;

            case "breathingRate":
            //  tFinBR = 1800
              this.blockChangeValue(parameter)
              breathingRateValue  = breathingRateValue*value
                break;

            case "urineOutput":
              this.blockChangeValue(parameter)
              urineOutputValue   = urineOutputValue*value
                break;

            case "saturation":
            //  tFinSO = 1800
              this.blockChangeValue(parameter)
              saturationValue  = saturationValue*value
                break;

            default:
               break;
          }
            break;
            //sube o baja value[puntos/min] en tiempo [segundos] y se mantiene
            case 6:
              switch(parameter){
                case "heartRate":
                  tFinHR = 1800
                  this.blockChangeValue(parameter)
                  heartRateValue = value
                  this.blockHR6Value = setTimeout(this.unBlockChangeValue.bind(this, parameter, type, value) , (duration * 1000))
                    break;

                case "sistolicPressure":
                  //tFinSP = 1800
                  this.blockChangeValue(parameter)
                  sistolicPressureValue  = value
                  this.blockSP6Value = setTimeout(this.unBlockChangeValue.bind(this, parameter, type, value) , (duration * 1000))
                    break;

                case "diastolicPressure":
                  //tFinDP = 1800
                  this.blockChangeValue(parameter)
                  diastolicPressureValue  = value
                  this.blockDP6Value = setTimeout(this.unBlockChangeValue.bind(this, parameter , type, value) , (duration * 1000))
                    break;

                case "breathingRate":
                //  tFinBR = 1800
                  this.blockChangeValue(parameter)
                  breathingRateValue  = value
                  this.blockBR6Value = setTimeout(this.unBlockChangeValue.bind(this, parameter, type, value) , (duration * 1000))
                    break;
                case "urineOutput":
                  this.blockChangeValue(parameter)
                  urineOutputValue   = value
                  this.blockUO6Value = setTimeout(this.unBlockChangeValue.bind(this, parameter, type, value) , (duration * 1000))
                    break;

                case "saturation":
                //  tFinSO = 1800
                  this.blockChangeValue(parameter)
                  saturationValue  = value
                  this.blockSO6Value = setTimeout(this.unBlockChangeValue.bind(this, parameter, type, value) , (duration * 1000))
                    break;

                default:
                   break;
              }
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
                />

            </div>
        </div>
      )

    }

}
