import React, {Suspense, lazy, useState, useEffect} from 'react';
import { BrowserRouter as Router} from "react-router-dom"
// @ts-ignore
import {Route} from 'react-router-dom'
import PublicRoute from "./Utils/PublicRoute"
import PrivateRoute from "./Utils/PrivateRoute"
import { getToken, removeUserSession, setUserSession } from './Utils/Common';
import axios from 'axios';

const LoginForm = lazy(() => import('./Login/LoginForm.js'))
const RegisterForm = lazy(() => import('./Login/RegisterForm'))
const DashboardTrainer = lazy(() => import('./Menu/DashboardTrainer'))
const DashboardTrainee = lazy(() => import('./Menu/DashboardTrainee'))
const List = lazy(() => import('./Users/ListUsers'))
const ListSimulation = lazy(() => import('./Menu/SimulationList'))
const Evaluation = lazy(() => import('./evaluation/Evaluation'))
const Edit = lazy(() => import('./Users/Edit'))
const NewSimulation = lazy(() => import('./Simulations/NewSimulation'))
const Simulation = lazy(() => import('./Simulations/Simulation'))
const Ejemplo = lazy(() => import('./Ejemplo'))
const Document = lazy(() => import('./Information/Document'))
const Test = lazy(() => import('./Information/Test'))

function App() { 

  const[authLoading, setAuthLoading] = useState(true);
  


 

  useEffect(() =>{
    const token = getToken();
    if (!token){
      return
    }
    


    axios.get(`http://localhost:8080/verifyToken?token=${token}`).then(response => {
      setUserSession(response.data.token, response.data.user);
      setAuthLoading(false);
    }).catch(error => {
      removeUserSession();
      setAuthLoading(false);
    });

  }, []);

  
  if(authLoading&& getToken()){
    return <div className="content" >Checking Authentication</div>
  }

  return (
    
    <Router>
      <Suspense fallback={(<div></div>)}>
        <PublicRoute path= "/" exact><LoginForm/></PublicRoute>
      </Suspense>
      <Suspense fallback={(<div></div>)}>
        <Route path="/register/" > <RegisterForm /> </Route>
      </Suspense>
      <Suspense fallback={(<div></div>)}>
        <PrivateRoute path="/dashboardTrainer/" component={DashboardTrainer}/>
      </Suspense>
      <Suspense fallback={(<div></div>)}>
        <PrivateRoute path="/dashboardTrainee/" component={DashboardTrainee}/>
      </Suspense>
      <Suspense fallback={(<div></div>)}>
        <Route path="/listUser" component={List}/>
      </Suspense>
      <Suspense fallback={(<div></div>)}>
        <PrivateRoute path="/listSimulation" component={ListSimulation}/>
      </Suspense> 
      <Suspense fallback={(<div></div>)}>
        <PrivateRoute path="/edit/:trainerId" component={Edit} />
      </Suspense>
      <Suspense fallback={(<div></div>)}>
        <PrivateRoute path="/evaluar/:id" component={Evaluation} />
      </Suspense>
      <Suspense fallback={(<div></div>)}>
        <PrivateRoute path="/newSimulation" component={NewSimulation} />
      </Suspense>
      <Suspense fallback={(<div></div>)}>
        <PrivateRoute path="/simulation/:id" component={Simulation} />
      </Suspense>
      <Suspense fallback={(<div></div>)}>
        <Route path="/test/:id" component={Test} />
      </Suspense>
      <Suspense fallback={(<div></div>)}>
        <Route path= "/ejemplo" component={Ejemplo}/>
      </Suspense>
      <Suspense fallback={(<div></div>)}>
        <Route path= "/informe" component={Document}/>
      </Suspense>
   
  </Router>

  );
}

export default (App);