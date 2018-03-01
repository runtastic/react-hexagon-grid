import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import HexagonGrid from '../src/HexagonGrid';

class HexGridDemo extends Component {
  getHexProps(hexagon) {
    return {
      style: {
        fill: '#007aff',
        stroke: 'white'
      },
      onClick: () => alert(`Hexagon n.${hexagon} has been clicked`)
    };
  }

  render () {
    let hexagons = Array.apply(null, {length: 100}).map(Number.call, Number);

    return (
      <HexagonGrid
        containerWidth={500}
        containerHeight={500}
        hexagons={hexagons}
        hexProps={this.getHexProps}
      />
    );
  }
}

ReactDOM.render(
  <HexGridDemo />,
  document.getElementById('root')
);
