// svg setting
d3.select('svg')
    .attr('width', 500)
    .attr('height', 500)

// column 1
var g1 = d3.select('svg')
    .append('g')

g1.append('rect')
    .attr('width', 100)
    .attr('height', 100)
    .attr('y', 40)

g1.append('text')
    .text('First')
    .attr('y', 160)
    .attr('x', 50)
    .attr('text-anchor', 'middle')


// column 2
var g2 = d3.select('svg')
    .append('g')
    .attr('transform', 'translate(101,0)')

g2.append('rect')
    .attr('width', 100)
    .attr('height', 70)
    .attr('y', 70)

g2.append('text')
    .text('Second')
    .attr('y', 160)
    .attr('x', 50)
    .attr('text-anchor', 'middle')


d3.selectAll('rect')
    .on('click', function(){
        
        var me = d3.select(this)
        
        if(me.attr('fill') === 'red'){
            me.attr('fill', 'green')
        }else{
            me.attr('fill', 'red')
        }
    
    })