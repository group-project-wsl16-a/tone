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

    this.state = {
      synth: new Tone.Synth().toMaster(),
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

  handleClick = () => {
    this.state.drums.stop();
    this.state.beach.stop();
    this.state.icy.stop();
    this.state.vox.stop();
  };

  handleMouseEnter = inst => {
    this.mountainInput.current.classList.remove("Blink");
    this.skyInput.current.classList.remove("Blink");
    if (inst === "drum") {
      this.mountainInput.current.classList.add("hover");
    } else if (inst === "beach") {
      this.skyInput.current.classList.add("hover");
    } else if (inst === "icy") {
    } else {
    }
  };

  handleMouseLeave = inst => {
    this.mountainInput.current.classList.add("Blink");
    this.skyInput.current.classList.add("Blink");
    this.setState({ blink: true });
    if (inst === "drum") {
      this.mountainInput.current.classList.remove("hover");
    } else if (inst === "beach") {
      this.skyInput.current.classList.remove("hover");
    } else if (inst === "icy") {
    } else {
    }
  };

  componentDidMount() {
    console.log(
      window
        .getComputedStyle(
          document.getElementById("BeachSynth"),
          "::-webkit-slider-thumb"
        )
        .getPropertyValue("y-index")
    );
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
    this.setState({ blink: false });
    if (inst === "drum") {
      this.state.drums.volume.value = val;
      this.findPercentage(val, min, max);
    } else if (inst === "beach") {
      this.state.beach.volume.value = val;
      this.changeDay(val, min, max);
    } else if (inst === "icy") {
      this.state.icy.volume.value = val;
    } else {
      this.state.vox.volume.value = val;
    }
  };

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
        <div id="background-wrap">
          <div class="x1">
            <div class="cloud" />
          </div>

          <div class="x2">
            <div class="cloud" />
          </div>

          <div class="x3">
            <div class="cloud" />
          </div>

          <div class="x4">
            <div class="cloud" />
          </div>

          {/* <div class="x5">
            <div class="cloud" />
          </div> */}
        </div>
        <div className="SoundboardBody" ref={this.SoundboardBody}>
          {/* <div className="SliderContainer" >
                <div className="IndividualSliderContainer" >
                    Backing Synth
                    <input className="" type="range" min="-30" max="4" defaultValue='-10' onInput={(e) => this.handleChange('icy', e.target.value)} />
                </div>
                <div className="IndividualSliderContainer" >
                    Ambiance
                    <input className="" type="range" min="-30" max="3" defaultValue='-5' onInput={(e) => this.handleChange('vox', e.target.value)} />
                </div>
            </div> */}

          <div ref={this.HourTwo} className="backgroundSecondHour" />
          <div ref={this.HourThree} className="backgroundThirdHour" />

          {/* Drums */}
          <div className="bkgMount" />
          <div
            className="Mountain"
            style={{
              "clip-path": `polygon(50% ${
                this.state.drumPercent
              }%, 0 100%, 100% 100%)`
            }}
          />
          <div
            className="DrumGrabber"
            onMouseEnter={() => this.handleMouseEnter("drum")}
            onMouseLeave={() => this.handleMouseLeave("drum")}
          />
          <input
            ref={this.mountainInput}
            className="VolumeSlider Blink"
            id="DrumSlider"
            type="range"
            min="-25"
            max="10"
            defaultValue="-5"
            onMouseEnter={() => this.handleMouseEnter("drum")}
            onInput={e =>
              this.handleChange(
                "drum",
                e.target.value,
                e.target.min,
                e.target.max
              )
            }
          />
          {/* Beach Synth */}
          <div
            className="BeachGrabber"
            onMouseEnter={() => this.handleMouseEnter("beach")}
            onMouseLeave={() => this.handleMouseLeave("beach")}
          />
          <input
            ref={this.skyInput}
            className="VolumeSlider Blink"
            id="BeachSynth"
            type="range"
            min="-45"
            max="6"
            defaultValue="-10"
            onInput={e =>
              this.handleChange(
                "beach",
                e.target.value,
                e.target.min,
                e.target.max
              )
            }
          />
          <div className="directionalBlinkers BeachBlinkers" />
        </div>
      </div>
    );
  }
}

export default Soundboard;

// this.setState({ blink : false})
