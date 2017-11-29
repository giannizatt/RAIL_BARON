;(function () {
  var ns = 'linechart' // namespace
  window.VisPack[ns] = function init () {
    // public vars
    var width = 200
    var height = 200
    var margin = {top: 25, bottom: 25, left: 25, right: 25}
    var padding = {top: 10, bottom: 10, left: 10, right: 10}
    var curve = d3.curveLinear

    function build (selection) {
      selection.each(function (data, index) {
        /*
            --------------------------------------
            Common configurations
        */
        var element = d3.select(this)

        var time = 1000

        var outerw = width - margin.left - margin.right
        var outerh = height - margin.top - margin.bottom

        var innerw = outerw - padding.left - padding.right
        var innerh = outerh - padding.top - padding.bottom

        var container = element.selectAll('.' + ns)
            .data([null])

        var eContainer = container.enter()
            .append('g')
            .attr('transform', `translate(${margin.left},${margin.top})`)
            .classed(ns, true)

        container = container.merge(eContainer)

        eContainer.append('g')
          .append('rect')
          .classed('background', true)

        var back = container.select('.background')
            .attr('width', outerw)
            .attr('height', outerh)

        eContainer.append('g')
          .classed('chart', true)
          .attr('transform', `translate(${padding.left},${padding.top})`)
          .append('path')
          .classed('line', true)

        /*
            --------------------------------------
            Configurations
        */
        var extent = d3.extent(data, (d, i) => d.value)

        if (extent[0] > 0) extent[0] = 0

        var colw = innerw / data.length - 1

        var mapx = d3.scaleLinear()
          .domain([0, data.length - 1])
          .range([0, innerw])

        var mapy = d3.scaleLinear()
          .domain(extent)
          .nice()
          .range([innerh, 0])

        var gen = d3.line()
          .x((d, i) => mapx(i))
          .y((d, i) => mapy(d.value))
          .curve(curve)

        /*
            --------------------------------------
            Data binding
        */
        container
          .select('.line')
          .transition()
          .duration(time)
          .attr('d', gen(data))

        /*
            --------------------------------------
            Axis X
        */
        eContainer.append('g').classed('ax x', true)

        var xAxis = d3.axisBottom(mapx).ticks(6)

        container
            .select('.ax.x')
            .attr('transform', `translate(${padding.left},${outerh})`)
            .transition()
            .duration(time)
            .call(xAxis)

        /*
            --------------------------------------
            Axis Y
        */
        eContainer.append('g').classed('ax y', true)

        var yAxis = d3.axisLeft(mapy).ticks(6)

        container
            .select('.ax.y')
            .attr('transform', `translate(0,${padding.top})`)
            .transition()
            .duration(time)
            .call(yAxis)
      })
    }

    build.width = function (value) {
      if (!arguments.length) return width
      width = value
      return build
    }

    build.height = function (value) {
      if (!arguments.length) return height
      height = value
      return build
    }

    build.padding = function (options) {
      if (!arguments.length) return padding
      window.VisPack.setProps(padding, options)
      return build
    }

    build.margin = function (options) {
      if (!arguments.length) return margin
      window.VisPack.setProps(margin, options)
      return build
    }

    build.curve = function (value) {
      if (!arguments.length) return curve
      curve = value
      return build
    }

    return build
  }
})()
