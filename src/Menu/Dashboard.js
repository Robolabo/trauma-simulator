import React, { Component } from 'react'
import './Dashboard.css'
import createImg from '../assets/create.png'
import trainImg from '../assets/training.png'
import { Link } from "react-router-dom"
//import configurationImg from '../assets/configuration.png'



export default class Dashboard extends Component {
    render() {
        return (
            <div>
                <nav className="navbar navbar-light" >
                    <a className="navbar-brand">Navbar</a>
                    <form className="form-inline">
                    <input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search"/>
                    <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
                    </form>
                </nav>
                <div className= "principal">
                    <div className="createSimulation">
                        <Link to="#"><img className= "item" src={createImg} alt= "item1"/></Link>
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
