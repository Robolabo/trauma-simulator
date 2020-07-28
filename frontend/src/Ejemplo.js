import React, { Component } from 'react'
import CanvasJSReact from './assets/canvasjs.react';

var CanvasJSChart = CanvasJSReact.CanvasJSChart;

export default class Ejemplo extends Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    
      }

      componentDidMount(){
      }
      
    
      render() {
        const options = {
          width: 500,
          height:175,
          data: [{
            type: "spline",
            dataPoints: []
          }]
        }
        return (
          <div>
            <CanvasJSChart options = {options}/>
          </div>
        );
      }
}