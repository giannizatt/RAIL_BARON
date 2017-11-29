d3.json('countries.geo.json', function(err, data){
    console.log(data)
    
    var projection = d3.geoMercator()
                            //.scale((500 + 1) / 2 / Math.PI)
                            .scale(900)
                            .translate([150, 850])
    
    var genPath = d3.geoPath()
                    .projection(projection)
    
    var colors = d3.scaleOrdinal( d3.schemeCategory20 ) 
    
    d3.select('svg')
        .selectAll('path')
        .data(data.features)
        .enter()
        .append('path')
        .attr('d', function(d, i){
            return genPath(d)
        })
        .style('fill', function(d, i){
            return colors(d.id)
        })
        .on('mouseenter', function(){
            d3.select(this)
                .style('fill', 'red')
        })
        .on('mouseleave', function(){
            d3.select(this)
                .style('fill', function(d, i){
                    return colors(d.id)
                })
        })
        
})