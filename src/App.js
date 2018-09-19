import React, { Component } from 'react';
import './App.css';
import Soundboard from './components/Soundboard/Soundboard'

class App extends Component {
  render() {
    return (
      <div className="App">
        <Soundboard />
      </div>
    );
  }
}

export default App;