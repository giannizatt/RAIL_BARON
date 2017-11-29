
var dataset = [3, 6, 2, 5, 11, 1]


var myRects = d3.select('svg')
    .selectAll('rect')
    .data(dataset)
    .enter()
    .append('rect')
    .attr('height', 0)
    .attr('x', function(d, i){
        return i*52
    })
    .attr('width', 50)
    .attr('y', 150)
    

myRects.transition()
    .duration(2000)
    .delay(function(d, i){
        return i * 300
    })
    .attr('y', function(d, i){
        return 150 - d*10
    })
    .attr('height', function(d, i){
        return d*10
    })
    

myRects.on('mouseenter', function(){
    d3.select(this)
        .transition()
        .duration(1000)
        .style('fill', 'red')
})  

