## World Happiness - A visualization project

### Background and Overview

The World Happiness Report, published by the United Nations Sustainable Development Solutions Network, is a measure of happiness of countries around the globe. Variables that go into a country's happiness score include GDP per capita, social support, and freedom to make life choices. This project will present the 2017 data in a visual and interactive way using a choropleth map.

## Functionality & MVP

Users will be able to:
- [ ] View countries on a world map
- [ ] See at a glance which countries are happiest depending on the color of the overlay
- [ ] Hover over a country to get a detailed breakdown of its happiness score

## Wireframes

This app will consist of a single page that displays a world map and a legend.

When users hover over a country, a tooltip will be rendered to display the details of their happiness score.

![Wireframe](./docs/images/wireframe.png)

## Architecture and Technologies
This project will be implemented with the following technologies:

+ `JavaScript` for general application logic
+ `D3.js` for DOM manipulation and rendering
+ `GeoJSON` to format countries into polygons

In addition to the entry file, there will be two scripts involved in this project (tentative):
+ `map.js` - main application logic
+ `country.js` - represent a country

## Implementation Timeline

**Over the weekend:**
- [ ] Research D3.js and options for rendering a map
- [ ] Work through tutorials to learn how to use the D3 library

**Day 1:**
- [ ] Set up index.html with D3.js and webpack to bundle code
- [ ] Learn enough D3.js to render countries as polygons on the screen

**Day 2:**
- [ ] Continue with D3.js - countries should now be rendered and color-coded by happiness score
- [ ] Render a choropleth map of the world

**Day 3:**
- [ ] Continue with choropleth map if not yet completed
- [ ] Render a tooltip with corresponding data upon hovering over a country

**Day 4:**
- [ ] Add styling and animations

## Bonus features

- [ ] An option to view a list of the top 20 happiest countries and highlight them on the map
- [ ] The ability to toggle between renderings of previous years' reports
