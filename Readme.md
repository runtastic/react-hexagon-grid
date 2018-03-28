# react-hexagon-grid

React component that renders a fully adaptable grid of flat-topped hexagons using SVG. The
component fills the container with the hexagons, adapting their size properly.

![react-hexagon-grid.gif](https://thumbs.gfycat.com/FrigidDisloyalFinch-size_restricted.gif)

## Installation

`react-hexagon-grid` can be installed using [npm](https://npmjs.org/):

```
npm install --save react-hexagon-grid
```

## Basic usage

```javascript
import React from 'react';
import HexagonGrid from 'react-hexagon-grid';

const hexagons = [... /* Put your content here */];

React.render(
  <HexagonGrid
    gridWidth=300
    gridHeight=200
    hexagons={hexagons}
  />,
  document.getElementById('root')
);
```

See the [demo](./demo/) for a working example.

## Props

* `gridWidth`              - The width, in pixel, of the grid (**required**)
* `gridHeight`             - The height, in pixel, of the grid (**required**)
* `hexagons`               - An array of hexagon objects (**required**)
* `renderHexagonContent`   - A function to render the content of each hexagon
* `hexProps`               - The props that will be assigned to each hexagon

## Contributing

1. Fork it
2. Create your feature branch (`git checkout -b my-new-feature`)
3. Commit your changes (`git commit -am 'Add some feature'`)
4. Push to the branch (`git push origin my-new-feature`)
5. Create new Pull Request
