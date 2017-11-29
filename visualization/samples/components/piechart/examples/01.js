d3.json('data.json', data => {
  var colors = d3.scaleOrdinal(d3.schemeCategory10)

  var chart = VisPack.piechart()
                    .innerRadius(20)
                    .colors((d, i) => colors(i))

  var svg = d3.select('svg')

  d3.select('button').on('click', function () {
    data.push({value: Math.random()})
    update(data)
  })

  function update (data) {
    svg.datum(data)
        .call(chart)
        .on('pick', function () {
          var event = d3.event.detail
          d3.select(event.el).style('fill', 'red')
        })
        .on('unpick', function () {
          var event = d3.event.detail
          d3.selectAll(event.group)
            .style('fill', (d, i) => colors(i))
        })
  }

  update(data)
})
