import React from 'react';
import './LoginForm.css';
import icono from '../assets/logo192.png'
import { Link } from "react-router-dom"
import { createBrowserHistory } from "history";
import axios from 'axios'
import sha256 from 'js-sha256'

const history = createBrowserHistory();


export default class LoginForm extends React.Component {
  constructor(props){
    super(props);
    this.state = {
        email: "",
        password:"",
        loggedIn:false
    }
  }
  
  render() {
    return(

      <div className="wrapper fadeInDown">
        <div id="formContent">

          <div className="fadeIn first">
            <img src={icono} id="icon" alt="User Icon" />
          </div>

          <form className ="fadeInText">
            <input type="text" className="fadeIn second" placeholder="Email" value={this.state.email} onChange={(value)=> this.setState({email:value.target.value})}/>
            <input type="password" className="fadeIn third" placeholder="Password" value={this.state.password} onChange={(value)=> this.setState({password:value.target.value})}/>
          </form>
          <button className="fadeIn fourth" onClick={()=>this.sendLogin(this.state.email)}> Log In </button>
          <div id="formFooter">
            <Link className="underlineHover1" to="#">Forgot Password?</Link>
            <Link className="underlineHover2" to="/register/">Sign Up</Link>
          </div>

        </div>
      </div>
    )
    
  }
  
  sendLogin(email){
    const url = "http://localhost:3000/trainer/login/"+email    // parameter data post
    // network
    axios.get(url)
    .then(res=>{
        if (res.data.success) {
            console.log("hola1")
            const password = res.data.data[0].password
            if(password === sha256(this.state.password)){
              history.push("/dashboard/")
            }
            else{
              alert("User or Password are incorrect")
            }
        }
        else {
        alert("Error web service")
        }
    })
    .catch(error=>{
      alert("Error server "+error)
    })
  }
}


