import React, { Component } from "react";
import "./Soundboard.css";
import Tone from "tone";
const Drum = require("../Tonal - Audio/Tonal - Acoustic Layers Beat 02.wav");
const BeachSynth = require("../Tonal - Audio/Tonal - Beach Run Synth.wav");
const IcySynth = require("../Tonal - Audio/Tonal - Icy Crystals Synth.wav");
const Vox = require("../Tonal - Audio/Tonal - Stop And Go Vox.wav");

class Soundboard extends Component {
  constructor() {
    super();

    this.mountainInput = React.createRef();
    this.skyInput = React.createRef();
    this.SoundboardBody = React.createRef();
    this.HourTwo = React.createRef();
    this.HourThree = React.createRef();
    this.icyInput = React.createRef();

    this.slow = {
      speed: 80,
      size: 0.6
    };

    this.slow1 = {
      speed: 55,
      size: 0.3
    };
    this.slow2 = {
      speed: 68,
      size: 0.5
    };

    this.state = {
      synth: new Tone.Synth().toMaster(),
      star: [],
      drums: new Tone.Player({
        url: Drum,
        loop: true,
        fadeIn: "5s"
      }).toMaster(),
      drumPercent: 57,
      beach: new Tone.Player({
        url: BeachSynth,
        loop: true,
        fadeIn: "3s"
      }).toMaster(),
      icy: new Tone.Player({
        url: IcySynth,
        loop: true,
        fadeIn: "7s"
      }).toMaster(),
      vox: new Tone.Player({
        url: Vox,
        loop: true,
        fadeIn: "7s"
      }).toMaster()
    };
  }

