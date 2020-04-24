import React, { Component } from 'react'
import { Button } from 'reactstrap';
import '../simulation.css'
import avatar from '../../assets/my_character.png'
//import Avatar from 'react-avatar';
import { withTranslation } from 'react-i18next';

class Actions extends Component {

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
        const { t } = this.props
        return (
            <div className="actions">
                
                <img className="avatar" alt="avatar" src={avatar} height="190px" width="485px" />

                <div className="timer">
                    {!this.props.start 
                    ? <Button onClick={()=>this.props.startClick()}>{t('simulation.start')}</Button>
                    : null}
                </div>
                 
                <div className="actions-buttons">
                    <Button onClick = {() => this.clean()}>{t('simulation.clean')}</Button>
                    <Button onClick = {() => this.oxygenate()}>{t('simulation.oxygenate')}</Button>
                    <Button onClick = {() => this.intubate()}>{t('simulation.intubate')}</Button>
                </div>

                <div className="actions-buttons">
                    <Button onClick = {() => this.analgesics()}>{t('simulation.analgesics')}</Button>
                    <Button onClick = {() => this.fluids()}>{t('simulation.fluids')}</Button>
                    <Button onClick = {() => this.pelvic_belt()}>{t('simulation.belt')}</Button>
                </div>

                <div className="actions-buttons">
                    <Button onClick = {() => this.transfusion()}>{t('simulation.liquids')}</Button>
                    <Button onClick = {() => this.hot_liquids()}>{t('simulation.transfusion')}</Button>
                    <Button onClick = {() => this.surgery()}>{t('simulation.surgery')}</Button>
                </div>
                
                
            </div>
        )
    }
}

export default withTranslation()(Actions);
