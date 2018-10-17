import React, { Component } from "react";
import "./Balloons.css";
import { withRouter } from "react-router";
import domtoimage from 'dom-to-image';
import axios from 'axios';

export class Balloons extends Component {
  constructor(props) {
    super(props);
  }

  handleClick = type => {
    if (type === "menu") {
      this.props.history.push("/worldview");
    } else if (type === "record") {
      this.screenshot()
    } else {
      this.props.history.push('/')
      window.location.reload();
    }
  };

  //Screenshot

  screenshot = () => {
    var node = document.getElementById('domtoimage');
    var volumes = this.props.volumes
    var environment = this.props.environment

    domtoimage.toPng(node)
        .then(function (dataUrl) {
            var img = new Image();
            img.src = dataUrl;
            
            axios.post(`http://localhost:3030/api/examples`, {
              state: volumes,
              pic: img.src,
              environment: environment
            })

        })
        .catch(function (error) {
            console.error('oops, something went wrong!', error);
        });
  }

  render(props) {
    return (
      <div className="BalloonsBody">
        <img
          className="MenuBalloon"
          src={require("./Menu-Balloon.png")}
          onClick={() => this.handleClick("menu")}
          alt="World View Balloon"
        />
        <img
          className="RecordBalloon"
          src={require("./Record-Balloon.png")}
          onClick={() => this.handleClick("record")}
          alt="Record Song Balloon"
        />
        <img
          className="ResetBalloon"
          src={require("./Reset-Balloon.png")}
          onClick={() => this.handleClick("reset")}
          alt="Reset Balloon"
        />
      </div>
    );
  }
}

export default withRouter(Balloons);
