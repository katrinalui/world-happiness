import * as d3 from "d3";

const width = 1000,
  height = 650;

const svg = d3.select('#map')
  .append('svg')
  .attr('width', width)
  .attr('height', height);

const g = svg.append('g');

const mercatorProjection = d3.geoMercator()
  .rotate([-10, 0])
  .center([0, 45])
  .translate([width/2, height/2]);

const geoPath = d3.geoPath()
    .projection(mercatorProjection);

const color = d3.scaleThreshold()
    // .domain([0, 3.88, 4.18, 4.47, 4.91, 5.35, 6.14, 6.94, 7.22, 7.5])
    .domain([3, 3.5, 4, 4.5, 5, 5.5, 6, 6.5, 7, 7.5])
    .range(["#045071", "#066792", "#1881AF", "#3993BA", "#5FABCB", "#FFB570", "#FF9E45", "#FF8719", "#E76F00", "#B45600"]);
    // .range(["#044C68", "#056184", "#167AA0", "#348BAC", "#59A4C1", "#FFBA70", "#FFA646", "#FF9119", "#D36E00", "#A65600"]);
    // .range(["#001424", "#003b6d", "#0066b5", "#009bfc", "#acdcfe", "#ffd1b5", "#ffa26b", "#ff7219", "#c33c01", "#752701"]);

let happinessReport = {};

let tooltip = d3.select("#map")
                .append("div")
                .attr("class", "tooltip");

tooltip.append("div")
       .attr("class", "country-label");

tooltip.append("div")
       .attr("class", "happiness-rank");

tooltip.append("div")
       .attr("class", "happiness-score");

tooltip.append("div")
       .attr("class", "gdp-per-capita");

tooltip.append("div")
       .attr("class", "social-support");

tooltip.append("div")
       .attr("class", "life-expectancy");

tooltip.append("div")
       .attr("class", "freedom");

tooltip.append("div")
       .attr("class", "generosity");

tooltip.append("div")
       .attr("class", "trust");

function handleMouseOver(d, i) {
  d3.select(this)
    .transition()
    .duration(500)
    .style("cursor", "pointer");

  tooltip.select(".country-label")
    .html(d.properties.name);

  tooltip.select(".happiness-rank")
    .html("Happiness rank: " + happinessReport[d.properties.name].Happiness_Rank);

  tooltip.select(".happiness-score")
    .html("Happiness score: " + happinessReport[d.properties.name].Happiness_Score);

  tooltip.select(".gdp-per-capita")
    .html("GDP per capita: " + happinessReport[d.properties.name].GDP_per_Capita);

  tooltip.select(".social-support")
    .html("Social support: " + happinessReport[d.properties.name].Social_support);

  tooltip.select(".life-expectancy")
    .html("Healthy life expectancy: " + happinessReport[d.properties.name].Healthy_Life_Expectancy);

  tooltip.select(".freedom")
    .html("Freedom to make life choices: " + happinessReport[d.properties.name].Freedom);

  tooltip.select(".generosity")
    .html("Generosity: " + happinessReport[d.properties.name].Generosity);

  tooltip.select(".trust")
    .html("Trust: " + happinessReport[d.properties.name].Trust);

  tooltip
    .transition()
    .duration(500)
    .style("opacity", "1")
    .style("display", "block");
}

function handleMouseOut(d, i) {
  d3.select(this)
    .transition()
    .duration(500)
    .style("cursor", "normal");

  tooltip
    .transition()
    .duration(500)
    .style("opacity", "0")
    .style("display", "none");
}

function handleMouseMove(d) {
  tooltip.style('top', (d3.event.layerY + 10) + 'px')
    .style('left', (d3.event.layerX + 10) + 'px');
}

d3.queue()
  .defer(d3.json, "../data/countries.geo.json")
  .defer(d3.csv, "../data/world_happiness_report_2017.csv")
  .await(ready);

function ready(error, world, happiness) {
  if (error) throw error;

  let happinessByCountry = {};
  happiness.forEach(function(d) {
    happinessByCountry[d.Country] = Number(d.Happiness_Score);
  });

  happiness.forEach(function(d) {
    happinessReport[d.Country] = d;
  });

  g.selectAll('path')
    .data(world.features)
    .enter()
    .append('path')
    .attr('fill', '#ccc')
    .attr('d', geoPath)
    .attr("class", "country")
    .style("fill", function(d) {
		  return color(happinessByCountry[d.properties.name]);
    })
    .on("mouseover", handleMouseOver)
    .on("mousemove", handleMouseMove)
    .on("mouseout", handleMouseOut);
}

const x = d3.scaleLinear()
    .domain([0, 1])
    .range([0, 50]);

const xAxis = d3.axisBottom(x)
    .tickSize(13)
    .tickValues(color.domain());

const legend = d3.select("g").call(xAxis);

legend.select(".domain")
    .remove();

legend.selectAll("rect")
  .data(color.range().map(function(legendColor) {
    let d = color.invertExtent(legendColor);
    if (d[0] === null) d[0] = x.domain()[0];
    if (d[1] === null) d[1] = x.domain()[1];
    return d;
  }))
  .enter().insert("rect", ".tick")
    .attr("height", 8)
    .attr("x", function(d) { return x(d[0]); })
    .attr("width", function(d) { return x(d[1]) - x(d[0]); })
    .attr("fill", function(d) { return color(d[0]); });

legend.append("text")
    .attr("fill", "#000")
    .attr("font-weight", "bold")
    .attr("text-anchor", "start")
    .attr("y", -6)
    .text("Happiness Score");
