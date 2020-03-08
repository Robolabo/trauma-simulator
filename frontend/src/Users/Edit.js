import React from 'react';
import { Link } from "react-router-dom";

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';

import axios from 'axios';
import sha256 from 'js-sha256'

const baseUrl = "http://127.0.0.1:3000"

class EditComponent extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            dataEmployee:{},
            campName: "",
            campSurname:"",
            campPassword:"",
            campConfirm:"",
            campEmail:"",
            campWorkplace:"",
            selectRole:0
        }
    }
    componentDidMount(){
    let userId = this.props.match.params.trainerId;
    const url = baseUrl+"/trainer/get/"+userId
    axios.get(url)
    .then(res=>{
        if (res.data.success) {
            const data = res.data.data[0]
            this.setState({
                dataEmployee:data,
                campName: data.name,
                campSurname: data.surname,
                campEmail:data.email,
                campWorkplace:data.workplace,
                stringRole:data.role.role,
                selectRole:data.roleId
        })
        }
        else {
        alert("Error web service")
        }
    })
    .catch(error=>{
        alert("Error server "+error)
    })
    }
    render(){
    return (
        <div>
        <div class="form-row justify-content-center">
            <div class="form-group col-md-6">
            <label for="inputPassword4">Name</label>
            <input type="text" class="form-control"  placeholder="Name"
                value={this.state.campName} onChange={(value)=> this.setState({campName:value.target.value})}/>
            </div>
            <div class="form-group col-md-6">
            <label for="inputEmail4">Surname</label>
            <input type="text" class="form-control"  placeholder="Surname"
                value={this.state.campSurname} onChange={(value)=> this.setState({campSurname:value.target.value})}/>
            </div>
        </div>
        <div class="form-row">
            <div class="form-group col-md-6">
            <label for="inputState">Role</label>
            <select id="inputState" class="form-control" onChange={(value)=> this.setState({selectRole:value.target.value})}>
                <option selected value={this.state.selectRole}>{this.state.stringRole}</option>
                <option value="1">Admin</option>
                <option value="2">Trainer</option>
                <option value="3">Doctor</option>
                <option value="4">Resident</option>
                <option value="5">Student</option>
            </select>
            </div>
            <div class="form-group col-md-6">
            <label for="inputEmail4">Email</label>
            <input type="email" class="form-control"  placeholder="Email"
                value={this.state.campEmail} onChange={(value)=> this.setState({campEmail:value.target.value})}/>
            </div>
        </div>
        <div class="form-row justify-content-center">
            <div class="form-group col-md-6">
            <label for="inputPassword4">Password</label>
            <input type="password" class="form-control"  placeholder="Password"
                value={this.state.campPassword} onChange={(value)=> this.setState({campPassword: value.target.value})}/>
            </div>
            <div class="form-group col-md-6">
            <label for="inputEmail4">Confirm Password</label>
            <input type="password" class="form-control"  placeholder="Confirm Password"
                value={this.state.campConfirm} onChange={(value)=> this.setState({campConfirm: value.target.value})}/>
            </div>
        </div>
        <div class="form-group">
            <label for="inputAddress">Workplace</label>
            <input type="text" class="form-control" id="inputAddress" placeholder="Workplace"
            value={this.state.campWorkplace} onChange={(value)=> this.setState({campWorkplace:value.target.value})}/>
        </div> 
            <Link type="submit" class="btn btn-primary "  to={"/list/"} onClick={()=>this.sendUpdate()} >Update</Link>
        </div>
    );
    }
    sendUpdate(){
        //  get parameter id
        let userId = this.props.match.params.trainerId;
        // url de backend
        const baseUrl = "http://localhost:3000/trainer/update/"+userId
        // parametros de datos post
        const datapost = {
          name : this.state.campName,
          surname: this.state.campSurname,
          email : this.state.campEmail,
          password : sha256(this.state.campPassword),
          workplace : this.state.campWorkplace,
          roleId  : this.state.selectRole,
          role: this.state.stringRole
        }
    
        axios.post(baseUrl,datapost)
        .then(response=>{
          if (response.data.success===true) {
            alert(response.data.message)
          }
          else {
            alert("Error")
          }
        }).catch(error=>{
          alert("Error 34 "+error)
        })
    
    }
}


export default EditComponent;