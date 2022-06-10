import React from 'react';
import './LoginForm.css';
import icono from '../assets/icono4.png'
import icon_es from '../assets/icon-es.png'
import icon_en from '../assets/icon-en.png'
import { Link, Redirect } from "react-router-dom"
import axios from 'axios'
import sha256 from 'js-sha256'
import { withTranslation } from 'react-i18next';
import i18n from 'i18next';
import { setUserSession } from '../Utils/Common';
import Swal from 'sweetalert2'




var isTrainer = false

class LoginForm extends React.Component {
  constructor(props){
    super(props);
    this.state = {
        email: "",
        password:"",
        roleId: 0,
        redirect: false,
        id: 0,
        sesion:0
      }
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }





//  http://trauma-simulator.duckdns.org:8080
    
handleSubmit(event) {
  const urlTrainer = "http://localhost:8080/trainer/login/"+this.state.email    // parameter data post
  const urlTrainee = "http://localhost:8080/trainee/login/"+this.state.email
  const urlTrainerf = "http://localhost:8080/trainer/session/"+this.state.email
  const urlTraineef = "http://localhost:8080/trainee/session/"+this.state.email
  const urlTrainees = "http://localhost:8080/trainee/ses/"+this.state.email
  const urlTrainers = "http://localhost:8080/trainer/ses/"+this.state.email
  



  // network

/*if(this.state.session){*/
axios.get(urlTrainerf)
.then(res=> {
  if(res.data.success === true){
  axios.get(urlTrainer)
  .then(res=>{
    if (res.data.success && res.data.data.length > 0) {
      
        const password = res.data.data[0].password
        this.setState({
          id: res.data.data[0].trainerId})

        this.setState({
            roleId: res.data.data[0].roleId})

          isTrainer = true
        if(password === sha256(this.state.password)){
          setUserSession(res.data.data[0].token, res.data.data[0].email)
          this.setRedirect()
          axios.get(urlTrainers)
          .then(res => {
           if(!res.data.success){
           alert("algo fue mal")
          }
          })
          .catch(error=>{
            alert("Error server "+error)
          })
        }
        else{
          alert("Password is incorrect")
          this.setState({
            password: ''
          });
        }
      
    }
  })

}else if(res.data.success == false){
  //alert("Sesion Iniciada")
  Swal.fire({
    title: 'Sesion Iniciada',
    showClass: {
      popup: 'animate__animated animate__fadeInDown'
    },
    hideClass: {
      popup: 'animate__animated animate__fadeOutUp'
    }
  })
}else if(res.data.success=="2"){
  axios.get(urlTraineef)
     .then(res=>{
       if(res.data.success){
        axios.get(urlTrainee)
      .then(res=>{
        if (res.data.success && res.data.data.length > 0) {
            const password = res.data.data[0].password
            const roleID = res.data.data[0].roleId
            const id = res.data.data[0].traineeId
            this.setState({
              id: res.data.data[0].traineeId})

            this.setState ({roleId: roleID
            })
            console.log("RoleId"+ roleID)            
            isTrainer = false

            if(password === sha256(this.state.password)){
              console.log('antes del token')
              setUserSession(res.data.data[0].token, res.data.data[0].email)
              this.setRedirect()
              
              axios.get(urlTrainees)
              .then(res => {
               if(!res.data.success){
               alert("algo fue mal")
              }
              })
              .catch(error=>{
                alert("Error server "+error)
              })
              
              
            }
            else{
              alert("User or Password are incorrect")
              this.setState({
                password: ''
              });
            }
          }
          
      })




       }else{  Swal.fire({
        title: 'Sesion Iniciada',
        showClass: {
          popup: 'animate__animated animate__fadeInDown'
        },
        hideClass: {
          popup: 'animate__animated animate__fadeOutUp'
        }
      })}
     })
  

}
})
  .catch(error=>{
    alert("Error server "+error)
  })
  event.preventDefault();


}




setRedirect = () => {
  this.setState({
    redirect: true
  })
}


renderRedirect = () => {
  if (this.state.redirect && isTrainer) {
    this.setState({
      siniciada: true
    })
    return <Redirect to={{
                          pathname: '/dashboardTrainer',
                          state: { id: this.state.id,
                          email: this.state.email
                         }
                      }} />
  } else if (this.state.redirect && !isTrainer) {
    return <Redirect to={{
                          pathname: '/dashboardTrainee',
                          state: { id: this.state.id,
                          email: this.state.email,
                          sesion: this.state.sesion,
                          roleId: this.state.roleId}
                      }} />
  }
}
 



render() {
  
  
  const { t } = this.props;
  
  return(

    <div className="wrapper fadeInDown">
     
      <div className="languages">
        <img src={icon_es} alt="español" height="25px" width="25px" onClick={() => i18n.changeLanguage("es")}/>
        <img src={icon_en} alt="ingles" height="25px" width="45px" onClick={() => i18n.changeLanguage("en")}/>
      </div>
      <div id="formContent">

        <div className="fadeIn first">
          <img src={icono} id="icon" alt="User Icon" width="350px" height="250px" />
        </div>

        <form className ="fadeInText" onSubmit={this.handleSubmit}>
          <input type="email" className="fadeIn second" placeholder="Email" name="email" value={this.state.email} onChange={this.handleInputChange}/>
          <input type="password" className="fadeIn third" placeholder={t('register.password')} name="password" value={this.state.password} onChange={this.handleInputChange}/>
          <input type="submit" value={t('loginForm.sign-in')} className="fadeIn fourth" />
        </form>
         
        <div id="formFooter">
          <Link className="underlineHover1" to="#">{t('loginForm.forgot')}</Link>
          <Link className="underlineHover2" to="/register/">{t('loginForm.sign-up')}</Link>
        </div>
      </div>
      {this.renderRedirect()}
      
      
       
      <div className='LoginForm'>
      
      </div>
    </div>
  )
  
}

}

export default withTranslation()(LoginForm);

