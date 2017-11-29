var dataset = [4, 2, 23, 16]

console.log(dataset)

var myPie = d3.pie()
                .value(function(d, i){
                    return d
                })
                

console.log( myPie(dataset) )


var myArc = d3.arc()
                .innerRadius(function(d, i){
                    return 0
                })
                .outerRadius(function(d, i){
                    return 100
                })


d3.select('svg')
    .append('path')
    .attr('transform', 'translate(100,100)')
    .attr('d', myArc({startAngle:0, endAngle:Math.PI/2}))