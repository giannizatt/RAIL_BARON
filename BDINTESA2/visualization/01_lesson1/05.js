
var dataset = [3, 6, 2, 5, 11, 1]


d3.select('svg')
    .selectAll('rect')
    .data(dataset)
    .enter()
    .append('rect')
    .attr('width', 50)
    .attr('height', function(d, i){
        return d*10
    })
    .attr('x', function(d, i){
        return i*52
    })
    .attr('y', function(d, i){
        return 150 - d*10
    })
    

    