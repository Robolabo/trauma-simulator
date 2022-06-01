import React, { Component } from 'react'
import './Dashboard.css'
import { Button } from 'reactstrap';
import { Link } from "react-router-dom"
import { withTranslation } from 'react-i18next';
import Nav from "./Nav"
import axios from 'axios';
import { getToken, removeUserSession, setUserSession } from '../Utils/Common';

//Botón de examne: 'dashboard.exam-simulation'
class DashboardTrainee extends Component {
    handleLogout = () => {
        
        axios.get("http://localhost:8080/trainee/salir/"+this.props.location.state.email)
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
        axios.get("http://localhost:8080/trainee/logout/"+ i)
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
        
        axios.get("http://localhost:8080/trainee/log/"+ i)
        .then(res => {
         if(res.data.success){
          getToken();
          setUserSession();
          
          
        }
        
        })
        .catch(error=>{
          alert("Error server "+error)
        })

    }
    

    }
    
 
 


    render() {
        const { t } = this.props;
        console.log("Datos1" +this.props.location.state.email)
        console.log("Datos1" +this.props.location.state.id)
        const s = this.props.location.state.id
        const i = this.props.location.state.roleId
        console.log("RoleId" + i)
        return (
            <div>
                <Link type="button"  to="/" onClick={() => this.handleLogout()}>Logout</Link><br/>
                <Nav>
                <Link to={{
                                    pathname: '../',
                                    state: { id: this.props.location.state.id,
                                             isTrainer: false,
                                            email: this.props.location.state.email,
                                            sesion: this.props.location.state.sesion,
                                            roleId: this.props.location.state.roleId
                                          }
                                }}>
                            <Button>{t('dashboard.exam-simulation')}</Button>
                            
                        </Link>
                </Nav>
                <div className= "principal">
                    <div className="training">
                        <Link to={{
                                    pathname: '/listSimulation',
                                    state: { id: this.props.location.state.id,
                                             isTrainer: false,
                                             email: this.props.location.state.email,
                                             sesion: this.props.location.state.sesion,
                                             roleId: this.props.location.state.roleId  }
                                }}>
                            <Button>{t('dashboard.exam-simulation')}</Button>
                        
                        </Link>
                        
                        <Link to={{
                                    pathname: '/listSimulation',
                            state: {
                                id: this.props.location.state.id,
                                trainerList: true,
                                isTrainer: false,
                                email: this.props.location.state.email,
                                sesion: this.props.location.state.sesion,
                                roleId: this.props.location.state.roleId 
                            }
                        }}>
                          
                            <Button id="training-simulation">{t('dashboard.training-simulation')}</Button>
                          
                        </Link>

  
                    </div>
                    
                </div>
            </div>
        )
    }
}

export default withTranslation()(DashboardTrainee);