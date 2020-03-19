import React, { Component } from 'react'
import axios from 'axios';
import Nav from '../Menu/Nav'
import Timer from '../Simulations/Components/Timer'

const baseUrl = "http://127.0.0.1:3000"



export default class LoginForm extends Component {
    constructor(props){
      super(props);
      this.state = {
        sex: "",
        age: 0,
        weight: 0.0,
        partBody: "",
        bloodLoss: 0,
        bloodPreasure: 0.0,
        heartRate: 0,
        breathingRate: 0.0,
        urineOutput: 0.0,
        saturation: 0,
        mentalStatus: "",
        time: 0
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
                    bloodPreasure: data.bloodPreasure,
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
    
    render() {
      return(
        
        <div>
            <Nav></Nav>
            <Timer time = {this.state.time} />
            <div>
                Sex: {this.state.sex}
                {this.state.id}
                {this.state.age}
            </div>
            
        </div>
      )
      
    }
    
}
  
  
  