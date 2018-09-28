import React, { Component } from 'react';
import './Balloons.css';

export default class Balloons extends Component {
    render () {
        return (
            <div className='BalloonsBody' >
                <img className="MenuBalloon" src={require('./Menu-Balloon.png')} />
                <img className="RecordBalloon" src={require('./Record-Balloon.png')} />
            </div>
        )
    }
}