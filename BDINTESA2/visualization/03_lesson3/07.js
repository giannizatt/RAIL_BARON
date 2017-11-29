var dataset = [4, 2, 23, 16]

console.log(dataset)

var myPie = d3.pie()
                .value(function(d, i){
                    return d
                })
                
var pieDataset = myPie(dataset)
console.log( pieDataset )

var myArc = d3.arc()
                .innerRadius(function(d, i){
                    return 50
                })
                .outerRadius(function(d, i){
                    return 100
                })
                .startAngle(function(d, i){
                    return d.startAngle
                })

var colors = d3.scaleOrdinal( d3.schemeCategory20 )

d3.select('svg')
    .selectAll('path')
    .data(pieDataset)
    .enter()
    .append('path')
    .attr('transform', 'translate(120,120)')
    .attr('d', function(d, i){
        return myArc(d)
    })
    .style('fill', function(d, i){
        return colors(i)
    })