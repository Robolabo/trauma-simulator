
import React, { Component } from 'react'
import '../../../node_modules/react-vis/dist/style.css'
import {XYPlot, XAxis, YAxis, HorizontalGridLines, VerticalGridLines, LineSeries} from 'react-vis'
import { Button } from 'reactstrap';


export default class Graphic extends Component {

    constructor(props){
        super(props);
        this.state = {
            dataToogle: false
        }
    }

    toogle() {

        var { dataToogle } = this.state

        this.setState(({ dataToogle }) => ({
                dataToogle: !dataToogle
            }))
    }
    
    render() {
        return (
            <div>
                <XYPlot height={300} width= {300}>
                    { this.state.dataToogle 
                        ?  <LineSeries data={this.props.data} /> 
                        :  <LineSeries data={[{x: 0, y: 0}]} />
                    }
                    <LineSeries data={this.props.data} />   
                    {console.log(this.props.data)}
                    <VerticalGridLines />
                    <HorizontalGridLines />
                    <XAxis />
                    <YAxis />
                </XYPlot>  
                
                <Button onClick={()=>this.props.change()}>Change</Button>
                <Button onClick = {() => this.toogle()}>Show Data</Button>
            </div>
        )
    }
}
