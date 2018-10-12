import React, { Component } from "react";
import "./WorldView.css";
import axios from 'axios';
const basicImg = require('./basicImg.jpg')

export default class WorldView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            images: [{state: {drumVol: -10, beachVol: -10, icyVol: -10, voxVol: 0}, pic: basicImg }]
        }
      }

      componentDidMount = () => {
        axios.get(`http://localhost:3030/api/examples`)
            .then(result => this.setState({ images : result.data}))
      }

      handleMouseEnter = (i) => {
        document.getElementById(i).classList.add('imghovered')
      }

      handleMouseLeave = (i) => {
        document.getElementById(i).classList.remove('imghovered')
      }

    render () {
        return (
            <div>
                Hello World!
                {this.state.images.map((obj, i) => 
                    <div key={i} id={i+1} className="scrollingImage" onMouseEnter={() => this.handleMouseEnter(i+1)} onMouseLeave={() => this.handleMouseLeave(i+1)} >
                        <img src={obj.pic} alt="" ></img>
                        {console.log(this.state)}
                    </div>
                )}
            </div>
        )
    }
}