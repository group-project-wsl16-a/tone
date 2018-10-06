import React, { Component } from "react";
import "./Mines.css";
import Tone from "tone";
import Balloons from '../Balloons/Balloons';
import HiddenMenu from '../Menu/Menu';

const Brass = require("../Tonal - Audio/Mines/Funk - Boogie Right Brass 02.wav")
const Bass = require("../Tonal - Audio/Mines/Funk - Bumping Disco Bass 02.wav")
const Guitar = require("../Tonal - Audio/Mines/Funk - Bell Bottom Guitar.wav")
const Piano = require("../Tonal - Audio/Mines/Funk - Funk Disco Piano Lead.wav")
const Drums = require("../Tonal - Audio/Mines/Funk - Throwback Funk Beat 05.wav")

class Mines extends Component {
    constructor() {
        super();

        this.mountainInput = React.createRef();
        this.skyInput = React.createRef();
        this.MinesBody = React.createRef();
        this.HourTwo = React.createRef();
        this.HourThree = React.createRef();
        this.icyInput = React.createRef();
        this.CloudOne = React.createRef();
        this.CloudTwo = React.createRef();

        this.state = {
            synth: new Tone.Synth().toMaster(),
            star: [],
            drums: new Tone.Player({
                url: Drums,
                loop: true,
                fadeIn: "5s",
                volume: '-10',
                }).toMaster(),
            drumPercent: 57,
            bass: new Tone.Player({
                url: Bass,
                loop: true,
                fadeIn: "3s",
                volume: '-5',
                }).toMaster(),
            brass: new Tone.Player({
                url: Brass,
                loop: true,
                fadeIn: "7s",
                volume: '-10',
                }).toMaster(),
            cloudSize: 0.69,
            piano: new Tone.Player({
                url: Piano,
                loop: true,
                fadeIn: "7s",
                volume: '-5',
                }).toMaster(),
            guitar: new Tone.Player({
                url: Guitar,
                loop: true,
                fadeIn: "7s",
                volume: '-5',
                }).toMaster(),
            volumes: {},
        };
    }

    stopPlaying =() => {
        this.state.drums.stop()
        this.state.bass.stop()
        this.state.brass.stop()
        this.state.piano.stop()
        this.state.guitar.stop()
        console.log('working')
    }

    changeVolumes = () => {
        var drums = this.state.drums.volume.value
        var guitar = this.state.guitar.volume.value
        var bass = this.state.bass.volume.value
        var brass = this.state.brass.volume.value
        var piano = this.state.piano.volume.value

        this.setState({ volumes : {drums: drums, guitar: guitar, bass: bass, brass: brass, piano: piano} })
    }

    handleClick = (type, e) => {
        this.setState({ star: this.state.star.concat({x : e.pageX, y : e.pageY}) });
        this.changeVolumes()
        // this.state.drums.stop()
        // this.state.beach.stop()
        // this.state.icy.stop()
        // this.state.vox.stop()
    }

    removeStar = (e, i) => {
        this.setState({ star : this.state.star.filter((star, index) => {
            return i !== index
        }) })
        e.preventDefault()
        e.stopPropagation()
    }

    starCounter = () => {
        var count = this.state.star.length
        if (count > 9) {
            this.state.piano.volume.value = 3
        } else if (count === 9) {
            this.state.piano.volume.value = 1.5
        } else if (count === 8) {
            this.state.piano.volume.value = 0
        } else if (count === 7) {
            this.state.piano.volume.value = -3
        } else if (count === 6) {
            this.state.piano.volume.value = -5
        } else if (count === 5) {
            this.state.piano.volume.value = -7
        } else if (count === 4) {
            this.state.piano.volume.value = -10
        } else if (count === 3) {
            this.state.piano.volume.value = -15
        } else if (count === 2) {
            this.state.piano.volume.value = -20
        } else if (count === 1) {
            this.state.piano.volume.value = -25
        } else {
            this.state.piano.volume.value = -30
        }
    }
    
