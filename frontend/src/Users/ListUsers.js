import React from 'react';
import axios from 'axios';
import { Link } from "react-router-dom";

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';

class listComponent extends React.Component  {
  constructor(props){
    super(props);
    this.state = {
      listTrainer:[]
    }
  }
  componentDidMount(){

    axios.get("http://127.0.0.1:8080/trainer/list")
    .then(res => {
      const data = res.data.data;
      this.setState({ listTrainer:data });
    })
    .catch(error => {
      alert(error)
    })

  }
  render()
  {
    return (
      <table class="table table-hover table-striped">
        <thead class="thead-dark">
          <tr>
            <th scope="col">#</th>
            <th scope="col">Role</th>
            <th scope="col">Name</th>
            <th scope="col">Surname</th>
            <th scope="col">Email</th>
            <th scope="col">Workplace</th>
            <th scope="col">Password</th>
            <th colspan="2">Action</th>
          </tr>
        </thead>
        <tbody>
          {this.loadFillData()}
        </tbody>
      </table>
    );
  }


  loadFillData() {
    return this.state.listTrainer.map((data)=>{
      return(
        <tr>
          <th>{data.id}</th>
          <td>{data.role.role}</td>
          <th>{data.name}</th>
          <td>{data.surname}</td>
          <td>{data.email}</td>
          <td>{data.workplace}</td>
          <td>{data.password}</td>
          <td>
            <Link class="btn btn-outline-info "  to={"/edit/"+data.id} >Edit</Link>
          </td>
          <td>
            <Link class="btn btn-outline-danger" to={"/list/"} onClick={()=>this.sendDelete(data.id)}> Delete </Link>
          </td>
        </tr>
      )
    });
  }
  sendDelete(userId)
  {
    // url de backend
    const baseUrl = "http://localhost:8080/trainer/delete"    // parameter data post
    // network
    axios.post(baseUrl,{
      id:userId
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
export default listComponent;