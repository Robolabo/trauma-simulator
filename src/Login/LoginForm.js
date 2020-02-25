import React from 'react';
import './LoginForm.css';
import icono from '../assets/logo192.png'
import { Link } from "react-router-dom"

export default class LoginForm extends React.Component {
  render() {
    return(

      <div className="wrapper fadeInDown">
        <div id="formContent">

          <div className="fadeIn first">
            <img src={icono} id="icon" alt="User Icon" />
          </div>

          <form className ="fadeInText">
            <input type="text" id="login" className="fadeIn second" name="login" placeholder="login"/>
            <input type="text" id="password" className="fadeIn third" name="login" placeholder="password"/>
            <Link type="submit" className="fadeIn fourth" to= "/dashboard/" /*value="Log In"*/> Log In </Link>
          </form>

          <div id="formFooter">
            <Link className="underlineHover1" to="#">Forgot Password?</Link>
            <Link className="underlineHover2" to="/register/">Sign Up</Link>
          </div>

        </div>
      </div>
    )
  }
}
