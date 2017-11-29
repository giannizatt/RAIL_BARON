var dataset = [3, 6, 3, 21, 7, 8, 5]

var myLine = d3.line()
                .x(function(d, i){
                    return i * 10
                })
                .y(function(d, i){
                    return 250 - d * 10
                })
                .curve(d3.curveBasis)

d3.select('svg')
    .append('path')
    .attr('d', myLine(dataset))
    .style('fill', 'none')
    .style('stroke', 'blue')
