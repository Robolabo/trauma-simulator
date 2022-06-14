  import React, { createContext } from 'react';
  import axios from 'axios';
  import './Evaluation.css';
  import Inform from '../Information/Document'
  import ProgressBar from 'react-bootstrap/ProgressBar'
  import Popup from 'reactjs-popup';
  import { Redirect } from "react-router-dom"
  import Modal from 'react-awesome-modal';

  import {
    CircularProgressbar,
  } from "react-circular-progressbar";
  import "react-circular-progressbar/dist/styles.css";
  
  // Animation
  import ChangingProgressProvider from "./ChangingProgressProvider";
import { Button } from 'react-bootstrap';


  class Evaluation extends React.Component {
    constructor(props){
      super(props);
      this.state = {
        simulationId: this.props.location.state.simulationId,
        traineeId:this.props.location.state.traineeId,
        name:this.props.location.state.name,
        surname:this.props.location.state.surname,
        matches: "",
        swap:"",
        contr: "",
        gasp: "",
        mismatches: "",
        GA:"",
        Diag:"",
        Subseq:"",
        Precision:"",
        Recall:"",
        Specificity:"",
        Accuracy:"",
        F1:"",
        Nota:"",
        visible : false,
        visibles: false
        

        }
      }

      componentDidMount(){
   
       
        axios.get("http://localhost:8080/trainee/results/"+this.state.simulationId+"/"+this.state.traineeId)
        
        .then(res =>{
          if(res.data.data[0].Nota<0){
            this.setState({matches: res.data.data[0].matches, swap: res.data.data[0].swap, contr: res.data.data[0].contr,
              gasp: res.data.data[0].gasp, mismatches: res.data.data[0].mismatches,GA:((parseFloat(res.data.data[0].GA, 10).toPrecision(2))), 
              Diag: ((parseFloat(res.data.data[0].Diag, 10)).toPrecision(1)), Subseq: ((parseFloat(res.data.data[0].Subseq, 10))),
              Precision:((parseFloat(res.data.data[0].Preci, 10))),Recall: ((parseFloat(res.data.data[0].Recall, 10))),
              Specificity:((parseFloat(res.data.data[0].Specificity, 10))),
              Accuracy:((parseFloat(res.data.data[0].Accuracy, 10))),
              F1:((parseFloat(res.data.data[0].F1, 10))),Nota: 0
           }); 

          }else{
          this.setState({matches: res.data.data[0].matches, swap: res.data.data[0].swap, contr: res.data.data[0].contr,
             gasp: res.data.data[0].gasp, mismatches: res.data.data[0].mismatches,GA:((parseFloat(res.data.data[0].GA, 10).toPrecision(2))), 
             Diag: ((parseFloat(res.data.data[0].Diag, 10)).toPrecision(1)), Subseq: ((parseFloat(res.data.data[0].Subseq, 10))),
             Precision:((parseFloat(res.data.data[0].Preci, 10))),Recall: ((parseFloat(res.data.data[0].Recall, 10))),
             Specificity:((parseFloat(res.data.data[0].Specificity, 10))),
             Accuracy:((parseFloat(res.data.data[0].Accuracy, 10))),
             F1:((parseFloat(res.data.data[0].F1, 10))),Nota: ((parseFloat(res.data.data[0].Nota, 10)))
            
          }); 
        }
             
        })
          .catch(error=>{
            alert("Error server "+error)
          })

          
    


      }
    


      openModal() {
        this.setState({
            visible : true
        });
    }

    closeModal() {
        this.setState({
            visible : false
        });
    }

    openModals() {
      this.setState({
          visibles : true
      });
  }

    closeModals() {
      this.setState({
          visibles : false
      });
  }

    volver(){
      return <Redirect to={{
        pathname: '/listSimulation'
    }}></Redirect>
    }
 
      render() {

        return(     
          
          
               
            <div className="containerEvaluation">
      
              <div className="titleSecMain">
               <h1> Resultado de la evaluación: </h1> 
              </div>
              <Inform simulationId = {this.props.location.state.simulationId}
                      surname = {this.state.surname}
                      />  

      
              <div className="containerGradeEvaluation">
                <ChangingProgressProvider values={[this.state.Nota]}>
                  {percentage => (
                  <CircularProgressbar value={this.state.Nota} text={`${percentage}%`} />
                  )}
                </ChangingProgressProvider>
              </div>
      
              <div className="titleSec">
              <h1> Sección 1 </h1> 

                  <button class="infoButton"  position="right center" onClick={() => this.openModals()} ><div class="infoButton-btn"><span class="infoButton-btn-text">i</span></div></button>
                 
                  <Modal visible={this.state.visibles} width="656.5" height="508" effect="fadeInUp" onClickAway={() => this.closeModals()}>
                    <div>
                        <h1 style={{color: 'black', display: 'flex', justifyContent:'center',marginTop:'1em'}}>Algoritmo Meedleman-Wunsch modificado</h1>

                        <p style={{color: 'black', textAlign:'center',marginLeft:'1em', marginRight:'1em',marginTop:'1em'}}>
                          
                            Este algoritmo va a calcular la puntuación en función de la repercusión de las acciones. Ya que algunas acciones presentan el mismo impacto en los signos vitales del paciente y por tanto, se pueden intercambiar,
                          algunas otras son completamente opuestas. También encontramos el caso de acciones que se realizan en el momento adecuado y el caso de las acciones que no se realizan nunca.
                          Hay que tener en cuenta que, para el manejo del trauma, es peor hacer algo que no se debe hacer que no hacer nada.
                          </p>
                          <p style={{color: 'black', textAlign:'center',marginLeft:'1em', marginRight:'1em'}}>

                             La puntuación se obtiene siguiendo el orden de:</p>
                             <p style={{color: 'black',fontStyle:'utalic', textAlign:'center',marginLeft:'1em', marginRight:'1em'}}>
                             <strong>Acciones correctas{'>'} Acciones intercambiadas{'>'} Acciones no realizas{'>'} Acciones errónea{'>'} Acciones contrarias</strong> 
                              </p>
                             
                          
                          <p style={{color: 'black', textAlign:'center',marginLeft:'1em', marginRight:'1em'}}>
                          En función del número de acciones que el alumno ha realizado de cada tipo obtenemos una puntuación Global Alligment cuyos valores oscilan del -1 al 1. 
                          Los valores negativos muestran que la secuencia del alumno y la ideal son muy distintas. Por el contrario, los valores positivos muestran el nivel de semejanza existente entre ambas secuencias.


                        </p>
                        <Button style={{backgroundColor: 'var(--custom-blue)',fontSize: '20px', display: 'flex', justifyContent:'flex-start', alignContent:'flex-end'}} onClick={() => this.closeModals()}>Cerrar</Button>
                    </div>
                </Modal>
              </div>
      
              <div className="containerValuesSecOne">   
                <div className="containerValuesSecOneLeft">
                  <p style={{fontSize: '1.5rem'}}><strong>Acciones correctas: </strong>{this.state.matches}</p>
                  <p style={{fontSize: '1.5rem'}}><strong>Acciones intercambiadas: </strong>{this.state.swap}</p>
                  <p style={{fontSize: '1.5rem'}}><strong>Acciones contrarias: </strong>{this.state.contr}</p>
                </div>
                <div className="containerValuesSecOneRight">
                  <p style={{fontSize: '1.5rem'}}><strong>Acciones no realizadas: </strong>{this.state.gasp}</p>
                  <p style={{fontSize: '1.5rem'}}><strong>Acciones erróneas: </strong>{this.state.mismatches}</p>
                  <p style={{fontSize: '1.5rem'}}><strong>Alinamiento Global: </strong>{this.state.GA}</p>
                </div>
              </div>
      
              <div className="titleSec">
                <h1> Sección 2 </h1>
             
              <button class="infoButton"  position="right center" onClick={() => this.openModal()} ><div class="infoButton-btn"><span class="infoButton-btn-text">i</span></div></button>
                 
                  <Modal visible={this.state.visible} width="680" height="392" effect="fadeInUp" onClickAway={() => this.closeModal()}>
                    <div>
                        

                        <h1 style={{color: 'black', display: 'flex', justifyContent:'center',marginTop:'1em'}}>
                          Acciones realizadas en el momento oportuno:
                          </h1>
                          <p style={{color: 'black', textAlign:'center',marginLeft:'1em', marginRight:'1em'}}>
                          Esta puntuación se ha construido con el fin de proporcionar información sobre las 
                          acciones correctas. Este algoritmo da una mayor putuación aquellas acciones correctas que se han realizado en el momento exacto. El valor máximo es 100% y se da cuando las dos secuencias la del alumno y la ideal son idénticas.
                          </p>
                          <h1 style={{color: 'black', display: 'flex', justifyContent:'center'}}>
                        Acciones realizadas de forma secuencial:
                       </h1>
                        <p style={{color: 'black', textAlign:'center',marginLeft:'1em', marginRight:'1em'}}>
                        Esta puntuación tiene el objetivo de identificar las subsecuencias correctas realizadas por el alumno así como la longitud de la subsecuencia. Esta puntuación de subsecuencia
                        identificar el número de acciones que se realizan en orden y las va uniendo hasta que encuentra una acción que se ha realizado en el momento equivocado.
                         </p>
                        <Button style={{backgroundColor: 'var(--custom-blue)',fontSize: '20px', display: 'flex', justifyContent:'flex-start', alignContent:'flex-end'}} onClick={() => this.closeModal()}>Cerrar</Button>
                    </div>
                </Modal>
                </div>
              <div className="containerValuesSecTwo">
                <p style={{fontSize: '1.5rem'}}><strong> Acciones realizadas en el momento oportuno: </strong>{this.state.Diag}%</p>
                <ProgressBar 
                  variant={this.state.Diag < 50 ? 'danger' : (this.state.Diag < 80 ? 'warning' : 'success')} 
                  now={this.state.Diag}
                  label={`${this.state.Diag}%`}
                />
                <p style={{fontSize: '1.5rem'}}><strong>Acciones realizadas de forma secuencial: </strong>{this.state.Subseq}%</p>
                <ProgressBar 
                  variant={this.state.Subseq < 50 ? 'danger' : (this.state.Subseq < 80 ? 'warning' : 'success')} 
                  now={this.state.Subseq}
                  label={`${this.state.Subseq}%`}
                />
              </div>
      
              <div className="titleSec">
                <h1> Sección 3 </h1>
              </div>
      
              <div className="containerValuesSecThree">
                <div style={{display: 'flex', flexDirection: 'row', alignContent: 'center'}}>
                  <p style={{fontSize: '1.5rem', margin: 0}}><strong>Acciones que debían realizarse y se realizaron: </strong>{this.state.Recall}%</p>
                  <Popup trigger={ <button class="infoButton"><div class="infoButton-btn"><span class="infoButton-btn-text">i</span></div></button>} 
                    position="right center">
                    <div>Cuyos valores van del 0 al 100%</div>
                  </Popup>
                </div>
                <ProgressBar 
                  variant={this.state.Recall < 50 ? 'danger' : (this.state.Recall < 80 ? 'warning' : 'success')} 
                  now={this.state.Recall}
                  label={`${this.state.Recall}%`}
                />
                <div style={{display: 'flex', flexDirection: 'row', alignContent: 'center'}}>
                  <p style={{fontSize: '1.5rem', margin: 0}}><strong>Porcentaje de predicciones positivas correctas: </strong>{this.state.Accuracy}%</p>
                  <Popup trigger={ <button class="infoButton"><div class="infoButton-btn"><span class="infoButton-btn-text">i</span></div></button>} 
                    position="right center">
                    <div>Cuyos valores van del 0 al 100%</div>
                  </Popup>
                </div>

                <ProgressBar 
                  variant={this.state.Accuracy < 50 ? 'danger' : (this.state.Accuracy < 80 ? 'warning' : 'success')} 
                  now={this.state.Accuracy}
                  label={`${this.state.Accuracy}%`}
                />

                <div style={{display: 'flex', flexDirection: 'row', alignContent: 'center'}}>
                  <p style={{fontSize: '1.5rem', margin: 0}}><strong>F1: </strong>{this.state.F1}%</p>
                  <Popup trigger={ <button class="infoButton"><div class="infoButton-btn"><span class="infoButton-btn-text">i</span></div></button>} 
                    position="right center">
                    <div>Este porcentaje muestra la media armónica entre las acciones que debían realizarse y se realizaron y el porcentaje de casos positivos detectados</div>
                  </Popup>
                </div>
      

                <ProgressBar 
                  variant={this.state.F1 < 50 ? 'danger' : (this.state.F1 < 80 ? 'warning' : 'success')} 
                  now={this.state.F1}
                  label={`${this.state.F1}%`}
                />

                
                <div style={{display: 'flex', flexDirection: 'row', alignContent: 'center'}}>
                  <p style={{fontSize: '1.5rem', margin: 0}}><strong>Porcentaje de casos positivos detectados: </strong>{this.state.Precision}%</p>
                  <Popup trigger={ <button class="infoButton"><div class="infoButton-btn"><span class="infoButton-btn-text">i</span></div></button>} 
                    position="right center">
                    <div>Este porcentaje oscila entre 0 y 100%</div>
                  </Popup>
                </div>
      
                
                <ProgressBar 
                  variant={this.state.Precision < 50 ? 'danger' : (this.state.Precision < 80 ? 'warning' : 'success')} 
                  now={this.state.Precision}
                  label={`${this.state.Precision}%`}
                />

                <div style={{display: 'flex', flexDirection: 'row', alignContent: 'center'}}>
                  <p style={{fontSize: '1.5rem', margin: 0}}><strong>Acciones que no deberían realizarse y no se realizaron: </strong>{this.state.Specificity}%</p>
                  <Popup trigger={ <button class="infoButton"><div class="infoButton-btn"><span class="infoButton-btn-text">i</span></div></button>} 
                    position="right center">
                    <div>Porcentaje de casos positivos detectados</div>
                  </Popup>
                </div>
      
                
                <ProgressBar 
                  variant={this.state.Specificity < 50 ? 'danger' : (this.state.Specificity < 80 ? 'warning' : 'success')} 
                  now={this.state.Specificity}
                  label={`${this.state.Specificity}%`}
                />
              </div> 
  
            </div>
          

        )

      }
    }


export default Evaluation;



