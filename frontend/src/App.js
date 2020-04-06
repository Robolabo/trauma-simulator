import React from 'react';
import LoginForm from './Login/LoginForm.js'
import RegisterForm from './Login/RegisterForm'
import DashboardTrainer from './Menu/DashboardTrainer'
import DashboardTrainee from './Menu/DashboardTrainee'
import List from './Users/ListUsers'
import ListSimulation from './Menu/SimulationList'
import Edit from './Users/Edit'
import NewSimulation from './Simulations/NewSimulation'
import Simulation from './Simulations/Simulation'
import { BrowserRouter as Router} from "react-router-dom"
import Ejemplo from './Ejemplo'
// @ts-ignore
import {Route} from 'react-router-dom'


function App() {
  return (
    <Router>
      <Route path= "/" exact component={LoginForm}/>
      <Route path="/register/" component={RegisterForm}/>
      <Route path="/dashboardTrainer/" component={DashboardTrainer}/>
      <Route path="/dashboardTrainee/" component={DashboardTrainee}/>
      <Route path="/listUser" component={List}/>
      <Route path="/listSimulation" component={ListSimulation}/>
      <Route path="/edit/:trainerId" component={Edit} />
      <Route path="/newSimulation" component={NewSimulation} />
      <Route path="/simulation/:id" component={Simulation} />
      <Route path= "/ejemplo" component={Ejemplo}/>
    </Router>
  );
}

export default App;
