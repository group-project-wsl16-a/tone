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
        this.state = {
            synth: new Tone.Synth().toMaster(),
            power: true,
            // vol: new Tone.Volume(-20),
            drums: new Tone.Player({
                "url" : Drum,
                "loop" : true,
                "fadeIn" : '5s',
            }).toMaster(),
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
        this.setState({ power: !this.state.power})
        if (this.state.power === true) {
            this.state.drums.start()
            this.state.beach.start()
            this.state.icy.start()
            this.state.vox.start()
        } else {
            this.state.drums.stop()
            this.state.beach.stop()
            this.state.icy.stop()
            this.state.vox.stop()
        }
    }

    componentDidMount = () => {
        Tone.Transport.bpm.value = 84
    }

    handleChange = (inst, val) => {
        if (inst === 'drum') {
            this.state.drums.volume.value = val
        } else if (inst === 'beach') {
            this.state.beach.volume.value = val
        } else if (inst === 'icy') {
            this.state.icy.volume.value = val
        } else {
            this.state.vox.volume.value = val
        }
    }


    render() {
        return (
        <div className="SoundboardBody">
            <button className="musicButton" onClick={() => this.handleClick()} >Play Belutiful Music</button>
            <div className="SliderContainer" >
                <div className="IndividualSliderContainer" >
                    Drums
                    <input className="VolumeSlider" type="range" min="-25" max="10" defaultValue='-5' onInput={(e) => this.handleChange('drum', e.target.value)} />
                </div>
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
        </div>
        );
    }
}

export default Soundboard;