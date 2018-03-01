import React, { Component } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import Hexagon from 'react-hexagon';

import { getGridDimensions } from './util/GridUtils';

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
    this.setState(getGridDimensions(props.containerWidth, props.containerWidth, props.hexagons.length));
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
      width: this.props.containerWidth
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
      <svg width={this.props.containerWidth} height={this.props.containerHeight} x={x} y={y} >
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
                    return (
                      <svg
                        key={iHexagon++}
                        height={hexDim.height}
                        width={hexDim.width}
                        x={`${hexDim.x}px`}
                      >
                        <Hexagon
                          flatTop
                          {...this.props.hexProps(hexagon)}
                        >
                          {
                            _.isFunction(this.props.renderHexagon) ?
                              this.props.renderHexagon(hexagon) : <tspan />
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
  containerWidth: PropTypes.number.isRequired,
  containerHeight: PropTypes.number.isRequired,
  hexagons: PropTypes.arrayOf(PropTypes.any).isRequired
};

export default HexagonGrid;
