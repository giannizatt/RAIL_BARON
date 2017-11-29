
d3.csv('athletes_sochi.csv', function(err, data){
    
    console.log(data)
    
    var byAge = d3.nest()
                    .key(function(d, i){
                        return d.age
                    })
                    .sortKeys(d3.ascending)
                    .entries(data)
    
    console.log(byAge)
    
    var mapX = d3.scaleLinear()
                    .domain([12, 60])
                    .range([50, 450])
    
    var max = d3.max(byAge, function(d, i){
        return d.values.length
    })
    
    var mapY = d3.scaleLinear()
                    .domain([0, max])
                    .range([450, 50])
                    .nice()
    
    var myArea = d3.area()
                    .x(function(d, i){
                        return mapX(d.key)
                    })
                    .y1(function(d, i){
                        return mapY(d.values.length)
                    })
                    .y0(function(d, i){
                        return 450
                    })
        
    d3.select('svg')
        .append('path')
        .attr('d', myArea(byAge))
        .style('fill', 'orange')
    
    // axis Y
    var axisY = d3.axisLeft(mapY)
    
    d3.select('svg')
        .append('g')
        .attr('transform', 'translate(46,0)')
        .call(axisY)
    
    // axis X
    var axisX = d3.axisBottom(mapX)
    
    d3.select('svg')
        .append('g')
        .attr('transform', 'translate(0,454)')
        .call(axisX)
    
    var myGroups = d3.select('svg')
        .selectAll('.myDot')
        .data(byAge)
        .enter()
        .append('g')
        .classed('myDot', true)
        
    myGroups.append('circle')
        .attr('r', 5)
        .attr('cx', function(d, i){
            return mapX(d.key)
        })
        .attr('cy', function(d, i){
            return mapY(d.values.length)
        })
        .style('fill', 'red')
    
    myGroups.append('text')
        .text(function(d, i){
            return d.key
        })
        .attr('x', function(d, i){
            return mapX(d.key)
        })
        .attr('y', function(d, i){
            return mapY(d.values.length) - 12
        })
        .attr('text-anchor', 'middle')
        .style('opacity', 0)
    
    myGroups.on('mouseenter', function(){
        d3.select(this)
            .select('text')
            .style('opacity', 1)
    })
    
}) // chiusura callback