    handleMouseEnter = (inst, i) => {
        this.mountainInput.current.classList.remove('Blink')
        this.skyInput.current.classList.remove('Blink')
        this.icyInput.current.classList.remove('Blink')
        if (inst === 'drum') {
            this.mountainInput.current.classList.add('hover')
        } else if (inst === 'beach') {
            this.skyInput.current.classList.add('hover')
        } else if (inst === 'star') {
            document.getElementById(i).classList.add('hovered')
        } else if (inst === 'icy') {
            this.icyInput.current.classList.add('hover')
        } else {
        }
    }

    handleMouseLeave = (inst, i) => {
        this.mountainInput.current.classList.add('Blink')
        this.skyInput.current.classList.add('Blink')
        this.icyInput.current.classList.add('Blink')
        if (inst === 'drum') {
            this.mountainInput.current.classList.remove('hover')
        } else if (inst === 'beach') {
            this.skyInput.current.classList.remove('hover')
        } else if (inst === 'star') {
            document.getElementById(i).classList.remove('hovered')
        } else if (inst === 'icy') {
            this.icyInput.current.classList.remove('hover')
        } else {
        }
    }

    componentWillMount = () => {
        Tone.Buffer.on("load", () => {
            this.state.drums.start();
            this.state.piano.start();
            this.state.bass.start();
            this.state.brass.start();
            this.state.guitar.start();
        });
    };

  handleChange = (inst, val, min, max) => {
        if (inst === "drum") {
        this.state.drums.volume.value = val;
        this.findPercentage(val, min, max);
        } else if (inst === "beach") {
        this.state.beach.volume.value = val;
        this.changeDay(val, min, max);
        } else if (inst === "Icy") {
        this.state.icy.volume.value = val;
        this.changeClouds(val, min, max)
        } else {
        this.state.vox.volume.value = val;
        }
        this.changeVolumes()
    }

