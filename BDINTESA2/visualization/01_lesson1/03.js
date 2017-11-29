


var myRect = d3.select('svg')
    .attr('width', 400)
    .append('rect')
    .attr('width', 100)
    .attr('height', 200)
    .attr('fill', 'red')


myRect.attr('stroke', 'green')
    .attr('stroke-width', 5)


d3.select('rect')
    .attr('x', 200)


var myGroup = d3.select('svg')
    .append('g')
    
myGroup.append('rect')
    
myGroup.append('text')
    .text('Ciaooooo')
    .attr('y', 100)
