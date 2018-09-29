import React, { Component } from 'react';
import './Menu.css';
import { withRouter } from 'react-router';

export class HiddenMenu extends Component {
    constructor (props) {
        super(props)

        this.menuHandle = React.createRef();
        this.hiddenMenu = React.createRef();
        this.menuGrabber = React.createRef();
        
        this.state = {
            menu: true,
        }
    }

    handleClick = () => {
        this.openMenu(!this.state.menu)
        this.setState({ menu : !this.state.menu})
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
        } else {
            this.hiddenMenu.current.style.top = '-100px' 
            this.menuHandle.current.style.top = '10px' 
            this.menuGrabber.current.style.top = '0px'
        }
    }

    render (props) {
        return (
            <div>
                <div ref={this.menuGrabber} className="MenuGrabber" onMouseEnter={() => this.handleMouseEnter('menu')} onMouseLeave={() => this.handleMouseLeave('menu')} ></div>
                <div ref={this.menuHandle} className="MenuHandle" onMouseEnter={() => this.handleMouseEnter('menu')} onClick={() => this.handleClick()} ></div>
                <div ref={this.hiddenMenu} className="HiddenMenu" >
                    this
                    <p>is a</p>
                    <h1>test</h1>
                </div>
            </div>
        )
    }
}

export default withRouter(HiddenMenu);