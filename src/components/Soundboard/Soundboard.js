import React, { Component } from 'react';
import './Soundboard.css';
import Tone from 'tone' 
const Drum = require('../Tonal - Audio/Tonal - Acoustic Layers Beat 02.wav')
const BeachSynth = require('../Tonal - Audio/Tonal - Beach Run Synth.wav')
const IcySynth = require('../Tonal - Audio/Tonal - Icy Crystals Synth.wav')
const Vox = require('../Tonal - Audio/Tonal - Stop And Go Vox.wav')

class Soundboard extends Component {
    constructor () {
        super ()

        this.mountainInput = React.createRef();
        this.state = {
            synth: new Tone.Synth().toMaster(),
            drums: new Tone.Player({
                "url" : Drum,
                "loop" : true,
                "fadeIn" : '5s',
            }).toMaster(),
            drumPercent: 57,
            beach: new Tone.Player({
                "url" : BeachSynth,
                "loop" : true,
                "fadeIn" : '3s',
            }).toMaster(),
            icy: new Tone.Player({
                "url" : IcySynth,
                "loop" : true,
                "fadeIn" : '7s',
            }).toMaster(),
            vox: new Tone.Player({
                "url" : Vox,
                "loop" : true,
                "fadeIn" : '7s',
            }).toMaster(),
        }
    }

    handleClick = () => {
        this.state.drums.stop()
        this.state.beach.stop()
        this.state.icy.stop()
        this.state.vox.stop()
    }

    componentWillMount = () => {
        Tone.Buffer.on('load', () => {
            this.state.drums.start()
            this.state.beach.start()
            this.state.icy.start()
            this.state.vox.start()
        })
    }

    handleChange = (inst, val, min, max) => {
        if (inst === 'drum') {
            this.state.drums.volume.value = val
            this.findPercentage(val, min, max)
        } else if (inst === 'beach') {
            this.state.beach.volume.value = val
        } else if (inst === 'icy') {
            this.state.icy.volume.value = val
        } else {
            this.state.vox.volume.value = val
        }
    }

    findPercentage = (val, min, max) => {
        var newMin = parseInt(min)
        var newMax = parseInt(max)
        var newVal = parseInt(val)
        var percentage = ((newVal - newMin) * 100) / (newMax - newMin)
        if (percentage <= 5) {
            percentage = 5
        }
        this.setState({ drumPercent : 100-percentage })
    }


    render() {
        return (
        <div className="SoundboardBody">
            <div className="SliderContainer" >
                <div className="IndividualSliderContainer" >
                    Synth
                    <input className="VolumeSlider" type="range" min="-45" max="6" defaultValue='-10' onInput={(e) => this.handleChange('beach', e.target.value)} />
                </div>
                <div className="IndividualSliderContainer" >
                    Backing Synth
                    <input className="VolumeSlider" type="range" min="-30" max="4" defaultValue='-10' onInput={(e) => this.handleChange('icy', e.target.value)} />
                </div>
                <div className="IndividualSliderContainer" >
                    Ambiance
                    <input className="VolumeSlider" type="range" min="-30" max="3" defaultValue='-5' onInput={(e) => this.handleChange('vox', e.target.value)} />
                </div>
            </div>
            <div className="bkgMount" ></div>
            <div className="Mountain" style={{'clip-path' : `polygon(50% ${this.state.drumPercent}%, 0 100%, 100% 100%)`}} ></div>
            <div className="Grabber" onMouseEnter={() => this.mountainInput.current.classList.add('hover')} onMouseLeave={() => this.mountainInput.current.classList.remove('hover')} ></div>
            <input ref={this.mountainInput} className="VolumeSlider DrumSliderVolume" id="DrumSlider" type="range" min="-25" max="10" defaultValue='-5' onInput={(e) => this.handleChange('drum', e.target.value, e.target.min, e.target.max)} />
        </div>
        );
    }
}

export default Soundboard;