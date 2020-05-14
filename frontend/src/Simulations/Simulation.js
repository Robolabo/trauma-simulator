import React, { Component } from 'react'
import Alert from 'react-bootstrap/Alert'
import axios from 'axios';
import Nav from '../Menu/Nav'
import Timer from '../Simulations/Components/Timer'
import Graphic from '../Simulations/Components/Graphic'
import Actions from '../Simulations/Components/Actions'
import Messages from '../Simulations/Components/Messages'
import './simulation.css'

const baseUrl = "http://127.0.0.1:8080"

var heartRateValue = 0.5
var bloodPressureValue = -0.5
var breathingRateValue = 0.5
var urineOutputValue = -0.5
var saturationValue = -0.5
var bloodLossValue = -0.5
var breathConstant = [{x: 0, y: 0}, {x: (0.25), y: 500},{x: (0.5), y: 125}]
var heartConstant = [{x: 0, y: 0}, {x: 1/12, y: 0.07}, {x: 1/6, y: 0},
                     {x: 4/15, y: 0}, {x: 0.3, y: -0.14}, {x: 11/30, y: 0.96},
                     {x: 13/30, y: -0.24}, {x: 7/15,y:0}, {x: 37/60, y:0},
                     {x: 0.75, y:0.15}, {x: 0.85, y:0}]
var saturationConstant = [{x: 0, y: 0}, {x: 1/6, y: 1}, 
                            {x: 1/3, y: 30}, {x: 13/30, y: 35}]
var s = 0
var l = 0
var i = 0

export default class LoginForm extends Component {
    constructor(props){
      super(props);
      this.state = {
        sex: 0,
        age: 0,
        weight: 0.0,
        partBody: "",
        bloodLoss: 0,
        bloodPressure: 0.0,
        heartRate: 0.0,
        breathingRate: 0.0,
        urineOutput: 0.0,
        saturation: 0.0,
        mentalStatus: "",
        time: 0,
        dataHeartRate: [],
        dataSaturation: [],
        dataBreathingRate: [],
        xDomain1:[0,5],
        xDomain2:[0,5],
        xDomain3:[i,i+30],
        breathT:0,
        period:0,
        start: false,
        confirm: true,
        alert: null,
        show:true,
        header:null,
        content: null,
        num:0,
        type:null,
        id: null
      }
    }

    componentDidMount(){
        let simulationId = this.props.match.params.id;
        const url = baseUrl+"/simulation/get/"+simulationId
        axios.get(url)
        .then(res=>{
            if (res.data.success) {
                const data = res.data.data[0]
                this.setState({
                    sex: data.sex,
                    age: data.age,
                    weight: data.weight,
                    partBody: data.partBody,
                    bloodLoss: data.bloodLoss,
                    bloodPressure: data.bloodPressure,
                    heartRate: data.heartRate,
                    breathingRate: data.breathingRate,
                    urineOutput: data.urineOutput,
                    saturation: data.saturation,
                    mentalStatus: data.mentalStatus,
                    time: data.time,
                    breathT: 60/data.breathingRate,
                    period: 60/data.heartRate
                })
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
            
            while(i>3) {
                this.setState({
                    xDomain1:[i,i+5],
                    xDomain2:[i,i+5]
                })
            }
            i++
            this.myInterval0 = setInterval(() => {
    
                this.setState(({ heartRate,bloodLoss, bloodPressure, breathingRate, urineOutput, saturation,
                                 dataHeartRate, dataSaturation, dataBreathingRate }) => ({
                    heartRate: heartRate + (heartRateValue/60),
                    bloodLoss: bloodLoss + (bloodLossValue/60),
                    bloodPressure: bloodPressure + (bloodPressureValue/60),
                    breathingRate: breathingRate + (breathingRateValue/60),
                    urineOutput: urineOutput + (urineOutputValue/60),
                    saturation: saturation + (saturationValue/60),
                    breathT: 60/breathingRate,
                    period: 60/heartRate,
                    dataHeartRate: dataHeartRate,
                    dataSaturation:dataSaturation,
                    dataBreathingRate:dataBreathingRate
                })) 
  
            }, 1000)
            
            this.setIntervalHeart()
            this.setIntervalBreath()
        }
    }

    setIntervalHeart() {
        var timerHeart= (this.state.period * 1000)

        this.myIntervalHeart = setInterval(() => {

            var { saturation, dataHeartRate,
                  dataSaturation, period } = this.state
            
            if ( dataHeartRate.length > 88 ) {
                dataHeartRate.splice(0,11)
            }
            if ( dataSaturation.length > 32) {
                dataSaturation.splice(0,4)
            }
            
            for ( var i = 0; i < 11; i++){
                dataHeartRate.push({x:((heartConstant[i].x * period) + (s * period)),
                                        y: heartConstant[i].y})
                if( i < 4) {
                    if (i === 1){
                        dataSaturation.push({x:((saturationConstant[i].x * period) + (s * period)),
                                             y:saturation})
                    } else {
                        dataSaturation.push({x:((saturationConstant[i].x * period) + (s * period)),
                                             y:saturationConstant[i].y})
                    }
                }
            }
            
            s += 1
            
            clearInterval(this.myIntervalHeart)
            this.setIntervalHeart()
        }, timerHeart)
    }

    setIntervalBreath(){
        var timerBreath= (this.state.breathT * 1000)

        this.myIntervalBreath = setInterval(() => {

            var { dataBreathingRate, breathT } = this.state

            if ( dataBreathingRate.length > 24) {
                dataBreathingRate.splice(0,3)
            }

            for (var i = 0; i < 3; i++){
                dataBreathingRate.push({x: ((breathConstant[i].x * breathT) + (l * breathT)),
                                        y:breathConstant[i].y})
                
            }
            l += 1
            clearInterval(this.myIntervalBreath)
            this.setIntervalBreath()    
        }, timerBreath)

    }

    change(parameter,value) {
        switch (parameter) {

            case "heartRate":

                heartRateValue += value
                
                break;

            case "bloodLoss":

                bloodLossValue += value
            
                break;

            case "bloodPressure":

                bloodPressureValue += value
            
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

    changeNum(){
        this.setState(({ num }) => ({
            num: num - 1
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
    
    render() {
      return(
        
        <div>
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
                    start = {this.state.start} />    
            </div>
            <div className="main">
                <Actions change = {(first, second) => this.change(first, second)}
                        send = {(variant,msg) => this.sendInformation(variant, msg)}
                        sendModal = {(id, type, header,content) => this.sendModal(id, type, header, content)}
                        time = {this.state.time}
                        mentalStatus = {this.state.mentalStatus}
                        start = {this.state.start}
                        startClick = {() => this.start()} />
                <Graphic 
                        bloodPressure = {this.state.bloodPressure}
                        heartRate = {this.state.heartRate}
                        bloodLoss = {this.state.bloodLoss}
                        saturation = {this.state.saturation}
                        urineOutput = {this.state.urineOutput}
                        breathingRate = {this.state.breathingRate}
                        dataHeartRate = {this.state.dataHeartRate}
                        dataBreathingRate = {this.state.dataBreathingRate}
                        dataSaturation = {this.state.dataSaturation}
                        confirm = {this.state.confirm}
                        xDomain1 = {this.state.xDomain1}
                        xDomain2 = {this.state.xDomain2}
                />
            </div>
        </div>
      )
      
    }
    
}
  
  
  