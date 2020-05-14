import React, { Component } from 'react'
import { Button } from 'reactstrap';
import { Modal, ModalHeader, Card, CardBody, Input } from 'reactstrap'
import '../simulation.css'
import naked from '../../assets/my_character.png'
import coll from '../../assets/coll.png'
import collMasc from '../../assets/coll+masc.png'
import masc from '../../assets/masc.png'
import collCint from '../../assets/coll+cint.png'
import collMascCint from '../../assets/coll+masc+cint.png'
import cint from '../../assets/cint.png'
import mascCint from '../../assets/masc+cint.png'
import mascManta from '../../assets/mac+manta.png'
import collMascManta from '../../assets/coll+masc+manta.png'
import manta from '../../assets/manta.png'
import collManta from '../../assets/coll+manta.png'
import arrow_down from '../../assets/arrow-down.png'
import arrow_up from '../../assets/arrow-up.png'
import rxTorax from '../../assets/rxTorax.png'
import rxPelvis from '../../assets/rxPelvis.png'
import ecoAbd from '../../assets/ecoAbd.png'
import tacAbdPelv from '../../assets/tacAbdPelv.png'
import { withTranslation } from 'react-i18next';
import axios from 'axios';
const baseUrl = "http://127.0.0.1:8080"

var avatar = naked
var content;

var rx = []
var eco = []
var tac = []

class Actions extends Component {

    constructor(props){
        super(props);
        this.state = {
          actionPage:1,
          rxModal: false,
          rxType:"",
          ecoModal: false,
          ecoType:"",
          tacModal:false,
          tacType:""
        }
        this.handleChange = this.handleChange.bind(this)
    }

    

    handleChange(num){
        this.setState({
            actionPage: num
        });
    }

    setRxModal(next){
        this.setState({rxModal: next});
    }

    setEcoModal(next){
        this.setState({ecoModal: next});
    }

    setTacModal(next){
        this.setState({tacModal: next});
    }

    getMsg(variant, action, num){
        const url = baseUrl+"/action/get/"+action
        axios.get(url)
        .then(res=>{
            if (res.data.success) {
                const data = res.data.data
                //console.log(data)
                this.props.send(variant,data.messages[num])
            }
            else {
            alert("Error web service")
            }
        })
        .catch(error=>{
            alert("Error server "+error)
        })

    }

    handleRx(event){
        this.setState({rxType: event.target.value });
    }

    handleEco(event){
        this.setState({ecoType: event.target.value });
    }

    handleTac(event){
        this.setState({tacType: event.target.value });
    }
    
    inspection() {
        this.getMsg("info","inspection", 1)
    }

    dialog() {
        let num
        if(this.props.mentalStatus === "confused"){
            num = 2
        } 
        this.getMsg("info","dialog", num)
    }

    collarin() {
        this.getMsg("info","collarin", 0)
        switch(avatar) {
            case naked:
                avatar = coll
                break;
            case masc:
                avatar = collMasc
                break;
            case manta:
                avatar = collManta
                break;
            case cint:
                avatar = collCint
                break;
            case mascCint:
                avatar = collMascCint
                break;
            case mascManta:
                avatar = collMascManta
                break;
            default:
                break;
        }
    }

    clean() {
        this.props.change("heartRate", -0.5)
        this.props.change("bloodLoss", 0.5)
        this.props.change("bloodPressure", 0.5)
        this.props.change("breathingRate", -0.5)
        //this.props.change("urineOutput", -0.5)
        this.props.change("saturation", 0.5)
        this.getMsg("info","clean", 0)
        setTimeout(() => {
            this.getMsg("success","clean",1)
        }, 8000)        
    }

    oxygenate() {
        //this.props.change("heartRate", 0)
        //this.props.change("bloodPressure", 0)
        //this.props.change("breathingRate", 0)
        //this.props.change("urineOutput", 0)
        this.props.change("saturation", 0.5)
        console.log(avatar)
        this.getMsg("info","oxygenate",0)
        switch(avatar) {
            case naked:
                avatar = masc
                break;
            case coll:
                avatar = collMasc
                break;
            case manta:
                avatar = mascManta
                break;
            case cint:
                avatar = mascCint
                break;
            case collCint:
                avatar = collMascCint
                break;
            case collManta:
                avatar = collMascManta
                break;
            default:
                break;
        }
    }

    rx(){
        this.setRxModal(true)
    }

    eco(){
        this.setEcoModal(true)
    }

