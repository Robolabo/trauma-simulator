import React, { Component } from 'react'
import {XYPlot, XAxis, YAxis, HorizontalGridLines, VerticalGridLines, LineSeries} from 'react-vis'

var heartConstant = [{x: 0, y: 0}, {x: 1/12, y: 0.07}, {x: 1/6, y: 0},
  {x: 4/15, y: 0}, {x: 0.3, y: -0.14}, {x: 11/30, y: 0.96},
  {x: 13/30, y: -0.24}, {x: 7/15,y:0}, {x: 37/60, y:0},
  {x: 0.75, y:0.15}, {x: 0.85, y:0}]
var saturationConstant = [{x: 0, y: 0}, {x: 1/6, y: 1}, 
  {x: 1/3, y: 30}, {x: 13/30, y: 35}]
var breathConstant = [{x: (0.25), y: 500},{x: (0.5), y: 125}, {x: 0, y: 0}]
var dHeart = []
var dSaturation = []
var dBreath = []
var breath = 0
var start1 = 0
var start2 = 0
var x = 0
var y = 0
var z = 0
var space1 = 0 
var space2 = 0
var time = 1




export default class Ejemplo extends Component {
    constructor(props) {
        super(props);
        this.state = {
          heartRate: 130,
          saturation: 80,
          breathingRate:35,
          dataHeartRate: [],
          dataSaturation:[],
          dataBreathingRate:[]
        }
    
      }

      componentDidMount(){
        this.myInterval0 = setInterval(() => {
          
          var period = 60/this.state.heartRate
          var breathT = 60 / this.state.breathingRate
          
          while( x < time && z < time) {
            //heartRate y saturation
            for (var i = start1; (i < 11 && x < time); i++){
              if( i < 4 && z < time) {
                if (i === 1){
                    z = ((saturationConstant[i].x * period) + (space1 * period))
                    dSaturation.push({x:z,
                                y:this.state.saturation})
                } else {
                    dSaturation.push({x:((saturationConstant[i].x * period) + (space1 * period)),
                                         y:saturationConstant[i].y})
                }
              }
              x = ((heartConstant[i].x * period) + (space1 * period))
              dHeart.push({x:x, y:heartConstant[i].y})
              start1 = (i == 10 ? 0 : i)
            }
            
            
            //breathRate
            for (var j = start2; j < 3 && y < time; j++){
              dBreath.push({x:y, y:breath})
              space2 += (breathConstant[j].x === 0) ? 1 : 0
              y = ((breathConstant[j].x * breathT) + (space2 * breathT))
              breath = breathConstant[j].y
              start2 = (j == 2 ? 0 : j)
            }

            
            if (start1 === 0 && x !== time){
              space1+=1
            }
            
          }
          time += 1

          //eliminar
          /*var min = data.length - this.state.dataHeartRate.length
          var minS = dataS.length - this.state.dataSaturation.length
          if(time > 5){
            data.splice(0,min)
            dataS.splice(0,minS)
          }*/
          this.setState({
            dataHeartRate: dHeart,
            dataSaturation: dSaturation,
            dataBreathingRate: dBreath
          })
        },1000) 
      }
    
      
    
      render() {
        return (
          <div>
            <XYPlot height={175} width= {500} >
              <LineSeries
                  curve={'curveMonotoneX'} 
                  data={this.state.dataHeartRate} />
              <VerticalGridLines />
              <YAxis />
              <XAxis/>
            </XYPlot>
            <XYPlot height={175} width= {500} >
              <LineSeries
                  curve={'curveMonotoneX'} 
                  data={this.state.dataSaturation} />
              <VerticalGridLines />
              <YAxis />
              <XAxis/>
            </XYPlot>
            <XYPlot height={175} width= {500} >
              <LineSeries
                  curve={'curveMonotoneX'} 
                  data={this.state.dataBreathingRate} />
              <VerticalGridLines />
              <YAxis />
              <XAxis/>
            </XYPlot>
          </div>
        );
      }
}
