import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import isFunction from 'lodash/isFunction';
import Hexagon from 'react-hexagon';

const getGridDimensions = (gridWidth, gridHeight, N) => {
  const a = (6 * gridHeight) / (gridWidth * Math.sqrt(3));
  const b = (gridHeight / (2 * gridWidth)) - 2;

  const columns = Math.ceil((-b + Math.sqrt((b * b) + (4 * N * a))) / (2 * a));

  const hexSize = Math.floor(gridWidth / ((3 * columns) + 0.5));
  const rows = Math.ceil(N / columns);

  return {
    columns,
    hexSize,
    hexWidth: hexSize * 2,
    hexHeight: Math.ceil(hexSize * Math.sqrt(3)),
    rows,
  };
};

function HexagonGrid(props) {
  const [state, setState] = useState({
    columns: 1,
    hexSize: 1,
    hexWidth: 1,
    hexHeight: 1,
    rows: 0,
  });

  useEffect(() => {
    if (props.hexagons.length > 0) {
      setState(getGridDimensions(props.gridWidth,
        props.gridHeight, props.hexagons.length));
    }
  }, [props]);

  const getHexDimensions = (row, col) => {
    const dimensions = {
      width: `${state.hexWidth}px`,
      height: `${state.hexHeight}px`,
      x: col * state.hexSize * 3
    };
    if (row % 2 === 1) {
      dimensions.x += state.hexSize * (3 / 2);
    }
    return dimensions;
  };

  const getRowDimensions = (row) => {
    const dimensions = {
      y: `${row * ((state.hexSize * (Math.sqrt(3) / 2)))}px`,
      height: `${state.hexHeight}px`,
      width: props.gridWidth
    };
    if (row % 2 === 0) {
      dimensions.marginLeft = `${(state.hexSize / 2) * 3}px`;
    }
    return dimensions;
  };

  let iHexagon = 0;

  return (
    <svg width={props.gridWidth} height={props.gridHeight} x={props.x ? props.x : 0} y={props.y ? props.y : 0} >
      {
        Array.from(Array(state.rows).keys()).map((row) => {
          const remaining = props.hexagons.length - iHexagon;
          const columns = remaining < state.columns ? remaining : state.columns;
          const rowDim = getRowDimensions(row);
          return (
            <svg key={row} width={rowDim.width} height={rowDim.height} y={rowDim.y}>
              {
                Array.from(Array(columns).keys()).map((col) => {
                  const hexagon = props.hexagons[iHexagon];
                  const hexDim = getHexDimensions(row, col);
                  const hexProps = isFunction(props.hexProps) ?
                          props.hexProps(hexagon) : props.hexProps;
                  return (
                    <svg
                      key={iHexagon++}
                      height={hexDim.height}
                      width={hexDim.width}
                      x={`${hexDim.x}px`}
                    >
                      <Hexagon {...hexProps} flatTop>
                        {
                          isFunction(props.renderHexagonContent) ?
                            props.renderHexagonContent(hexagon) : <tspan />
                        }
                      </Hexagon>
                    </svg>
                  );
                })
              }
            </svg>
          );
        })
      }
    </svg>
  );
}

HexagonGrid.propTypes = {
  gridWidth: PropTypes.number.isRequired,
  gridHeight: PropTypes.number.isRequired,
  hexagons: PropTypes.arrayOf(PropTypes.any).isRequired,
  hexProps: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
  renderHexagonContent: PropTypes.func
};

HexagonGrid.defaultProps = {
  hexProps: {},
  hexagons: [],
  renderHexagonContent: null
};

export default HexagonGrid;
