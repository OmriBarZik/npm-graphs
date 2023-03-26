// Highcharts.addEvent(Highcharts.Series, "afterSetOptions", function (e) {
//   var colors = Highcharts.getOptions().colors,
//     i = 0,
//     nodes = {};

//   if (
//     this instanceof Highcharts.Series.types.networkgraph &&
//     e.options.id === "lang-tree"
//   ) {
//     e.options.data.forEach(function (link) {
//       if (link[0] === "Proto Indo-European") {
//         nodes["Proto Indo-European"] = {
//           id: "Proto Indo-European",
//           marker: {
//             radius: 20,
//           },
//         };
//         nodes[link[1]] = {
//           id: link[1],
//           marker: {
//             radius: 10,
//           },
//           color: colors[i++],
//         };
//       } else if (nodes[link[0]] && nodes[link[0]].color) {
//         nodes[link[1]] = {
//           id: link[1],
//           color: nodes[link[0]].color,
//         };
//       }
//     });

//     e.options.nodes = Object.keys(nodes).map(function (id) {
//       return nodes[id];
//     });
//   }
// });

import deps from "./list.json" assert { type: "json" };

/** @type {import('highcharts')} */
Highcharts.chart("app", {
  chart: {
    type: "networkgraph",
    height: "100%",
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
        enableSimulation: true,
        friction: -0.9,
      },
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
      id: "lang-tree",
      data: deps,
    },
  ],
});
