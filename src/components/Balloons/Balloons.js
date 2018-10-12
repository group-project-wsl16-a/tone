import React, { Component } from "react";
import "./Balloons.css";
import { withRouter } from "react-router";
import html2canvas from "html2canvas";

export class Balloons extends Component {
  constructor(props) {
    super(props);
  }

  handleClick = type => {
    if (type === "menu") {
      this.props.history.push("/worldview");
    } else if (type === "record") {
    } else {
      window.location.reload();
    }
  };

  //SceenShot//

  takeScreenshot = () => {
    let body = document.querySelector("html");

    html2canvas(body).then(canvas => {
      let imgData = canvas.toDataURL("image/png");
      console.log(imgData);
    });
  };

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
        <button onClick={this.takeScreenshot} />
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
