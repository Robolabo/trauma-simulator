import React, { Component } from 'react'
import { Button } from 'reactstrap';
import axios from 'axios';
import { Link } from "react-router-dom"
import './NewSimulation.css'
import Nav from '../Menu/Nav'
import Slider from 'react-input-slider';
import Select from 'react-select';
import configuration from '../assets/simulationConfiguration.json'

const default_config = configuration.data[0];

const optionsMentalStatus = [
    { value: 'anxious', label: 'Anxious' },
    { value: 'confused', label: 'Confused' },
    { value: 'lethargic', label: 'Lethargic' },
    { value: 'normal', label: 'Normal'}
  ];

  const optionsPartBody = [
    { value: 'pelvis', label: 'Pelvis'},
    { value: 'rightArm', label: 'Right Arm' },
    { value: 'leftArm', label: 'Left Arm' },
    { value: 'rightLeg', label: 'Right Leg' },
    { value: 'leftLeg', label: 'Left Leg'}
  ];
  let id;

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
    
    componentDidMount(){

        if (default_config !== null){
            
            this.setState({
                sex: default_config.sex,
                age: default_config.age,
                weight: default_config.weight,
                partBody: default_config.partBody,
                bloodLoss: default_config.bloodLoss,
                bloodPreasure: default_config.bloodPreasure,
                heartRate: default_config.heartRate,
                breathingRate: default_config.breathingRate,
                urineOutput: default_config.urineOutput,
                saturation: default_config.saturation,
                mentalStatus: default_config.mentalStatus,
                time: default_config.time
            })

        } else {

            alert("No se ha podido cargar el fichero de configuración por defecto")
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

                    <Link to={"/simulation/"+id}><Button onClick={()=>this.saveParameters()}>Save Configuration</Button></Link>
                </div>
            </div>
        )
    }

    saveParameters(){

        const baseUrl = "http://127.0.0.1:3000/simulation/create"
            
        const datapost = {
            sex: this.state.sex,
            age: this.state.age,
            weight: this.state.weight,
            partBody: this.state.partBody,
            bloodLoss: this.state.bloodLoss,
            bloodPreasure: this.state.bloodPreasure,
            heartRate: this.state.heartRate,
            breathingRate: this.state.breathingRate,
            urineOutput: this.state.urineOutput,
            saturation: this.state.saturation,
            mentalStatus: this.state.mentalStatus,
            time: this.state.time
        }
     
        axios.post(baseUrl,datapost)
        .then(response=>{
            if (response.data.success===true) {
                alert(response.data.message)
                id = response.data.data.id
            }
            else {
                alert(response.data.message)
            }
        })
        .catch(error=>{
            alert("Error 34 "+error)
        })
        
     
    }
}
