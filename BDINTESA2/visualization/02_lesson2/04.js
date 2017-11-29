
d3.csv('athletes_sochi.csv', function(err, myData){
    
    if(err){
        console.log(err)
        return
    }
    
    console.log(myData)
    
    var maxWeight = d3.max(myData, function(d){
        return +d.weight
    })
    
    console.log(maxWeight)
    
    var mapX = d3.scaleLinear()
                    .domain([0, maxWeight])
                    .range([0, 500])
    
    var maxHeight = d3.max(myData, function(d){
        return +d.height
    })

    console.log(maxHeight)
    
    var mapY = d3.scaleLinear()
                    .domain([0, maxHeight])
                    .range([0, 300])
    
    d3.select('svg')
        .selectAll('circle')
        .data(myData)
        .enter()
        .append('circle')
        .attr('r', 5)
        .attr('cx', function(d, i){
            return mapX( d.weight )
        })
        .attr('cy', function(d, i){
            return mapY( d.height )
        })
        .style('opacity', .1)
    
})

