import React, { Component } from 'react'
import axios from 'axios';
import { Redirect } from "react-router-dom"
import { withTranslation } from 'react-i18next';
import './NewSimulation.css'
import Nav from '../Menu/Nav'
import Slider from 'react-input-slider';
import { Button } from 'reactstrap';
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
  var optionsTrainees= []

class NewSimulation extends Component {

    constructor(props){
        super(props);
        this.state = {
            trainerId: 0,
            traineeId:0,
            sex: 0,
            age: 0,
            weight: 0.0,
            partBody: "",
            bloodLoss: 0.0,
            bloodPressure: 0.0,
            heartRate: 0.0,
            breathingRate: 0.0,
            urineOutput: 0.0,
            saturation: 0,
            mentalStatus: "",
            time: 0,
            redirect: false
        }
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    
    componentDidMount(){

        const urlTrainee = "http://localhost:3000/trainee/list"
        axios.get(urlTrainee)
        .then(res=>{
            if (res.data.success) {
                const datas = res.data.data
                for (let data of datas) {
                    optionsTrainees.push({ value: data.traineeId, label: data.name + " " +data.surname})
                }
            }
            else {
            alert("Error web service")
            }
        })
        .catch(error=>{
            alert("Error server "+error)
        })

        if (default_config !== null){
            
            this.setState({
                sex: default_config.sex,
                age: default_config.age,
                weight: default_config.weight,
                partBody: default_config.partBody,
                bloodLoss: default_config.bloodLoss,
                bloodPressure: default_config.bloodPressure,
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

        this.setState({ trainerId: this.props.location.state.id });
    }

    handleSubmit(event){

        const baseUrl = "http://127.0.0.1:3000/simulation/create"
            
        const datapost = {
            trainerId: this.state.trainerId,
            traineeId: this.state.traineeId,
            sex: this.state.sex,
            age: this.state.age,
            weight: this.state.weight,
            partBody: this.state.partBody,
            bloodLoss: this.state.bloodLoss,
            bloodPressure: this.state.bloodPressure,
            heartRate: this.state.heartRate,
            breathingRate: this.state.breathingRate,
            urineOutput: this.state.urineOutput,
            saturation: this.state.saturation,
            mentalStatus: this.state.mentalStatus,
            time: this.state.time
        }

        if (this.state.traineeId !== 0) {
            axios.post(baseUrl,datapost)
            .then(response=>{
                if (response.data.success===true) {
                    alert(response.data.message)
                    this.setState({ redirect: true });
                }
                else {
                    alert(response.data.message)
                }
            })
            .catch(error=>{
                alert("Error 34 "+error)
            })
        } else {
            alert("Select the name of the trainee")
        }
     
        
        event.preventDefault();
     
    }
        
    handleChange = selectedOption => {
        this.setState({ partBody: selectedOption.value });
      };

    handleChange1 = selectedOption => {
    this.setState({ mentalStatus: selectedOption.value });
    };

    handleChange3 = selectedOption => {
        this.setState({ traineeId: selectedOption.value });
    };

    handleChange4 = value => {
       
        this.setState({ sex: Number(value.target.value) });
    };

    render() {
        const { t } = this.props
        return (
            <div>
                <Nav></Nav>
                <h1>{t('new-simulation.text-1')}</h1>
                <h2>{t('new-simulation.text-2')}</h2> 
                <form className="configuration" onSubmit={this.handleSubmit}>
                    <table className="table-constants">
                        <tbody>
                            <tr>
                                
                                <td><b>{t('new-simulation.trainee-text')}</b></td>
                                <td>
                                    <Select
                                        className="selector"
                                        onChange={this.handleChange3}
                                        options={optionsTrainees}
                                    />
                                </td>
                                <td></td>
                            </tr>
                            <tr>
                                <td>{t('new-simulation.sex')}</td>
                                <td>
                                <label className="labelAge">
                                    <input type="radio" value= {0} checked={this.state.sex === 0} 
                                                                    onChange={this.handleChange4}/>
                                     {t('new-simulation.male')}
                                </label>
                                <label>
                                    <input type="radio" value= {1} checked={this.state.sex === 1}
                                                                    onChange={this.handleChange4}/>
                                     {t('new-simulation.female')}
                                </label>
                                </td>
                                <td></td>
                            </tr>

                            <tr>
                                <td>{t('new-simulation.age')}</td>
                                <td></td>
                                <td>
                                    <input type="number" value={this.state.age} onChange={(value) => this.setState({age: value.target.value})} />
                                </td>
                            </tr>

                            <tr>
                                <td>{t('new-simulation.body')}</td>
                                <td></td>
                                <td>
                                    <Select
                                        className="selector"
                                        onChange={this.handleChange}
                                        options={optionsPartBody}
                                        value={optionsPartBody.filter(option => option.value === this.state.partBody)}
                                    />
                                </td>    
                            </tr>

                            <tr>
                                <td>{t('new-simulation.s-pressure')}</td>
                                <td>
                                    <Slider
                                        axis="x"
                                        xmax= {190}
                                        xmin= {60}
                                        x={this.state.bloodLoss}
                                        onChange={({ x }) => this.setState({ bloodLoss: x })}
                                    />
                                </td>
                                <td>
                                    <input type="number" value={this.state.bloodLoss} onChange={(value) => this.setState({bloodLoss: value.target.value})} /> 
                                </td>
                            </tr>

                            <tr>
                                <td>{t('new-simulation.d-pressure')}</td>
                                <td>
                                    <Slider
                                        axis="x"
                                        xmax= {85}
                                        xmin= {35}
                                        x={this.state.bloodPressure}
                                        onChange={({ x }) => this.setState({ bloodPressure: x })}
                                    />
                                </td>
                                <td>
                                    <input type="number" value={this.state.bloodPressure} onChange={(value) => this.setState({bloodPressure: value.target.value})} />
                                </td>
                            </tr>

                            <tr>
                                <td>{t('new-simulation.heart')}</td>
                                <td>
                                    <Slider
                                        axis="x"
                                        xmax= {160}
                                        xmin= {50}
                                        x={this.state.heartRate}
                                        onChange={({ x }) => this.setState({ heartRate: x })}
                                    />
                                </td>
                                <td>
                                    <input type="number" value={this.state.heartRate} onChange={(value) => this.setState({heartRate: value.target.value})} />
                                </td>
                            </tr>

                            <tr>
                                <td>{t('new-simulation.breath')}</td>
                                <td>
                                    <Slider
                                        axis="x"
                                        xmax= {60}
                                        xmin= {5}
                                        x={this.state.breathingRate}
                                        onChange={({ x }) => this.setState({ breathingRate: x })}
                                    />
                                </td>
                                <td>
                                    <input type="number" value={this.state.breathingRate} onChange={(value) => this.setState({breathingRate: value.target.value})} />
                                </td>
                            </tr>

                            <tr>
                                <td>{t('new-simulation.urine')}</td>
                                <td>
                                    <Slider
                                        axis="x"
                                        xmax= {15}
                                        xmin= {5}
                                        x={this.state.urineOutput}
                                        onChange={({ x }) => this.setState({ urineOutput: x })}
                                    />
                                </td>   
                                <td>  
                                    <input type="number" value={this.state.urineOutput} onChange={(value) => this.setState({urineOutput: value.target.value})} />
                                </td>
                            </tr>

                            <tr>
                                <td>{t('new-simulation.saturation')}</td>
                                <td>
                                    <Slider
                                        axis="x"
                                        xmax= {100}
                                        xmin= {75}
                                        x={this.state.saturation}
                                        onChange={({ x }) => this.setState({ saturation: x })}
                                    />
                                </td>
                                <td>
                                    <input type="number" value={this.state.saturation} onChange={(value) => this.setState({saturation: value.target.value})} />
                                </td>
                            </tr>

                            <tr>
                                <td>{t('new-simulation.status')}</td>
                                <td></td>
                                <td>
                                    <Select
                                        className="selector"
                                        onChange={this.handleChange1}
                                        options={optionsMentalStatus}
                                        value={optionsMentalStatus.filter(option => option.value === this.state.mentalStatus)}
                                    />
                                </td>    
                            </tr>

                            <tr onSubmit={this.handleSubmit}>
                                <td>{t('new-simulation.time')}</td>
                                <td>
                                    <Slider
                                        axis="x"
                                        xmax= {750}
                                        xmin= {0}
                                        x={this.state.time}
                                        onChange={({ x }) => this.setState({ time: x })}
                                    />
                                </td>
                                <td>
                                    <input type="number" value={this.state.time} onChange={(value) => this.setState({time: value.target.value})} />
                                </td>
                            </tr>
                        </tbody>
                    </table>

                    <Button className="saveButton"><input className="save" type="submit" value={t('new-simulation.save')} /></Button>
                </form>
                {this.state.redirect ? <Redirect to={{
                                                        pathname: '/dashboardTrainer',
                                                        state: { id: this.state.trainerId }
                                                    }}/>
                                    : null}
            </div>
        )
    }
}

export default withTranslation()(NewSimulation)