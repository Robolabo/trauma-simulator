  import React from 'react';
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
        axios.get("http://localhost:8080/trainee/results/"+this.state.simulationId+"/"+this.state.traineeId)
        .then(res =>{
          this.setState({matches: res.data.data[0].matches, swap: res.data.data[0].swap, contr: res.data.data[0].contr,
             gasp: res.data.data[0].gasp, mismatches: res.data.data[0].mismatches,GA:((parseFloat(res.data.data[0].GA, 10).toPrecision(2))), 
             Diag: ((parseFloat(res.data.data[0].Diag, 10)).toPrecision(1))*100, Subseq: ((parseFloat(res.data.data[0].Subseq, 10)))*100,
             Precision:((parseFloat(res.data.data[0].Preci, 10)))*100,Recall: ((parseFloat(res.data.data[0].Recall, 10)))*100,
             Specificity:((parseFloat(res.data.data[0].Specificity, 10)))*100,
             Accuracy:((parseFloat(res.data.data[0].Accuracy, 10)))*100,
             F1:((parseFloat(res.data.data[0].F1, 10)))*100,Nota: ((parseFloat(res.data.data[0].Nota, 10)))*10
          });      
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
 
      render() {

        return(     
          
          
          <div>
          <div className="container">

            <div className="Prueba">
              <div className='porcentaje'>
                     <ChangingProgressProvider values={[this.state.Nota]}>
                        {percentage => (
                        <CircularProgressbar value={this.state.Nota} text={`${percentage}%`} />
                        )}
                      </ChangingProgressProvider>
               </div>
               </div>

             </div>

             
             <div className="Valores0">
             <h1 >Global Alligment</h1>  
               <div className="Valores1"> 
                      
                <p> <strong>Acciones correctas:</strong>{this.state.matches}</p>
                <p><strong>Acciones intercambiadas:</strong>{this.state.swap}</p>
                <p><strong>Acciones contrarias:</strong>{this.state.contr} </p>
                </div>
                <div className="Valores2">  
                         
                <p><strong>Acciones no realizadas:</strong> {this.state.gasp}</p>
                <p><strong>Acciones erróneas:</strong>{this.state.mismatches}</p>
                <p><strong>Global Alligment:</strong>{this.state.GA}</p>
              </div>            <div className='Diagonal'>
            <h1 id='h'>Diagonal Score</h1>
            <h2>Diagonal Score: {this.state.Diag}%</h2>
            <ProgressBar variant="info" now={this.state.Diag}/>
            
            <h2>Subsecuence Score: {this.state.Subseq}%</h2>
            <ProgressBar variant="info" now={this.state.Subseq}/>
            </div> 
            
            
            

            

            <div className="progres">

            <h1>Métricas Obtenidas por la matriz de confusión</h1>


            <h2>Recall: {this.state.Recall}%</h2>
            <ProgressBar variant="info" now={this.state.Recall}/>
            <h2>Accuracy: {this.state.Accuracy}%</h2>
            <ProgressBar variant="info" now={this.state.Accuracy}/>
            <h2>F1: {this.state.F1}%</h2>
            <ProgressBar variant="info" now={this.state.F1}/>
            <h2>Precision:{this.state.Precision}%</h2>
            <ProgressBar variant="info" now={this.state.Precision}/>
            <h2>Specificity:{this.state.Specificity}%</h2>
            <ProgressBar variant="info" now={this.state.Specificity}/>


            </div>
            </div>
            
           




          </div>

        )

      }
    }

    
            
        
      



export default Evaluation;



