import React, { Component } from 'react'
import axios from 'axios';
import Nav from '../Menu/Nav'
import Timer from '../Simulations/Components/Timer'
import Graphic from '../Simulations/Components/Graphic'
import Graphic1 from '../Simulations/Components/Graphic1'

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
        time: 0,
        data: [
            {x: 0, y: 8},
            {x: 1, y: 5},
            {x: 2, y: 4},
            {x: 3, y: 9},
            {x: 4, y: 1},
            {x: 5, y: 7},
            {x: 6, y: 6},
            {x: 7, y: 3},
            {x: 8, y: 2},
            {x: 9, y: 0},
            {x: 10, y: 4},
            {x: 11, y: 4},
            {x: 12, y: 4},
            {x: 13, y: 4},
            {x: 14, y: 4},
            {x: 15, y: 4}
          ],
          i: 15,
          j: 4
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

    start() {

        this.myInterval = setInterval(() => {
            var { data, i, j } = this.state
            i = i + 1
            j = j + 1
            data.push({x: i, y: j})
            
            this.setState(({ data }) => ({
                data: data
            }))
            
        }, 1000)
    }
    
    render() {
      return(
        
        <div>
            <Nav></Nav>
            <Timer time = {this.state.time} />
            <Graphic change = {() => this.start()}
                     data = {this.state.data}
            />
            <Graphic1/>
            <div>
                Sex: {this.state.sex}
                {this.state.id}
                {this.state.age}
            </div>
            
        </div>
      )
      
    }
    
}
  
  
  