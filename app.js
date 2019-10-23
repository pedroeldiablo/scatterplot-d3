var width = 500;
var height = 500;
var padding = 50;

var data = regionData.filter(mustHaveKeys);

function mustHaveKeys(obj) {
  var keys = [
    'adultLiteracyRate',
    'extremePoverty',
    'urbanPopulationRate',
    'medianAge'
  ];
  for (var i = 0; i < keys.length; i++ ) {
    if (obj[keys[i]] === null ) return false;

  } return true;
}

var yScale = d3.scaleLinear()
  .domain(d3.extent(data, d => 
    d.adultLiteracyRate))
  .range([height - padding, padding]);

var xScale = d3.scaleLinear()
  .domain(d3.extent(data, d => 
    d.extremePovertyRate))
  .range([padding, width - padding]);

var xAxis = d3.axisBottom(xScale)
  .tickSize(-height + 2 * padding)
  .tickSizeOuter(0);


var yAxis = d3.axisLeft(yScale)
  .tickSize(-width + 2 * padding)
  .tickSizeOuter(0);


var colorScale = d3.scaleLinear()
  .domain(d3.extent(
    data, d =>
      d.medianAge))
  .range(['lightgreen', 'blue']);

var radiusScale = d3.scaleLinear()
  .domain(d3.extent(
    data, d => 
      d.urbanPopulationRate))
  .range([1, 10]);

var tooltip = d3.select('body')
  .append('div')
  .classed('tooltip', true);

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
  .data(data)
  .enter()
  .append('circle')
  .attr('cx', d => xScale(d.extremePovertyRate))
  .attr('cy', d => yScale(d.adultLiteracyRate))
  .attr('stroke', 'black')
  .attr('fill', d => colorScale(d.medianAge))
  .attr('r', d => radiusScale(d.urbanPopulationRate))
  .on('mousemove', showToolTip)
  .on('touchStart', showToolTip)
  .on('mouseout', hideToolTip)
  .on('touchEnd', hideToolTip);

d3.select('svg')
  .append('text')
  .attr('x', width /2)
  .attr('y', height - padding/2)
  .attr('dy', '1.5em')
  .style('text-anchor', 'middle')
  .text('Extreme Poverty Rate');

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
  .text('Adult Literacy Rate');

d3.select('svg')
  .append('text')
  .attr('x', width /2)
  .attr('y', height)
  .attr('dy', '1.5em')
  .style('text-anchor', 'middle')
  .text('Urban Percentage Population Rate 1 (' + (d3.min(
    data, d =>
      d.urbanPopulationRate)) + '%) - 10 (' + (d3.max(
    data, d =>
      d.urbanPopulationRate)) + '%)');

d3.select('svg')
  .append('text')
  .attr('x', width /2)
  .attr('y', height + padding/2)
  .attr('dy', '1.5em')
  .style('text-anchor', 'middle')
  .text('Median Age  light green (' + (d3.min(
    data, d =>
      d.medianAge)) + ') -  blue (' + (d3.max(
    data, d =>
      d.medianAge)) + ')');

function showToolTip(d) {
  tooltip
    .style('opacity', 1)
    .style('left', d3.event.x - (tooltip.node().offsetWidth /2) + 'px')
    .style('top', d3.event.y + 25 + 'px')
    .html(`
      <p>Region: ${d.region}</p>
      <p>Adult Literacy Rate: ${d.adultLiteracyRate}%</p>
      <p>Urban Population Rate: ${d.urbanPopulationRate}%</p>
      <p>Median Age: ${d.medianAge}</p>
      <p>Extreme Poverty Rate: ${d.extremePovertyRate}%</p>
      <p>Growth Rate: ${d.growthRate} per annum</p>
    `);  
}

function hideToolTip() {
  tooltip
    .style('opacity', 0);
}
