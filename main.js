Highcharts.addEvent(Highcharts.Series, "afterSetOptions", function (e) {
  var colors = Highcharts.getOptions().colors,
    i = 0,
    nodes = {};

  if (
    this instanceof Highcharts.Series.types.networkgraph &&
    e.options.id === "npm-deps"
  ) {
    e.options.nodes = [...bfs(e.options.data)];
  }
});

const colors = [
  "#7cb5ec",
  "#90ed7d",
  "#f7a35c",
  "#8085e9",
  "#f15c80",
  "#e4d354",
  "#2b908f",
  "#f45b5b",
  "#91e8e1",
  "#434348",
];

const bfs = (data) => {
  const queue = [{ id: "@angular/cli", level: 0 }];
  const visited = new Set(["@angular/cli"]);
  const finalNodes = [];

  let currentNode, neighbors, level;
  while (queue.length) {
    currentNode = queue.shift();
    level = currentNode.level + 1;
    neighbors = data
      .filter((d) => d[0] === currentNode.id || d[1] === currentNode.id)
      .map((d) => (d[0] === currentNode.id ? d[1] : d[0]));

    neighbors.forEach((n) => {
      if (!visited.has(n)) {
        visited.add(n);
        finalNodes.push({ id: n, level, color: colors[level % colors.length] });
        queue.push({ id: n, level });
      }
    });
  }

  console.log(finalNodes);
  return finalNodes;
};

import deps from "./angular.json" assert { type: "json" };

/** @type {import('highcharts')} */
Highcharts.chart("app", {
  chart: {
    type: "networkgraph",
    height: "100%",
    colors: [
      "#7cb5ec",
      "#434348",
      "#90ed7d",
      "#f7a35c",
      "#8085e9",
      "#f15c80",
      "#e4d354",
      "#2b908f",
      "#f45b5b",
      "#91e8e1",
    ],
  },
  title: {
    text: "The Indo-European Language Tree",
    align: "left",
  },
  subtitle: {
    text: "A Force-Directed Network Graph in Highcharts",
    align: "left",
  },
  plotOptions: {
    networkgraph: {
      keys: ["from", "to"],
      layoutAlgorithm: {
        enableSimulation: false,
      },
      colorByPoint: false,
    },
  },
  series: [
    {
      accessibility: {
        enabled: false,
      },
      dataLabels: {
        enabled: true,
        linkFormat: "",
      },
      id: "npm-deps",
      data: deps,
    },
  ],
});
