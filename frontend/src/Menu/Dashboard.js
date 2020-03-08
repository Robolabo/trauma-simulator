import React, { Component } from 'react'
import './Dashboard.css'
import createImg from '../assets/create.png'
import trainImg from '../assets/training.png'
import { Link } from "react-router-dom"
//import configurationImg from '../assets/configuration.png'
import Nav from "../Menu/Nav"



export default class Dashboard extends Component {
    render() {
        return (
            <div>
                <Nav></Nav>
                <div className= "principal">
                    <div className="createSimulation">
                        <Link to="/newSimulation"><img className= "item" src={createImg} alt= "item1"/></Link>
                        <p className="text">New Simulation</p>
                    </div>
                    <div className="training">
                        <Link to="#"><img className= "item" src={trainImg}alt= "item2"/></Link>
                        <p className="text">Access Existing Simulation</p>
                    </div>
                </div>
            </div>
        )
    }
}
