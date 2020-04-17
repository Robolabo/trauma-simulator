import React, { Component } from 'react'
import { Button } from 'reactstrap';
import '../simulation.css'
import avatar from '../../assets/my_character.png'
//import Avatar from 'react-avatar';

export default class Actions extends Component {

    clean() {
        this.props.change("heartRate", -0.5)
        this.props.change("bloodLoss", 0.5)
        this.props.change("bloodPressure", 0.5)
        this.props.change("breathingRate", -0.5)
        //this.props.change("urineOutput", -0.5)
        this.props.change("saturation", 0.5)
    }

    oxygenate() {
        //this.props.change("heartRate", 0)
        //this.props.change("bloodPressure", 0)
        //this.props.change("breathingRate", 0)
        //this.props.change("urineOutput", 0)
        this.props.change("saturation", 0.5)
    }

    intubate() {
        this.props.change("heartRate", -0.5)
        this.props.change("bloodLoss", -0.5)
        this.props.change("bloodPressure", -0.5)
        this.props.change("breathingRate", -0.5)
        this.props.change("urineOutput", -0.5)
        this.props.change("saturation", 0.5)
    }

    analgesics() {
        //this.props.change("heartRate", 0)
        this.props.change("bloodLoss", 0.5)
        this.props.change("bloodPressure", 0.5)
        this.props.change("breathingRate", -0.5)
        //this.props.change("urineOutput", 0)
        //this.props.change("saturation", 0)
    }

    fluids() {
        //this.props.change("heartRate", 0)
        this.props.change("bloodLoss", 0.5)
        this.props.change("bloodPressure", 0.5)
        //this.props.change("breathingRate", 0)
        this.props.change("urineOutput", 0.5)
        //this.props.change("saturation", 0)
    }

    pelvic_belt() {
        this.props.change("heartRate", -0.5)
        this.props.change("bloodLoss", 0.5)
        this.props.change("bloodPressure", 0.5)
        //this.props.change("breathingRate", 0)
        //this.props.change("urineOutput", 0)
        this.props.change("saturation", 0.5)
    }

    transfusion() {
        this.props.change("heartRate", -0.5)
        this.props.change("bloodLoss", 0.5)
        this.props.change("bloodPressure", 0.5)
        this.props.change("breathingRate", -0.5)
        this.props.change("urineOutput", 0.5)
        this.props.change("saturation", 0.5)
    }

    hot_liquids() {
        this.props.change("heartRate", -0.5)
        this.props.change("bloodLoss", 0.5)
        this.props.change("bloodPressure", 0.5)
        //this.props.change("breathingRate", 0)
        this.props.change("urineOutput", 0.5)
        //this.props.change("saturation", 0)
    }

    surgery() {
        this.props.change("heartRate", -0.5)
        this.props.change("bloodLoss", 0.5)
        this.props.change("bloodPressure", 0.5)
        this.props.change("breathingRate", -0.5)
        //this.props.change("urineOutput", -0.5)
        this.props.change("saturation", 0.5)
    }

    render() {
        return (
            <div className="actions">
                
                <img className="avatar" alt="avatar" src={avatar} height="190px" width="485px" />

                <div className="timer">
                    {!this.props.start 
                    ? <Button onClick={()=>this.props.startClick()}>Start</Button>
                    : null}
                </div>
                 
                <div className="actions-buttons">
                    <Button onClick = {() => this.clean()}>Clean airway</Button>
                    <Button onClick = {() => this.oxygenate()}>Oxygenate</Button>
                    <Button onClick = {() => this.intubate()}>Intubate</Button>
                </div>

                <div className="actions-buttons">
                    <Button onClick = {() => this.analgesics()}>Analgesics</Button>
                    <Button onClick = {() => this.fluids()}>Fluids</Button>
                    <Button onClick = {() => this.pelvic_belt()}>Pelvic Belt</Button>
                </div>

                <div className="actions-buttons">
                    <Button onClick = {() => this.transfusion()}>Hot Liquids</Button>
                    <Button onClick = {() => this.hot_liquids()}>Transfusion</Button>
                    <Button onClick = {() => this.surgery()}>Surgery</Button>
                </div>
                
                
            </div>
        )
    }
}
