import React, {useState} from 'react'
import './RegisterForm.css'
import { Link } from "react-router-dom"
import axios from 'axios';
import sha256 from 'js-sha256'
import { withTranslation } from 'react-i18next';
import formulario from '../assets/formulario.png'
import {Redirect} from "react-router-dom"
import Swal from 'sweetalert2'

class RegisterForm extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            //campName: "",
            //campSurname:"",
            //campPassword:"",
            //campConfirm:"",
            //campEmail:"",
            //campWorkplace:"",
            //selectRole:0,
            //trainer: true,
            //trainee: false
            trainer: false,
            trainee: true,
            campName: "",
            campSurname:"",
            campPassword:"",
            campConfirm:"",
            campEmail:"",
            campWorkplace:"",
            redirect: false,
            selectRole:0, 
            id:0
        }

        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.toogleTrainer = this.toogleTrainer.bind(this);
        this.toogleTrainee = this.toogleTrainee.bind(this);
        
    }

   

    
    handleInputChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;
    
        this.setState({
          [name]: value
        });
      }

    handleSubmit(event) {
        let  nombre = /^[a-zA-ZÀ-ÿ\s]{1,40}$/; // Letras y espacios, pueden llevar acentos
        /* Passwords must be 
            - At least 6 characters long, max length anything
            - Include at least 1 lowercase letter
            - 1 capital letter
            - 1 number
            - 1 special character => !@#$%^&*
            */
        let  password= /^(?=.*[\d])(?=.*[A-Z])(?=.*[a-z])[\w!@#$%^&*]{6,}$/ 
        let  email= /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
        let correct = true;
        if(nombre.test(this.state.campName)){
            console.log('input correcto')
        }
        else{
            correct = false
            Swal.fire({
                title: 'El nombre solo puede contener letras y espacios',
                showClass: {
                  popup: 'animate__animated animate__fadeInDown'
                },
                hideClass: {
                  popup: 'animate__animated animate__fadeOutUp'
                }
              })
            //alert("El nombre solo puede contener letras y espacios")
        }
        if(nombre.test(this.state.campSurname)){
            console.log('input correcto')
        }
        else{
            correct = false
            Swal.fire({
                title: 'El apellido solo puede contener letras y espacios',
                showClass: {
                  popup: 'animate__animated animate__fadeInDown'
                },
                hideClass: {
                  popup: 'animate__animated animate__fadeOutUp'
                }
            })
            
            //alert("El apellido solo puede contener letras y espacios")
        }
        if(password.test(this.state.campPassword)){
            console.log('input correcto')
        }
        else{
            correct = false
            Swal.fire({
                title: 'La contraseña tiene que contener mínimo 6 caracteres, al menos una minúscula, una mayúscula y un número.',
                showClass: {
                  popup: 'animate__animated animate__fadeInDown'
                },
                hideClass: {
                  popup: 'animate__animated animate__fadeOutUp'
                }
            })
            //alert("La contraseña tiene que contener mínimo 6 caracteres, al menos una minúscula, una mayúscula y un número.")
        }
        if(email.test(this.state.campEmail)){
            console.log('input correcto')
        }
        else{
            correct = false
            Swal.fire({
                title: 'El correo electrónico debe ser válido',
                showClass: {
                  popup: 'animate__animated animate__fadeInDown'
                },
                hideClass: {
                  popup: 'animate__animated animate__fadeOutUp'
                }
            })
           // alert("El correo electrónico debe ser válido")
        }
        if(nombre.test(this.state.campWorkplace)){
            console.log('input correcto')
        }
        else{
            correct = false
            Swal.fire({
                title: 'El lugar de trabajo solo puede contener letras y espacios',
                showClass: {
                  popup: 'animate__animated animate__fadeInDown'
                },
                hideClass: {
                  popup: 'animate__animated animate__fadeOutUp'
                }
            })
           // alert("El lugar de trabajo solo puede contener letras y espacios")
        }

        if (this.state.campName==="") {
            correct = false
            Swal.fire({
                title: 'Introduce your name',
                showClass: {
                  popup: 'animate__animated animate__fadeInDown'
                },
                hideClass: {
                  popup: 'animate__animated animate__fadeOutUp'
                }
            })
            //alert("Introduce your name")
        }
        else if (this.state.campSurname==="") {
            correct = false
            Swal.fire({
                title: 'Introduce your surname',
                showClass: {
                  popup: 'animate__animated animate__fadeInDown'
                },
                hideClass: {
                  popup: 'animate__animated animate__fadeOutUp'
                }
            })
            //alert("Introduce your surname")
        }
        else if (this.state.campPassword==="") {
            correct = false
            Swal.fire({
                title: 'Introduce a password',
                showClass: {
                  popup: 'animate__animated animate__fadeInDown'
                },
                hideClass: {
                  popup: 'animate__animated animate__fadeOutUp'
                }
            })
           // alert("Introduce a password")
        }
        else if (this.state.campEmail==="") {
            correct = false
            Swal.fire({
                title: 'Introduce your email',
                showClass: {
                  popup: 'animate__animated animate__fadeInDown'
                },
                hideClass: {
                  popup: 'animate__animated animate__fadeOutUp'
                }
            })
           // alert("Introduce your email")
        }
        else if (this.state.campWorkplace==="") {
            correct = false
            Swal.fire({
                title: 'Introduce your workplace',
                showClass: {
                  popup: 'animate__animated animate__fadeInDown'
                },
                hideClass: {
                  popup: 'animate__animated animate__fadeOutUp'
                }
            })
           // alert("Introduce your workplace")
        }
        else if (this.state.selectRole === 0){
            correct = false
            Swal.fire({
                title: 'Select your role',
                showClass: {
                  popup: 'animate__animated animate__fadeInDown'
                },
                hideClass: {
                  popup: 'animate__animated animate__fadeOutUp'
                }
            })
            //alert("Select your role")
        }
        else if(this.state.campPassword !== this.state.campConfirm){
            correct = false
            Swal.fire({
                title: 'The passwords must be the same',
                showClass: {
                  popup: 'animate__animated animate__fadeInDown'
                },
                hideClass: {
                  popup: 'animate__animated animate__fadeOutUp'
                }
            })
            //alert("The passwords must be the same")
        }

        if (correct) {



            var baseUrl = ""
            if (this.state.trainer) {
                baseUrl = "http://localhost:8080/trainer/create"
            } else {
                baseUrl = "http://localhost:8080/trainee/create"
            }
            const datapost = {
            name: this.state.campName,
            surname: this.state.campSurname,
            password: sha256(this.state.campPassword),
            email: this.state.campEmail,
            workplace: this.state.campWorkplace,
            roleId: this.state.selectRole
            }
       
          axios.post(baseUrl,datapost)
          .then(response=>{
              if (response.data.success===true) {
                Swal.fire({
                    title: response.data.message,
                    showClass: {
                      popup: 'animate__animated animate__fadeInDown'
                    },
                    hideClass: {
                      popup: 'animate__animated animate__fadeOutUp'
                    }
                })
                  //alert(response.data.message)
                  this.setRedirect()
                  
              }
              else {
                Swal.fire({
                    title: response.data.message,
                    showClass: {
                      popup: 'animate__animated animate__fadeInDown'
                    },
                    hideClass: {
                      popup: 'animate__animated animate__fadeOutUp'
                    }
                })
                 // alert(response.data.message)
                  window.location.reload(true);

              }
          })
          .catch(error=>{
              alert("Error 34 "+error)
          })
          }
        event.preventDefault();
        
    }

    toogleTrainer() {
        this.setState({
            trainer: true,
            trainee: false,
            campName: "",
            campSurname:"",
            campPassword:"",
            campConfirm:"",
            campEmail:"",
            campWorkplace:"",
            selectRole:0
          });

          var tab_trainer = document.getElementById("trainer-tab")
          var tab_trainee = document.getElementById("trainee-tab")
          tab_trainer.className= "nav-link active"
          tab_trainee.className="nav-link"
    }

    toogleTrainee() {
        this.setState({
            trainer: false,
            trainee: true,
            campName: "",
            campSurname:"",
            campPassword:"",
            campConfirm:"",
            campEmail:"",
            campWorkplace:"",
            selectRole:0
          });
          
          var tab_trainer = document.getElementById("trainer-tab")
          var tab_trainee = document.getElementById("trainee-tab")
          tab_trainee.className= "nav-link active"
          tab_trainer.className="nav-link"
          
    }
   


    setRedirect = () => {
        this.setState({
          redirect: true
        })
      }
    
      renderRedirect = () => {
        if (this.state.redirect && this.state.trainee) {
          return <Redirect to={{
                                pathname: '/dashboardTrainee',
                                state: { id: this.state.id }
                            }} />
        } else if (this.state.redirect && this.state.trainer) {
          return <Redirect to={{
                                pathname: '/dashboardTrainer',
                                state: { id: this.state.id }
                            }} />
        }
      }
    render() {
        const { t } = this.props;
        return(
            <div className="container register">
                <div className="row">
                    <div className="col-md-3 register-left">
                        <img src={formulario} alt="hola"/>
                        <h3>{t('register.welcome')}</h3>
                        <Link className="access" type="submit"  to="/">{t('register.login')}</Link><br/>
                    </div>
                    <div className="col-md-9 register-right">
                        <ul className="nav nav-tabs nav-justified" id="myTab" role="tablist">
                            {/*<li className="nav-item">
                                <Link className="nav-link active" id="trainer-tab" data-toggle="tab" to="#" role="tab" aria-controls="home" aria-selected="false" onClick={this.toogleTrainer}>{t('list-simulation.trainer')}</Link>
        </li>*/}
                            <li className="nav-item">
                                <Link className="nav-link" id="trainee-tab" data-toggle="tab"  to="#" role="tab" aria-controls="profile" aria-selected="false" /*onClick={this.toogleTrainee}*/>{t('list-simulation.trainee')}</Link>
                            </li>
                        </ul>
                        <div className="tab-content" id="myTabContent">
                            <div className="tab-pane fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">
                                {this.state.trainer 
                                ? <h3 className="register-heading">{t('register.text-trainer')}</h3>
                                : <h3 className="register-heading">{t('register.text-trainee')}</h3>}
                                
                                <form className="row register-form" onSubmit={this.handleSubmit}>
                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <input type="text" className="form-control" name="campName" placeholder={t('register.first-name')} value={this.state.campName} onChange={this.handleInputChange} />
                                        </div>
                                        <div className="form-group">
                                            <input type="text" className="form-control" name="campSurname" placeholder={t('register.last-name')} value={this.state.campSurname} onChange={this.handleInputChange}  />
                                        </div>
                                        <div className="form-group">
                                            <input type="password" className="form-control" name="campPassword" placeholder={t('register.password')} value={this.state.campPassword} onChange={this.handleInputChange} />
                                        </div>
                                        <div className="form-group">
                                            <input type="password" className="form-control"  name="campConfirm" placeholder={t('register.confirm-p')} value={this.state.campConfirm} onChange={this.handleInputChange}  />
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <input type="email" className="form-control" name="campEmail" placeholder={t('register.email')} value={this.state.campEmail} onChange={this.handleInputChange} />
                                        </div>
                                        <div className="form-group">
                                            <input type="text" className="form-control" name="campWorkplace" placeholder={t('register.workplace')} value={this.state.campWorkplace} onChange={this.handleInputChange} />
                                        </div>
                                        <div className="form-group">
                                            <select id="inputState" className="form-control" onChange={(value)=> this.setState({selectRole:Number(value.target.value)})}>
                                                <option defaultValue>{t('register.role')}</option>
                                                <option value={2}>{t('register.doctor')}</option>
                                                <option value={3}>{t('register.resident')}</option>
                                                {this.state.trainee
                                                ? <option value={4}>{t('register.student')}</option>
                                                : null}                                                
                                            </select>
                                        </div>
                                        <input type="submit" className="btnRegister"  value={t('register.register')}/>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
                {this.renderRedirect()}
            </div>           
        );
    }
}

export default withTranslation()(RegisterForm);