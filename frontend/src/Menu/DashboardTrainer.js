import React, { Component } from 'react'
import './Dashboard.css'
import { Link } from "react-router-dom"
import { Button } from 'reactstrap';
import Nav from "./Nav"

export default class DashboardTrainer extends Component {

    constructor(props){
        super(props);
        this.state = {
            id: 0
        }
    }

    componentDidMount() {
        this.setState({ id: this.props.location.state.id });
    }

    render() {
        return (
            <div>
                <Nav></Nav>
                <div className= "principal">
                    <div className="createSimulation">
                        <Link to={{
                                    pathname: '/newSimulation',
                                    state: { id: this.state.id}
                                }}>
                            <Button>New Simulation</Button>
                        </Link>
                    </div>
                    <div className="training">
                        <Link to={{
                                    pathname: '/listSimulation',
                                    state: { id: this.state.id,
                                             isTrainer: true  }
                                }}>
                            <Button>Access Existing Simulation</Button>
                        </Link>
                    </div>
                </div> 
                {console.log(this.props.location)}                
            </div>
        )
    }
}
