import React from 'react';
import axios from 'axios';
import { Link } from "react-router-dom";

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
      axios.get("http://127.0.0.1:3000/simulation/listTrainer/"+this.props.location.state.id)
      .then(res => {
        const data = res.data.data;
        this.setState({ listSimulation:data });
      })
      .catch(error => {
        alert(error)
      })

    } else {
      axios.get("http://127.0.0.1:3000/simulation/listTrainee/"+this.props.location.state.id)
      .then(res => {
        const data = res.data.data;
        this.setState({ listSimulation:data });
      })
      .catch(error => {
        alert(error)
      })
    }
  }
  render()
  {
    return (
      <table className="table table-hover table-striped">
        <thead className="thead-dark">
          <tr>
            <th scope="col">#</th>
            {this.state.isTrainer
            ? <th scope="col">Trainee</th>
            : <th scope="col">Trainer</th>}
            <th scope="col">Sex</th>
            <th scope="col">Age</th>
            <th scope="col">Trauma</th>
            <th scope="col">Time</th>
            <th scope="col">Action</th>
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
    return this.state.listSimulation.map((data)=>{
      return(
        <tr>
          <th>{data.simulationId}</th>
          {this.state.isTrainer
          ? <td>{data.trainee.name} {data.trainee.surname}</td>
          : <td>{data.trainer.name} {data.trainer.surname}</td>}
          <th>{(data.sex === 0) ? "Male" : "Female"}</th>
          <td>{data.age}</td>
          <td>{data.partBody}</td>
          <td>{data.time}</td>
          <td>
            <Link className="btn btn-outline-info "  to={"/simulation/"+data.simulationId} >Enter</Link>
          </td>
          {this.state.isTrainer 
            ? <td>
                <Link className="btn btn-outline-danger" to={"/listSimulation/"} onClick={()=>this.sendDelete(data.simulationId)}> Delete </Link>
              </td>
            : null}
        </tr>
      )
    });
  }
  sendDelete(simulationId)
  {
    // url de backend
    const baseUrl = "http://localhost:3000/simulation/delete"    // parameter data post
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
export default SimulationList;