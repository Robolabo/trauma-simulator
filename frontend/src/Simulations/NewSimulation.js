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
import { Alert } from 'reactstrap';
import { getToken, removeUserSession, setUserSession } from '../Utils/Common';
import { Link } from "react-router-dom"



const default_config = configuration.data[0];
var optionsTrainees= []

class NewSimulation extends Component {

    constructor(props){
        super(props);
        this.state = {
            trainerId: 0,
            traineeId:0,
            roleId: 0,
            sex: 0,
            age: 0,
            weight: 0.0,
            traumaType:"",
            partBody: "",
            bloodLoss: 0.0,
            sistolicPressure: 0.0,
            diastolicPressure: 0.0,
            heartRate: 0.0,
            breathingRate: 0.0,
            urineOutput: 0.0,
            saturation: 0.0,
            temperature: 0.0,
            mentalStatus: "",
            phase:"",
            time: 0,
            redirect: false,
            alert: false,
            rxPelvis:"",
            showrx:false
        }
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleLogout = () => {
        
        axios.get("http://localhost:8080/trainer/salir/"+this.props.location.state.email)
        .then(res => {
         if(res.data.success){
         alert("hemos salido")
        }
        })
        .catch(error=>{
          alert("Error server "+error)
        })
        removeUserSession();
 
    };


    
    componentDidMount(){
        var i = this.props.location.state.id;
        window.onbeforeunload  = function(e) {
            axios.get("http://localhost:8080/trainer/logout/"+ i)
                  .then(res => {
                   if(res.data.success){
                    removeUserSession();
                  }
                  
                  })
                  .catch(error=>{
                    alert("Error server "+error)
                  })
    
            
            e.returnValue = "message to user";
            setTimeout(function () { setTimeout(CancelSelected, 1000); }, 100);
            
        }
        
        function CancelSelected() {
            
            axios.get("http://localhost:8080/trainer/log/"+ i)
            .then(res => {
             if(res.data.success){
              getToken();
              setUserSession();
              alert("Te quedas")
              
            }
            
            })
            .catch(error=>{
              alert("Error server "+error)
            })
    
        }

        const urlTrainee = "http://localhost:8080/trainee/list"
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
                traumaType: default_config.traumaType,
                partBody: default_config.partBody,
                bloodLoss: default_config.bloodLoss,
                diastolicPressure: default_config.diastolicPressure,
                sistolicPressure: default_config.sistolicPressure,
                heartRate: default_config.heartRate,
                breathingRate: default_config.breathingRate,
                urineOutput: default_config.urineOutput,
                saturation: default_config.saturation,
                temperature: default_config.temperature,
                mentalStatus: default_config.mentalStatus,
                phase: default_config.phase,
                time: default_config.time
            })

        } else {

            alert("No se ha podido cargar el fichero de configuración por defecto")
        }

        this.setState({ trainerId: this.props.location.state.id });
        
    }

    handleSubmit(event){

        const baseUrl = "http://localhost:8080/simulation/create"
            
        const datapost = {
            trainerId: this.state.trainerId,
            traineeId: this.state.traineeId,
            roleId: this.state.ageroleId,
            sex: this.state.sex,
            age: this.state.age,
            weight: this.state.weight,
            traumaType: this.state.traumaType,
            partBody: this.state.partBody,
            bloodLoss: this.state.bloodLoss,
            sistolicPressure: this.state.sistolicPressure,
            diastolicPressure: this.state.diastolicPressure,
            heartRate: this.state.heartRate,
            breathingRate: this.state.breathingRate,
            urineOutput: this.state.urineOutput,
            saturation: this.state.saturation,
            mentalStatus: this.state.mentalStatus,
            phase: this.state.phase,
            temperature: this.state.temperature,
            time: this.state.time,
            rxPelvis:this.state.rxPelvis
        }

        if (this.state.traineeId !== 0) {
            axios.post(baseUrl,datapost)
            .then(response=>{
                if (response.data.success===true) {
                    //alert(response.data.message)
                    
                    this.setState({ alert: true});
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
        if(this.state.age >100 || this.state.age< 0){
            this.setState({ alert: false});
            alert("Selecciona una edad comprendida entre 0 y 100 años")
            
        }
        if(this.state.sistolicPressure > 190 || this.state.sistolicPressure < 60){
            this.setState({ alert: false});
            alert("Selecciona una presión sistólica (TAS) comprendida entre 60 y 190 (mmHg)")
           
        }
        if(this.state.diastolicPressure > 90 || this.state.diastolicPressure < 30){
            this.setState({ alert: false});
            alert("Selecciona una presión diastólica (TAD) comprendida entre 30 y 90 (mmHg)")
            
        }
        if(this.state.heartRate > 160 || this.state.heartRate < 50){
            this.setState({ alert: false});
            alert("Selecciona una frecuencia cardiaca comprendida entre 50 y 160 (lat/min)")
            
        }
        if(this.state.breathingRate > 60 || this.state.breathingRate < 0){
            this.setState({ alert: false});
            alert("Selecciona una frecuencia respiratoria comprendida entre 0 y 60 (resp/min)")
        }
        if(this.state.saturation > 100 || this.state.saturation < 70){
            this.setState({ alert: false});
            alert("Selecciona una saturación de oxígeno comprendida entre 70 y 100 (%)")
        }


     
        
        event.preventDefault();
     
    }
    
    alert(type, msg) {
        return(
            <Alert color={type} isOpen={this.state.alert} toggle={() => this.setState({alert:false, redirect:true})}>
                {msg}
            </Alert>
        );
    }
        
    handleChange = selectedOption => {
        this.setState({ partBody: selectedOption.value });
      };
    
    handleChange0 = selectedOption => {
    this.setState({ traumaType: selectedOption.value });
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

    handleChange5 = selectedOption => {
       
        this.setState({ phase: selectedOption.value });
        if(selectedOption.value==="hospitalaria"){
            this.setState({ showrx: true });
        
        }

        else{

            this.setState({ showrx: false });
        }
        
    };

    handleChangerxPelvis = selectedOption => {
       
        this.setState({ rxPelvis: selectedOption.value });
    };

    render() {
        const { t } = this.props
        const optionsMentalStatus = [
            { value: 'anxious', label: t('new-simulation.anxious') },
            { value: 'confused', label: t('new-simulation.confused') },
            { value: 'lethargic', label: t('new-simulation.lethargic') },
            { value: 'normal', label: t('new-simulation.normal')}
          ];
        
        const optionsTraumaType = [
            { value: 'pelvico', label: 'Pélvico' },
            { value: 'inferior', label: 'Inferior' }
        ];
          // Creación de opciones para la fase
          const optionsPhase = [
            { value: 'prehospitalaria', label: 'Pre Hospitalaria' },
            { value: 'hospitalaria', label: 'Hospitalaria' }
            
          ];
        
          const optionsPartBody = [
            { value: 'pelvis', label: t('new-simulation.pelvis')},
            { value: 'rightArm', label: t('new-simulation.right-a') },
            { value: 'leftArm', label: t('new-simulation.left-a') },
            { value: 'rightLeg', label: t('new-simulation.right-l') },
            { value: 'leftLeg', label: t('new-simulation.left-l')},
            { value: 'bothLeg', label: t('new-simulation.both-l')}
            

          ];
         // Creación de opciones para las radiografías de pelvis 
          const optionsrxPelvis = [
            { value: '1', label: "Radiografía Caso 1"},
            { value: '2', label: "Radiografía Caso 2" },
            { value: '3', label: "Radiografía Caso 3" },
            { value: '4', label: "Radiografía Caso 4" },
            
          ];
        return (
            <div>
                 <Link type="button"  to="/" onClick={() => this.handleLogout()}>Logout</Link><br/>
                <Nav></Nav>
                {this.state.alert ? this.alert("success","El caso clínico ha sido creado correctamente.") : null}
                <div className="text1"><h1>{t('new-simulation.text-1')}</h1></div>
                <h2 className="text2">{t('new-simulation.text-2')}</h2> 
                <form className="configuration" onSubmit={this.handleSubmit}>
                    <table className="table-constants">
                        <tbody>
                        <tr>
                                
                                <td><b>Fase</b></td>
                                <td>
                                    <Select
                                        className="selector"
                                        
                                        onChange={this.handleChange5}
                                        options={optionsPhase}
                                    />
                                </td>
                                <td>Tipo de Trauma</td>
                                <td>
                                    <Select
                                        className="selector"
                                        onChange={this.handleChange0}
                                        options={optionsTraumaType}
                                        value={optionsTraumaType.filter(option => option.value === this.state.traumaType)}
                                    />
                                </td>  
                            </tr>
                            <tr>
                                
                                <td><b>{t('new-simulation.trainee-text')}</b></td>
                                <td>
                                    <Select
                                        className="selector"
                                        placeholder={t('new-simulation.students')}
                                        onChange={this.handleChange3}
                                        options={optionsTrainees}
                                    />
                                </td>
                                {this.state.showrx === true &&
                                <>
      
                                 <td>{t('new-simulation.rxPelvis')}</td>
                                <td>
                                    <Select
                                        className="selector"
                                        onChange={this.handleChangerxPelvis}
                                        options={optionsrxPelvis}
                                        value={optionsrxPelvis.filter(option => option.value === this.state.rxPelvis)}
                                    />
                                </td> </> }

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
                                <td>{t('new-simulation.age')}</td>
                                <td>
                                    <input type="number" value={this.state.age} onChange={(value) => this.setState({age: value.target.value})} />
                                </td>
                            </tr>

                            <tr>
                                <td>{t('new-simulation.body')}</td>
                                <td>
                                    <Select
                                        className="selector"
                                        onChange={this.handleChange}
                                        options={optionsPartBody}
                                        value={optionsPartBody.filter(option => option.value === this.state.partBody)}
                                    />
                                </td>    
                               
                                <td>{t('new-simulation.status')}</td>
                                <td>
                                    <Select
                                        className="selector"
                                        onChange={this.handleChange1}
                                        options={optionsMentalStatus}
                                        value={optionsMentalStatus.filter(option => option.value === this.state.mentalStatus)}
                                    />
                                </td>   
                            </tr>

                            <tr>
                                <td>{t('new-simulation.s-pressure')}</td>
                                <td>
                                    <Slider
                                        styles={{
                                            active: {
                                              backgroundColor: '#6c757d'
                                            }
                                        }}
                                        axis="x"
                                        xmax= {190}
                                        xmin= {60}
                                        x={this.state.sistolicPressure}
                                        onChange={({ x }) => this.setState({ sistolicPressure: x })}
                                    />
                                </td>
                                <td colspan="2">
                                    <input type="number" value={this.state.sistolicPressure} onChange={(value) => this.setState({sistolicPressure: value.target.value})} /> 
                                </td>
                            </tr>

                            <tr>
                                <td>{t('new-simulation.d-pressure')}</td>
                                <td>
                                    <Slider
                                        styles={{
                                            active: {
                                              backgroundColor: '#6c757d'
                                            }
                                        }}
                                        axis="x"
                                        xmax= {90}
                                        xmin= {35}
                                        x={this.state.diastolicPressure}
                                        onChange={({ x }) => this.setState({ diastolicPressure: x })}
                                    />
                                </td>
                                <td>
                                    <input type="number" value={this.state.diastolicPressure} onChange={(value) => this.setState({diastolicPressure: value.target.value})} />
                                </td>
                            </tr>

                            <tr>
                                <td>{t('new-simulation.bloodLoss')}</td>
                                <td>
                                    <Slider
                                        styles={{
                                            active: {
                                              backgroundColor: '#6c757d'
                                            }
                                        }}
                                        axis="x"
                                        xmax= {500}
                                        xmin= {100}
                                        x={this.state.bloodLoss}
                                        onChange={({ x }) => this.setState({ bloodLoss: x })}
                                    />
                                </td>
                                <td>
                                    <input type="number" value={this.state.bloodLoss} onChange={(value) => this.setState({bloodLoss: value.target.value})} />
                                </td>
                            </tr>

                            <tr>
                                <td>{t('new-simulation.heart')}</td>
                                <td>
                                    <Slider
                                        styles={{
                                            active: {
                                              backgroundColor: '#6c757d'
                                            }
                                        }}
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
                                        styles={{
                                            active: {
                                              backgroundColor: '#6c757d'
                                            }
                                        }}
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
                                        styles={{
                                            active: {
                                              backgroundColor: '#6c757d'
                                            }
                                        }}
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

                            <tr onSubmit={this.handleSubmit}>
                                <td>{t('new-simulation.temperature')}</td>
                                <td>
                                    <Slider
                                        styles={{
                                            active: {
                                              backgroundColor: '#6c757d'
                                            }
                                        }}
                                        axis="x"
                                        xmax= {43}
                                        xmin= {32}
                                        x= {this.state.temperature}
                                        onChange={({ x }) => this.setState({ temperature: x })}
                                    />
                                </td>
                                <td>
                                    <input type="number" value={this.state.temperature} onChange={(value) => this.setState({temperature: value.target.value})} />
                                </td>
                            </tr>

                            <tr>
                                <td>{t('new-simulation.saturation')}</td>
                                <td>
                                    <Slider
                                        styles={{
                                            active: {
                                              backgroundColor: '#6c757d'
                                            }
                                        }}
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

                            <tr onSubmit={this.handleSubmit}>
                                <td>{t('new-simulation.time')}</td>
                                <td>
                                    <Slider
                                        styles={{
                                            active: {
                                              backgroundColor: '#6c757d'
                                            }
                                        }}
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
                                <td><Button className="saveButton"><input className="save" type="submit" value={t('new-simulation.save')} /></Button></td>
                            </tr>
                        </tbody>
                    </table>

                    
                </form>
                
                {this.state.redirect && !this.state.alert ? <Redirect to={{
                                                        pathname: '/dashboardTrainer',
                                                        state: { id: this.state.trainerId }
                                                    }}/>
                                    : null}
            </div>
        )
    }
}

export default withTranslation()(NewSimulation)