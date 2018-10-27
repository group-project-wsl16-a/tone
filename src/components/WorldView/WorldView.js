import React, { Component } from "react";
import "./WorldView.css";
import axios from 'axios';
const basicImg = require('./basicImg.jpg')

export default class WorldView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            boxOne: [{state: {drumVol: -10, beachVol: -10, icyVol: -10, voxVol: 0}, thumbnail: basicImg, environment: 1, id: 0 }],
            boxTwo: [{state: {drumVol: -10, beachVol: -10, icyVol: -10, voxVol: 0}, thumbnail: basicImg, environment: 1, id: 0 }],
            boxThree: [{state: {drumVol: -10, beachVol: -10, icyVol: -10, voxVol: 0}, thumbnail: basicImg, environment: 1, id: 0 }],
            boxFour: [{state: {drumVol: -10, beachVol: -10, icyVol: -10, voxVol: 0}, thumbnail: basicImg, environment: 1, id: 0 }],
            boxFive: [{state: {drumVol: -10, beachVol: -10, icyVol: -10, voxVol: 0}, thumbnail: basicImg, environment: 1, id: 0 }],
            boxSix: [{state: {drumVol: -10, beachVol: -10, icyVol: -10, voxVol: 0}, thumbnail: basicImg, environment: 1, id: 0 }],
        }
    }

    componentDidMount = () => {
    axios.get(`/api/examples`)
        .then(result => {
            this.shuffleState(result.data)
        })
    }

    shuffleState = (arr) => {
        var currentIndex = arr.length, temporaryValue, randomIndex;
    
        // While there remain elements to shuffle...
        while (0 !== currentIndex) {
        
            // Pick a remaining element...
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex -= 1;
        
            // And swap it with the current element.
            temporaryValue = arr[currentIndex];
            arr[currentIndex] = arr[randomIndex];
            arr[randomIndex] = temporaryValue;
        }
    
        // this.setState({ images : arr })
        this.divideStateToDivs(arr)
    }

    divideStateToDivs = (arr) => {
        var count = 1
        var arr1 = []
        var arr2 = []
        var arr3 = []
        var arr4 = []
        var arr5 = []
        var arr6 = []

        for (var i=0; i<arr.length; i++) {
            if (count === 1) {
                arr1.push(arr[i])
                count ++
            } else if (count === 2) {
                arr2.push(arr[i])
                count ++
            } else if (count === 3) {
                arr3.push(arr[i])
                count ++
            } else if (count === 4) {
                arr4.push(arr[i])
                count ++
            } else if (count === 5) {
                arr5.push(arr[i])
                count ++
            } else {
                arr6.push(arr[i])
                count = 1
            }
        }
        this.setState({ boxOne : arr1, boxTwo : arr2, boxThree : arr3, boxFour : arr4, boxFive : arr5, boxSix : arr6})
    }

    handleMouseEnter = (i) => {
        document.getElementById(i).classList.add('imghovered')
    }

    handleMouseLeave = (i) => {
        document.getElementById(i).classList.remove('imghovered')
    }

    handleClick = (environment, state) => {
        if (environment === 1) {
            this.props.history.push(`/mountain/${encodeURIComponent(JSON.stringify(state))}`);
        } else {

        }
    }

    render () {
        return (
            <div className="WorldViewBody" >
                <div className="ScrollBox ScrollBoxOne" >
                    {this.state.boxOne.map((obj) => 
                        <div key={obj.id} id={obj.id} className="scrollingImage" onClick={() => this.handleClick(obj.environment, obj.state)} onMouseEnter={() => this.handleMouseEnter(obj.id)} onMouseLeave={() => this.handleMouseLeave(obj.id)} >
                            <img src={obj.thumbnail} alt="" ></img>
                        </div>
                    )}
                </div>
                <div className="ScrollBox ScrollBoxTwo" >
                {this.state.boxTwo.map((obj) => 
                        <div key={obj.id} id={obj.id} className="scrollingImage" onClick={() => this.handleClick(obj.environment, obj.state)} onMouseEnter={() => this.handleMouseEnter(obj.id)} onMouseLeave={() => this.handleMouseLeave(obj.id)} >
                            <img src={obj.thumbnail} alt="" ></img>
                        </div>
                    )}
                </div>
                <div className="ScrollBox ScrollBoxThree" >
                {this.state.boxThree.map((obj) => 
                        <div key={obj.id} id={obj.id} className="scrollingImage" onClick={() => this.handleClick(obj.environment, obj.state)} onMouseEnter={() => this.handleMouseEnter(obj.id)} onMouseLeave={() => this.handleMouseLeave(obj.id)} >
                            <img src={obj.thumbnail} alt="" ></img>
                        </div>
                    )}
                </div>
                <div className="ScrollBox ScrollBoxFour" >
                {this.state.boxFour.map((obj) => 
                        <div key={obj.id} id={obj.id} className="scrollingImage" onClick={() => this.handleClick(obj.environment, obj.state)} onMouseEnter={() => this.handleMouseEnter(obj.id)} onMouseLeave={() => this.handleMouseLeave(obj.id)} >
                            <img src={obj.thumbnail} alt="" ></img>
                        </div>
                    )}
                </div>
                <div className="ScrollBox ScrollBoxFive" >
                {this.state.boxFive.map((obj) => 
                        <div key={obj.id} id={obj.id} className="scrollingImage" onClick={() => this.handleClick(obj.environment, obj.state)} onMouseEnter={() => this.handleMouseEnter(obj.id)} onMouseLeave={() => this.handleMouseLeave(obj.id)} >
                            <img src={obj.thumbnail} alt="" ></img>
                        </div>
                    )}
                </div>
                <div className="ScrollBox ScrollBoxSix" >
                {this.state.boxSix.map((obj) => 
                        <div key={obj.id} id={obj.id} className="scrollingImage" onClick={() => this.handleClick(obj.environment, obj.state)} onMouseEnter={() => this.handleMouseEnter(obj.id)} onMouseLeave={() => this.handleMouseLeave(obj.id)} >
                            <img src={obj.thumbnail} alt="" ></img>
                        </div>
                    )}
                </div>
            </div>
        )
    }
}

// {this.state.images.map((obj, i) => 
//     <div key={i} id={i+1} className="scrollingImage" onMouseEnter={() => this.handleMouseEnter(i+1)} onMouseLeave={() => this.handleMouseLeave(i+1)} >
//         <img src={obj.thumbnail} alt="" ></img>
//     </div>
// )}