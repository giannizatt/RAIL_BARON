
var mapX = d3.scaleLinear()
                .domain([0, 100])
                .range([0, 500])

var myAxis = d3.axisTop(mapX)
                    .ticks(30)

d3.select('svg')
    .append('g')
    .attr('transform', 'translate(0, 50)')
    .call(myAxis)