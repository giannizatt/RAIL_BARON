d3.csv('athletes_sochi.csv', function(err, data){
    
    var byAge = d3.nest()
                    .key(function(d, i){
                        return d.age
                    })
                    .sortKeys(d3.ascending)
                    .entries(data)
    
    console.log(byAge)
    
    
    d3.select('svg')
        .selectAll('rect')
        .data(byAge)
        .enter()
        .append('rect')
        .attr('x', function(d, i){
            return i * 10
        })
        .attr('width', 9)
        .attr('height', function(d, i){
            return d.values.length
        })
        .attr('y', function(d, i){
            return 300 - d.values.length
        })
        .on('mouseenter', function(d){

            d3.selectAll('path').attr('opacity', 1)

            var male = d3.sum(d.values, function(c){
                if(c.gender == 'Male'){
                    return 1
                }else{
                    return 0
                }
            })
            
            var gender = [male, d.values.length-male]
            
            var pieGen = d3.pie()
            
            console.log(d)
            
            d3.select(this)
                .style('fill', 'red')
            
            updatePie( pieGen(gender) )
        })
        .on('mouseleave', function(d){
            d3.select(this)
                .style('fill', 'black')
        
            d3.selectAll('path').attr('opacity', 0)
        })
    
    
    function updatePie(datagender){
        
        var arc = d3.arc()
                    .innerRadius(20)
                    .outerRadius(80)
        
        var colors = ['steelblue', 'pink']
        
        var slices = d3.select('svg')
            .selectAll('path')
            .data(datagender)
            
        slices.enter()
            .append('path')
            .attr('transform', 'translate(300,150)')
            .style('fill', function(d, i){
                return colors[i]
            })
            .attr('d', function(d, i){
                return arc(d)
            })
        
        slices
            .attr('d', function(d, i){
                return arc(d)
            })
    }
    
    
    
})