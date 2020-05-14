import React from 'react';
import axios from 'axios';
import { Link } from "react-router-dom";
import { withTranslation } from 'react-i18next';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';

class SimulationList extends React.Component  {
  constructor(props){
    super(props);
    this.state = {
      listSimulation:[],
      isTrainer: this.props.location.state.isTrainer
    }
  }
  componentDidMount(){
    if (this.state.isTrainer) {
      axios.get("http://127.0.0.1:8080/simulation/listTrainer/"+this.props.location.state.id)
      .then(res => {
        const data = res.data.data;
        this.setState({ listSimulation:data });
      })
      .catch(error => {
        alert(error)
      })

    } else {
      axios.get("http://127.0.0.1:8080/simulation/listTrainee/"+this.props.location.state.id)
      .then(res => {
        const data = res.data.data;
        this.setState({ listSimulation:data });
      })
      .catch(error => {
        alert(error)
      })
    }
  }
  render(){
    const { t } = this.props
    return (
      <table className="table table-hover table-striped">
        <thead className="thead-dark">
          <tr>
            <th scope="col">#</th>
            {this.state.isTrainer
            ? <th scope="col">{t('list-simulation.trainee')}</th>
            : <th scope="col">{t('list-simulation.trainer')}</th>}
            <th scope="col">{t('list-simulation.sex')}</th>
            <th scope="col">{t('list-simulation.age')}</th>
            <th scope="col">{t('list-simulation.trauma')}</th>
            <th scope="col">{t('list-simulation.time')}</th>
            <th scope="col">{t('list-simulation.action')}</th>
            {this.state.isTrainer 
            ?<th scope="col"></th>
            : null}
          </tr>
        </thead>
        <tbody>
          {this.loadFillData()}
        </tbody>
      </table>
    );
  }


  loadFillData() {
    const { t } = this.props
    return this.state.listSimulation.map((data)=>{
      return(
        <tr>
          <th>{data.simulationId}</th>
          {this.state.isTrainer
          ? <td>{data.trainee.name} {data.trainee.surname}</td>
          : <td>{data.trainer.name} {data.trainer.surname}</td>}
          <th>{(data.sex === 0) ? t('new-simulation.male') : t('new-simulation.female')}</th>
          <td>{data.age}</td>
          <td>{data.partBody}</td>
          <td>{data.time}</td>
          <td>
            <Link className="btn btn-outline-info "  to={"/simulation/"+data.simulationId} >{t('list-simulation.enter')}</Link>
          </td>
          {this.state.isTrainer 
            ? <td>
                <Link className="btn btn-outline-danger" to={"/listSimulation/"} onClick={()=>this.sendDelete(data.simulationId)}> {t('list-simulation.delete')} </Link>
              </td>
            : null}
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
        alert(response.data.message)
      }
    })
    .catch ( error => {
      alert("Error 325 " + error)
    })
  }
}
export default withTranslation()(SimulationList);