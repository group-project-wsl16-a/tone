import React, { Component } from 'react';
import './Menu.css';
import { withRouter } from 'react-router';
import Soundboard from '../Soundboard/Soundboard'

export class HiddenMenu extends Component {
    constructor (props) {
        super(props)

        this.menuHandle = React.createRef();
        this.hiddenMenu = React.createRef();
        this.menuGrabber = React.createRef();

        this.state = {
            menu: false,
        }
    }

    handleClick = (type) => {
        if (type === 'MountainRange') {
            this.props.history.push('/')
        } else {}
    }

    handleMouseEnter = () => {
        this.menuHandle.current.style.border = 'white 2px solid' 
    }

    handleMouseLeave = () => {
        this.menuHandle.current.style.border = 'none' 
    }

    openMenu = (val) => {
        if (val === true) {
            this.hiddenMenu.current.style.top = '0' 
            this.menuHandle.current.style.top = '110px' 
            this.menuGrabber.current.style.top = '100px'
            this.setState({ menu : true})
        } else {
            this.hiddenMenu.current.style.top = '-100px' 
            this.menuHandle.current.style.top = '10px' 
            this.menuGrabber.current.style.top = '0px'
            this.setState({ menu : false})
        }
    }

    render (props) {
        return (
            <div>
                <div ref={this.menuGrabber} className="MenuGrabber" onMouseEnter={() => this.handleMouseEnter('menu')} onMouseLeave={() => this.handleMouseLeave('menu')} ></div>
                <div ref={this.menuHandle} className="MenuHandle" onMouseEnter={() => this.handleMouseEnter('menu')} onClick={() => this.openMenu(!this.state.menu)} ></div>
                <div ref={this.hiddenMenu} className="HiddenMenu" >
                    <div className="MenuItem" onClick={() => this.handleClick('MountainRange')} >
                        <img className="EnvironmentImage" src={require('./Mountain Range.png')} alt="Mountain Range" ></img>
                        <p className="EnvironmentText" >Mountain Range</p>
                    </div>
                </div>
            </div>
        )
    }
}

export default withRouter(HiddenMenu);