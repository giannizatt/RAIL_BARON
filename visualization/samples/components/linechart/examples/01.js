d3.json('data.json', data => {
  var chart = VisPack.linechart()
                .curve(d3.curveBasis)

  var svg = d3.select('svg')

  d3.select('button').on('click', function () {
    data.push({value: Math.random() * 2 - 1})
    update(data)
  })

  function update (data) {
    svg.datum(data)
        .call(chart)
  }

  update(data)
})
