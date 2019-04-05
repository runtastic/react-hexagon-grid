import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import HexagonGrid from '../src/HexagonGrid';
import times from 'lodash/times';

const HexGridDemo = () =>  {
  const getHexProps = (hexagon) => {
    return {
      style: {
        fill: '#007aff',
        stroke: 'white'
      },
      onClick: () => alert(`Hexagon n.${hexagon} has been clicked`)
    };
  }

  const renderHexagonContent = (hexagon) => {
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

  let hexagons = times(102, id => id);

  return (
    <HexagonGrid
    gridWidth={500}
    gridHeight={500}
    hexagons={hexagons}
    hexProps={getHexProps}
    renderHexagonContent={renderHexagonContent}
    />
  );
}

ReactDOM.render(
  <HexGridDemo />,
  document.getElementById('root')
);
