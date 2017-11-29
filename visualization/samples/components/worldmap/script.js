;(function () {
  var ns = 'worldmap' // namespace
  window.VisPack[ns] = function init () {
    // private vars
    var width = 200
    var height = 200
    var margin = {top: 25, bottom: 25, left: 25, right: 25}
    var padding = {top: 0, bottom: 0, left: 0, right: 0}
    var colors = null

    // the build/update function, where all the magic should happen
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

        /*
            --------------------------------------
            Configurations
        */
        var projection = d3.geoMercator()
                            .scale((innerw + 1) / 2 / Math.PI)
                            .translate([innerw / 2, innerh / 2])

        var genPath = d3.geoPath()
                    .projection(projection)

        /*
            --------------------------------------
            Data binding
        */
        var elems = container
            .select('.chart')
            .selectAll('path')
            .data(data) // needs to be a geo.json feature array

        /*
            --------------------------------------
            Enter phase, elements need to be created
        */
        var enterElems = elems.enter()
            .append('path')
            .classed('area', true)

        /*
            --------------------------------------
            Update phase, elements need to be updated
        */
        elems.merge(enterElems)
            .attr('d', genPath)
            .transition()
            .duration(time)
            .style('fill', colors)

        /*
            --------------------------------------
            Exit phase, elements need to go away
        */
        var exitElems = elems.exit()
            .remove()

        // keep a reference of the list of objects
        var _objects = elems.merge(enterElems).merge(exitElems)
        var group = _objects.nodes()

        /*
            --------------------------------------
            Mouse/Touch interactions
        */

        _objects.on('click', function (d, i, _group) {
          element.dispatch('pick', {detail: {datum: d, el: this, index: i, group: _group}})
        })

        back.on('click', function () {
          element.dispatch('unpick', {detail: {group: group}})
        })
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
