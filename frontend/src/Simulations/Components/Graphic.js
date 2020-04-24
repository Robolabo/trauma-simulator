
import React, { Component } from 'react'
import '../../../node_modules/react-vis/dist/style.css'
import {XYPlot, YAxis, HorizontalGridLines, VerticalGridLines, LineSeries, XAxis} from 'react-vis'
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

class Graphic extends Component {
    render() {
        var data1 = this.props.dataHeartRate
        var data3 = this.props.dataBreathingRate
        var data2 = this.props.dataSaturation
        const { t } = this.props

        return (
            <div className="graphic">
                <div class="signals">
                <XYPlot height={175} width= {500} yDomain={[-2,2]} >
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
                    <XYPlot height={175} width= {500} yDomain={[0,100]} >
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
                    <XYPlot height={175} width= {500} yDomain={[0,500]} >
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
                        <img className="legend" src={lengend1} alt="legend"></img>
                        {this.props.heartRate.toFixed(0)} {t('simulation.heart-unit')}
                        <Button><img src={heart} alt="heart" width="30px" height="30px"></img></Button>
                    </div>
                    <div className="constants-items">
                        <img className="legend" src={lengend2} alt="legend"></img>
                        {this.props.saturation.toFixed(0)} %
                        <Button><img src={saturation} alt="sat" width="30px" height="30px"></img></Button>
                    </div>
                    <div className="constants-items">
                        <img className="legend" src={lengend4} alt="legend"></img>
                        {this.props.breathingRate.toFixed(0)} {t('simulation.breath-unit')}
                        <Button><img src={breath} alt="breath" width="30px" height="30px"></img></Button>
                    </div>
                    <div className="constants-items">
                        <img className="legend" src={lengend3} alt="legend"></img>   
                        {this.props.bloodLoss.toFixed(0)}/{this.props.bloodPressure.toFixed(0)} mmHg
                        <Button><img src={pressure} alt="pres" width="30px" height="30px"></img></Button>
                    </div>
                    <div className="constants-items">
                        <img className="legend" src={lengend5} alt="legend"></img>
                        {this.props.urineOutput.toFixed(0)} mL/min
                        <Button><img src={urine} alt="urine" width="30px" height="30px"></img></Button>
                    </div>
                    <div className="reset">
                        <Button>{t('simulation.reset')}</Button>
                    </div>    
                </div>
            </div>
        )
    }
}

export default withTranslation()(Graphic);