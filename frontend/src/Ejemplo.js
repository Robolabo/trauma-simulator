import React, { Component } from 'react'
import CanvasJSReact from './assets/canvasjs.react';

var CanvasJSChart = CanvasJSReact.CanvasJSChart;

var heartConstant = [{x: 0, y: 0}, {x: 1/12, y: 0.07}, {x: 1/6, y: 0},
  {x: 4/15, y: 0}, {x: 0.3, y: -0.14}, {x: 11/30, y: 0.96},
  {x: 13/30, y: -0.24}, {x: 7/15,y:0}, {x: 37/60, y:0},
  {x: 0.75, y:0.15}, {x: 0.85, y:0}]
var saturationConstant = [{x: 0, y: 0}, {x: 1/6, y: 1}, 
  {x: 1/3, y: 30}, {x: 13/30, y: 35}]
var breathConstant = [{x: (0.25), y: 500},{x: (0.5), y: 125}, {x: 1, y: 0}]
var dHeart = []
var dSaturation = []
var dBreath = []
var breath = 0
var start1 = 0
var start2 = 0
var x = 0
var timeB = 0
var z = 0
var space1 = 0 
var space2 = 0
var time = 1
var interval= 1
var lengthH, lengthS = 0
var intervalB = 1
var lengthB = 0
var heartRateValue = 0.5
var breathingRateValue = 0.5
var saturationValue = -0.5



export default class Ejemplo extends Component {
    constructor(props) {
        super(props);
        this.state = {
          heartRate: 130,
          saturation: 80,
          breathingRate:15,
          dataHeartRate: [],
          dataSaturation:[],
          dataBreathingRate:[]
        }
    
      }

