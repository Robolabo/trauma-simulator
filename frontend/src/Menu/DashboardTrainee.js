import React, { Component } from 'react'
import './Dashboard.css'
import { Button } from 'reactstrap';
import { Link } from "react-router-dom"
import { withTranslation } from 'react-i18next';
import Nav from "./Nav"
import axios from 'axios';
import { removeUserSession } from '../Utils/Common';

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
        //browserHistory.push('/');
       // this.props.history.push(login)
    };
 


    render() {
        const { t } = this.props;
        console.log("Datos1" +this.props.location.state.email)
        console.log("Datos1" +this.props.location.state.id)
        return (
            <div>
                <Link type="button"  to="/" onClick={() => this.handleLogout()}>Logout</Link><br/>
                <Nav>
                <Link to={{
                                    pathname: '../',
                                    state: { id: this.props.location.state.id,
                                             isTrainer: false,
                                            email: this.props.location.state.email,
                                            sesion: this.props.location.state.sesion  }
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
                                             sesion: this.props.location.state.sesion  }
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
                                sesion: this.props.location.state.sesion
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