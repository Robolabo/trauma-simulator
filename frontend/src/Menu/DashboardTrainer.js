import React, { Component } from 'react'
import './Dashboard.css'
import { Link } from "react-router-dom"
import { Button } from 'reactstrap';
import Nav from "./Nav"
import { withTranslation } from 'react-i18next';
import axios from 'axios';
import { getToken, removeUserSession, setUserSession } from '../Utils/Common';

class DashboardTrainer extends Component {

    constructor(props){
        super(props);
        this.state = {
            id: 0
        }
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

    componentDidMount() {
        this.setState({ id: this.props.location.state.id });

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
          
          
        }
        
        })
        .catch(error=>{
          alert("Error server "+error)
        })

    }
    }

    render() {
        const { t } = this.props;
        return (
            <div>
                 <Link type="button"  to="/" onClick={() => this.handleLogout()}>Logout</Link><br/>
                <Nav></Nav>
                <div className= "principal">
                    <div className="createSimulation">
                        <Link to={{
                                    pathname: '/newSimulation',
                                    state: { id: this.state.id,
                                    email: this.props.location.state.email,
                                    roleId:this.props.location.state.roleId}
                                }}>
                            <Button>{t('dashboard.new-simulation')}</Button>
                        </Link>
                    </div>
                    <div className="training">
                        <Link to={{
                                    pathname: '/listSimulation',
                                    state: { id: this.state.id,
                                             isTrainer: true
                                              }
                                }}>
                            <Button>{t('dashboard.access-simulation')}</Button>
                        </Link>
                    </div>
                </div> 
            </div>
        )
    }
}

export default withTranslation()(DashboardTrainer);