import * as d3 from "d3";
import { countriesJson } from '../data/countries';
const happiness = require('../data/world_happiness_report_2017.csv');

const width = 1000,
  height = 650;

const svg = d3.select('#map')
  .append('svg')
  .attr('width', width)
  .attr('height', height);

const g = svg.append('g');

const equirectangularProjection = d3.geoEquirectangular()
  .translate([width/2, height/2]);

const geoPath = d3.geoPath()
    .projection(equirectangularProjection);

function handleMouseOver(d, i) {
  d3.select(this)
  .attr('fill', "red");
}

function handleMouseOut(d, i) {
  d3.select(this)
  .attr('fill', "#ccc");
}

g.selectAll('path')
  .data(countriesJson.features)
  .enter()
  .append('path')
  .attr('fill', '#ccc')
  .attr('d', geoPath)
  .attr('stroke', '#999')
  .on("mouseover", handleMouseOver)
  .on("mouseout", handleMouseOut);
