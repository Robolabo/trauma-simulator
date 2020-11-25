import React from 'react';
import axios from 'axios';
import { Link } from "react-router-dom";
import { withTranslation } from 'react-i18next';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import Inform from '../Information/Document'
import { Redirect } from "react-router-dom"
import { Alert } from 'reactstrap';

class SimulationList extends React.Component  {
  constructor(props){
    super(props);
    this.state = {
      listSimulation:[],
      isTrainer: this.props.location.state.isTrainer,
      alert: false,
      redirect: false,
      id: this.props.location.state.id
    }
  }
  componentDidMount(){
    if (this.state.isTrainer) {
      axios.get("http://localhost:8080/simulation/listTrainer/"+this.props.location.state.id)
      .then(res => {
        const data = res.data.data;
        this.setState({ listSimulation:data });
      })
      .catch(error => {
        alert(error)
      })

    } else {
      axios.get("http://localhost:8080/simulation/listTrainee/"+this.props.location.state.id)
      .then(res => {
        const data = res.data.data;
        this.setState({ listSimulation:data });
      })
      .catch(error => {
        alert(error)
      })
    }
  }

  componentDidUpdate(){
    if (this.state.isTrainer) {
      axios.get("http://localhost:8080/simulation/listTrainer/"+this.state.id)
      .then(res => {
        const data = res.data.data;
        this.setState({ listSimulation:data });
      })
      .catch(error => {
        alert(error)
      })

    } else {
      axios.get("http://localhost:8080/simulation/listTrainee/"+this.state.id)
      .then(res => {
        const data = res.data.data;
        this.setState({ listSimulation:data });
      })
      .catch(error => {
        alert(error)
      })
    }
  }

  alert(type, msg) {
    return(
        <Alert color={type} isOpen={this.state.alert} toggle={() => this.setState({alert:false, redirect:true})}>
            {msg}
        </Alert>
    );
}

  render(){
    const { t } = this.props
    return (
      <div>
        {this.state.alert ? this.alert("success","El caso clínico ha sido eliminado.") : null}
        <table className="table table-hover table-striped">
          <thead className="thead-dark">
            <tr>
              <th scope="col"></th>
              {this.state.isTrainer
              ? <th scope="col">{t('list-simulation.trainee')}</th>
              : <th scope="col">{t('list-simulation.trainer')}</th>}
              <th scope="col">{t('list-simulation.sex')}</th>
              <th scope="col">{t('list-simulation.age')}</th>
              <th scope="col">{t('list-simulation.trauma')}</th>
              <th scope="col">{t('list-simulation.time')}</th>
              <th scope="col">{t('list-simulation.action')}</th>
              <th scope="col">Informe</th>
            </tr>
          </thead>
          <tbody>
            {this.loadFillData()}
          </tbody>
        </table>
        {this.state.redirect && !this.state.alert ? <Redirect to={{
                                                        pathname: '/listSimulation',
                                                        state: { id: this.state.id,
                                                                  isTrainer: this.state.isTrainer }
                                                    }}/>
                                    : null}
      </div>
    );
  }


  loadFillData() {
    const { t } = this.props
    return this.state.listSimulation.map((data)=>{
      return(
        <tr>
          <th></th>
          {this.state.isTrainer
          ? <td>{data.trainee.name} {data.trainee.surname}</td>
          : <td>{data.trainer.name} {data.trainer.surname}</td>}
          <th>{(data.sex === 0) ? t('new-simulation.male') : t('new-simulation.female')}</th>
          <td>{data.age}</td>
          <td>{data.partBody}</td>
          <td>{data.time}</td>
          <td>
            {data.inform !== null ?
             <p>Simulación Finalizada</p> :
             
          this.state.isTrainer 
            ? 
                <Link className="btn btn-outline-danger" to={"/listSimulation/"} onClick={()=>this.sendDelete(data.simulationId)}> {t('list-simulation.delete')} </Link>
             
            : <Link className="btn btn-outline-info " 
            to={{
                pathname: "/simulation/"+data.simulationId,
                state: { id: this.props.location.state.id}
            }} >{t('list-simulation.enter')}
            </Link>}
          </td>
          <td><Inform simulationId = {data.simulationId}
                      surname = {data.trainee.surname}/> </td>
        </tr>
      )
    });
  }
  sendDelete(simulationId)
  {
    // url de backend
    const baseUrl = "http://localhost:8080/simulation/delete"    // parameter data post
    // network
    axios.post(baseUrl,{
      id: simulationId
    })
    .then(response =>{
      if (response.data.success) {
        this.setState({ alert: true});
      }
    })
    .catch ( error => {
      alert("Error 325 " + error)
    })
  }
}
export default withTranslation()(SimulationList);