  handleClick = (e) => {
    this.setState({ star: this.state.star.concat({x : e.pageX, y : e.pageY}) });
    console.log('coords', e.pageX, e.pageY)
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
            this.state.vox.volume.value = 3
        } else if (count === 9) {
            this.state.vox.volume.value = 1.5
        } else if (count === 8) {
            this.state.vox.volume.value = 0
        } else if (count === 7) {
            this.state.vox.volume.value = -3
        } else if (count === 6) {
            this.state.vox.volume.value = -5
        } else if (count === 5) {
            this.state.vox.volume.value = -7
        } else if (count === 4) {
            this.state.vox.volume.value = -10
        } else if (count === 3) {
            this.state.vox.volume.value = -15
        } else if (count === 2) {
            this.state.vox.volume.value = -20
        } else if (count === 1) {
            this.state.vox.volume.value = -25
        } else {
            this.state.vox.volume.value = -30
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
      this.state.beach.start();
      this.state.icy.start();
      this.state.vox.start();
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
        console.log("asdklfjads", this.state.icy.volume.value);
        this.state.icy.volume.value = val;
        } else {
        this.state.vox.volume.value = val;
        }
    }

  changeDay = (val, min, max) => {
    var newMin = parseInt(min);
    var newMax = parseInt(max);
    var newVal = parseInt(val);
    var percentage = ((newVal - newMin) * 100) / (newMax - newMin);
    if (percentage <= 5) {
      this.HourTwo.current.style.opacity = 0.1;
    } else if (percentage <= 10) {
      this.HourTwo.current.style.opacity = 0.2;
    } else if (percentage <= 15) {
      this.HourTwo.current.style.opacity = 0.3;
    } else if (percentage <= 20) {
      this.HourTwo.current.style.opacity = 0.4;
    } else if (percentage <= 25) {
      this.HourTwo.current.style.opacity = 0.5;
    } else if (percentage <= 30) {
      this.HourTwo.current.style.opacity = 0.6;
    } else if (percentage <= 35) {
      this.HourTwo.current.style.opacity = 0.7;
    } else if (percentage <= 40) {
      this.HourTwo.current.style.opacity = 0.8;
    } else if (percentage <= 45) {
      this.HourTwo.current.style.opacity = 0.9;
    } else if (percentage <= 50) {
      this.HourTwo.current.style.opacity = 1;
    } else if (percentage <= 55) {
      this.HourThree.current.style.opacity = 0.1;
    } else if (percentage <= 60) {
      this.HourThree.current.style.opacity = 0.2;
    } else if (percentage <= 65) {
      this.HourThree.current.style.opacity = 0.3;
    } else if (percentage <= 70) {
      this.HourThree.current.style.opacity = 0.4;
    } else if (percentage <= 75) {
      this.HourThree.current.style.opacity = 0.5;
    } else if (percentage <= 80) {
      this.HourThree.current.style.opacity = 0.6;
    } else if (percentage <= 85) {
      this.HourThree.current.style.opacity = 0.7;
    } else if (percentage <= 90) {
      this.HourThree.current.style.opacity = 0.8;
    } else if (percentage <= 95) {
      this.HourThree.current.style.opacity = 0.9;
    } else {
      this.HourThree.current.style.opacity = 1;
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

  render() {
    return (
      <div>
        <div className="SoundboardBody" ref={this.SoundboardBody} onClick={this.handleClick}>
            <div ref={this.HourTwo} className="backgroundSecondHour" />
            <div ref={this.HourThree} className="backgroundThirdHour" />
            <div id="background-wrap">
                <div className="cloud" style={
                    this.state.icy.volume.value < -10
                        ? {
                            animation: `animateCloud ${
                            this.slow.speed
                            } linear infinite`,
                            transform: `scale(${this.slow.size})`
                        }
                        : {
                            animation: "animateCloud 50s linear infinite",
                            transform: "scale(0.75)"
                        }
                    }
                />

                <div className="cloud" style={ 
                    this.state.icy.volume.value < -10
                        ? {
                            animation: `animateCloud ${
                            this.slow1.speed
                            } linear infinite`,
                            transform: `scale(${this.slow1.size})`
                        }
                        : {
                            animation: "animateCloud 35s linear infinite",
                            transform: "scale(0.45)"
                        }
                    }
                />

                <div className="cloud" style={ 
                    this.state.icy.volume.value < -10
                        ? {
                            animation: `animateCloud ${
                            this.slow2.speed
                            } linear infinite`,
                            transform: `scale(${this.slow2.size})`
                        }
                        : {
                            animation: "animateCloud 42s linear infinite",
                            transform: "scale(0.65)"
                        }
                    }
                />

                </div>

                {/* Drums */}
                <div className="bkgMount" ></div>
                <div className="Mountain" style={{'clip-path' : `polygon(50% ${this.state.drumPercent}%, 0 100%, 100% 100%)`}} ></div>
                <div className="DrumGrabber" onMouseEnter={() => this.handleMouseEnter('drum')} onMouseLeave={() => this.handleMouseLeave('drum')} ></div>
                <input ref={this.mountainInput} className="VolumeSlider Blink" id="DrumSlider" type="range" min="-25" max="10" defaultValue='-10' onMouseEnter={() => this.handleMouseEnter('drum')} onInput={(e) => this.handleChange('drum', e.target.value, e.target.min, e.target.max)} />
                {/* Beach Synth */}
                <div className="BeachGrabber" onMouseEnter={() => this.handleMouseEnter('beach')} onMouseLeave={() => this.handleMouseLeave('beach')} ></div>
                <input ref={this.skyInput} className="VolumeSlider Blink" id="BeachSynth" type="range" min="-20" max="6" defaultValue='-10' onMouseEnter={() => this.handleMouseEnter('beach')} onInput={(e) => this.handleChange('beach', e.target.value, e.target.min, e.target.max)} />
                {/* Icy Synth */}
                <div className="IcyGrabber" onMouseEnter={() => this.handleMouseEnter("icy")} onMouseLeave={() => this.handleMouseLeave("icy")}/></div>
                <input ref={this.icyInput} className="VolumeSlider Blink" id="IcySynth" type="range" min="-45" max="6" defaultValue="-10" onMouseEnter={() => this.handleMouseEnter('icy')} onInput={e => this.handleChange("Icy",e.target.value,e.target.min,e.target.max)} />
                {/* Stars */}
                {this.state.star.map((star, i) =>
                    <div key={i} className="star" id={i} style={{ 'left' : `${star.x - 25}px`, 'top' : `${star.y - 25}px`}} onMouseEnter={() => this.handleMouseEnter('star', i)} onMouseLeave={() => this.handleMouseLeave('star', i)} onClick={(e) => this.removeStar(e, i)}></div>
                )}
                {this.starCounter()}

            </div>
        );
    }
}

export default Soundboard;