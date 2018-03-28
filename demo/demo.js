import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import HexagonGrid from '../src/HexagonGrid';
import times from 'lodash/times';

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

  renderHexagonContent(hexagon) {
    return (
      <text
        x="50%"
        y="50%"
        fontSize={100}
        fontWeight="lighter"
        style={{ fill: 'white' }}
        textAnchor="middle"
      >
        {hexagon}
      </text>
    );
  }

  render () {
    let hexagons = times(102, id => id);

    return (
      <HexagonGrid
        gridWidth={500}
        gridHeight={500}
        hexagons={hexagons}
        hexProps={this.getHexProps}
        renderHexagonContent={this.renderHexagonContent}
      />
    );
  }
}

ReactDOM.render(
  <HexGridDemo />,
  document.getElementById('root')
);
