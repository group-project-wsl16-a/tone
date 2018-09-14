import React, { Component } from 'react';
import './DNDTest.css';

class DNDTest extends Component {
  allowDrop = (e) => {
    e.preventDefault();
  }

  drag = (e) => {
    console.log(e)
    e.dataTransfer.setData("text", e.target.className);
  }

  drop = (e) => {
    console.log(e)
    e.preventDefault();
    var data = e.dataTransfer.getData("text");
    e.target.appendChild(document.getElementsByClassName(data));
  }

  render() {
    return (
      <div className="App">
      <div className="sidebar">
        <div className="shape square" draggable onDragStart={() => this.drag('event')} ></div>
        <div className="shape triangle" draggable ></div>
        <div className="shape circle" draggable ></div>
      </div>
        <div className="stage" >
          <div className="front half">
            <div className="left sub" onDrop={() => this.drop('event')} onDragOver={() => this.allowDrop('event')} ></div>
            <div className="center sub" ></div>
            <div className="right sub" ></div>
          </div>
          <div className="back half">
            <div className="left sub" ></div>
            <div className="center sub" ></div>
            <div className="right sub" ></div>
          </div>
        </div>
      </div>
    );
  }
}

export default DNDTest;