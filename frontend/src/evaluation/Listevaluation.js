import React, { Component } from 'react';
import { Redirect } from "react-router-dom"
import { Button  } from 'react-bootstrap';
import axios from 'axios';
import './Evaluation.css';;



// Animation


export default class Listevaluation extends Component  {
  constructor(props){
    super(props);
    this.state = {
      simulationId: this.props.simulationId,
      traineeId:this.props.traineeId,
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
      redirect:false
      

      }
    }

    cargadeDatos(){
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
        if(this.state.matches!==""){
          this.setRedirect()
        }



    }
  

  setRedirect = () => {
    this.setState({
      redirect: true
    })
  }

  renderRedirect = () => {
    if (this.state.redirect) {
      return <Redirect to={{
                            pathname:"/evaluar/"+this.props.simulationId,
                            state: {
                              simulationId:this.state.simulationId,
                              matches: this.state.matches,
                              swap:this.state.swap,
                              contr: this.state.contr,
                              gasp: this.state.gasp,
                              mismatches: this.state.mismatches,
                              GA:this.state.GA,
                              Diag:this.state.Diag,
                              Subseq:this.state.Subseq,
                              Precision:this.state.Precision,
                              Recall:this.state.Recall,
                              Specificity:this.state.Specificity,
                              Accuracy:this.state.Accuracy,
                              F1:this.state.F1,
                              Nota:this.state.Nota,
                              surname:this.props.surname
                           }
                        }} />

  }
}


      render() {

        return(

          <div className="wrapper fadeInDown">
           

         
            <Button className='returnButton' onClick= {() => this.cargadeDatos()
                 }> Evaluar </Button> 
               

            {this.renderRedirect()}
            
          </div>
        )

    }
}

  
          
      
    



