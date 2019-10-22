var width = 500;
var height = 500;
var padding =50;

var yScale = d3.scaleLinear()
  .domain(d3.extent(regionData, d => 
    d.subscribersPer100))
  .range([height - padding, padding]);

var xScale = d3.scaleLinear()
  .domain(d3.extent(regionData, d => 
    d.adultLiteracyRate))
  .range([padding, width - padding]);

var xAxis = d3.axisBottom(xScale)
  .tickSize(-height + 2 * padding)
  .tickSizeOuter(0);


var yAxis = d3.axisLeft(yScale)
  .tickSize(-width + 2 * padding)
  .tickSizeOuter(0);


var colorScale = d3.scaleLinear()
  .domain(d3.extent(
    regionData, d =>
      d.urbanPopulationRate))
  .range(['lightgreen', 'blue']);

var radiusScale = d3.scaleLinear()
  .domain(d3.extent(
    regionData, d => 
      d.extremePovertyRate))
  .range([1, 10]);

d3.select('svg')
  .append('g')
  .attr('transform', 'translate( 0, ' + (height - padding) + ')')
  .call(xAxis);

d3.select('svg')
  .append('g')
  .attr('transform', 'translate(' + padding + ',0)')
  .call(yAxis);

d3.select('svg')
  .attr('width', width + padding)
  .attr('height', height + padding)
  .selectAll('circle')
  .data(regionData)
  .enter()
  .append('circle')
  .attr('cx', d => xScale(d.adultLiteracyRate))
  .attr('cy', d => yScale(d.subscribersPer100))
  .attr('fill', d => colorScale(d.urbanPopulationRate))
  .attr('r', d => radiusScale(d.extremePovertyRate));

d3.select('svg')
  .append('text')
  .attr('x', width /2)
  .attr('y', height - padding/2)
  .attr('dy', '1.5em')
  .style('text-anchor', 'middle')
  .text('Adult Literacy Rate');

d3.select('svg')
  .append('text')
  .attr('x', width /2)
  .attr('y', 0)
  .attr('dy', '1.5em')
  .style('text-anchor', 'middle')
  .text('Regional Data on Poverty / Urbanisation');

d3.select('svg')
  .append('text')
  .attr('transform', 'rotate(-90)')
  .attr('x', - height /2)
  .attr('y', - (padding - 40 )  /2)
  .attr('dy', '1.5em')
  .style('text-anchor', 'middle')
  .text('Subscribers per 100');

d3.select('svg')
  .append('text')
  .attr('x', width /2)
  .attr('y', height)
  .attr('dy', '1.5em')
  .style('text-anchor', 'middle')
  .text('Urban Percentage Population Rate ' + (d3.min(
    regionData, d =>
      d.urbanPopulationRate)) + ' - ' + (d3.max(
    regionData, d =>
      d.urbanPopulationRate)));

d3.select('svg')
  .append('text')
  .attr('x', width /2)
  .attr('y', height + padding/2)
  .attr('dy', '1.5em')
  .style('text-anchor', 'middle')
  .text('Extreme Poverty Rate ' + (d3.min(
    regionData, d =>
      d.extremePovertyRate)) + ' - ' + (d3.max(
    regionData, d =>
      d.extremePovertyRate)));
