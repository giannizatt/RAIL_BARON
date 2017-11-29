var dataset = [3, 6, 3, 100, 5, 3, 6, 4, 1000, 23, 4, 5, 600]

var mapX = d3.scaleLinear()
            .domain([0, dataset.length-1])
            .range([0, 500])

var max = d3.max(dataset, function(d, i){
    return d
})

var mapY = d3.scaleLinear()
            .domain([0, max])
            .range([0, 500])

var myLine = d3.area()
                .x(function(d, i){
                    return mapX(i)
                })
                .y1(function(d, i){
                    return 500 - mapY(d)
                })
                .y0(function(d, i){
                    return 500
                })
                //.curve(d3.curveBasis)

d3.select('svg')
    .append('path')
    .attr('d', myLine(dataset))
    .style('fill', 'blue')
    .style('stroke', 'red')
    .on('click', function(){
        d3.select(this)
            .style('fill', 'red')
    })
