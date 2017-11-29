d3.json('countries.geo.json', data => {
  var colors = d3.scaleOrdinal(d3.schemeCategory20b)

  var chart = VisPack.worldmap()
      .colors((d, i) => colors(i))

  d3.select('svg')
      .datum(data.features)
      .call(chart)
      .on('pick', function () {
        var event = d3.event.detail
        console.log(event)
        d3.select(event.el)
            .style('fill', 'red')
      })
      .on('unpick', function () {
        var event = d3.event.detail
        console.log(event)
        d3.selectAll(event.group)
            .style('fill', (d, i) => colors(i))
      })
})
