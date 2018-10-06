import React, { Component } from 'react';
import './Balloons.css';
import { withRouter } from 'react-router';

export class Balloons extends Component {
    constructor (props) {
        super(props)
    }

    handleClick = (type) => {
        if (type === 'menu') {
            this.props.history.push('/worldview')
        } else if (type === 'record') {
        } else {
            window.location.reload()
        }
    }

    render (props) {
        console.log(this.props)
        return (
            <div className='BalloonsBody' >
                <img className="MenuBalloon" src={require('./Menu-Balloon.png')} onClick={() => this.handleClick('menu')} alt="World View Balloon" />
                <img className="RecordBalloon" src={require('./Record-Balloon.png')} onClick={() => this.handleClick('record')} alt="Record Song Balloon" />
                <img className="ResetBalloon" src={require('./Reset-Balloon.png')} onClick={() => this.handleClick('reset')} alt="Reset Balloon" />
            </div>
        )
    }
}

export default withRouter(Balloons);