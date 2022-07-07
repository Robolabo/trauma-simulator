  import React, { createContext } from 'react';
  import axios from 'axios';
  import './Evaluation.css';
  import Inform from '../Information/Document'
  import ProgressBar from 'react-bootstrap/ProgressBar'
  import Popup from 'reactjs-popup';
  import { Redirect } from "react-router-dom"
  import Modal from 'react-awesome-modal';
  import 'bootstrap/dist/css/bootstrap.min.css';
  import {
    CircularProgressbar,
  } from "react-circular-progressbar";
  import "react-circular-progressbar/dist/styles.css";
  import 'reactjs-popup/dist/index.css';
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
                 
                  <Modal visible={this.state.visibles} width="640" height="508" effect="fadeInUp" onClickAway={() => this.closeModals()}>
                    <div>
                        <h1 style={{color: 'black', display: 'flex', textAlign:'center',marginTop:'1em', marginLeft:'1em'}}>Balance de acciones con el impacto esperado en constantes vitales y acciones que tienen otro impacto diferente</h1>

                        <p style={{color: 'black', textAlign:'center',marginLeft:'1em', marginRight:'1em',marginTop:'1em'}}>
                          
                            Este balance proporciona información acerca del balance de acciones que se hacen y que tienen un impacto en las constantes vitales positivo y las que se hacen, que no tienen ese impacto positivo.
                            Para ello, se tiene en cuenta las acciones que se realizan, cuándo y en qué orden para ver si el impacto es el esperado para estabilizar al paciente.
                          </p>
                      

                          <p style={{color: 'black', textAlign:'center',marginLeft:'1em', marginRight:'1em'}}>
                          
                          Esta puntuación varía entre 0 y 100% . Los valores cercanos a 0 muestran que la secuencia del alumno y la ideal son muy distintas, por lo que se hacen más acciones que tienen un impacto diferente al esperado en las constantes vitales. Por el contrario, los valores positivos muestran el nivel de semejanza existente entre ambas secuencias, 
                          por lo tanto, se hacen más acciones que tienen el impacto esperado para la estabilización del paciente.

                        </p>
                        <Button style={{backgroundColor: 'var(--custom-blue)',fontSize: '20px', display: 'flex', justifyContent:'flex-start', alignContent:'flex-end'}} onClick={() => this.closeModals()}>Cerrar</Button>
                    </div>
                </Modal>
              </div>
      
              <div className="containerValuesSecOne">   
                <div className="containerValuesSecOneLeft">
                <div style={{display: 'flex', flexDirection: 'row', alignContent: 'center'}}>
                  <p style={{fontSize: '1.5rem', margin: 0}}><strong>Número de acciones correctas realizadas: </strong>{this.state.matches}</p>
                  <Popup trigger={ <button class="infoButton"><div class="infoButton-btn"><span class="infoButton-btn-text">i</span></div></button>} 
                    position="right center">
                    <div style={{background:"white"}}>Número de acciones iguales a la secuencia ideal</div>
                  </Popup>
                </div>

                 
                
                <div style={{display: 'flex', flexDirection: 'row', alignContent: 'center'}}>
                  <p style={{fontSize: '1.5rem', margin: 0}}><strong>Número de acciones intercambiadas realizadas: </strong>{this.state.swap}</p>
                  <Popup trigger={ <button class="infoButton"><div class="infoButton-btn"><span class="infoButton-btn-text">i</span></div></button>} 
                    position="right center">
                    <div>Número de acciones diferentes pero con impacto en las constantes vitales similar</div>
                  </Popup>
                </div>

                
                 
                
                <div style={{display: 'flex', flexDirection: 'row', alignContent: 'center'}}>
                  <p style={{fontSize: '1.5rem', margin: 0}}><strong>Número de acciones contrarias realizadas: </strong>{this.state.contr}</p>
                  <Popup trigger={ <button class="infoButton"><div class="infoButton-btn"><span class="infoButton-btn-text">i</span></div></button>} 
                    position="right center">
                    <div>Número de acciones diferentes con impacto en las constantes vitales contrario al esperado</div>
                  </Popup>
                </div>

                </div>
                <div className="containerValuesSecOneRight">
                <div style={{display: 'flex', flexDirection: 'row', alignContent: 'center'}}>
                  <p style={{fontSize: '1.5rem', margin: 0}}><strong>Número de veces que no has actuado: </strong>{this.state.gasp}</p>
                  <Popup trigger={ <button class="infoButton"><div class="infoButton-btn"><span class="infoButton-btn-text">i</span></div></button>} 
                    position="right center">
                    <div>Deberías haber acometido una acción y, en su lugar, no has acometido ninguna</div>
                  </Popup>
                </div>

                <div style={{display: 'flex', flexDirection: 'row', alignContent: 'center'}}>
                  <p style={{fontSize: '1.5rem', margin: 0}}><strong>Número de acciones incorrectas realizadas: </strong>{this.state.mismatches}</p>
                  <Popup trigger={ <button class="infoButton"><div class="infoButton-btn"><span class="infoButton-btn-text">i</span></div></button>} 
                    position="right center">
                    <div>Número de acciones diferentes a la secuencia ideal</div>
                  </Popup>
                </div>
                  
                <div style={{display: 'flex', flexDirection: 'row', alignContent: 'center'}}>
                  <p style={{fontSize: '1.5rem', margin: 0}}><strong>Balance entre acciones correctas e incorrectas: </strong>{this.state.GA}%</p>
               
                  <Popup trigger={ <button class="infoButton"><div class="infoButton-btn"><span class="infoButton-btn-text">i</span></div></button>} 
                    position="right center">
                    <div>Este porcentaje oscila entre 0 y 100%</div>
                  </Popup>
                </div>
                  
              
               </div>  
              </div>
      
              <div className="titleSec">
                <h1> Sección 2 </h1>
             
              <button class="infoButton"  position="right center" onClick={() => this.openModal()} ><div class="infoButton-btn"><span class="infoButton-btn-text">i</span></div></button>
                 
                  <Modal visible={this.state.visible} width="850" height="392" effect="fadeInUp" onClickAway={() => this.closeModal()}>
                    <div>
                        

                        <h1 style={{color: 'black', display: 'flex', justifyContent:'center',marginTop:'1em'}}>
                         Acciones realizadas en el momento oportuno:
                          </h1>
                          <p style={{color: 'black', textAlign:'center',marginLeft:'1em', marginRight:'1em'}}>
                          Esta puntuación se ha construido con el fin de proporcionar información sobre las acciones que se realizan justo en el momento en que tienen que realizarse.
                          El valor máximo es 100% y se da cuando las acciones se han hecho en el momento exacto en el que tocaba hacerlas. 
                          El valor mínimo de 0% se da cuando ninguna de las acciones se ha hecho cuando tocaba.
                    
                          </p>
                          <h1 style={{color: 'black', display: 'flex', justifyContent:'center'}}>
                        Acciones realizadas de forma secuencial:
                       </h1>
                        <p style={{color: 'black', textAlign:'center',marginLeft:'1em', marginRight:'1em'}}>
                        Esta puntuación tiene el objetivo de identificar las subsecuencias correctas de acciones realizadas por el alumno. Esta puntuación identifica el número de acciones que se realizan en orden.
                        Identificando secuencias de acciones correctas, el valor máximo 100% se consigue cuando ambas secuencias son iguales la ideal y la realizada por el alumno. El valor mínimo es 0% y se 
                        obtiene cuando la secuencia del usuario es totalmente distinta a la ideal.
                        
                         </p>
                        <Button style={{backgroundColor: 'var(--custom-blue)',fontSize: '20px', display: 'flex', justifyContent:'flex-start', alignContent:'flex-end'}} onClick={() => this.closeModal()}>Cerrar</Button>
                    </div>
                </Modal>
                </div>
              <div className="containerValuesSecTwo">
                <p style={{fontSize: '1.5rem'}}><strong> Acciones realizadas en el momento oportuno: </strong>{Math.round(this.state.Diag,-1)}%</p>
                <ProgressBar 
                  variant={this.state.Diag < 55 ? 'secondary' : (this.state.Diag < 85 ? 'info' : 'primary')} 
                  now={this.state.Diag}
                  label={`${Math.round(this.state.Diag,-1)}%`}
                />
                <p style={{fontSize: '1.5rem'}}><strong>Acciones realizadas de forma secuencial: </strong>{Math.round(this.state.Subseq,-1)}%</p>
                <ProgressBar 
                  variant={this.state.Subseq < 55 ? 'secondary' : (this.state.Subseq < 85 ? 'info' : 'primary')} 
                  now={this.state.Subseq}
                  label={`${this.state.Subseq}%`}
                />
              </div>
      
              <div className="titleSec">
                <h1> Sección 3 </h1>
              </div>
      
              <div className="containerValuesSecThree">
                <div style={{display: 'flex', flexDirection: 'row', alignContent: 'center'}}>
                  <p style={{fontSize: '1.5rem', margin: 0}}><strong>Porcentaje de acciones que debían realizarse y se realizaron: </strong>{Math.round(this.state.Recall,-1)}%</p>
                  <Popup trigger={ <button class="infoButton"><div class="infoButton-btn"><span class="infoButton-btn-text">i</span></div></button>} 
                    position="right center">
                    <div>Este porcentaje oscila entre 0 y 100%</div>
                  </Popup>
                </div>
                <ProgressBar 
                  variant={this.state.Recall < 55 ? 'secondary' : (this.state.Recall < 85 ? 'info' : 'primary')} 
                  now={this.state.Recall}
                  label={`${Math.round(this.state.Recall,-1)}%`}
                />
                <div style={{display: 'flex', flexDirection: 'row', alignContent: 'center'}}>
                  <p style={{fontSize: '1.5rem', margin: 0}}><strong>Porcentaje de acciones que deberían realizarse y se realizaron y que no debían realizarse y no se realizaron: </strong>{Math.round(this.state.Accuracy,-1)}%</p>
                  <Popup trigger={ <button class="infoButton"><div class="infoButton-btn"><span class="infoButton-btn-text">i</span></div></button>} 
                    position="right center">
                    <div>Este porcentaje oscila entre 0 y 100%</div>
                  </Popup>
                </div>

                <ProgressBar 
                  variant={this.state.Accuracy < 55 ? 'secondary' : (this.state.Accuracy < 55 ? 'info' : 'primary')} 
                  now={this.state.Accuracy}
                  label={`${Math.round(this.state.Accuracy,-1)}%`}
                />
      

                
                <div style={{display: 'flex', flexDirection: 'row', alignContent: 'center'}}>
                  <p style={{fontSize: '1.5rem', margin: 0}}><strong>Porcentaje de acciones que deberían realizarse con respecto a todas las acciones que se han llevado a cabo: </strong>{Math.round(this.state.Precision,-1)}%</p>
                  <Popup trigger={ <button class="infoButton"><div class="infoButton-btn"><span class="infoButton-btn-text">i</span></div></button>} 
                    position="right center">
                    <div>Este porcentaje oscila entre 0 y 100%</div>
                  </Popup>
                </div>
      
                
                <ProgressBar 
                  variant={this.state.Precision < 55 ? 'secondary' : (this.state.Precision < 85 ? 'info' : 'next')} 
                  now={this.state.Precision}
                  label={`${Math.round(this.state.Precision,-1)}%`}
                />

                <div style={{display: 'flex', flexDirection: 'row', alignContent: 'center'}}>
                  <p style={{fontSize: '1.5rem', margin: 0}}><strong>Porcentaje de acciones que no deberían realizarse y no se realizaron: </strong>{Math.round(this.state.Specificity,-1)}%</p>
                  <Popup trigger={ <button class="infoButton"><div class="infoButton-btn"><span class="infoButton-btn-text">i</span></div></button>} 
                    position="right center">
                    <div>Este porcentaje oscila entre 0 y 100%</div>
                  </Popup>
                </div>
      
                
                <ProgressBar 
                  variant={this.state.Specificity < 55 ? 'secondary' : (this.state.Specificity < 85 ? 'info' : 'next')} 
                  now={this.state.Specificity}
                  label={`${Math.round(this.state.Specificity,-1)}%`}
                />
              </div> 
  
            </div>
          

        )

      }
    }


export default Evaluation;



