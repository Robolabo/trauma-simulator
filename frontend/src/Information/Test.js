import React, { Component } from 'react'
import axios from 'axios';
import CanvasJSReact from '../assets/canvasjs.react';
import '../Simulations/simulation.css'

var CanvasJSChart = CanvasJSReact.CanvasJSChart;

const baseUrl = "http://localhost:8080"


export default class Test extends Component {

    constructor(props){
        super(props);
        this.state = {
            testHeartRate: null,
            testBreathRate: null,
            testDistolic: null,
            testSistolic: null,
            testUrine: null,
            testSaturation: null


        }
      }

    componentDidMount(){
        let simulationId = this.props.match.params.id;
        const url = baseUrl+"/simulation/getTestData/"+simulationId
        axios.get(url)
        .then(res=>{
            if (res.data.success) {
                const dataJSON = res.data.data[0]
                //añadir constantes del caso clínico creado
                //
                console.log(dataJSON)
                const data = JSON.parse(dataJSON.testData.toString())
                this.setState({
                    testHeartRate: data.testHeartRate,
                    testBreathRate: data.testBreathRate,
                    testDistolic: data.testDistolic,
                    testSistolic: data.testSistolic,
                    testUrine: data.testUrine,
                    testSaturation: data.testSaturation
                })
                console.log(data.testHeartRate)
            }
            else {
            alert("Error web service")
            }
        })
        .catch(error=>{
            alert("Error server "+error)
        })
    }

    render() {
        let w = window.innerWidth
        const options1 = {
          width: w,
          height:175,
          data: [{
            type: "spline",
            dataPoints: this.state.testHeartRate
          }]
        }

        const options2 = {
            width: w,
            height:175,
            data: [{
              type: "spline",
              dataPoints: this.state.testBreathRate
            }]
        }

        const options3 = {
            width: w,
            height:175,
            data: [{
              type: "spline",
              dataPoints: this.state.testDistolic
            }]
        }

        const options4 = {
            width: w,
            height:175,
            data: [{
              type: "spline",
              dataPoints: this.state.testSistolic
            }]
        }

        const options5 = {
            width: w,
            height:175,
            data: [{
              type: "spline",
              dataPoints: this.state.testSaturation
            }]
        }

        const options6 = {
            width: w,
            height:175,
            data: [{
              type: "spline",
              dataPoints: this.state.testUrine
            }]
        }

        return (
          <div>
              <h1>Test Results</h1>
              <h4 className="test">Heart Rate</h4>
              <CanvasJSChart options = {options1}/>
              <h4 className="test">Breath Rate</h4>
              <CanvasJSChart options = {options2}/>
              <h4 className="test">Distolic Pressure</h4>
              <CanvasJSChart options = {options3}/>
              <h4 className="test">Sistolic Pressure</h4>
              <CanvasJSChart options = {options4}/>
              <h4 className="test">Saturation 02</h4>
              <CanvasJSChart options = {options5}/>
              <h4 className="test">Urine Output</h4>
              <CanvasJSChart options = {options6}/>
          </div>
        );
      }

    /*render() {
        return (
            <div>
                <h1>Test Results</h1>
                <XYPlot height={175} width= {500}>
                        <LineSeries
                            curve={'curveMonotoneX'}
                            data={this.state.testHeartRate} />
                        <VerticalGridLines />
                        <YAxis />
                        <XAxis/>
                    </XYPlot>
                    <XYPlot height={175} width= {500}>
                        <LineSeries
                            curve={'curveMonotoneX'}
                            data={this.state.testBreathRate} />
                        <VerticalGridLines />
                        <YAxis />
                        <XAxis/>
                    </XYPlot>
                    <XYPlot height={175} width= {500}>
                        <LineSeries
                            curve={'curveMonotoneX'}
                            data={this.state.testDistolic} />
                        <VerticalGridLines />
                        <YAxis />
                        <XAxis/>
                    </XYPlot>
            </div>
        )
    }*/
}