    changeDay = (val, min, max) => {
        var newMin = parseInt(min);
        var newMax = parseInt(max);
        var newVal = parseInt(val);
        var percentage = ((newVal - newMin) * 100) / (newMax - newMin);
        if (percentage <= 5) {
            this.HourTwo.current.style.opacity = 0.1;
            this.CloudOne.current.style.fill = 'rgb(105, 105, 105)';
            this.CloudTwo.current.style.fill = 'rgb(105, 105, 105)';
            this.CloudOne.current.style.stroke = 'white';
            this.CloudTwo.current.style.stroke = 'white';
        } else if (percentage <= 10) {
            this.HourTwo.current.style.opacity = 0.2;
            this.CloudOne.current.style.fill = 'rgb(113, 113, 113)';
            this.CloudTwo.current.style.fill = 'rgb(113, 113, 113)';
            this.CloudOne.current.style.stroke = 'rgb(242, 242, 242)';
            this.CloudTwo.current.style.stroke = 'rgb(242, 242, 242)';
        } else if (percentage <= 15) {
            this.HourTwo.current.style.opacity = 0.3;
            this.CloudOne.current.style.fill = 'rgb(121, 121, 121)';
            this.CloudTwo.current.style.fill = 'rgb(121, 121, 121)';
            this.CloudOne.current.style.stroke = 'rgb(229, 229, 229)';
            this.CloudTwo.current.style.stroke = 'rgb(229, 229, 229)';
        } else if (percentage <= 20) {
            this.HourTwo.current.style.opacity = 0.4;
            this.CloudOne.current.style.fill = 'rgb(129, 129, 129)';
            this.CloudTwo.current.style.fill = 'rgb(129, 129, 129)';
            this.CloudOne.current.style.stroke = 'rgb(215, 215, 215)';
            this.CloudTwo.current.style.stroke = 'rgb(215, 215, 215)';
        } else if (percentage <= 25) {
            this.HourTwo.current.style.opacity = 0.5;
            this.CloudOne.current.style.fill = 'rgb(135, 135, 135)';
            this.CloudTwo.current.style.fill = 'rgb(135, 135, 135)';
            this.CloudOne.current.style.stroke = 'rgb(202, 202, 202)';
            this.CloudTwo.current.style.stroke = 'rgb(202, 202, 202)';
        } else if (percentage <= 30) {
            this.HourTwo.current.style.opacity = 0.6;
            this.CloudOne.current.style.fill = 'rgb(142, 142, 142)';
            this.CloudTwo.current.style.fill = 'rgb(142, 142, 142)';
            this.CloudOne.current.style.stroke = 'rgb(189, 189, 189)';
            this.CloudTwo.current.style.stroke = 'rgb(189, 189, 189)';
        } else if (percentage <= 35) {
            this.HourTwo.current.style.opacity = 0.7;
            this.CloudOne.current.style.fill = 'rgb(150, 150, 150)';
            this.CloudTwo.current.style.fill = 'rgb(150, 150, 150)';
            this.CloudOne.current.style.stroke = 'rgb(176, 176, 176)';
            this.CloudTwo.current.style.stroke = 'rgb(176, 176, 176)';
        } else if (percentage <= 40) {
            this.HourTwo.current.style.opacity = 0.8;
            this.CloudOne.current.style.fill = 'rgb(158, 158, 158)';
            this.CloudTwo.current.style.fill = 'rgb(158, 158, 158)';
            this.CloudOne.current.style.stroke = 'rgb(162, 162, 162)';
            this.CloudTwo.current.style.stroke = 'rgb(162, 162, 162)';
        } else if (percentage <= 45) {
            this.HourTwo.current.style.opacity = 0.9;
            this.CloudOne.current.style.fill = 'rgb(165, 165, 165)';
            this.CloudTwo.current.style.fill = 'rgb(165, 165, 165)';
            this.CloudOne.current.style.stroke = 'rgb(149, 149, 149)';
            this.CloudTwo.current.style.stroke = 'rgb(149, 149, 149)';
        } else if (percentage <= 50) {
            this.HourTwo.current.style.opacity = 1;
            this.CloudOne.current.style.fill = 'rgb(173, 173, 173)';
            this.CloudTwo.current.style.fill = 'rgb(173, 173, 173)';
            this.CloudOne.current.style.stroke = 'rgb(136, 136, 136)';
            this.CloudTwo.current.style.stroke = 'rgb(136, 136, 136)';
        } else if (percentage <= 55) {
            this.HourThree.current.style.opacity = 0.1;
            this.CloudOne.current.style.fill = 'rgb(180, 180, 180)';
            this.CloudTwo.current.style.fill = 'rgb(180, 180, 180)';
            this.CloudOne.current.style.stroke = 'rgb(123, 123, 123)';
            this.CloudTwo.current.style.stroke = 'rgb(123, 123, 123)';
        } else if (percentage <= 60) {
            this.HourThree.current.style.opacity = 0.2;
            this.CloudOne.current.style.fill = 'rgb(188, 188, 188)';
            this.CloudTwo.current.style.fill = 'rgb(188, 188, 188)';
            this.CloudOne.current.style.stroke = 'rgb(110, 110, 110)';
            this.CloudTwo.current.style.stroke = 'rgb(110, 110, 110)';
        } else if (percentage <= 65) {
            this.HourThree.current.style.opacity = 0.3;
            this.CloudOne.current.style.fill = 'rgb(196, 196, 196)';
            this.CloudTwo.current.style.fill = 'rgb(196, 196, 196)';
            this.CloudOne.current.style.stroke = 'rgb(96, 96, 96)';
            this.CloudTwo.current.style.stroke = 'rgb(96, 96, 96)';
        } else if (percentage <= 70) {
            this.HourThree.current.style.opacity = 0.4;
            this.CloudOne.current.style.fill = 'rgb(202, 202, 202)';
            this.CloudTwo.current.style.fill = 'rgb(202, 202, 202)';
            this.CloudOne.current.style.stroke = 'rgb(83, 83, 83)';
            this.CloudTwo.current.style.stroke = 'rgb(83, 83, 83)';
        } else if (percentage <= 75) {
            this.HourThree.current.style.opacity = 0.5;
            this.CloudOne.current.style.fill = 'rgb(210, 210, 210)';
            this.CloudTwo.current.style.fill = 'rgb(210, 210, 210)';
            this.CloudOne.current.style.stroke = 'rgb(70, 70, 70)';
            this.CloudTwo.current.style.stroke = 'rgb(70, 70, 70)';
        } else if (percentage <= 80) {
            this.HourThree.current.style.opacity = 0.6;
            this.CloudOne.current.style.fill = 'rgb(220, 220, 220)';
            this.CloudTwo.current.style.fill = 'rgb(220, 220, 220)';
            this.CloudOne.current.style.stroke = 'rgb(57, 57, 57)';
            this.CloudTwo.current.style.stroke = 'rgb(57, 57, 57)';
        } else if (percentage <= 85) {
            this.HourThree.current.style.opacity = 0.7;
            this.CloudOne.current.style.fill = 'rgb(228, 228, 228)';
            this.CloudTwo.current.style.fill = 'rgb(228, 228, 228)';
            this.CloudOne.current.style.stroke = 'rgb(42, 42, 42)';
            this.CloudTwo.current.style.stroke = 'rgb(42, 42, 42)';
        } else if (percentage <= 90) {
            this.HourThree.current.style.opacity = 0.8;
            this.CloudOne.current.style.fill = 'rgb(236, 236, 236)';
            this.CloudTwo.current.style.fill = 'rgb(236, 236, 236)';
            this.CloudOne.current.style.stroke = 'rgb(29, 29, 29)';
            this.CloudTwo.current.style.stroke = 'rgb(29, 29, 29)';
        } else if (percentage <= 95) {
            this.HourThree.current.style.opacity = 0.9;
            this.CloudOne.current.style.fill = 'rgb(244, 244, 244)';
            this.CloudTwo.current.style.fill = 'rgb(244, 244, 244)';
            this.CloudOne.current.style.stroke = 'rgb(15, 15, 15)';
            this.CloudTwo.current.style.stroke = 'rgb(15, 15, 15)';
        } else {
            this.HourThree.current.style.opacity = 1;
            this.CloudOne.current.style.fill = 'white';
            this.CloudTwo.current.style.fill = 'white';
            this.CloudOne.current.style.stroke = 'rgb(0, 0, 0)';
            this.CloudTwo.current.style.stroke = 'rgb(0, 0, 0)';
        }
        this.skyInput.current.classList.add("hover");
    };

    findPercentage = (val, min, max) => {
        var newMin = parseInt(min);
        var newMax = parseInt(max);
        var newVal = parseInt(val);
        var percentage = ((newVal - newMin) * 100) / (newMax - newMin);
        if (percentage <= 5) {
            percentage = 5;
        }
        this.setState({ drumPercent: 100 - percentage });
        this.mountainInput.current.classList.add("hover");
    };

    changeClouds = (val, min, max) => {
        var newMin = parseInt(min);
        var newMax = parseInt(max);
        var newVal = parseInt(val);
        var percentage = ((newVal - newMin) * 100) / (newMax - newMin);
        this.setState({ cloudSize: percentage/100 })
    }

    render() {
        return (
            <div>
                <Balloons volumes={this.state.volumes} />
                <div className="MinesBody" >
                    <div className="Cavern" ></div>
                    <div className="CavernTwo" ></div>
                    <div className="CavernThree" ></div>
                    <div className="CavernFour" ></div>
                    <div className="CavernFive" ></div>
                    <div className="CaveWater" ></div>
                </div>
                <HiddenMenu minesStop={this.stopPlaying}/>
            </div>
        );
    }
}

export default Mines;