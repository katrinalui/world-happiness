import * as d3 from "d3";

const width = 1000,
  height = 650;

const svg = d3.select('#map')
  .append('svg')
  .attr('width', width)
  .attr('height', height);

const g = svg.append('g');

const equirectangularProjection = d3.geoEquirectangular()
  .rotate([-10, 0])
  .translate([width/2, height/2]);

const geoPath = d3.geoPath()
    .projection(equirectangularProjection);

const color = d3.scaleThreshold()
    .domain([0, 2, 4, 6, 7.5])
    .range(["#f2f0f7", "#dadaeb", "#bcbddc", "#9e9ac8", "#756bb1", "#54278f"]);

function handleMouseOver(d, i) {
  // d3.select(this)
  // .attr('fill', "red");
  console.log(d.properties.name);
}

function handleMouseOut(d, i) {
  d3.select(this)
  .attr('fill', "#ccc");
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

  g.selectAll('path')
    .data(world.features)
    .enter()
    .append('path')
    .attr('fill', '#ccc')
    .attr('d', geoPath)
    .style("fill", function(d) {
		  return color(happinessByCountry[d.properties.name]);
    })
    .attr('stroke', '#FFF')
    .on("mouseover", handleMouseOver)
    .on("mouseout", handleMouseOut);
}
