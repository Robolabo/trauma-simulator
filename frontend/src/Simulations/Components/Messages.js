import React, { Component } from 'react'
import '../simulation.css'

export default class Messages extends Component {

    componentDidUpdate(){
       if(this.props.alert !== null) {
           this.props.toogle() 
        }
    }   

    render() {
        return (
            <div>
                {this.props.alert}
            </div>
        )
    }
}
