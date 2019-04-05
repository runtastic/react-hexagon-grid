import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import isFunction from 'lodash/isFunction';
import isEmpty from 'lodash/isEmpty';
import times from 'lodash/times';
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

const tryInvoke = (func, params = [], defaultValue = null) => {
  return isFunction(func) ? func(...params) : defaultValue;
}

const HexagonGrid = (props) => {
  const {
    hexagons,
    gridHeight,
    gridWidth,
    renderHexagonContent,
    hexProps,
    x,
    y,
  } = props;

  const [state, setState] = useState({
    columns: 1,
    hexSize: 1,
    hexWidth: 1,
    hexHeight: 1,
    rows: 0,
  });

  useEffect(() => {
    if (!isEmpty(hexagons) && gridWidth > 0 && gridHeight > 0) {
      setState(getGridDimensions(gridWidth, gridHeight, hexagons.length));
    }
  }, [hexagons, gridWidth, gridHeight]);

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
      width: gridWidth
    };
    if (row % 2 === 0) {
      dimensions.marginLeft = `${(state.hexSize / 2) * 3}px`;
    }
    return dimensions;
  };

  return (
    <svg width={gridWidth} height={gridHeight} x={x} y={y} >
      {
        times(state.rows, (row) => {
          const remaining = hexagons.length - (row * state.columns);
          const columns = remaining < state.columns ? remaining : state.columns;
          const rowDim = getRowDimensions(row);
          return (
            <svg key={row} width={rowDim.width} height={rowDim.height} y={rowDim.y}>
              {
                times(columns, (col) => {
                  const iHexagon = (row * columns) + col;
                  const hexagon = hexagons[iHexagon];
                  const hexDim = getHexDimensions(row, col);
                  const _hexProps = tryInvoke(hexProps, [hexagon], hexProps);
                  return (
                    <svg
                      key={iHexagon}
                      height={hexDim.height}
                      width={hexDim.width}
                      x={`${hexDim.x}px`}
                    >
                      <Hexagon {..._hexProps} flatTop>
                        { tryInvoke(renderHexagonContent, [hexagon], <tspan />) }
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
  renderHexagonContent: PropTypes.func,
  x: PropTypes.number,
  y: PropTypes.number
};

HexagonGrid.defaultProps = {
  hexProps: {},
  renderHexagonContent: null,
  x: 0,
  y: 0
};

export default HexagonGrid;

