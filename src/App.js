import React, { Component } from 'react';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="box" draggable='true' >
        </div>
        <div className='containerContainer'>
          <div className='playground' droppable='true' onDrop={() => console.log('dropped in container 1')} >
          </div>
          <div className='playground' droppable='true' onDrop={() => console.log('dropped in container 2')} >
          </div>
          <div className='playground' droppable='true' onDrop={() => console.log('dropped in container 3')} >
          </div>
          <div className='playground' droppable='true' onDrop={() => console.log('dropped in container 4')} >
          </div>
        </div>
      </div>
    );
  }
}

export default App;
