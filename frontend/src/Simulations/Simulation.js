import React, { Component } from 'react'
import axios from 'axios';
import Nav from '../Menu/Nav'
import Timer from '../Simulations/Components/Timer'
import Graphic from '../Simulations/Components/Graphic'
import Actions from '../Simulations/Components/Actions'
import './simulation.css'

const baseUrl = "http://127.0.0.1:3000"

var heartRateValue = 0.5
var bloodPressureValue = -0.5
var breathingRateValue = 0.5
var urineOutputValue = -0.5
var saturationValue = -0.5



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
        dataBloodPressure: [],
        dataUrineOutput: [],
        i: 1,
        start: false,
        confirm: true
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
                    time: data.time 
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
    
            this.myInterval0 = setInterval(() => {
    
                var { heartRate, bloodPressure, breathingRate, urineOutput, saturation, dataHeartRate,
                     dataBloodPressure, dataBreathingRate, dataUrineOutput, dataSaturation, i } = this.state
    
                this.setState(({ i, heartRate, bloodPressure, breathingRate, urineOutput, saturation }) => ({
                    i: i + 1,
                    heartRate: heartRate + (heartRateValue/60),
                    bloodPressure: bloodPressure + (bloodPressureValue/60),
                    breathingRate: breathingRate + (breathingRateValue/60),
                    urineOutput: urineOutput + (urineOutputValue/60),
                    saturation: saturation + (saturationValue/60)
                }))
                
                if (i > 30){
                    dataHeartRate.shift()
                    dataBloodPressure.shift()
                    dataBreathingRate.shift()
                    dataUrineOutput.shift()
                    dataSaturation.shift()
                }
                
                dataHeartRate.push({x: i, y: heartRate})
                dataBloodPressure.push({x: i, y: bloodPressure})
                dataBreathingRate.push({x: i, y: breathingRate})
                dataUrineOutput.push({x: i, y: urineOutput})
                dataSaturation.push({x: i, y: saturation})
                
                this.setState(({ heartRate, bloodPressure, breathingRate, urineOutput, saturation, dataHeartRate, 
                    dataBloodPressure, dataBreathingRate, dataUrineOutput, dataSaturation, i }) => ({
                    dataHeartRate: dataHeartRate,
                    dataBloodPressure:dataBloodPressure,
                    dataBreathingRate:dataBreathingRate,
                    dataUrineOutput:dataUrineOutput,
                    dataSaturation:dataSaturation,
                    i: i,
                    heartRate: heartRate,
                    bloodPressure: bloodPressure,
                    breathingRate: breathingRate,
                    urineOutput: urineOutput,
                    saturation: saturation
                }))    
            }, 1000)
        }
    }

    change(parameter,value) {
        switch (parameter) {

            case "heartRate":

                heartRateValue += value
                
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
    
    render() {
      return(
        
        <div>
            <Nav></Nav>
            <div className="timer">
                <Timer time = {this.state.time}
                    start = {this.state.start} />    
            </div>
            <div className="main">
                <Actions change = {(first, second) => this.change(first, second)}
                        time = {this.state.time}
                        start = {this.state.start}
                        startClick = {() => this.start()} />
                <Graphic 
                        bloodPressure = {this.state.bloodPressure}
                        heartRate = {this.state.heartRate}
                        saturation = {this.state.saturation}
                        urineOutput = {this.state.urineOutput}
                        breathingRate = {this.state.breathingRate}
                        dataHeartRate = {this.state.dataHeartRate}
                        dataBloodPressure = {this.state.dataBloodPressure}
                        dataBreathingRate = {this.state.dataBreathingRate}
                        dataUrineOutput = {this.state.dataUrineOutput}                                         
                        dataSaturation = {this.state.dataSaturation}
                        confirm = {this.state.confirm}
                />
            </div>
        </div>
      )
      
    }
    
}
  
  
  