
import React, { Component } from 'react'
import '../../../node_modules/react-vis/dist/style.css'
import {XYPlot, YAxis, VerticalGridLines, LineSeries, XAxis} from 'react-vis'
import { Button } from 'reactstrap';
import { withTranslation } from 'react-i18next';
import '../simulation.css'
import heart from '../../assets/heart.png'
import saturation from '../../assets/saturation.png'
import pressure from '../../assets/pressure.png'
import urine from '../../assets/urine.png'
import breath from '../../assets/breathing.png'
import fordward from '../../assets/fordward.png'
import fordward1 from '../../assets/fordward1.png'

var xDomain1 = [-5,0]
var xDomain2 = [-5,0]
var xDomain3 = [-10,0]
class Graphic extends Component {

    toogleCrono(){
        this.props.toogleCrono(5)
        this.props.test()
    }

    render() {
        var data1 = this.props.dataHeartRate
        var data3 = this.props.dataBreathingRate
        var data2 = this.props.dataSaturation
        const { t } = this.props

        return (
            <div className="graphic">
                <div className="signals">
                <XYPlot height={175} width= {500} yDomain={[-2,2]}>
                        { this.props.confirm
                        ? <LineSeries data={[{x: null, y: null}]} />
                        : null }                    
                        <LineSeries
                            curve={'curveMonotoneX'} 
                            data={data1} />
                        <VerticalGridLines />
                        <YAxis />
                        <XAxis/>
                    </XYPlot>
                    <XYPlot height={175} width= {500} yDomain={[0,100]}>
                        { this.props.confirm
                        ? <LineSeries data={[{x: null, y: null}]} />
                        : null }                    
                        <LineSeries
                            curve={'curveMonotoneX'} 
                            data={data2} />
                        <VerticalGridLines />
                        <YAxis />
                        <XAxis/>
                    </XYPlot>
                    <XYPlot height={175} width= {500} yDomain={[0,500]}>
                        { this.props.confirm
                        ? <LineSeries data={[{x: null, y: null}]} />
                        : null }                    
                        <LineSeries 
                            curve={'curveMonotoneX'} 
                            data={data3} />
                        <VerticalGridLines />
                        <YAxis />
                        <XAxis/>
                    </XYPlot>

                </div>
                
                <div className="constants">
                    <div className="constants-items">
                        {this.props.heartRate.toFixed(0)} {t('simulation.heart-unit')}
                        <Button><img src={heart} alt="heart" width="30px" height="30px"></img></Button>
                    </div>
                    <div className="constants-items">
                        {this.props.saturation.toFixed(0)} %SatO2
                        <Button><img src={saturation} alt="sat" width="30px" height="30px"></img></Button>
                    </div>
                    <div className="constants-items">
                        {this.props.breathingRate.toFixed(0)} {t('simulation.breath-unit')}
                        <Button><img src={breath} alt="breath" width="30px" height="30px"></img></Button>
                    </div>
                    <div className="constants-items">
                        {this.props.sistolicPressure.toFixed(0)}/{this.props.diastolicPressure.toFixed(0)} mmHg
                        <Button><img src={pressure} alt="pres" width="30px" height="30px"></img></Button>
                    </div>
                    <div className="constants-items">
                        {this.props.urineOutput.toFixed(0)} mL/min
                        <Button><img src={urine} alt="urine" width="30px" height="30px"></img></Button>
                    </div>
                    {this.props.fordward  ?
                        <div className="clock">
                            <Button onClick={() => this.toogleCrono()}>
                                
                                <div className ="fordward">
                                    <img src={fordward} alt="fordward" width ="50px" height="50px"/>
                                    <img src={fordward1} alt="fordward" width ="30px" height="30px"/> 
                                </div>
                            </Button>
                            <p>5 Min</p>
                        </div>
                    : null
                    }
                    
                    <div className="reset">
                        <Button onClick={() => this.props.finish()}>Finalizar</Button>
                    </div>    
                </div>
            </div>
        )
    }
}

export default withTranslation()(Graphic);