      componentDidMount(){
        this.myInterval0 = setInterval(() => {
          var heart = this.state.heartRate + (heartRateValue/60)
          var sat = this.state.saturation + (saturationValue/60)
          var be = this.state.breathingRate + (breathingRateValue/60)
          var period = 60 / this.state.heartRate
          var breathT = 60 / this.state.breathingRate
          //space2 = time > 1 ? breathT : 0
          lengthH = this.state.dataHeartRate.length
          lengthS = this.state.dataSaturation.length
          lengthB = this.state.dataBreathingRate.length
          
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
              start1 = (i === 10 ? 0 : i)
            }
            
            
            //breathRate
            for (var j = start2; j < 3 && timeB < time; j++){
              dBreath.push({x:timeB, y:breath})
              
              timeB = ((breathConstant[j].x * breathT) + (space2))
              breath = breathConstant[j].y
              
              space2 = (j === 2) ? timeB : space2
              start2 = (j === 2 ? 0 : j+1)
            }

            
            if (start1 === 0 && x !== time){
              space1+=1
            }
            
          }
          time += 1
          //space2 = breathT
          interval +=1
          intervalB +=1

          switch(interval){
            
            case 1:
              var acumH1 = dHeart.length - lengthH
              var acumS1 = dSaturation.length - lengthS
              if(time > 6){
                this.state.dataHeartRate.splice(0,acumH1)
                this.state.dataSaturation.splice(0,acumS1)
              }
              break;
            case 2:
              var acumH2 = dHeart.length - lengthH
              var acumS2 = dSaturation.length - lengthS
              if(time > 6){
                this.state.dataHeartRate.splice(0,acumH2)
                this.state.dataSaturation.splice(0,acumS2)
              }
              break;
            case 3:
              var acumH3 = dHeart.length - lengthH
              var acumS3 = dSaturation.length - lengthS
              if(time > 6){
                this.state.dataHeartRate.splice(0,acumH3)
                this.state.dataSaturation.splice(0,acumS3)
              }
              break;
            case 4:
              var acumH4 = dHeart.length - lengthH
              var acumS4 = dSaturation.length - lengthS
              if(time > 6){
                this.state.dataHeartRate.splice(0,acumH4)
                this.state.dataSaturation.splice(0,acumS4)
              }
              break;
            case 5:
              var acumH5 = dHeart.length - lengthH
              var acumS5 = dSaturation.length - lengthS
              if(time > 6){
                this.state.dataHeartRate.splice(0,acumH5)
                this.state.dataSaturation.splice(0,acumS5)
              }
              interval = 0
              break;

            default:
              break;
          }

          switch(intervalB){
            
            case 1:
              var acumB1 = dBreath.length - lengthB
              if(time > 12){
                this.state.dataBreathingRate.splice(0,acumB1)
              }
              break;

            case 2:
              var acumB2 = dBreath.length - lengthB
              if(time > 12){
                this.state.dataBreathingRate.splice(0,acumB2)
              }
              break;

            case 3:
              var acumB3 = dBreath.length - lengthB
              if(time > 12){
                this.state.dataBreathingRate.splice(0,acumB3)
              }
              break;

            case 4:
              var acumB4 = dBreath.length - lengthB
              if(time > 12){
                this.state.dataBreathingRate.splice(0,acumB4)
              }
              break;

            case 5:
              var acumB5 = dBreath.length - lengthB
              if(time > 12){
                this.state.dataBreathingRate.splice(0,acumB5)
              }
              break;

            case 6:
              var acumB6 = dBreath.length - lengthB
              if(time > 12){
                this.state.dataBreathingRate.splice(0,acumB6)
              }
              break;

            case 7:
              var acumB7 = dBreath.length - lengthB
              if(time > 12){
                this.state.dataBreathingRate.splice(0,acumB7)
              }
              break;

            case 8:
              var acumB8 = dBreath.length - lengthB
              if(time > 12){
                this.state.dataBreathingRate.splice(0,acumB8)
              }
              break;

            case 9:
              var acumB9 = dBreath.length - lengthB
              if(time > 12){
                this.state.dataBreathingRate.splice(0,acumB9)
              }
              break;

            case 10:
              var acumB10 = dBreath.length - lengthB
              if(time > 12){
                this.state.dataBreathingRate.splice(0,acumB10)
              }
              intervalB = 0
              break;

            default:
              break;
          }
          
          //eliminar
          this.setState({
            heartRate: heart,
            breathingRate: be,
            saturation: sat,
            dataHeartRate: dHeart,
            dataSaturation: dSaturation,
            dataBreathingRate: dBreath
          })
        },1000) 
      }
      
    
      render() {
        const options = {
          width: 500,
          height:175,
          data: [{
            type: "spline",
            dataPoints: this.state.dataHeartRate
          }]
        }
        const options1 = {
          width: 500,
          height:175,
          data: [{
            type: "spline",
            dataPoints: this.state.dataSaturation
          }]
        }
        const options2 = {
          width: 500,
          height:175,
          data: [{
            type: "spline",
            dataPoints: this.state.dataBreathingRate
          }]
        }
        return (
          <div>
            <CanvasJSChart options = {options}/>
            <CanvasJSChart options = {options1}/>
            <CanvasJSChart options = {options2}/>
          </div>
        );
      }
}
/*
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
            

           toogleCrono(){
            this.setState({
                crono: true,
                timeCrono:5
            })
            clearInterval(this.myInterval0)
            this.setState(({ heartRate,sistolicPressure, diastolicPressure, breathingRate, 
                urineOutput, saturation }) => ({
    
                heartRate: heartRate + (heartRateValue * 5),
                sistolicPressure: sistolicPressure + (sistolicPressureValue * 5),
                diastolicPressure: diastolicPressure + (diastolicPressureValue * 5),
                breathingRate: breathingRate + (breathingRateValue * 5),
                urineOutput: urineOutput + (urineOutputValue * 5),
                saturation: saturation + (saturationValue * 5),
            }))
            dHeart = []
            dSaturation = []
            dBreath = []
            heart = 0
            breath = 0
            saturation = 0
            timeH = time + (5 * 60)
            timeB = time + (5 * 60)
            timeS = time + (5 * 60)
            time = time + (5 * 60) + 1
            spaceH = time + (5 * 60)
            space2 = time + (5 * 60)
            spaceS = time + (5 * 60)
            start1 = 0
            start2 = 0
            start3 = 0

            this.myInterval0 = setInterval(this.interval0.bind(this) , 1000)
        }*/ 