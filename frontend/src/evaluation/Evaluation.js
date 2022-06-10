  import React from 'react';
  import axios from 'axios';

  import Progressbar from 'react-js-progressbar';
  import { Link, Redirect } from "react-router-dom"


  class Evaluation extends React.Component {
    constructor(props){
      super(props);
      this.state = {
        simulationId: this.props.location.state.simulationId,
        traineeId:this.props.location.state.traineeId,
        matches: "hola",
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
        Loading:false

        }
      }

      componentDidMount(){
        axios.get("http://localhost:8080/trainee/results/"+this.state.simulationId+"/"+this.state.traineeId)
        .then(res =>{
          this.setState({matches: res.data.data[0].matches, swap: res.data.data[0].swap, contr: res.data.data[0].contr, gasp: res.data.data[0].gasp, mismatches: res.data.data[0].mismatches,GA:res.data.data[0].GA, Diag: res.data.data[0].Diag, Subseq: res.data.data[0].Subseq, Precision:res.data.data[0].Preci,Recall: res.data.data[0].Recall,Specificity:res.data.data[0].Specificity,Accuracy:res.data.data[0].Accuracy,F1:res.data.data[0].F1,Nota:res.data.data[0].Nota,Loading:true
          });      
        })
          .catch(error=>{
            alert("Error server "+error)
          })
      }



      
      
      
      
      render() {
        
        
       
     if(this.state.Loading)
     {
        return(
    
          <div className="wrapper fadeInDown">
          

            <div id="formContent">
      

      

               
              <div id="formFooter">
                <Link className="underlineHover1" to="#">{this.state.Nota}</Link>
                <Link className="underlineHover2" to="/register/"></Link>
              </div>
            </div>
            
            
            
             
            <div className='LoginForm'>
            
            </div>
          </div>
          
        )
     }else{
       return(
       <div>   
       <Link className="underlineHover1" to="#">Loading...</Link>
       <Link className="underlineHover2" to="/register/"></Link>
     </div>)
     }
      }
    }

    
            
        
      



export default Evaluation;