    tac(){
        this.setTacModal(true)
    }

    rxType(next){
        this.setRxModal(false)
        switch(next){
            case "torax":
                content = rxTorax
                this.getMsg("info","rx",0)
                this.props.sendModal(0, rx, "Rx Tórax", content)
                break;
            case "pelvis":
                content = rxPelvis
                this.getMsg("info","rx",0)
                this.props.sendModal(0, rx, "Rx Pelvis", content)
                break;
            default:
                break;
        }
        
    }

    ecoType(next){
        this.setEcoModal(false)
        switch(next){
            case "abd":
                content = ecoAbd
                this.getMsg("info","eco",0)
                this.props.sendModal(1, eco, "Ecografía Abdominal", content)
                break;
            
            default:
                break;
        }
        
    }

    tacType(next){
        this.setTacModal(false)
        switch(next){
            case "abdpelv":
                content = tacAbdPelv
                this.getMsg("info","tac",0)
                this.props.sendModal(3, tac, "TAC Abdominopélvico", content)
                break;
            
            default:
                break;
        }
        
    }

    manta(){
        this.getMsg("info","manta",0)
        switch(avatar) {
            case naked:
                avatar = manta
                break;
            case coll:
                avatar = collManta
                break;
            case masc:
                avatar = mascManta
                break;
            case cint:
                avatar = manta
                break;
            case collCint:
                avatar = collManta
                break;
            case mascCint:
                avatar = mascManta
                break;
            case collMasc:
                avatar = collMascManta
                break;
            case collMascCint:
                avatar = collMascManta
                break;
            default:
                break;
        }
    } 
    
    glasgow(){
        this.getMsg("info","glasgow",0)
    }

    analisis(){
        this.getMsg("info","analisis",0)
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
        this.getMsg("info","belt",0)
        switch(avatar) {
            case naked:
                avatar = cint
                break;
            case coll:
                avatar = collCint
                break;
            case masc:
                avatar = mascCint
                break;
            case manta:
                avatar = cint
                setTimeout(() => {
                    avatar = manta
                  }, 2000);
                break;
            case collManta:
                avatar = collCint
                setTimeout(() => {
                    avatar = collManta
                  }, 2000);
                break;
            case mascManta:
                avatar = mascCint
                setTimeout(() => {
                    avatar = mascManta
                  }, 2000);
                break;
            case collMasc:
                avatar = collMascCint
                break;
            case collMascManta:
                avatar = collMascCint
                setTimeout(() => {
                    avatar = collMascManta
                  }, 2000);
                break;
            default:
                break;
        }
    }

    transfusion() {
        this.props.change("heartRate", -0.5)
        this.props.change("bloodLoss", 0.5)
        this.props.change("bloodPressure", 0.5)
        this.props.change("breathingRate", -0.5)
        this.props.change("urineOutput", 0.5)
        this.props.change("saturation", 0.5)
        this.getMsg("info","transfusion",0)
    }

    hot_liquids(){
        this.props.change("heartRate", -0.5)
        this.props.change("bloodLoss", 0.5)
        this.props.change("bloodPressure", 0.5)
        //this.props.change("breathingRate", 0)
        this.props.change("urineOutput", 0.5)
        //this.props.change("saturation", 0)
        this.getMsg("info","liquids",0)
    }

    surgery() {
        this.props.change("heartRate", -0.5)
        this.props.change("bloodLoss", 0.5)
        this.props.change("bloodPressure", 0.5)
        this.props.change("breathingRate", -0.5)
        //this.props.change("urineOutput", -0.5)
        this.props.change("saturation", 0.5)
        this.getMsg("info","surgery",0)
    }

    cristaloides() {
        this.props.change("heartRate", -0.5)
        this.props.change("bloodLoss", 0.5)
        this.props.change("bloodPressure", 0.5)
        this.props.change("breathingRate", -0.5)
        this.props.change("urineOutput", 0.5)
        this.props.change("saturation", 0)
        this.getMsg("info","cristaloides",0)
    }

