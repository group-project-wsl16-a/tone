import React, { Component } from "react";
import "./App.css";
import "./components/otherTest";

class App extends Component {
  render() {
    return (
      <div className="App">
        <canvas id="cnvs" resize />
        <div class="modes" />
        <div id="hint">Draw </div>
      </div>
    );
  }
}

export default App;
