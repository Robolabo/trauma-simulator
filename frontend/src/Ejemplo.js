import React, { Component } from 'react'
import {XYPlot, XAxis, YAxis, HorizontalGridLines, VerticalGridLines, LineSeries} from 'react-vis'


export default class Ejemplo extends Component {
    constructor(props) {
        super(props);
        this.state = {
          heartRate: 35,
          dataHeartRate: []
        }
    
      }

      componentDidMount(){

        var breathT = 60/this.state.heartRate
        var data = [{x: 0, y: 0}, {x: (0.25 * breathT), y: 500},
          {x: (0.5 * breathT), y: 125}]
        console.log(data)
        
        for (var i = 0; i < 3; i++){
          var x = (data[i].x + breathT)
          var y = data[i].y
          data.push({x:x, y:y})
        }
        console.log(data)
        this.setState({
          dataHeartRate: data
        })
        
      }
    
      
    
      render() {
        return (
          <div>
            <XYPlot height={175} width= {500} yDomain={[0,500]} xDomain={[0,30]}>
              <HorizontalGridLines />
              <VerticalGridLines />
              <XAxis />
              <YAxis />

              <LineSeries
                className="third-series"
                curve={'curveMonotoneX'}
                data={this.state.dataHeartRate}
              />
            </XYPlot>
          </div>
        );
      }
}
