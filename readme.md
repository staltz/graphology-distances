# graphology-distances

Calculate euclidean distances of edges for [`graphology`](https://graphology.github.io/).

## Installation

```bash
npm install --save graphology-distances
```

## Usage

**Note: your graph must have numeric attributes `x` and `y` for all nodes!** Make sure you pass your graph through a layout algorithm prior to running this algorithm.

```js
import distances from 'graphology-distances';

// ...

// To retrieve the distances between nodes that have edges
const dist = distances(graph);

// To directly assign distance as an edge attribute
distances.assign(graph);
```

*Arguments*

- graph *Graph*: graph on which you want to calculate distances between nodes

## License
[MIT](https://tldrlegal.com/license/mit-license)
