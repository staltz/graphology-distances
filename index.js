const isGraph = require('graphology-utils/is-graph');

function abstractDistances(assign, graph) {
  if (!isGraph(graph)) {
    throw new Error(
      'graphology-distances: the given graph is not a valid graphology instance.',
    );
  }

  const results = {};
  graph.forEachEdge((key, _attrs, source, target) => {
    const x1 = graph.getNodeAttribute(source, 'x');
    const y1 = graph.getNodeAttribute(source, 'y');
    const x2 = graph.getNodeAttribute(target, 'x');
    const y2 = graph.getNodeAttribute(target, 'y');
    const dx = x1 - x2;
    const dy = y1 - y2;
    const distance = Math.sqrt(dx * dx + dy * dy);
    if (assign) graph.setEdgeAttribute(key, 'distance', distance);
    else results[key] = distance;
  });

  if (!assign) return results;
}

var distances = abstractDistances.bind(null, false);
distances.assign = abstractDistances.bind(null, true);

module.exports = distances;