    render() {
        const { t } = this.props
        const closeRx = <button className="close" onClick={() => this.setRxModal(false)}>&times;</button>
        const closeEco = <button className="close" onClick={() => this.setEcoModal(false)}>&times;</button>
        const closeTac = <button className="close" onClick={() => this.setTacModal(false)}>&times;</button>
        return (
            <div className="actions">
                
                <img className="avatar" alt="avatar" src={avatar} height="190px" width="485px" />

                <div className="timer">
                    {!this.props.start 
                    ? <Button onClick={()=>this.props.startClick()}>{t('simulation.start')}</Button>
                    : null}
                </div>
                
                {this.state.actionPage === 1 
                ? null
                : <div className="actions-buttons">
                    <img onClick= {() => this.handleChange(this.state.actionPage - 1)} id="arrowUp" alt="arrow" src={arrow_up}/>
                </div>
                }

                <Modal isOpen={this.state.rxModal} >
                    <ModalHeader  close={closeRx}>Selecciona el tipo de radiografía:</ModalHeader>
                    <Card>
                        <CardBody>
                            <Input type="select" name="select" onChange={(event) => this.handleRx(event)} >
                                <option defaultValue></option>
                                <option value="torax">Tórax</option>
                                <option value="pelvis">Pelvis</option>
                            </Input>
                            <Button onClick= {() => this.rxType(this.state.rxType)}>Solicitar RX</Button>
                        </CardBody>
                    </Card>
                </Modal>
                <Modal isOpen={this.state.ecoModal} >
                    <ModalHeader  close={closeEco}>Selecciona el tipo de ecografía:</ModalHeader>
                    <Card>
                        <CardBody>
                            <Input type="select" name="select" onChange={(event) => this.handleEco(event)} >
                                <option defaultValue></option>
                                <option value="abd">Abdominal</option>
                            </Input>
                            <Button onClick= {() => this.ecoType(this.state.ecoType)}>Solicitar Ecografía</Button>
                        </CardBody>
                    </Card>
                </Modal>
                <Modal isOpen={this.state.tacModal} >
                    <ModalHeader  close={closeTac}>Selecciona el tipo de TAC:</ModalHeader>
                    <Card>
                        <CardBody>
                            <Input type="select" name="select" onChange={(event) => this.handleTac(event)} >
                                <option defaultValue></option>
                                <option value="abdpelv">Abdominopélvico</option>
                            </Input>
                            <Button onClick= {() => this.tacType(this.state.tacType)}>Solicitar TAC</Button>
                        </CardBody>
                    </Card>
                </Modal> 
                
                {this.state.actionPage === 1 
                ? <div className="action1">
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
                        <Button onClick = {() => this.hot_liquids()}>{t('simulation.liquids')}</Button>
                        <Button onClick = {() => this.transfusion()}>{t('simulation.transfusion')}</Button>
                        <Button onClick = {() => this.surgery()}>{t('simulation.surgery')}</Button>
                    </div>
                </div>
                : null
                }

                {this.state.actionPage === 2 
                ? <div className="action1">
                    <div className="actions-buttons">
                        <Button onClick = {() => this.inspection()}>Inspeccionar vía aérea</Button>
                        <Button onClick = {() => this.dialog()}>Diálogo</Button>
                        <Button onClick = {() => this.collarin()}>Collarín Cervical</Button>
                    </div>

                    <div className="actions-buttons">
                        <Button onClick = {() => this.rx()}>RX</Button>
                        <Button onClick = {() => this.cristaloides()}>Cristaloides</Button>
                        <Button onClick = {() => this.manta()}>Manta Térmica</Button>
                    </div>

                    <div className="actions-buttons">
                        <Button onClick = {() => this.glasgow()}>Nivel Consciencia</Button>
                        <Button onClick = {() => this.eco()}>Ecografía</Button>
                        <Button onClick = {() => this.tac()}>TAC</Button>
                    </div>
                </div>
                : null}

                {this.state.actionPage === 3 
                ? <div className="action1">
                    <div className="actions-buttons">
                        <Button onClick = {() => this.analisis()}>Análisis</Button>
                        <Button>Undefined</Button>
                        <Button>Undefined</Button>
                    </div>

                    <div className="actions-buttons">
                        <Button>Undefined</Button>
                        <Button>Undefined</Button>
                        <Button>Undefined</Button>
                    </div>

                    <div className="actions-buttons">
                        <Button>Undefined</Button>
                        <Button>Undefined</Button>
                        <Button>Undefined</Button>
                    </div>
                </div>
                : null}
                
                {this.state.actionPage === 3 ?
                null
                : <div className="actions-buttons">
                    <img onClick= {() => this.handleChange(this.state.actionPage + 1)} id="arrowDown" alt="arrow" src={arrow_down}/>
                </div>
                }
                
                  
            </div>
        )
    }
}

export default withTranslation()(Actions);
