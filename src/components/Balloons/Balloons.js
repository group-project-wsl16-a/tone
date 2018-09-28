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
        } else {

        }
    }

    render () {
        return (
            <div className='BalloonsBody' >
                <img className="MenuBalloon" src={require('./Menu-Balloon.png')} onClick={() => this.handleClick('menu')} />
                <img className="RecordBalloon" src={require('./Record-Balloon.png')} onClick={() => this.handleClick('record')} />
            </div>
        )
    }
}

export default withRouter(Balloons);