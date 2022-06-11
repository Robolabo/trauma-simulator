/*import React from 'react';
import axios from 'axios';
import './Evaluation.css';
import ProgressBar from 'react-bootstrap/ProgressBar'
import Modal from 'react-awesome-modal';

import {
  CircularProgressbar,
} from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

// Animation


import ChangingProgressProvider from "./ChangingProgressProvider";


class Evaluation extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      listSimulation: []
      }
    }

    componentDidMount(){
      axios.get("http://localhost:8080/trainee/results1/"+this.state.simulationId+"/"+this.state.traineeId)
      .then(res =>{
        this.setState({listSimulation: res.data
        });      
      })
        .catch(error=>{
          alert("Error server "+error)
        })
        
    }



    render() {

      return(     
        
        
        render(){
            
          
            
              
              <div>
                <Link type="button"  to="/" onClick={() => this.handleLogout()}>Logout</Link><br/>
                
                <div> 
                  <table className="table table-hover table-striped">
                    <thead className="thead-dark">
                      <tr>
                        <th scope="col"></th>
                         <th scope="col">{t('list-simulation.trainee')}</th>
                         <th scope="col">Fase</th>}
                        
                        <th scope="col">{t('list-simulation.sex')}</th>
        
                        <th scope="col">{t('list-simulation.age')}</th>
                        <th scope="col">Tipo de Traumatismo</th>
                        <th scope="col">{t('list-simulation.trauma')}</th>
                        <th scope="col">{t('list-simulation.time')}</th>
                        <th scope="col">Informe</th>
                        <th scope="col">{t('list-simulation.action')}</th>
                      </tr>
                    </thead>
                    <tbody>
                    </tbody>
                  </table>
                  <div className="messageTraining">
                  Debes terminar los entrenamientos antes de continuar con los exámenes.
                  </div> 
                </div>}
                {((this.state.redirect && !this.state.alert) ||finish) ? <Redirect to={{
                                                                pathname: '/listSimulation',
                                                                state: { id: this.state.id,
                                                                          isTrainer: this.state.isTrainer,
                                                                          simulationId:0,
                                                                          trainerId:0,
                                                                          partBody:"",
                                                                          phase:"" }
                                                            }}/>
                                            : null}
              </div>
          );
        
          }
        
        
          loadFillData() {
            const { t } = this.props
            
            if (this.state.listSimulation) {
              
            return this.state.listSimulation.map((data)=>{
              return(
                <tr key="ha">
                  <th></th>
                  <td>{data.id}</td>
                  
        
                  <td>Pre Hospitalaria </td>: <td>Hospitalaria</td>}
                  
                  <th>{(data.matches)}</th>
                  <td>{data.age}</td>
                  <td>{data.swap}</td>
                  <td>{t(this.getPartBody(data.partBody))}</td>
                  <td>{data.time}</td>
                  {
                    console.log(data.simulationId)
                  }
                  <td><Inform simulationId = {data.simulationId}
                              surname = {data.trainee.surname}
                              listo ={data.simulationId}/> 
                  </td>
                  <td>
                    
                    {data.listo?
                  <Link className="btn btn-outline-info " 
                            to={{
                                pathname: "/evaluar/"+data.simulationId,
                                state: { simulationId: data.simulationId,
                                  traineeId:data.traineeId,
                                  name:data.trainee.name,
                                  surname:data.trainee.surname},
                                
                            }} > Evaluar </Link>: <p>Pendiente</p>}
        
                 
                   
                  </td>
                  <td>
                    {(data.listo)  ?
                        this.props.location.state.trainerList ===true?
                            <Link className="btn btn-outline-info " 
                            to={{
                                pathname: "/simulation/"+data.simulationId,
                                state: { id: this.props.location.state.id,
                                  trainerList:this.props.location.state.trainerList},
                                
                            }} > Volver a Entrar
                            </Link> :
                            <p>Entrar</p>
                     
                     :
                     
                  this.state.isTrainer 
                    ? 
                        <Link className="btn btn-outline-danger" to={"/listSimulation/"} onClick={()=>this.sendDelete(data.simulationId)}> {t('list-simulation.delete')} </Link>
                     
                    : <Link className="btn btn-outline-info " 
                    to={{
                        pathname: "/simulation/"+data.simulationId,
                        state: { id: this.props.location.state.id,
                          trainerList:this.props.location.state.trainerList},
                        
                    }} >{t('list-simulation.enter')}
                    </Link>}
                  </td>
        
                  
                </tr>
              )
            });
          }
         
        }
  }

  
          
      
    



export default Evaluation;*/