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
                <div className="MinesBody" ref={this.MinesBody} onClick={(e) => this.handleClick('star', e)}>
                    <div ref={this.HourTwo} className="backgroundSecondHour" />
                    <div ref={this.HourThree} className="backgroundThirdHour" />
                    <div id="background-wrap">
                        <svg ref={this.CloudOne} className='cloud cloudTwo' viewBox="-132.41450354569133 413.5219672238784 922.8206244876728 229.4780327761216"  style={{'transform' : `scale(${this.state.cloudSize})`}} >   
                            <g>
                                <g>
                                <path d="M643.06 614.32C631.35 612.43 591.91 603.65 568.48 591.53C561.9 588.13 550.7 580.11 543.45 578.67C542.41 578.46 541.31 578.32 540.18 578.2C543.17 570.25 544.53 561.68 543.98 553.2C543.53 546.21 541.59 538.88 536.46 534.1C531.32 529.33 523.36 528.63 518.57 533.75C522.06 516.14 511.35 496.79 494.58 490.4C477.81 484 457.45 493.54 448.33 509C451.55 500.63 453.91 491.37 451.44 482.75C448.96 474.13 440.1 466.82 431.38 468.93C428.84 463.97 425.96 458.68 420.93 456.29C415.89 453.92 407.09 455.6 406.85 461.16C406.6 455.46 402.29 450.18 396.75 448.8C391.22 447.41 386.64 451.15 383.74 456.05C380.19 445.22 374.98 434.68 366.85 426.7C358.71 418.71 347.34 413.54 335.99 414.68C324.65 415.82 313.87 424.15 311.65 435.33C308.35 433.57 304.1 433.72 300.95 435.73C297.79 437.74 298.51 441.14 298.71 444.88C280.51 441.71 260.87 448.86 248.96 462.99C237.06 477.11 233.61 497.89 239.81 515.29C233.65 510.88 225.23 509.8 218.15 512.52C211.07 515.24 205.54 521.68 203.92 529.09C202.83 524.65 198.23 521.37 193.68 521.78C189.13 522.18 186.55 523.33 186.26 527.89C169.18 502 133.71 489.98 104.41 500.16C75.11 510.33 55.9 541.8 58.54 572.71C47.91 565.98 34.56 563.72 22.32 566.57C10.07 569.41 -0.91 577.33 -7.48 588.05C-11.05 593.87 -13.27 601.48 -9.86 607.38C-17.42 602.36 -29.17 603.8 -35.43 610.37C-51.07 604.02 -53.76 608.02 -69.16 614.95C-92.24 625.33 -114.53 625.33 -131.41 625.33C-126.4 625.33 -86.31 625.33 -81.3 625.33C-26.57 625.33 -1.93 639.58 32.25 630.72C79.26 643.74 128.56 642.82 175.47 629.46C191.14 637.6 209.38 637.19 225.37 629.71C263.58 639.1 303.76 638.08 341.58 627.24C349.85 631.52 360.22 630.63 368.58 626.54C395.63 636.17 425.17 636.13 453.1 629.48C468.58 637.19 486.49 636.32 501.99 628.68C527.82 636.21 555.33 635.85 581.36 629.07C592.97 632.52 606.78 632.27 618.36 628.7C624.07 626.93 630.26 625.91 637.07 625.33C652.1 625.33 772.37 625.33 787.41 625.33C739.24 623.4 691 619.97 643.06 614.32" ></path>
                                </g>
                            </g>
                        </svg>
                        <svg ref={this.CloudTwo} className='cloud cloudOne' viewBox="-353.36724668813054 127.36200526444804 1421.2232680945947 223.90832256517263" style={{'transform' : `scale(${this.state.cloudSize})`}} >   
                            <g>
                                <g>
                                    <path d="M998.86 305.15C978.77 293.91 958.11 282.48 935.33 279.11C912.56 275.75 886.68 278.53 873.15 297.15C842.31 278.07 799.29 276.79 765.87 290.89C759.49 271.87 731.47 262.63 713.85 272.22C715.78 251.46 702.98 230.17 683.74 222.13C664.5 214.09 640.35 219.96 626.94 235.92C622.16 228.83 612.66 225.29 604.41 227.53C596.15 229.78 592.25 232.54 591.72 241.08C579.9 215.54 559.02 193.6 532.64 183.79C506.26 173.99 474.49 177.6 452.98 195.76C431.48 213.91 421.14 245.29 433.71 270.46C416.18 249.1 388.11 236.84 360.52 238.49C332.94 240.14 305.88 256.7 291.02 280.01C279.03 265.34 255.19 262.3 239.9 273.48C233.68 259.48 213.33 255.43 202.66 266.42C208.09 249.83 203.73 230.43 191.73 217.76C179.72 205.09 165.22 202.19 148.37 206.73C150.02 196.76 151.68 186.51 149.58 176.62C147.49 166.74 140.75 157.15 130.94 154.74C121.13 152.33 115.55 158.9 116.11 168.99C100.62 143.01 70.09 126.79 39.89 128.48C9.69 130.18 -18.83 149.73 -31.31 177.28C-40.46 197.47 -40.03 220.52 -31.84 240.78C-37.07 233.08 -43.18 226.14 -50.95 221.07C-65.35 211.64 -87.09 211.13 -97.89 224.54C-105.13 233.54 -105.7 246.5 -102.24 257.52C-98.78 268.54 -93.41 279.26 -86.59 288.58C-91.63 280.83 -101.12 276.21 -110.33 277.01C-119.54 277.82 -127.73 283.21 -131.35 291.71C-142.07 283.62 -157 285.29 -170.28 287.34C-218.71 294.82 -265.29 308.73 -313.29 314.3C-313.35 314.3 -313.84 314.3 -313.9 314.3C-313.77 314.31 -313.64 314.32 -313.52 314.33C-326.34 315.81 -339.27 316.73 -352.37 316.73C-345.15 316.73 -287.38 316.73 -280.16 316.73C-146.67 325.83 -12.72 328.01 120.99 323.23C163.85 321.7 206.7 334.64 248.11 323.48C346.59 356.95 456.04 356.66 554.04 321.8C618.1 336.78 684.83 340.67 750.27 333.88C792.65 329.48 835.55 342.95 873.21 323.04C896.19 332.02 923.12 331.51 944.77 319.7C959.37 329.22 995.13 316.73 1064.86 316.73C1040.24 309.82 1021.18 317.62 998.86 305.15" ></path>
                                </g>
                            </g>
                        </svg>
                    </div>

                    {/* Drums */}
                    <div className="Mountain" style={{'clipPath' : `polygon(50% ${this.state.drumPercent}%, 0 100%, 100% 100%)`}} ></div>
                    <div className="DrumGrabber" onMouseEnter={() => this.handleMouseEnter('drum')} onMouseLeave={() => this.handleMouseLeave('drum')} ></div>
                    <input ref={this.mountainInput} className="VolumeSlider Blink" id="DrumSlider" type="range" min="-25" max="10" defaultValue='-10' onMouseEnter={() => this.handleMouseEnter('drum')} onInput={(e) => this.handleChange('drum', e.target.value, e.target.min, e.target.max)} />
                    
                    {/* Beach Synth */}
                    <div className="BeachGrabber" onMouseEnter={() => this.handleMouseEnter('beach')} onMouseLeave={() => this.handleMouseLeave('beach')} ></div>
                    <input ref={this.skyInput} className="VolumeSlider Blink" id="BeachSynth" type="range" min="-20" max="6" defaultValue='-10' onMouseEnter={() => this.handleMouseEnter('beach')} onInput={(e) => this.handleChange('beach', e.target.value, e.target.min, e.target.max)} />
                    
                    {/* Icy Synth */}
                    <div className="IcyGrabber" onMouseEnter={() => this.handleMouseEnter("icy")} onMouseLeave={() => this.handleMouseLeave("icy")}></div>
                    <input ref={this.icyInput} className="VolumeSlider Blink" id="IcySynth" type="range" min="-45" max="6" defaultValue="-10" onMouseEnter={() => this.handleMouseEnter('icy')} onInput={e => this.handleChange("Icy",e.target.value,e.target.min,e.target.max)} />

                    <div className="bkgMount" ></div>

                    {/* Stars */}
                    {this.state.star.map((star, i) =>
                        <div key={i} className="star" id={i} style={{ 'left' : `${star.x - 25}px`, 'top' : `${star.y - 25}px`}} onMouseEnter={() => this.handleMouseEnter('star', i)} onMouseLeave={() => this.handleMouseLeave('star', i)} onClick={(e) => this.removeStar(e, i)}></div>
                    )}

                    {this.starCounter()}

                </div>
                <HiddenMenu minesStop={this.stopPlaying}/>
            </div>
        );
    }
}

export default Mines;