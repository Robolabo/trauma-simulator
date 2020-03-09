import React, { Component } from 'react'
//import { Link } from "react-router-dom"
import './NewSimulation.css'
import Nav from '../Menu/Nav'
import Slider from 'react-input-slider';
import Select from 'react-select';

const optionsMentalStatus = [
    { value: 'anxious', label: 'Anxious' },
    { value: 'confused', label: 'Confused' },
    { value: 'lethargic', label: 'Lethargic' },
    { value: 'normal', label: 'Normal'}
  ];

  const optionsPartBody = [
    { value: 'rightArm', label: 'Right Arm' },
    { value: 'leftArm', label: 'Left Arm' },
    { value: 'rightLeg', label: 'Right Leg' },
    { value: 'leftLeg', label: 'Left Leg'}
  ];

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
    handleChange = selectedOption => {
        this.setState({ partBody: selectedOption.value });
      };

    handleChange1 = selectedOption => {
    this.setState({ mentalStatus: selectedOption.value });
    };

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
                        <Select
                            className="selector"
                            onChange={this.handleChange}
                            options={optionsPartBody}
                        />
                    </div>

                    <div className="input">
                        Blood Loss:
                        <Slider
                            axis="x"
                            xmax= {750}
                            xmin= {0}
                            x={this.state.bloodLoss}
                            onChange={({ x }) => this.setState({ bloodLoss: x })}
                        />
                        <input type="number" value={this.state.bloodLoss} onChange={(value) => this.setState({bloodLoss: value.target.value})} />
                    </div>

                    <div className="input">
                        Blood Preasure:
                        <Slider
                            axis="x"
                            xmax= {750}
                            xmin= {0}
                            x={this.state.bloodPreasure}
                            onChange={({ x }) => this.setState({ bloodPreasure: x })}
                        />
                        <input type="number" value={this.state.bloodPreasure} onChange={(value) => this.setState({bloodPreasure: value.target.value})} />
                    </div>

                    <div className="input">
                        Heart Rate:
                        <Slider
                            axis="x"
                            xmax= {200}
                            xmin= {0}
                            x={this.state.heartRate}
                            onChange={({ x }) => this.setState({ heartRate: x })}
                        />
                        <input type="number" value={this.state.heartRate} onChange={(value) => this.setState({heartRate: value.target.value})} />
                    </div>

                    <div className="input">
                        Breathing Rate:
                        <Slider
                            axis="x"
                            xmax= {750}
                            xmin= {0}
                            x={this.state.breathingRate}
                            onChange={({ x }) => this.setState({ breathingRate: x })}
                        />
                        <input type="number" value={this.state.breathingRate} onChange={(value) => this.setState({breathingRate: value.target.value})} />
                    </div>

                    <div className="input">
                        Urine Output:
                        <Slider
                            axis="x"
                            xmax= {750}
                            xmin= {0}
                            x={this.state.urineOutput}
                            onChange={({ x }) => this.setState({ urineOutput: x })}
                        />
                        <input type="number" value={this.state.urineOutput} onChange={(value) => this.setState({urineOutput: value.target.value})} />
                    </div>

                    <div className="input">
                        Saturation O2:
                        <Slider
                            axis="x"
                            xmax= {750}
                            xmin= {0}
                            x={this.state.saturation}
                            onChange={({ x }) => this.setState({ saturation: x })}
                        />
                        <input type="number" value={this.state.saturation} onChange={(value) => this.setState({saturation: value.target.value})} />
                    </div>

                    <div className="input">
                        Mental Status:
                        <Select
                            className="selector"
                            onChange={this.handleChange1}
                            options={optionsMentalStatus}
                        />
                    </div>

                    <div className="input">
                        Lifetime Remaining:
                        <Slider
                            axis="x"
                            xmax= {750}
                            xmin= {0}
                            x={this.state.time}
                            onChange={({ x }) => this.setState({ time: x })}
                        />
                        <input type="number" value={this.state.time} onChange={(value) => this.setState({time: value.target.value})} />
                    </div>
                </div>
            </div>
        )
    }
}
