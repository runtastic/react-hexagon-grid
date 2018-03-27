# react-hexgrid

React component that renders a fully adaptable grid of flat-topped hexagons using SVG. The
component fills the container with the hexagons, properly adapting their size.

## Installation

`react-hexgrid` can be installed using [npm](https://npmjs.org/):

```
npm install --save react-hexgrid
```

## Basic usage

```javascript
import React from 'react';
import HexagonGrid from 'react-hexgrid';

const hexagons = [... //Put your content here];

React.render(
  <HexagonGrid
    containerWidth=300
    containerHeight=200
    hexagons={hexagons}
  />,
  document.getElementById('root')
);
```

See the [demo](./demo/) for a working example.

## Props

* `containerWidth`  - The width, in pixel, of the grid (**required**)
* `containerHeight` - Th height, in pixel, of the grid (**required**)
* `hexagons`        - An array of hexagon objects (**required**)
* `renderHexagon`   - A function to render each hexagon
* `hexProps`        - The props that will be assigned to each hexagon

## Contributing

1. Fork it
2. Create your feature branch (`git checkout -b my-new-feature`)
3. Commit your changes (`git commit -am 'Add some feature'`)
4. Push to the branch (`git push origin my-new-feature`)
5. Create new Pull Request
