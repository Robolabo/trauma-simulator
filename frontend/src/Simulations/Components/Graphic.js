
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
import lengend1 from '../../assets/legend1.png'
import lengend2 from '../../assets/legend2.png'
import lengend3 from '../../assets/legend3.png'
import lengend4 from '../../assets/legend4.png'
import lengend5 from '../../assets/legend5.png'

var xDomain1 = [-5,0]
var xDomain2 = [-5,0]
var xDomain3 = [-10,0]
class Graphic extends Component {
    constructor(props){
        super(props);
        this.state = {
          domain: true
        }
    }

    componentDidUpdate(prevProps, prevState) {
        if(prevProps !== this.props){
            if(this.props.start && this.state.domain){
                this.intervalDomain = setInterval(() => {
                    xDomain1 = [xDomain1[0]+1,xDomain1[1]+1]
                    xDomain2 = [xDomain2[0]+1,xDomain2[1]+1]
                    xDomain3 = [xDomain3[0]+1,xDomain3[1]+1]
                }, 1000);
                this.setState({
                    domain: false
                })
            }
        }
    }

    render() {
        var data1 = this.props.dataHeartRate
        var data3 = this.props.dataBreathingRate
        var data2 = this.props.dataSaturation
        const { t } = this.props

        return (
            <div className="graphic">
                <div className="signals">
                <XYPlot height={175} width= {500} yDomain={[-2,2]} xDomain={xDomain1} >
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
                    <XYPlot height={175} width= {500} yDomain={[0,100]} xDomain={xDomain2} >
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
                    <XYPlot height={175} width= {500} yDomain={[0,500]} xDomain={xDomain3} >
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
                    <div className="reset">
                        <Button onClick={() => this.props.toogleCrono()}>{t('simulation.reset')}</Button>
                    </div>    
                </div>
            </div>
        )
    }
}

export default withTranslation()(Graphic);