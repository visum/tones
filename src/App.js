import React, { Component } from 'react';
import Tone from "./components/Tone";

const volumeDecay = function(index) {
  return (1/(index + 1)) * 0.2;
}

const overtones = 6;

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {tones:[]};

    this.calculateOvertones = this.calculateOvertones.bind(this);
    this.ctx = new AudioContext();
  }

  calculateOvertones(event) {
    const fundamental = parseInt(event.target.value, 10);
    const tones = [];
    for (let i = 0; i < overtones; i++) {
      tones[i] = {pitch: fundamental * (i + 1), volume: volumeDecay(i)};
    }
    this.setState({tones});


  }

  render() {
    return (
      <div>
        <h1>Tones!</h1>
        <h2>Base Pitch</h2>
        <input onChange={this.calculateOvertones}/>
        {this.state.tones.map(({pitch, volume}, index) => (<Tone pitch={pitch} volume={volume} context={this.ctx} key={index} />))}
      </div>
    );
  }
}

export default App;
