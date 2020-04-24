
import React, { Component } from 'react'
import { withTranslation } from 'react-i18next';

class Timer extends Component {
    constructor(props){
        super(props);
        this.state = {
          minutes: 0,
          seconds: 0,
          start: false,
          confirm: true
        }
    }

    componentWillReceiveProps() {
        this.setState(() => ({
            start: this.props.start
        }))
        if (this.state.start && this.state.confirm) {
            this.setState({
                minutes: this.props.time,
                confirm: false
            })
            this.myTimer = setInterval(() => {
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
        const { t } = this.props
        return (
            <div>
                { minutes === 0 && seconds === 0
                    ? <h1>{t('simulation.initial-text')}</h1>
                    : <h1>{t('simulation.time')} {minutes}:{seconds < 10 ? `0${seconds}` : seconds}</h1>
                }
            </div>
        )
    }
}

export default withTranslation()(Timer);
