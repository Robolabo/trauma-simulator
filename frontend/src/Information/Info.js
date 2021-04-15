import React from 'react';
import { Link } from "react-router-dom";
import axios from 'axios';
import { withTranslation } from 'react-i18next';

const baseUrl = "http://localhost:8080"

class Info extends React.Component {

    constructor(props){
        super(props);
        this.state = {
          inform: null
        }
    }
    
    
    componentDidMount() {
        let simulationId = this.props.simulationId
        const url = baseUrl+"/simulation/get/"+simulationId
        axios.get(url)
        .then(res=>{
            if (res.data.success) {
                const data = res.data.data[0]
                if(data.inform){
                    this.setState({
                        inform: data.inform
                    })
                }
                
                
            }
            else {
            alert("Error web service")
            }
        })
        .catch(error=>{
            alert("Error server "+error)
        })
        
    }
  
    render(){
        const { t } = this.props
      return(
          <div>
            {this.state.inform !== null ?
                this.props.trainerList ===true?
                    <Link className="btn btn-outline-info " 
                    to={{
                        pathname: "/simulation/"+this.props.simulationId,
                        state: { id: this.props.id,
                          trainerList:this.props.trainerList},
                        
                    }} >Volver a entrar
                    </Link> :
                    <p>Simulación Finalizada</p>
            
            :
            
          this.props.isTrainer 
            ? 
                <Link className="btn btn-outline-danger" to={"/listSimulation/"} onClick={()=>this.props.sendDelete(this.props.simulationId)}> {t('list-simulation.delete')} </Link>
            
            : <Link className="btn btn-outline-info " 
            to={{
                pathname: "/simulation/"+this.props.simulationId,
                state: { id: this.props.id,
                  trainerList:this.props.trainerList},
                
            }} >{t('list-simulation.enter')}
            </Link>}
          </div>
        )
     }
  
  
}
export default withTranslation()(Info);