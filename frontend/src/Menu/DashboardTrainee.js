import React, { Component } from 'react'
import './Dashboard.css'
import { Button } from 'reactstrap';
import { Link } from "react-router-dom"
import { withTranslation } from 'react-i18next';
import Nav from "./Nav"

class DashboardTrainee extends Component {
    render() {
        const { t } = this.props;
        return (
            <div>
                <Nav></Nav>
                <div className= "principal">
                    <div className="training">
                        <Link to={{
                                    pathname: '/listSimulation',
                                    state: { id: this.props.location.state.id,
                                             isTrainer: false  }
                                }}>
                            <Button>{t('dashboard.access-simulation')}</Button>
                        </Link>
                    </div>
                </div>
            </div>
        )
    }
}

export default withTranslation()(DashboardTrainee);