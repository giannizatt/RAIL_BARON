d3.csv('athletes_sochi.csv', function(err, data){
    
    var byAge = d3.nest()
                    .key(function(d, i){
                        return d.age
                    })
                    .sortKeys(d3.ascending)
                    .entries(data)
        
    var myPie = d3.pie()
                    .value(function(d, i){
                        return d.values.length
                    })
    
    var pieData = myPie(byAge)
    
    console.log(pieData)
    
    var arc = d3.arc()
                .outerRadius(function(){
                    return 100
                })
                .innerRadius(function(){
                    return 20
                })
    
    var colors = d3.scaleOrdinal( d3.schemeCategory20 )
    
    d3.select('svg')
        .selectAll('path')
        .data(pieData)
        .enter()
        .append('path')
        .attr('transform', 'translate(120,120)')
        .attr('d', function(d, i){
            return arc(d)
        })
        .style('fill', function(d, i){
            return colors(i)
        })
    
})