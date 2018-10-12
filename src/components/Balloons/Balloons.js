import React, { Component } from "react";
import "./Balloons.css";
import { withRouter } from "react-router";
import domtoimage from 'dom-to-image';

export class Balloons extends Component {
  constructor(props) {
    super(props);
  }

  handleClick = type => {
    if (type === "menu") {
      this.props.history.push("/worldview");
    } else if (type === "record") {
      this.screenshot()
      console.log(this.props.volumes)
    } else {
      window.location.reload();
    }
  };

  //Screenshot

  screenshot = () => {
    var node = document.getElementById('domtoimage');

    domtoimage.toPng(node)
        .then(function (dataUrl) {
            var img = new Image();
            img.src = dataUrl;
            document.body.appendChild(img);
            console.log(img)
        })
        .catch(function (error) {
            console.error('oops, something went wrong!', error);
        });

  }


  render(props) {
    console.log(this.props);
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
