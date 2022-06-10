
import axios from 'axios';
import React, { Component } from 'react'
import { withTranslation } from 'react-i18next';

import Swal from 'sweetalert2'



class Timer extends Component {
    constructor(props){
        super(props);
        this.state = {
          minutes: 0,
          seconds: 0,
          start: false,
          confirm: true,
          confirmCrono: false,
          con1:0,
          con2:0,
          alert:null
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
   /* msg(msg){

        const closeAlert = () => this.toogle()
        var alertMsg =  <Alert id="alert" color={"info"} isOpen={true} toggle={closeAlert}>
                                {msg}
                        </Alert>

        this.setState({
            alert: alertMsg
        });


    }*/

    timer(){
        const { seconds, minutes } = this.state


        if (seconds > 0) {
            this.setState(({ seconds }) => ({
                seconds: seconds - 1
            }))
        }
      //  if(minutes == 26 && seconds == 0){
        if(minutes < 26 && this.state.con1 <1){
            axios.get("http://localhost:8080/trainee/cuatromin/"+this.props.simulationId+"/"+this.props.traineeId)
            .then(res => {
                if(!res.data.success){
                    this.setState({
                        con1: 1})
                 
                    if(res.data.aera>0 && res.data.circulacion>0){

                        Swal.fire({
                            title: 'Han pasado 4 minutos',
                            text: 'Le faltan ' +res.data.aera + ' acciones de vía aerea y '  + res.data.circulacion +  ' acciones de circulacion',
                            icon:'info',
                            showClass: {
                              popup: 'animate__animated animate__fadeInDown'
                            },
                            hideClass: {
                              popup: 'animate__animated animate__fadeOutUp'
                            }
                          })
                      // alert("4 minutos. Te faltan "+ res.data.aera +" acciones de vía aerea y " + res.data.circulacion +" acciones de circulacion")
                        
                       // alert("4 minutos. Te faltan "+ res.data.aera +" acciones de vía aerea y " + res.data.circulacion +" acciones de circulacion");
                    }else if(res.data.aera>0){
                        Swal.fire({
                            title: 'Han pasado 4 minutos',
                            text: "Le faltan "+ res.data.aera +" acciones de vía aerea",
                            icon:'info',
                            showClass: {
                              popup: 'animate__animated animate__fadeInDown'
                            },
                            hideClass: {
                              popup: 'animate__animated animate__fadeOutUp'
                            }
                          })
                        
                    }else if(res.data.circulacion>0){

                        Swal.fire({
                            title: 'Han pasado 4 minutos',
                            text: "Le faltan "+ res.data.circulacion +" acciones de circulacion",
                            icon:'info',
                            showClass: {
                              popup: 'animate__animated animate__fadeInDown'
                            },
                            hideClass: {
                              popup: 'animate__animated animate__fadeOutUp'
                            }
                          })
                        
                        
                    }     
               }
               })
               .catch(error=>{
                 alert("Error server "+error)
               })
        }
        if(minutes < 5 && this.state.con2 <1){
            this.setState({
                con2: 1})
            if(this.props.partBody=='pelvis'&& this.props.phase=='hospitalaria'){
                axios.get("http://localhost:8080/trainee/minPH/"+this.props.simulationId+"/"+this.props.traineeId)
                .then(res => {
                    if(!res.data.success){
                      
                     
                        Swal.fire({
                            title: '<strong> Restan 5 minutos</strong>',
                            icon: 'info',
                            html:
                              '<h2>Número de acciones que le quedan por realizar:</h2>'+
                              
                              '<h3 >'+ res.data.aera + ' de vía aerea</h3>' +
                              '<h3>'+res.data.circulacion + ' de circulación </h3>'+
                              '<h3>'+res.data.exposicion + ' de exposición</h3>'+
                              '<h3>'+ res.data.inmovilizacion+ ' de inmovilización</h3>'+
                              '<h3>'+ res.data.farmacos+ ' fármacos por administrar</h3>'+
                              '<h3>'+ res.data.pruebas +' prueba complementaria</h3>'
                              ,
                            showCloseButton: true,
                          })      
                   }
                   })
            }else if(this.props.partBody=='leftLeg'&& this.props.phase=='hospitalaria'){
                axios.get("http://localhost:8080/trainee/minLH/"+this.props.simulationId+"/"+this.props.traineeId)
                .then(res => { 
                    if(!res.data.success){
                           /* Swal.fire({
                                title: 'Restan 5 minutos',
                                text: "Te faltan "+ res.data.aera +" acciones de vía aerea ," + res.data.circulacion +" acciones de circulacion te faltan, "+ res.data.exposicion +" acciones de exposicion te faltan, "+ res.data.inmovilizacion+ " acciones de inmovilización te faltan "+ res.data.farmacos + " te fataltan fármacos por administrar "+ res.data.pruebas +" pruebas complementarias te faltan por hacer",
                                icon:'info',
                                showClass: {
                                popup: 'animate__animated animate__fadeInDown'
                                },
                                hideClass: {
                                popup: 'animate__animated animate__fadeOutUp'
                                }
                            })*/
                            
                            Swal.fire({
                                title: '<strong> Restan 5 minutos</strong>',
                                icon: 'info',
                                html:
                                  '<h2>Número de acciones que le quedan por realizar:</h2>'+
                                  
                                  '<h3 >'+ res.data.aera + ' de vía aerea</h3>' +
                                  '<h3>'+res.data.circulacion + ' de circulación </h3>'+
                                  '<h3>'+res.data.exposicion + ' de exposición</h3>'+
                                  '<h3>'+ res.data.inmovilizacion+ ' de inmovilización</h3>'+
                                  '<h3>'+ res.data.farmacos+ ' fármacos por administrar</h3>'+
                                  '<h3>'+ res.data.pruebas +' prueba complementaria</h3>'
                                  ,
                                showCloseButton: true,
                              })  
                      // alert("Menos de 5 minutos. Te faltan "+ res.data.aera +" acciones de vía aerea ," + res.data.circulacion +" acciones de circulacion te faltan, "+ res.data.exposicion +" acciones de exposicion te faltan, "+ res.data.inmovilizacion+ " acciones de inmovilización te faltan "+ res.data.farmacos + " te fataltan fármacos por administrar "+ res.data.pruebas +" pruebas complementarias te faltan por hacer");
                         
                   }
                   })
            }else{
                axios.get("http://localhost:8080/trainee/min/"+this.props.simulationId+"/"+this.props.traineeId)
                .then(res => { 
                    if(!res.data.success){
                      /*  Swal.fire({
                            title: 'Restan 5 minutos',
                            text: "Te faltan "+ res.data.aera +" acciones de vía aerea ," + res.data.circulacion +" acciones de circulacion te faltan, "+ res.data.exposicion +" acciones de exposicion te faltan, "+ res.data.inmovilizacion+ " acciones de inmovilización te faltan "+ res.data.farmacos + " te fataltan fármacos por administrar "+ res.data.pruebas +" pruebas complementarias te faltan por hacer",
                            icon:'info',
                            showClass: {
                              popup: 'animate__animated animate__fadeInDown'
                            },
                            hideClass: {
                              popup: 'animate__animated animate__fadeOutUp'
                            }
                          })*/
                          Swal.fire({
                            title: '<strong> Restan 5 minutos</strong>',
                            icon: 'info',
                            html:
                              '<h2>Número de acciones que le quedan por realizar:</h2>'+
                              
                              '<h3 >'+ res.data.aera + ' de vía aerea</h3>' +
                              '<h3>'+res.data.circulacion + ' de circulación </h3>'+
                              '<h3>'+res.data.exposicion + ' de exposición</h3>'+
                              '<h3>'+ res.data.inmovilizacion+ ' de inmovilización</h3>'+
                              '<h3>'+ res.data.farmacos+ ' fármacos por administrar</h3>'
                              ,
                            showCloseButton: true,
                          })  
                        
                      //  " te faltan "+ res.data.farmacos + " te fataltan fármacos por administrar");
    
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
