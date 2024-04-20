/**
 * ---------------------------------------
 * This demo was created using amCharts 5.
 *
 * For more information visit:
 * https://www.amcharts.com/
 *
 * Documentation is available at:
 * https://www.amcharts.com/docs/v5/
 * ---------------------------------------
 */

// Create root element
// https://www.amcharts.com/docs/v5/getting-started/#Root_element
var root = am5.Root.new("chartdiv");

// Set themes
// https://www.amcharts.com/docs/v5/concepts/themes/
root.setThemes([am5themes_Animated.new(root)]);

// Create series
// https://www.amcharts.com/docs/v5/charts/flow-charts/
var series = root.container.children.push(
  am5flow.ChordDirected.new(root, {
    sourceIdField: "from",
    targetIdField: "to",
    valueField: "value",
    sort: "ascending"
  })
);

series.links.template.set("fillStyle", "source", "tooltipText", "{name}: {description}");

series.nodes.get("colors").set("step", 2);
series.nodes.data.setAll([
  { id: "ST", name: "Systems Thinking", details: "Analyzing and solving problems by understanding the system as a cohesive whole." },
    { id: "LE", name: "Leadership and Ethical Governance", details: "Promoting ethical leadership and governance throughout the organization." },
    { id: "ISP", name: "Innovation-Driven Strategic Planning", details: "Fostering innovation within the strategic planning processes." },
    { id: "CFVC", name: "Customer Focus and Value Creation", details: "Ensuring customer needs are central to the organization's value creation." },
    { id: "WE", name: "Workforce Engagement", details: "Engaging the workforce to enhance productivity and satisfaction." },
    { id: "DI", name: "Digital Innovation", details: "Incorporating digital technologies to improve processes and services." },
    { id: "RP", name: "Results-Driven Performance", details: "Focusing on measurable outcomes and results for continuous improvement." },
    { id: "RCG", name: "Regulatory Compliance and Governance", details: "Adhering to laws and regulations while upholding ethical standards." }
]);

series.nodes.data.setAll({
tooltipText: "{name}: {details}"
});
        


series.bullets.push(function (_root, _series, dataItem) {
  var bullet = am5.Bullet.new(root, {
    locationY: Math.random(),
    sprite: am5.Circle.new(root, {
      radius: 5,
      fill: dataItem.get("source").get("fill")
    })
  });

  bullet.animate({
    key: "locationY",
    to: 1,
    from: 0,
    duration: Math.random() * 1000 + 2000,
    loops: Infinity
  });

  return bullet;
});

series.nodes.labels.template.setAll({
  textType: "regular",
  fill: root.interfaceColors.get("background"),
  fontSize: "1.1em",
  radius: -5
});

series.nodes.bullets.push(function (_root, _series, dataItem) {
  return am5.Bullet.new(root, {
    sprite: am5.Circle.new(root, {
      radius: 20,
      fill: dataItem.get("fill")
    })
  });
});

series.children.moveValue(series.bulletsContainer, 0);

series.data.setAll([
  { from: "ST", to: "LE", value: 10, description: "Systems Thinking influences Leadership and Ethical Governance." },
  { from: "ST", to: "ISP", value: 10, description: "Systems Thinking drives Innovation-Driven Strategic Planning." },
  { from: "ST", to: "CFVC", value: 10, description: "Systems Thinking enhances Customer Focus and Value Creation." },
  { from: "ST", to: "WE", value: 10, description: "Systems Thinking supports Workforce Engagement." },
  { from: "ST", to: "DI", value: 10, description: "Systems Thinking encourages Digital Innovation." },
  { from: "ST", to: "RP", value: 10, description: "Systems Thinking underpins Results-Driven Performance." },
  { from: "ST", to: "RCG", value: 10, description: "Systems Thinking integrates with Regulatory Compliance and Governance." },
  { from: "LE", to: "ISP", value: 5, description: "Leadership and Ethical Governance facilitate Innovation-Driven Strategic Planning." },
  { from: "ISP", to: "CFVC", value: 5, description: "Innovation-Driven Strategic Planning contributes to Customer Focus and Value Creation." },
  { from: "CFVC", to: "WE", value: 5, description: "Customer Focus and Value Creation influences Workforce Engagement." },
  { from: "WE", to: "DI", value: 5, description: "Workforce Engagement drives Digital Innovation." },
  { from: "DI", to: "RP", value: 5, description: "Digital Innovation enhances Results-Driven Performance." },
  { from: "RP", to: "RCG", value: 5, description: "Results-Driven Performance informs Regulatory Compliance and Governance." },
  { from: "RCG", to: "ST", value: 5, description: "Regulatory Compliance and Governance feedback into Systems Thinking." }
]);

// Make stuff animate on load
series.appear(1000, 100);

// Configure tooltips for the connections
series.links.template.setAll({
  tooltipText: "{fromName} → {toName}: {description}"
});



// Safely add adapters with checks
if (series.links && series.links.template && series.links.template.adapter) {
  series.links.template.adapter.add("fromName", function(name, target) {
    return target.dataItem.sourceNode.dataItem.dataContext.name;
  });

  series.links.template.adapter.add("toName", function(name, target) {
    return target.dataItem.targetNode.dataItem.dataContext.name;
  });
} else {
  console.error("Adapter cannot be added because it is undefined.");
}