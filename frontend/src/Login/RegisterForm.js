import React from 'react'
import './RegisterForm.css'
import { Link } from "react-router-dom"
import axios from 'axios';
import sha256 from 'js-sha256'

export default class RegisterForm extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            campName: "",
            campSurname:"",
            campPassword:"",
            campConfirm:"",
            campEmail:"",
            campWorkplace:"",
            selectRole:0
        }
    } 
    render() {
        return(
            <div className="container register">
                <div className="row">
                    <div className="col-md-3 register-left">
                        <img src="https://image.ibb.co/n7oTvU/logo_white.png" alt=""/>
                        <h3>Welcome</h3>
                        <Link class="access"type="submit" name="" to="/">Login</Link><br/>
                    </div>
                    <div className="col-md-9 register-right">
                        <ul className="nav nav-tabs nav-justified" id="myTab" role="tablist">
                            <li className="nav-item">
                                <Link className="nav-link active" id="home-tab" data-toggle="tab" to="#home" role="tab" aria-controls="home" aria-selected="true">Trainer</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" id="profile-tab" data-toggle="tab" to="#profile" role="tab" aria-controls="profile" aria-selected="false">Trainee</Link>
                            </li>
                        </ul>
                        <div className="tab-content" id="myTabContent">
                            <div className="tab-pane fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">
                                <h3 className="register-heading">Apply as a Trainer</h3>
                                <div className="row register-form">
                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <input type="text" className="form-control" placeholder="First Name *" value={this.state.campName} onChange={(value)=> this.setState({campName:value.target.value})} />
                                        </div>
                                        <div className="form-group">
                                            <input type="text" className="form-control" placeholder="Last Name *" value={this.state.campSurname} onChange={(value)=> this.setState({campSurname:value.target.value})}  />
                                        </div>
                                        <div className="form-group">
                                            <input type="password" className="form-control" placeholder="Password *" value={this.state.campPassword} onChange={(value)=> this.setState({campPassword: value.target.value})} />
                                        </div>
                                        <div className="form-group">
                                            <input type="password" className="form-control"  placeholder="Confirm Password *" value={this.state.campConfirm} onChange={(value)=> this.setState({campConfirm: value.target.value})}  />
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <input type="email" className="form-control" placeholder="Your Email *" value={this.state.campEmail} onChange={(value)=> this.setState({campEmail:value.target.value})} />
                                        </div>
                                        <div className="form-group">
                                            <input type="text" className="form-control" placeholder="Your Workplace *" value={this.state.campWorkplace} onChange={(value)=> this.setState({campWorkplace:value.target.value})} />
                                        </div>
                                        <div className="form-group">
                                            <select id="inputState" class="form-control" onChange={(value)=> this.setState({selectRole:value.target.value})}>
                                                <option selected>Role</option>
                                                <option value="1">Admin</option>
                                                <option value="2">Trainer</option>
                                                <option value="3">Doctor</option>
                                                <option value="4">Resident</option>
                                                <option value="5">Student</option>
                                            </select>
                                        </div>
                                        
                                        <button type="submit" class="btn btn-primary" onClick={()=>this.sendSave()}>Save</button>
                                    </div>
                                </div>
                            </div>
                            <div className="tab-pane fade show" id="profile" role="tabpanel" aria-labelledby="profile-tab">
                                <h3  className="register-heading">Apply as a Trainee</h3>
                                <div className="row register-form">
                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <input type="text" className="form-control" placeholder="First Name *"  />
                                        </div>
                                        <div className="form-group">
                                            <input type="text" className="form-control" placeholder="Last Name *"  />
                                        </div>
                                        <div className="form-group">
                                            <input type="email" className="form-control" placeholder="Email *"  />
                                        </div>
                                        <div className="form-group">
                                            <input type="text" maxLength="10" minLength="10" className="form-control" placeholder="Phone *"  />
                                        </div>


                                    </div>
                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <input type="password" className="form-control" placeholder="Password *"  />
                                        </div>
                                        <div className="form-group">
                                            <input type="password" className="form-control" placeholder="Confirm Password *"  />
                                        </div>
                                        <div className="form-group">
                                            <select className="form-control">
                                                <option className="hidden"  selected disabled>Please select your Sequrity Question</option>
                                                <option>What is your Birthdate?</option>
                                                <option>What is Your old Phone Number</option>
                                                <option>What is your Pet Name?</option>
                                            </select>
                                        </div>
                                        <div className="form-group">
                                            <input type="text" className="form-control" placeholder="`Answer *"  />
                                        </div>
                                        <input type="submit" className="btnRegister"  value="Register"/>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>           
        );
    }
    sendSave(){

        if (this.state.campName==="") {
          alert("Introduce your name")
        }
        else if (this.state.campSurname==="") {
           alert("Introduce your surname")
        }
        else if (this.state.campPassword==="") {
           alert("Introduce a password")
        }
        else if (this.state.campEmail==="") {
           alert("Introduce your email")
        }
        else if (this.state.campWorkplace==="") {
           alert("Introduce your workplace")
        }
        else if (this.state.selectRole === 0){
            alert("Select your role")
        }
        else if(this.state.campPassword !== this.state.campConfirm){
            alert("The passwords must be the same")
        }

        else {
            console.log(this.state)
          const baseUrl = "http://127.0.0.1:3000/trainer/create"
            
          const datapost = {
            name: this.state.campName,
            surname: this.state.campSurname,
            password: sha256(this.state.campPassword),
            email: this.state.campEmail,
            workplace: this.state.campWorkplace,
            roleId: this.state.selectRole
        }
        console.log(datapost)
     
        axios.post(baseUrl,datapost)
        .then(response=>{
            if (response.data.success===true) {
                alert(response.data.message)
            }
            else {
                alert(response.data.message)
            }
        })
        .catch(error=>{
            alert("Error 34 "+error)
        })
        }
     
    }
}
