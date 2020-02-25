import React from 'react';
import LoginForm from './Login/LoginForm.js'
import RegisterForm from './Login/RegisterForm'
import Dashboard from './Menu/Dashboard'
import { BrowserRouter as Router} from "react-router-dom"
// @ts-ignore
import {Route} from 'react-router-dom'

function App() {
  return (
    <Router>
      <Route path= "/" exact component={LoginForm}/>
      <Route path="/register/" component={RegisterForm}/>
      <Route path="/dashboard/" component={Dashboard}/>
    </Router>
  );
}

export default App;
