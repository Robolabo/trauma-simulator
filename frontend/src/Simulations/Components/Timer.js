
import axios from 'axios';
import React, { Component } from 'react'
import { withTranslation } from 'react-i18next';

class Timer extends Component {
    constructor(props){
        super(props);
        this.state = {
          minutes: 0,
          seconds: 0,
          start: false,
          confirm: true,
          confirmCrono: false
        }
    }



    componentDidUpdate(prevProps, prevState) {
        if(prevProps !== this.props){
            this.setState(() => ({
                start: this.props.start
            }))
            if (this.state.start && this.state.confirm) {
                this.setState({
                    minutes: this.props.time,
                    confirm: false
                })
                this.myTimer = setInterval(this.timer.bind(this), 1000)
            }
            if( prevProps.crono !== this.props.crono ){
                this.setState({
                    confirmCrono: true
                })
            }

            if(this.props.crono){
                if( this.state.confirmCrono){
                    clearInterval(this.myTimer)
                    this.setState(({ minutes }) => ({
                    minutes: minutes - this.props.timeCrono,
                    confirmCrono: false
                    }))
                    this.myTimer = setInterval(this.timer.bind(this), 1000)

                }

            }

            if(this.props.finish){
                clearInterval(this.myTimer)
            }
            

        }
        
    }

    timer(){
        const { seconds, minutes } = this.state

        if (seconds > 0) {
            this.setState(({ seconds }) => ({
                seconds: seconds - 1
            }))
        }
        if(minutes == 26 && seconds == 0){
            
            axios.get("http://localhost:8080/trainee/cuatromin/"+this.props.simulationId+"/"+this.props.traineeId)
            .then(res => {
                if(!res.data.success){
                    if(res.data.aera>0 && res.data.circulacion>0){
                        alert("4 minutos. Te faltan "+ res.data.aera +" acciones de vía aerea y " + res.data.circulacion +" acciones de circulacion");
                    }else if(res.data.aera>0){
                        alert("4 minutos. Te faltan "+ res.data.aera +" acciones de vía aerea");
                    }else if(res.data.circulacion>0){
                        alert("4 minutos. Te faltan "+ res.data.circulacion +" acciones de circulacion");
                    }     
               }
               })
               .catch(error=>{
                 alert("Error server "+error)
               })
        }
        if(minutes == 25 && seconds == 0){
            if(this.props.partBody=='pelvis'&& this.props.phase=='hospitalaria'){
                axios.get("http://localhost:8080/trainee/minPH/"+this.props.simulationId+"/"+this.props.traineeId)
                .then(res => {
                    if(!res.data.success){
                       alert("Menos de 5 minutos. Te faltan "+ res.data.aera +" acciones de vía aerea ," + res.data.circulacion +" acciones de circulacion te faltan, "+ res.data.exposicion +" acciones de exposicion te faltan, "+ res.data.inmovilizacion+ " acciones de inmovilización te faltan "+ res.data.farmacos + " te fataltan fármacos por administrar "+ res.data.pruebas +" pruebas complementarias te faltan por hacer");
                         
                   }
                   })
            }else if(this.props.partBody=='leftLeg'&& this.props.phase=='hospitalaria'){
                axios.get("http://localhost:8080/trainee/minLH/"+this.props.simulationId+"/"+this.props.traineeId)
                .then(res => { 
                    if(!res.data.success){
                       alert("Menos de 5 minutos. Te faltan "+ res.data.aera +" acciones de vía aerea ," + res.data.circulacion +" acciones de circulacion te faltan, "+ res.data.exposicion +" acciones de exposicion te faltan, "+ res.data.inmovilizacion+ " acciones de inmovilización te faltan "+ res.data.farmacos + " te fataltan fármacos por administrar "+ res.data.pruebas +" pruebas complementarias te faltan por hacer");
                         
                   }
                   })
            }else{
                axios.get("http://localhost:8080/trainee/min/"+this.props.simulationId+"/"+this.props.traineeId)
                .then(res => { 
                    if(!res.data.success){
                       alert("Menos de 5 minutos. Te faltan "+ res.data.aera +" acciones de vía aerea ," + res.data.circulacion +" acciones de circulacion te faltan, "+ res.data.exposicion +" acciones de exposicion te faltan, "+ res.data.inmovilizacion+ " acciones de inmovilización te faltan "+ res.data.farmacos + " te fataltan fármacos por administrar");
    
                   }
                   })


            }
        }
        if (minutes < 5) {
            this.props.disableFordward()
        }
        if (seconds === 0) {
            if (minutes === 0) {
                clearInterval(this.myInterval)
                this.props.finishAction()
            } else {
                this.setState(({ minutes }) => ({
                    minutes: minutes - 1,
                    seconds: 59
                }))
            }
        }
        if (minutes < 0 || (minutes === 0  && seconds === 1 )){
            clearInterval(this.myInterval)
            this.props.finishAction()
        }
    }

    stop() {
        clearInterval(this.myInterval)
    }

    restart() {
        
        clearInterval(this.myInterval)
        this.setState({
            minutes: this.props.time,
            seconds: 0
        })
    }

    render() {
        const { minutes, seconds } = this.state
        const { t } = this.props
        return (          
            <div>
                { minutes === 0 && seconds === 0
                    ? <h1>{t('simulation.initial-text')}</h1>
                    : <h1>{t('simulation.time')} {minutes}:{seconds < 10 ? `0${seconds}` : seconds}</h1>
                }
            </div>          
        )
    }
}

export default withTranslation()(Timer);
