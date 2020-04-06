import React from 'react';
import './LoginForm.css';
import icono from '../assets/icono4.png'
//import monitor from '../assets/monitor.png'
//import cama from '../assets/cama.png'
import { Link, Redirect } from "react-router-dom"
import axios from 'axios'
import sha256 from 'js-sha256'

var isTrainer = false

export default class LoginForm extends React.Component {
  constructor(props){
    super(props);
    this.state = {
        email: "",
        password:"",
        redirect: false,
        id: 0
    }
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    
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
    const urlTrainer = "http://localhost:3000/trainer/login/"+this.state.email    // parameter data post
    const urlTrainee = "http://localhost:3000/trainee/login/"+this.state.email
    // network
    axios.get(urlTrainer)
    .then(res=>{
      if (res.data.success && res.data.data.length > 0) {

          const password = res.data.data[0].password
          this.setState({
            id: res.data.data[0].trainerId
          })
          isTrainer = true
          if(password === sha256(this.state.password)){
            this.setRedirect()
          }
          else{
            alert("User or Password are incorrect")
            this.setState({
              password: ''
            });
          }
      }
      else if (res.data.success && res.data.data.length === 0) {

        axios.get(urlTrainee)
        .then(res=>{
          if (res.data.success && res.data.data.length > 0) {

              const password = res.data.data[0].password
              this.setState({
                id: res.data.data[0].traineeId
              })
              isTrainer = false

              if(password === sha256(this.state.password)){
                this.setRedirect()
              }
              else{
                alert("User or Password are incorrect")
                this.setState({
                  password: ''
                });
              }
          }
          else {
          alert("Error web service")
          }    
        })
      }
      else {
      alert("Error web service")
      }
        
    })
    .catch(error=>{
      alert("Error server "+error)
    })
    event.preventDefault();
  }

  setRedirect = () => {
    this.setState({
      redirect: true
    })
  }

  renderRedirect = () => {
    if (this.state.redirect && isTrainer) {
      return <Redirect to={{
                            pathname: '/dashboardTrainer',
                            state: { id: this.state.id }
                        }} />
    } else if (this.state.redirect && !isTrainer) {
      return <Redirect to={{
                            pathname: '/dashboardTrainee',
                            state: { id: this.state.id }
                        }} />
    }
  }
  
  render() {
    return(

      <div className="wrapper fadeInDown">
        <div id="formContent">

          <div className="fadeIn first">
            <img src={icono} id="icon" alt="User Icon" width="350px" height="250px" />
          </div>

          <form className ="fadeInText" onSubmit={this.handleSubmit}>
            <input type="email" className="fadeIn second" placeholder="Email" name="email" value={this.state.email} onChange={this.handleInputChange}/>
            <input type="password" className="fadeIn third" placeholder="Password" name="password" value={this.state.password} onChange={this.handleInputChange}/>
            <input type="submit" value="Sign In" className="fadeIn fourth" />
          </form>
           
          <div id="formFooter">
            <Link className="underlineHover1" to="#">Forgot Password?</Link>
            <Link className="underlineHover2" to="/register/">Sign Up</Link>
          </div>
        </div>
        {this.renderRedirect()}
      </div>
    )
    
  }
}


