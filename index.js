const isGraph = require('graphology-utils/is-graph');

function abstractDistances(assign, graph) {
  if (!isGraph(graph)) {
    throw new Error(
      'graphology-distances: the given graph is not a valid graphology instance.',
    );
  }

  const results = {};
  graph.forEachEdge((key, _attrs, _source, _target, sourceAttrs, targetAttrs) => {
    const dx = sourceAttrs.x - targetAttrs.x;
    const dy = sourceAttrs.y - targetAttrs.y;;
    const distance = Math.sqrt(dx * dx + dy * dy);
    if (assign) graph.setEdgeAttribute(key, 'distance', distance);
    else results[key] = distance;
  });

  if (!assign) return results;
}

var distances = abstractDistances.bind(null, false);
distances.assign = abstractDistances.bind(null, true);

module.exports = distances;
