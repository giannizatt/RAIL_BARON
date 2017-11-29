;(function () {
  var ns = 'bubblechart' // namespace
  window.VisPack[ns] = function init () {
    // private vars
    var width = 200
    var height = 200
    var margin = {top: 25, bottom: 25, left: 25, right: 25}
    var padding = {top: 10, bottom: 10, left: 10, right: 10}
    var colors = null

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

        eContainer.append('g').classed('chart', true)
            .attr('transform', `translate(${padding.left},${padding.top})`)

        var extX = d3.extent(data, (d, i) => i)

        /*
            --------------------------------------
            Configurations
        */
        var mapx = d3.scaleTime()
          .domain(extX)
          .nice()
          .range([0, innerw])

        var extY = d3.extent(data, (d, i) => d.value)

        var mapy = d3.scaleLinear()
          .domain(extY)
          .nice()
          .range([innerh, 0])

        var maxR = d3.max(data, (d, i) => d.size)

        var mapr = d3.scaleLinear()
          .domain([0, maxR])
          .range([0, 10])

        /*
            --------------------------------------
            Data binding
        */
        var elems = container
          .select('.chart')
          .selectAll('circle')
          .data(data)

        /*
            --------------------------------------
            Enter phase, elements need to be created
        */
        var enterElems = elems.enter()
          .append('circle')
          .classed('dot', true)
          .attr('r', 0)
          .attr('cx', (d, i) => mapx(i))
          .attr('cy', d => mapy(d.value))

        /*
            --------------------------------------
            Update phase, elements need to be updated
        */
        elems.merge(enterElems).transition()
          .duration(time)
          .delay(time / 10)
          .attr('r', d => mapr(d.size))
          .attr('cx', (d, i) => mapx(i))
          .attr('cy', d => mapy(d.value))
          .style('fill', colors)

        /*
            --------------------------------------
            Exit phase, elements need to go away
        */
        var exitElems = elems.exit()
          .transition()
          .duration(500)
          .attr('r', 0)
          .remove()

        // keep a reference of the list of objects
        var _objects = elems.merge(enterElems).merge(exitElems)
        var group = _objects.nodes()

        /*
            --------------------------------------
            Mouse/Touch interactions
        */

        _objects.on('click', function (d, i, _group) {
          d._selected = true
          element.dispatch('pick', {detail: {datum: d, el: this, index: i, group: _group}})
        })

        back.on('click', function () {
          element.dispatch('unpick', {detail: {group: group}})
        })

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

    build.colors = function (value) {
      if (!arguments.length) return colors
      colors = value
      return build
    }

    return build
  }
})()
