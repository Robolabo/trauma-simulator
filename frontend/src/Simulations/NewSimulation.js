import React, { Component } from 'react'
//import { Link } from "react-router-dom"
import './NewSimulation.css'
import Nav from '../Menu/Nav'




export default class NewSimulation extends Component {

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

    render() {
        return (
            <div>
                <Nav></Nav>
                <h1>Add new simulation</h1>
                <h2>Introduce hemorrhagic shock levels:</h2> 
                <div className="configuration">

                    <div className="input">
                        Sex:
                        <label>
                            <input type="radio" value="Male" />
                            Male
                        </label>
                        <label>
                            <input type="radio" value="Female" />
                            Female
                        </label>
                    </div>

                    <div className="input">
                        Age:
                        <input type="number" value={this.state.age} onChange={(value) => this.setState({age: value.target.value})} />
                    </div>

                    <div className="input">
                        Part of the body affected:
                        <input type="text" value={this.state.partBody} onChange={(value) => this.setState({partBody: value.target.value})} />
                    </div>

                    <div className="input">
                        Blood Loss:
                        <input type="number" value={this.state.bloodLoss} onChange={(value) => this.setState({bloodLoss: value.target.value})} />
                    </div>

                    <div className="input">
                        Blood Preasure:
                        <input type="number" value={this.state.bloodPreasure} onChange={(value) => this.setState({bloodPreasure: value.target.value})} />
                    </div>

                    <div className="input">
                        Heart Rate:
                        <input type="number" value={this.state.heartRate} onChange={(value) => this.setState({heartRate: value.target.value})} />
                    </div>

                    <div className="input">
                        Breathing Rate:
                        <input type="number" value={this.state.breathingRate} onChange={(value) => this.setState({breathingRate: value.target.value})} />
                    </div>

                    <div className="input">
                        Urine Output:
                        <input type="number" value={this.state.urineOutput} onChange={(value) => this.setState({urineOutput: value.target.value})} />
                    </div>

                    <div className="input">
                        Saturation O2:
                        <input type="number" value={this.state.saturation} onChange={(value) => this.setState({saturation: value.target.value})} />
                    </div>

                    <div className="input">
                        Mental Status:
                        <input type="text" value={this.state.mentalStatus} onChange={(value) => this.setState({mentalStatus: value.target.value})} />
                    </div>

                    <div className="input">
                        Lifetime Remaining:
                        <input type="number" value={this.state.time} onChange={(value) => this.setState({time: value.target.value})} />
                    </div>

                </div>
            </div>
        )
    }
}
