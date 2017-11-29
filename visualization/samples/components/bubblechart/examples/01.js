d3.json('data.json', data => {
  var chart = VisPack.bubblechart()

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
    var n = parseInt(Math.random() * 30 + 5)
    var data = d3.range(n).map(d => ({value: Math.random() * 2 - 1, size: Math.random()}))
    update(data)
  })
})
