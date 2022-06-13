  import React, { createContext } from 'react';
  import axios from 'axios';
  import './Evaluation.css';
  import Inform from '../Information/Document'
  import ProgressBar from 'react-bootstrap/ProgressBar'
  import Popup from 'reactjs-popup';
  import { Redirect } from "react-router-dom"

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
        visible : false
        

        }
      }

      componentDidMount(){
        var intermedia=true;
        window.onpopstate = () =>{
         intermedia=false
          
        }
        if(intermedia)  {
        axios.get("http://localhost:8080/trainee/results/"+this.state.simulationId+"/"+this.state.traineeId)
        
        .then(res =>{
          this.setState({matches: res.data.data[0].matches, swap: res.data.data[0].swap, contr: res.data.data[0].contr,
             gasp: res.data.data[0].gasp, mismatches: res.data.data[0].mismatches,GA:((parseFloat(res.data.data[0].GA, 10).toPrecision(2))), 
             Diag: ((parseFloat(res.data.data[0].Diag, 10)).toPrecision(1)), Subseq: ((parseFloat(res.data.data[0].Subseq, 10))),
             Precision:((parseFloat(res.data.data[0].Preci, 10))),Recall: ((parseFloat(res.data.data[0].Recall, 10))),
             Specificity:((parseFloat(res.data.data[0].Specificity, 10))),
             Accuracy:((parseFloat(res.data.data[0].Accuracy, 10))),
             F1:((parseFloat(res.data.data[0].F1, 10))),Nota: ((parseFloat(res.data.data[0].Nota, 10)))
          }); 
             
        })
          .catch(error=>{
            alert("Error server "+error)
          })

          
      }else{
        return <Redirect to={{
          pathname: '/listSimulation',
          state: { id: this.props.id,
                  isTrainer: false,
                  trainerList:this.props.trainerList,
                  data: this.props.data,
                  refresh: "refresh",
                  finish:this.props.finish
              }
      }} />


      }
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

      
              <div className="containerGradeEvaluation">
                <ChangingProgressProvider values={[this.state.Nota]}>
                  {percentage => (
                  <CircularProgressbar value={this.state.Nota} text={`${percentage}%`} />
                  )}
                </ChangingProgressProvider>
              </div>
      
              <div className="titleSec">
                <h1> Sección 1 </h1> 
                <Popup trigger={ <button class="infoButton"><div class="infoButton-btn"><span class="infoButton-btn-text">i</span></div></button>} 
                  position="right center">
                  <div>Información sobre la sección 1</div>
                </Popup>
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
                  <p style={{fontSize: '1.5rem'}}><strong>Global Alligment: </strong>{this.state.GA}</p>
                </div>
              </div>
      
              <div className="titleSec">
                <h1> Sección 2 </h1>
                <Popup trigger={ <button class="infoButton"><div class="infoButton-btn"><span class="infoButton-btn-text">i</span></div></button>} 
                  position="right center">
                  <div>Información sobre la sección 2</div>
                </Popup>
              </div>
      
              <div className="containerValuesSecTwo">
                <p style={{fontSize: '1.5rem'}}><strong>Diagonal Score: </strong>{this.state.Diag}%</p>
                <ProgressBar 
                  variant={this.state.Diag < 50 ? 'danger' : (this.state.Diag < 80 ? 'warning' : 'success')} 
                  now={this.state.Diag}
                  label={`${this.state.Diag}%`}
                />
                <p style={{fontSize: '1.5rem'}}><strong>Subsecuence Score: </strong>{this.state.Subseq}%</p>
                <ProgressBar 
                  variant={this.state.Subseq < 50 ? 'danger' : (this.state.Subseq < 80 ? 'warning' : 'success')} 
                  now={this.state.Subseq}
                  label={`${this.state.Subseq}%`}
                />
              </div>
      
              <div className="titleSec">
                <h1> Sección 3 </h1>
                <Popup trigger={ <button class="infoButton"><div class="infoButton-btn"><span class="infoButton-btn-text">i</span></div></button>} 
                  position="right center">
                  <div>Información sobre la sección 3 hola qu etal estas dofhdflodfhodsfs dhfalncalkadshfpdfh doflwedfhipwefhiewofhei qwiohdqwdihfhoiedfh oahcf ofhoweihefwo</div>
                </Popup>
              </div>
      
              <div className="containerValuesSecThree">
                <div style={{display: 'flex', flexDirection: 'row', alignContent: 'center'}}>
                  <p style={{fontSize: '1.5rem', margin: 0}}><strong>Recall: </strong>{this.state.Recall}%</p>
                  <Popup trigger={ <button class="infoButton"><div class="infoButton-btn"><span class="infoButton-btn-text">i</span></div></button>} 
                    position="right center">
                    <div>Información sobre la sección 3 hola qu etal estas dofhdflodfhodsfs dhfalncalkadshfpdfh doflwedfhipwefhiewofhei qwiohdqwdihfhoiedfh oahcf ofhoweihefwo</div>
                  </Popup>
                </div>
                <ProgressBar 
                  variant={this.state.Recall < 50 ? 'danger' : (this.state.Recall < 80 ? 'warning' : 'success')} 
                  now={this.state.Recall}
                  label={`${this.state.Recall}%`}
                />
      
                <p style={{fontSize: '1.5rem'}}><strong>Accuracy: </strong>{this.state.Accuracy}%</p>
                <ProgressBar 
                  variant={this.state.Accuracy < 50 ? 'danger' : (this.state.Accuracy < 80 ? 'warning' : 'success')} 
                  now={this.state.Accuracy}
                  label={`${this.state.Accuracy}%`}
                />
      
                <p style={{fontSize: '1.5rem'}}><strong>F1: </strong>{this.state.F1}%</p>
                <ProgressBar 
                  variant={this.state.F1 < 50 ? 'danger' : (this.state.F1 < 80 ? 'warning' : 'success')} 
                  now={this.state.F1}
                  label={`${this.state.F1}%`}
                />
      
                <p style={{fontSize: '1.5rem'}}><strong>Precision: </strong>{this.state.Precision}%</p>
                <ProgressBar 
                  variant={this.state.Precision < 50 ? 'danger' : (this.state.Precision < 80 ? 'warning' : 'success')} 
                  now={this.state.Precision}
                  label={`${this.state.Precision}%`}
                />
      
                <p style={{fontSize: '1.5rem'}}><strong>Specificity: </strong>{this.state.Specificity}%</p>
                <ProgressBar 
                  variant={this.state.Specificity < 50 ? 'danger' : (this.state.Specificity < 80 ? 'warning' : 'success')} 
                  now={this.state.Specificity}
                  label={`${this.state.Specificity}%`}
                />
              </div> 
              <Inform simulationId = {this.props.location.state.simulationId}
                      surname = {this.state.surname}
                      />    
            </div>
          

        )

      }
    }


export default Evaluation;



