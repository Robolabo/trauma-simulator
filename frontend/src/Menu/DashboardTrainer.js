import React, { Component } from 'react'
import './Dashboard.css'
import { Link } from "react-router-dom"
import { Button } from 'reactstrap';
import Nav from "./Nav"
import { withTranslation } from 'react-i18next';

class DashboardTrainer extends Component {

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
        const { t } = this.props;
        return (
            <div>
                <Nav></Nav>
                <div className= "principal">
                    <div className="createSimulation">
                        <Link to={{
                                    pathname: '/newSimulation',
                                    state: { id: this.state.id}
                                }}>
                            <Button>{t('dashboard.new-simulation')}</Button>
                        </Link>
                    </div>
                    <div className="training">
                        <Link to={{
                                    pathname: '/listSimulation',
                                    state: { id: this.state.id,
                                             isTrainer: true  }
                                }}>
                            <Button>{t('dashboard.access-simulation')}</Button>
                        </Link>
                    </div>
                </div> 
            </div>
        )
    }
}

export default withTranslation()(DashboardTrainer);