import React from 'react'
import './RegisterForm.css'
import { Link } from "react-router-dom"
import axios from 'axios';
import sha256 from 'js-sha256'
//import { Button } from 'reactstrap';

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
            selectRole:0,
            trainer: true,
            trainee: false
        }

        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.toogleTrainer = this.toogleTrainer.bind(this);
        this.toogleTrainee = this.toogleTrainee.bind(this);
    }
    
    handleInputChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;
    
        this.setState({
          [name]: value
        });
      }

    handleSubmit(event) {
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
            var baseUrl = ""
            if (this.state.trainer) {
                baseUrl = "http://127.0.0.1:3000/trainer/create"
            } else {
                baseUrl = "http://127.0.0.1:3000/trainee/create"
            }
            const datapost = {
            name: this.state.campName,
            surname: this.state.campSurname,
            password: sha256(this.state.campPassword),
            email: this.state.campEmail,
            workplace: this.state.campWorkplace,
            roleId: this.state.selectRole
            }
       
          axios.post(baseUrl,datapost)
          .then(response=>{
              if (response.data.success===true) {
                  alert(response.data.message)
                  window.location.reload(true);
              }
              else {
                  alert(response.data.message)
              }
          })
          .catch(error=>{
              alert("Error 34 "+error)
          })
          }
        event.preventDefault();
        
    }

    toogleTrainer() {
        this.setState({
            trainer: true,
            trainee: false,
            campName: "",
            campSurname:"",
            campPassword:"",
            campConfirm:"",
            campEmail:"",
            campWorkplace:"",
            selectRole:0
          });
    }

    toogleTrainee() {
        this.setState({
            trainer: false,
            trainee: true,
            campName: "",
            campSurname:"",
            campPassword:"",
            campConfirm:"",
            campEmail:"",
            campWorkplace:"",
            selectRole:0
          });
    }

    render() {
        return(
            <div className="container register">
                <div className="row">
                    <div className="col-md-3 register-left">
                        <img src="https://image.ibb.co/n7oTvU/logo_white.png" alt=""/>
                        <h3>Welcome</h3>
                        <Link className="access" type="submit"  to="/">Login</Link><br/>
                    </div>
                    <div className="col-md-9 register-right">
                        <ul className="nav nav-tabs nav-justified" id="myTab" role="tablist">
                            <li className="nav-item">
                                <Link className="nav-link active" id="home-tab" data-toggle="tab" to="#" role="tab" aria-controls="home" aria-selected="true" onClick={this.toogleTrainer}>Trainer</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" id="profile-tab" data-toggle="tab"  to="#" role="tab" aria-controls="profile" aria-selected="false" onClick={this.toogleTrainee}>Trainee</Link>
                            </li>
                        </ul>
                        <div className="tab-content" id="myTabContent">
                            <div className="tab-pane fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">
                                {this.state.trainer 
                                ? <h3 className="register-heading">Apply as a Trainer</h3>
                                : <h3 className="register-heading">Apply as a Trainee</h3>}
                                
                                <form className="row register-form" onSubmit={this.handleSubmit}>
                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <input type="text" className="form-control" name="campName" placeholder="First Name *" value={this.state.campName} onChange={this.handleInputChange} />
                                        </div>
                                        <div className="form-group">
                                            <input type="text" className="form-control" name="campSurname" placeholder="Last Name *" value={this.state.campSurname} onChange={this.handleInputChange}  />
                                        </div>
                                        <div className="form-group">
                                            <input type="password" className="form-control" name="campPassword" placeholder="Password *" value={this.state.campPassword} onChange={this.handleInputChange} />
                                        </div>
                                        <div className="form-group">
                                            <input type="password" className="form-control"  name="campConfirm" placeholder="Confirm Password *" value={this.state.campConfirm} onChange={this.handleInputChange}  />
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <input type="email" className="form-control" name="campEmail" placeholder="Your Email *" value={this.state.campEmail} onChange={this.handleInputChange} />
                                        </div>
                                        <div className="form-group">
                                            <input type="text" className="form-control" name="campWorkplace" placeholder="Your Workplace *" value={this.state.campWorkplace} onChange={this.handleInputChange} />
                                        </div>
                                        <div className="form-group">
                                            <select id="inputState" className="form-control" onChange={(value)=> this.setState({selectRole:Number(value.target.value)})}>
                                                <option defaultValue>Role</option>
                                                <option value={2}>Doctor</option>
                                                <option value={3}>Resident</option>
                                                {this.state.trainee
                                                ? <option value={4}>Student</option>
                                                : null}
                                                {console.log(this.state.selectRole)}
                                                
                                                
                                            </select>
                                        </div>
                                        <input type="submit" className="btnRegister"  value="Register"/>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>           
        );
    }
}
