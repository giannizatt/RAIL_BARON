var dataset = [
    {name:"A", age:16},
    {name:"B", age:20},
    {name:"C", age:13}
]

console.log(dataset)

d3.select('svg')
    .selectAll('circle')
    .data(dataset)
    .enter()
    .append('circle')
    .attr('cx', function(d, i){
        return i*50
    })
    .attr('r', function(d, i){
        return d.age
    })