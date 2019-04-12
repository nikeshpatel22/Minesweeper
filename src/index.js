import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import MinesweeperBoard from './MinesweeperBoard';
import './index.scss';

class Game extends React.Component {
  state = {
    height: 8,
    width: 8
  };

  render() {
    const { height, width } = this.state;
    return (
      <div className="game">
        <MinesweeperBoard height={height} width={width}/>
      </div>
    );
  }
}

ReactDOM.render(<Game />, document.getElementById("root"));
