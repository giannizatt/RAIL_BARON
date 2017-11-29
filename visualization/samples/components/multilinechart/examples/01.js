d3.json('data.json', data => {
  var colors = d3.scaleOrdinal(d3.schemeCategory10)

  var chart = VisPack.multilinechart()
                .curve(d3.curveBasis)
                .colors((d, i) => colors(i))

  var svg = d3.select('svg')

  d3.select('button').on('click', function () {
    var num = parseInt(Math.random() * 3) + 2
    var data = d3.range(num).map(d => {
      return {values: d3.range(10).map(d => ({ value: Math.random() }))}
    })
    update(data)
  })

  function update (data) {
    svg.datum(data)
        .call(chart)
        .on('pick', function () {
          var event = d3.event.detail
          d3.selectAll(event.group)
            .style('stroke', '#ccc')
          d3.select(event.el)
            .style('stroke', 'red')
        })
        .on('unpick', function () {
          var event = d3.event.detail
          d3.selectAll(event.group)
            .style('stroke', (d, i) => colors(i))
        })
  }

  update(data)
})
