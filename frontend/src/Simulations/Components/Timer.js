
import React, { Component } from 'react'
import { Button } from 'reactstrap';

export default class Timer extends Component {
    constructor(props){
        super(props);
        this.state = {
          minutes: 0,
          seconds: 0
        }
      }

    start() {
        console.log("2")
        console.log(this.props)
        this.setState({
            minutes: this.props.time
        })
        this.myInterval = setInterval(() => {
            const { seconds, minutes } = this.state

            if (seconds > 0) {
                this.setState(({ seconds }) => ({
                    seconds: seconds - 1
                }))
            }
            if (seconds === 0) {
                if (minutes === 0) {
                    clearInterval(this.myInterval)
                } else {
                    this.setState(({ minutes }) => ({
                        minutes: minutes - 1,
                        seconds: 59
                    }))
                }
            } 
        }, 1000)
    }

    stop() {
        clearInterval(this.myInterval)
    }

    restart() {
        
        clearInterval(this.myInterval)
        this.setState({
            minutes: this.props.time,
            seconds: 0
        })
    }

    render() {
        const { minutes, seconds } = this.state
        return (
            <div>
                { minutes === 0 && seconds === 0
                    ? <h1>PRESS START!</h1>
                    : <h1>Time Remaining: {minutes}:{seconds < 10 ? `0${seconds}` : seconds}</h1>
                }
                <Button onClick={()=>this.start()}>Start</Button>
                <Button onClick={() => this.stop()}>Stop</Button>
                <Button onClick={() => this.restart()}>Restart</Button>
            </div>
        )
    }
}
