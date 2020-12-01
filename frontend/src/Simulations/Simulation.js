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

var heartRateValue = 1.9
var diastolicPressureValue = -1.7
var breathingRateValue = 0.5
var urineOutputValue = -0.5
var saturationValue = -0.4
var sistolicPressureValue = -1.7
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
var timeSim = 1
var initialData

var testHeartRate = []
var testBreathRate = []
var testDistolic = []
var testSistolic = []
var testUrine = []
var testSaturation = []
var testData = null

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

    start () {

        if ( this.state.confirm) {

            this.setState(( { start }) => ( {
                start: !start,
                confirm: false
            }))

            this.myInterval0 = setInterval(this.interval0.bind(this) , 1000)
            this.changeConstants = setInterval(this.intervalChange.bind(this),1000)
            
        }
    }

    intervalChange(){
        let newHR = this.state.heartRate + (heartRateValue/60)
        let newSP = this.state.sistolicPressure + (sistolicPressureValue/60)
        let newDP = this.state.diastolicPressure + (diastolicPressureValue/60)
        let newBR = this.state.breathingRate + (breathingRateValue/60)
        let newUO = this.state.urineOutput + (urineOutputValue/60)
        let newSO = this.state.saturation + (saturationValue/60)
        let HR = (newHR < 160 && newHR > 50 ) ? newHR : this.state.heartRate
        let SP = (newSP < 190 && newSP > 60 ) ? newSP : this.state.sistolicPressure
        let DP = (newDP < 85 && newDP > 30 ) ? newDP : this.state.diastolicPressure
        let BR = (newBR < 60 && newBR > 5 ) ? newBR : this.state.breathingRate
        let UO = (newUO < 15 && newUO > 5 ) ? newUO : this.state.urineOutput
        let SO = (newSO < 97 && newSO > 75 ) ? newSO : this.state.saturation
        this.setState({
            heartRate: HR,
            sistolicPressure: SP,
            diastolicPressure: DP ,
            breathingRate: BR,
            urineOutput: UO,
            saturation: SO
        })   
    }

    interval0() {
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
        timeSim += 1
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

    }
        
    toogleCrono(next){
        if (this.state.start){
            
            this.setState({
                crono: true,
                timeCrono:next
            })
            clearInterval(this.myInterval0)
            let newHR = this.state.heartRate + (heartRateValue * next)
            let newSP = this.state.sistolicPressure + (sistolicPressureValue * next)
            let newDP = this.state.diastolicPressure + (diastolicPressureValue * next)
            let newBR = this.state.breathingRate + (breathingRateValue * next)
            let newUO = this.state.urineOutput + (urineOutputValue * next)
            let newSO = this.state.saturation + (saturationValue * next)
            let HR = (newHR > 160) ? 160 : newHR
                HR = (newHR < 50) ? 50 : HR
            let SP = (newSP > 190) ? 190 : newSP
                SP = (newSP < 60) ? 60 : SP
            let DP = (newDP > 85) ? 85 : newDP
                DP = (newDP < 30) ? 30 : DP
            let BR = (newBR > 60) ? 60 : newBR
                BR = (newBR < 5) ? 5 : BR
            let UO = (newUO > 15) ? 15 : newUO
                UO = (newUO < 5) ? 5 : UO
            let SO = (newSO > 97 ) ? 97 : newSO
                SO = (newSO < 75) ? 75 : SO
            timeSim += (next * 60)
            this.setState({
                heartRate: HR,
                sistolicPressure: SP,
                diastolicPressure: DP ,
                breathingRate: BR,
                urineOutput: UO,
                saturation: SO
            })
            if( HR === 160 && SP === 60 && DP === 30 && BR === 60 && SO === 75 ){
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
            this.myInterval0 = setInterval(this.interval0.bind(this) , 1000)
        }
        
    }

    sendData(next){

        this.setState({
            document: next
        })
    }

    

    change(parameter,value) {
        switch (parameter) {

            case "heartRate":

                heartRateValue += value
                
                break;

            case "sistolicPressure":

                sistolicPressureValue += value
            
                break;

            case "diastolicPressure":

                diastolicPressureValue += value
            
                break;

            case "breathingRate":

                breathingRateValue += value
            
                break;

            case "urineOutput":

                urineOutputValue += value
        
                break;

            case "saturation":

                saturationValue += value
            
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
        clearInterval(this.myInterval0)
    }

    disableFordward(){
        this.setState({
            fordward: false
        })
    }

    test(){
        testHeartRate.push({x: timeSim, y: this.state.heartRate})
        testBreathRate.push({x: timeSim, y: this.state.breathingRate})
        testDistolic.push({x: timeSim, y: this.state.diastolicPressure})
        testSistolic.push({x: timeSim, y: this.state.sistolicPressure})
        testUrine.push({x: timeSim, y: this.state.urineOutput})
        testSaturation.push({x: timeSim, y: this.state.saturation})
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
                <Actions change = {(first, second) => this.change(first, second)}
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
                        timeSim = {timeSim}
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
  
  
  