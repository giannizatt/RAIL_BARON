d3.json('data.json', data => {
  var chart = VisPack.barchart()

  var svg = d3.select('svg')

  svg.datum(data)
    .call(chart)
    .on('pick', function () {
      var event = d3.event.detail
      d3.select(event.el).style('fill', 'red')
    })
    .on('unpick', function () {
      var event = d3.event.detail
      d3.selectAll(event.group).style('fill', null)
    })

  function update (data) {
    svg.datum(data)
        .call(chart)
  }

  d3.select('button').on('click', function () {
    data.push({value: Math.random() * 2 - 1})
    update(data)
  })
})

/*

var gen1 = VisPack.barchart(data)
d3.select('svg #chart1').call(gen1)

on(function(data){
  gen1.update(data)
})

var gen2 = VisPack.linechart(data)
d3.select('svg #chart2').call(gen2)
  .on('pick', function () {
    gen1.update(data)
  })

*/
