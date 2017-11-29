var dataset = [
    {age:20},
    {age:12},
    {age:35},
    {age:-23},
    {age:42}
]

d3.select('svg')
    .selectAll('rect')
    .data(dataset)
    .enter()
    .append('rect')
    .attr('width', 30)
    .attr('height', function(d, i){
        return Math.abs(d.age)
    })
    .attr('x', function(d, i){
        return i*32
    })
    .attr('y', function(d, i){
//        if(d.age > 0){
//            return 120 - Math.abs(d.age)
//        }else{
//            return 120
//        }
        return 120 - Math.max(d.age, 0)
    })
    .style('fill', function(d, i){
        if(d.age > 0){
            return 'green'
        }else{
            return 'red'
        }
    })