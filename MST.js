class Vertex {
  constructor(name) {
    this.name = name;
    this.edges = [];
  }
}

class Edge {
  constructor(to, from, weight) {
    this.to = to;
    this.from = from;
    this.weight = weight;
  }
}

class MST {
  constructor(labels, data) {
    this.labels = labels; // List of vertices
    this.data = data; // Adjacency matrix of weights
    this.vertices = []; // List of vertex objects
    for (let i = 0; i < labels.length; i++) {
      this.vertices.push(new Vertex(labels[i]));
    }
  }

  createGraph() {
    for (let i = 0; i < this.labels.length; i++) {
      for (let j = i + 1; j < this.labels.length; j++) {
        if (this.data[i][j] === 0) continue; // No edge between i and j
        // Create edges between vertices
        let edge = new Edge(
          this.vertices[j],
          this.vertices[i],
          this.data[i][j]
        );
        this.vertices[i].edges.push(edge); // Add edge to vertex i
        this.vertices[j].edges.push(
          new Edge(this.vertices[i], this.vertices[j], this.data[i][j])
        ); // Add reverse edge for vertex j
      }
    }
  }

  findMST() {
    let n = this.vertices.length;
    let selected = Array(n).fill(false);
    selected[0] = true; // Starting with the first vertex
    let selectedEdgesCount = 0;

    while (selectedEdgesCount < n - 1) {
      let min = Infinity;
      let from = null;
      let to = null;

      // Find the smallest edge connecting the selected vertices to unselected vertices
      for (let i = 0; i < n; i++) {
        if (selected[i]) {
          let selectedVertex = this.vertices[i];
          for (let edge of selectedVertex.edges) {
            let toIndex = this.vertices.indexOf(edge.to);
            if (!selected[toIndex] && edge.weight < min) {
              min = edge.weight;
              from = selectedVertex.name;
              to = edge.to.name;
            }
          }
        }
      }

      // Mark the selected vertex
      let toIndex = this.labels.indexOf(to);
      selected[toIndex] = true;
      selectedEdgesCount++;

      // Output the selected edge
      console.log(`From ${from} to ${to}, weight: ${min}`);
    }
  }

  printGraph() {
    this.vertices.forEach((vertex) => {
      console.log(`Vertex ${vertex.name}:`);
      vertex.edges.forEach((edge) => {
        console.log(`  -> ${edge.to.name} (weight: ${edge.weight})`);
      });
    });
  }
}

let newMst = new MST(
  ["1", "2", "3", "4", "5", "6"],
  [
    [0, 6.7, 5.2, 2.8, 5.6, 3.6],
    [6.7, 0, 5.7, 7.3, 5.1, 3.2],
    [5.2, 5.7, 0, 3.4, 8.5, 4.0],
    [2.8, 7.3, 3.4, 0, 8, 4.4],
    [5.6, 5.1, 8.5, 8, 0, 4.6],
    [3.6, 3.2, 4, 4.4, 4.6, 0],
  ]
);

// Create the graph with the given labels and adjacency matrix
newMst.createGraph();
// Print the graph to verify the edges and weights
newMst.printGraph();
// Find and print the Minimum Spanning Tree
newMst.findMST();
