import React, {Suspense, lazy} from 'react';
import { BrowserRouter as Router} from "react-router-dom"
// @ts-ignore
import {Route} from 'react-router-dom'

const LoginForm = lazy(() => import('./Login/LoginForm.js'))
const RegisterForm = lazy(() => import('./Login/RegisterForm'))
const DashboardTrainer = lazy(() => import('./Menu/DashboardTrainer'))
const DashboardTrainee = lazy(() => import('./Menu/DashboardTrainee'))
const List = lazy(() => import('./Users/ListUsers'))
const ListSimulation = lazy(() => import('./Menu/SimulationList'))
const Edit = lazy(() => import('./Users/Edit'))
const NewSimulation = lazy(() => import('./Simulations/NewSimulation'))
const Simulation = lazy(() => import('./Simulations/Simulation'))
const Ejemplo = lazy(() => import('./Ejemplo'))
const Document = lazy(() => import('./Information/Document'))

function App() { 
  return (
    
    <Router>
      <Suspense fallback={(<div></div>)}>
        <Route path= "/" exact><LoginForm/></Route>
      </Suspense>
      <Suspense fallback={(<div></div>)}>
        <Route path="/register/" > <RegisterForm /> </Route>
      </Suspense>
      <Suspense fallback={(<div></div>)}>
        <Route path="/dashboardTrainer/" component={DashboardTrainer}/>
      </Suspense>
      <Suspense fallback={(<div></div>)}>
        <Route path="/dashboardTrainee/" component={DashboardTrainee}/>
      </Suspense>
      <Suspense fallback={(<div></div>)}>
        <Route path="/listUser" component={List}/>
      </Suspense>
      <Suspense fallback={(<div></div>)}>
        <Route path="/listSimulation" component={ListSimulation}/>
      </Suspense> 
      <Suspense fallback={(<div></div>)}>
        <Route path="/edit/:trainerId" component={Edit} />
      </Suspense>
      <Suspense fallback={(<div></div>)}>
        <Route path="/newSimulation" component={NewSimulation} />
      </Suspense>
      <Suspense fallback={(<div></div>)}>
        <Route path="/simulation/:id" component={Simulation} />
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
