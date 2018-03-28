import React, { Component } from 'react';
import PropTypes from 'prop-types';
import isFunction from 'lodash/isFunction';
import Hexagon from 'react-hexagon';

class HexagonGrid extends Component {
  constructor() {
    super();
    this.state = {
      columns: 1,
      hexSize: 1,
      hexWidth: 1,
      hexHeight: 1
    };
  }

  componentDidMount() {
    this.updateDimensions(this.props);
  }

  componentWillReceiveProps(nextProps) {
    this.updateDimensions(nextProps);
  }

  updateDimensions(props) {
    this.setState(this.getGridDimensions(props.gridWidth,
      props.gridHeight, props.hexagons.length));
  }

  getGridDimensions(gridWidth, gridHeight, N) {
    const a = (6 * gridHeight) / (gridWidth * Math.sqrt(3));
    const b = (gridHeight / (2 * gridWidth)) - 2;

    const columns = Math.ceil((-b + Math.sqrt((b * b) + (4 * N * a))) / (2 * a));

    const hexSize = Math.floor(gridWidth / ((3 * columns) + 0.5));

    return {
      columns,
      hexSize,
      hexWidth: hexSize * 2,
      hexHeight: Math.ceil(hexSize * Math.sqrt(3))
    };
  }

  getHexDimensions(row, col) {
    const dimensions = {
      width: `${this.state.hexWidth}px`,
      height: `${this.state.hexHeight}px`,
      x: col * this.state.hexSize * 3
    };
    if (row % 2 === 1) {
      dimensions.x += this.state.hexSize * (3 / 2);
    }
    return dimensions;
  }

  getRowDimensions(row) {
    const dimensions = {
      y: `${row * ((this.state.hexSize * (Math.sqrt(3) / 2)))}px`,
      height: `${this.state.hexHeight}px`,
      width: this.props.gridWidth
    };
    if (row % 2 === 0) {
      dimensions.marginLeft = `${(this.state.size / 2) * 3}px`;
    }
    return dimensions;
  }

  render() {
    let iHexagon = 0;
    const rows = Math.ceil(this.props.hexagons.length / this.state.columns);
    const x = this.props.x ? this.props.x : 0;
    const y = this.props.y ? this.props.y : 0;
    return (
      <svg width={this.props.gridWidth} height={this.props.gridHeight} x={x} y={y} >
        {
          Array.from(Array(rows).keys()).map((row) => {
            const remaining = this.props.hexagons.length - iHexagon;
            const columns = remaining < this.state.columns ? remaining : this.state.columns;
            const rowDim = this.getRowDimensions(row);
            return (
              <svg key={row} width={rowDim.width} height={rowDim.height} y={rowDim.y}>
                {
                  Array.from(Array(columns).keys()).map((col) => {
                    const hexagon = this.props.hexagons[iHexagon];
                    const hexDim = this.getHexDimensions(row, col);
                    const hexProps = isFunction(this.props.hexProps) ?
                            this.props.hexProps(hexagon) : this.props.hexProps;
                    return (
                      <svg
                        key={iHexagon++}
                        height={hexDim.height}
                        width={hexDim.width}
                        x={`${hexDim.x}px`}
                      >
                        <Hexagon {...hexProps} flatTop>
                          {
                            isFunction(this.props.renderHexagonContent) ?
                              this.props.renderHexagonContent(hexagon) : <tspan />
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
}

HexagonGrid.propTypes = {
  gridWidth: PropTypes.number.isRequired,
  gridHeight: PropTypes.number.isRequired,
  hexagons: PropTypes.arrayOf(PropTypes.any).isRequired,
  hexProps: PropTypes.object,
  renderHexagonContent: PropTypes.func
};

HexagonGrid.defaultProps = {
  hexProps: {},
  renderHexagonContent: null
};

export default HexagonGrid;
