var dataset = [
    {name:"A", age:16},
    {name:"B", age:20},
    {name:"C", age:13}
]

console.log(dataset)

var myGroups = d3.select('svg')
    .selectAll('g')
    .data(dataset)
    .enter()
    .append('g')
    .attr('transform', function(d, i){
        //return 'translate(' + (i*41) + ', 0)'
        return `translate(${i*41}, 0)`
    })

myGroups.append('rect')
    .attr('width', 40)
    .attr('height', function(d, i){
        return d.age
    })
    .attr('y', function(d, i){
        return 100 - d.age
    })

myGroups.append('text')
    .text(function(d, i){
        return d.name
    })
    .attr('y', 120)