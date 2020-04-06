import React, { Component } from 'react'
import './Dashboard.css'
import { Button } from 'reactstrap';
import { Link } from "react-router-dom"
//import configurationImg from '../assets/configuration.png'
import Nav from "./Nav"



export default class DashboardTrainee extends Component {
    render() {
        return (
            <div>
                <Nav></Nav>
                <div className= "principal">
                    <div className="training">
                        <Link to={{
                                    pathname: '/listSimulation',
                                    state: { id: this.props.location.state.id,
                                             isTrainer: false  }
                                }}>
                            <Button>Access Existing Simulation</Button>
                        </Link>
                    </div>
                </div>
            </div>
        )
    }
}
