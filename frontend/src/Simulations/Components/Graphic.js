
import React, { Component } from 'react'
import '../../../node_modules/react-vis/dist/style.css'
import {XYPlot, YAxis, HorizontalGridLines, VerticalGridLines, LineSeries} from 'react-vis'
import { Button } from 'reactstrap';
import '../simulation.css'
import heart from '../../assets/heart.png'
import saturation from '../../assets/saturation.png'
import pressure from '../../assets/pressure.png'
import urine from '../../assets/urine.png'
import breath from '../../assets/breathing.png'
import lengend1 from '../../assets/legend1.png'
import lengend2 from '../../assets/legend2.png'
import lengend3 from '../../assets/legend3.png'
import lengend4 from '../../assets/legend4.png'
import lengend5 from '../../assets/legend5.png'


var yDomain = [0, 150]
var all = true
var heartRateToogle = true
var saturationToogle = true
var breathingRateToogle = true
var bloodPressureToogle = true
var urineOutputToogle = true


export default class Graphic extends Component {
        
    toogle(next) {

        switch (next) {

            case "heartRate":

                yDomain = [45, 165]
                heartRateToogle = !heartRateToogle
                all = !all
                
                break;

            case "bloodPressure":

                yDomain = [80, 195]
                bloodPressureToogle = !bloodPressureToogle
                all = !all

                break;

            case "breathingRate":

                yDomain = [0, 65]
                breathingRateToogle = !breathingRateToogle
                all = !all
            
                break;

            case "urineOutput":

                yDomain = [0, 15]
                urineOutputToogle = !urineOutputToogle
                all = !all
        
                break;

            case "saturation":

                yDomain = [80, 90]
                saturationToogle = !saturationToogle
                all = !all
            
                break;
            
            case "reset":

                yDomain = [0, 150]
                all = true
            
                break;
        
            default:
                break;
        }
    }


        
    render() {
        var data1 = this.props.dataHeartRate
        var data2 = this.props.dataBloodPressure
        var data3 = this.props.dataBreathingRate
        var data4 = this.props.dataUrineOutput
        var data5 = this.props.dataSaturation
        
        if (all) {
            yDomain = [0, 150]
            data1 = this.props.dataHeartRate
            data2 = this.props.dataBloodPressure
            data3 = this.props.dataBreathingRate
            data4 = this.props.dataUrineOutput
            data5 = this.props.dataSaturation
        } else if (heartRateToogle){
            data2 = null
            data3 = null
            data4 = null
            data5 = null
        } else if (bloodPressureToogle){
            data1 = null
            data3 = null
            data4 = null
            data5 = null
        } else if (breathingRateToogle){
            data1 = null
            data2 = null
            data4 = null
            data5 = null
        }
        else if (urineOutputToogle){
            data1 = null
            data2 = null
            data3 = null
            data5 = null
        } else if (saturationToogle){
            data1 = null
            data2 = null
            data3 = null
            data4 = null
        }

        return (
            <div className="graphic">
                <XYPlot height={500} width= {500} yDomain={yDomain}>
                    { this.props.confirm
                    ? <LineSeries data={[{x: null, y: null}]} />
                    : null }                    
                    <LineSeries data={data1} />
                    <LineSeries data={data2} />
                    <LineSeries data={data3} />
                    <LineSeries data={data4} /> 
                    <LineSeries data={data5} />
                    <HorizontalGridLines/>
                    <VerticalGridLines />
                    <YAxis />
                </XYPlot>
                <div className="constants">
                    <div className="constants-items">
                        <img className="legend" src={lengend1} alt="legend"></img>
                        {this.props.heartRate.toFixed(0)} lat/min
                        <Button onClick = {() => this.toogle("heartRate")}><img src={heart} alt="heart" width="30px" height="30px"></img></Button>
                    </div>
                    <div className="constants-items">
                        <img className="legend" src={lengend2} alt="legend"></img>
                        {this.props.saturation.toFixed(0)} %
                        <Button onClick = {() => this.toogle("saturation")}><img src={saturation} alt="sat" width="30px" height="30px"></img></Button>
                    </div>
                    <div className="constants-items">
                        <img className="legend" src={lengend4} alt="legend"></img>
                        {this.props.breathingRate.toFixed(0)} resp/min
                        <Button onClick = {() => this.toogle("breathingRate")}><img src={breath} alt="breath" width="30px" height="30px"></img></Button>
                    </div>
                    <div className="constants-items">
                        <img className="legend" src={lengend3} alt="legend"></img>   
                        {this.props.bloodLoss.toFixed(0)}/{this.props.bloodPressure.toFixed(0)} mmHg
                        <Button onClick = {() => this.toogle("bloodPressure")}><img src={pressure} alt="pres" width="30px" height="30px"></img></Button>
                    </div>
                    <div className="constants-items">
                        <img className="legend" src={lengend5} alt="legend"></img>
                        {this.props.urineOutput.toFixed(0)} mL/min
                        <Button onClick = {() => this.toogle("urineOutput")}><img src={urine} alt="urine" width="30px" height="30px"></img></Button>
                    </div>
                    <div className="reset">
                        <Button onClick = {() => this.toogle("reset")}>Reset</Button>
                    </div>    
                </div>
            </div>
        )
    }
}