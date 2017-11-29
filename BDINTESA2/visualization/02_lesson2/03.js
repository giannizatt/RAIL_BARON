var dataset = [
    {age:20},
    {age:12},
    {age:35},
    {age:23},
    {age:42}
]


function buildMyChart(){
    
    var myRects = d3.select('svg')
        .selectAll('rect')
        .data(dataset)

    myRects.enter()
        .append('rect')
        .attr('x', function(d, i){
            return i * 20
        })
        .attr('width', 19)
        .attr('height', function(d, i){
            return d.age
        })
        .attr('y', function(d, i){
            return 120 - d.age
        })
        .on('mouseenter', function(d, i){
            d.selected = true
            d3.select(this)
                .style('fill', 'yellow')
        })
    
    myRects.exit()
        .remove()
    
    myRects.attr('height', function(d, i){
            return d.age
        })
        .attr('y', function(d, i){
            return 120 - d.age
        })
    
}


d3.select('#add')
    .on('click', function(){
        dataset.push( {age:Math.random()*100} )
        buildMyChart()
    })

d3.select('#remove')
    .on('click', function(){
        dataset.splice( 0, 1)
        buildMyChart()
    })

d3.select('#update')
    .on('click', function(){
        dataset.forEach(function(d, i){
            d.age = 20
        })
        buildMyChart()
    })