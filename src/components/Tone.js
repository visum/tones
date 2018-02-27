import React, {Component} from 'react';
import styled from 'styled-components';

export default class Tone extends Component{

  constructor(props) {
    super(props);
    this.state =  {
      pitch: props.pitch || 440,
      volume: 0.8,
      type: "sine"
    };

    this.play = this.play.bind(this);
    this.stop = this.stop.bind(this);
  }

  componentWillMount() {
        this.ctx = this.props.context;
        this.gain = this.ctx.createGain();
        this.gain.connect(this.ctx.destination);
  }

  componentWillUnmount() {
    this.gain.disconnect();
    this.gain = null;
  }

  play() {
    if (!this.oscillator) {
      this.gain.gain.setTargetAtTime(this.props.volume, this.ctx.currentTime, 0);
      this.oscillator = this.ctx.createOscillator();
      this.oscillator.frequency.setValueAtTime(this.props.pitch, this.ctx.currentTime);
      this.oscillator.connect(this.gain);
      this.oscillator.start();
    }
  }

  stop() {
    if (this.oscillator) {
      this.oscillator.stop();
    }
    this.oscillator = null;
  }

  render() {
    const {pitch, volume} = this.props;
    return (<div>
      <span>Pitch: {pitch}Hz Volume:{volume}</span>
      <button onClick={this.play}>Start</button>
      <button onClick={this.stop}>Stop</button>
    </div>);
  }

}
