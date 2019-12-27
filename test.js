const Graph = require('graphology');
const test = require('tape');
const Distances = require('./index');
const DirectedGraph = Graph.DirectedGraph;

function makeGraph() {
  const edgeKeyGenerator = ({source, target}) => `${source}${target}`;
  const graph = new DirectedGraph({edgeKeyGenerator});
  graph.addNode(1, {x: 0, y: 0});
  graph.addNode(2, {x: 1, y: 0});
  graph.addNode(3, {x: 0, y: 1});
  graph.addNode(4, {x: 1, y: 1});
  graph.addNode(5, {x: 0, y: 2});
  graph.addNode(6, {x: 1, y: 2});
  graph.addEdge(1, 2);
  graph.addEdge(1, 3);
  graph.addEdge(1, 6);
  graph.addEdge(2, 5);
  graph.addEdge(3, 2);
  graph.addEdge(4, 5);
  graph.addEdge(4, 6);
  return graph;
}

test('calculates distances for basic graphs', function(t) {
  t.plan(7);

  const graph = makeGraph();

  const dist = Distances(graph);

  t.equals(dist['12'], 1, 'distance ok');
  t.equals(dist['13'], 1, 'distance ok');
  t.true(2.23 < dist['16'] && dist['16'] < 2.24, 'distance ok');
  t.true(2.23 < dist['25'] && dist['25'] < 2.24, 'distance ok');
  t.true(1.41 < dist['32'] && dist['32'] < 1.42, 'distance ok');
  t.true(1.41 < dist['45'] && dist['45'] < 1.42, 'distance ok');
  t.equals(dist['46'], 1);

  t.end();
});

test('calculates and assigns distances for basic graphs', function(t) {
  t.plan(7);

  const graph = makeGraph();

  Distances.assign(graph);

  const d12 = graph.getEdgeAttribute(1, 2, 'distance');
  const d13 = graph.getEdgeAttribute(1, 3, 'distance');
  const d16 = graph.getEdgeAttribute(1, 6, 'distance');
  const d25 = graph.getEdgeAttribute(2, 5, 'distance');
  const d32 = graph.getEdgeAttribute(3, 2, 'distance');
  const d45 = graph.getEdgeAttribute(4, 5, 'distance');
  const d46 = graph.getEdgeAttribute(4, 6, 'distance');
  t.equals(d12, 1, 'distance ok');
  t.equals(d13, 1, 'distance ok');
  t.true(2.23 < d16 && d16 < 2.24, 'distance ok');
  t.true(2.23 < d25 && d25 < 2.24, 'distance ok');
  t.true(1.41 < d32 && d32 < 1.42, 'distance ok');
  t.true(1.41 < d45 && d45 < 1.42, 'distance ok');
  t.equals(d46, 1);

  t.end();
});
