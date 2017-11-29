;(function () {
  var ns = 'piechart' // namespace
  window.VisPack[ns] = function init () {
    // public config, default
    var width = 200
    var height = 200
    var margin = {top: 25, bottom: 25, left: 25, right: 25}
    var padding = {top: 10, bottom: 10, left: 10, right: 10}
    var innerRadius = 0
    var outerRadius = 50
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

        /*
            --------------------------------------
            Configurations
        */
        var pie = d3.pie()
          .value(d => d.value)
          .sort(null)

        var arc = d3.arc()
          .innerRadius(innerRadius)
          .outerRadius(outerRadius)

        var piedata = pie(data)

        eContainer.append('g').classed('chart', true)

        /*
            --------------------------------------
            Data binding
        */
        var elems = container
          .select('.chart')
          .attr('transform', `translate(${outerw / 2}, ${outerh / 2})`)
          .selectAll('.arc')
          .data(piedata)

        /*
            --------------------------------------
            Enter phase, elements need to be created
        */
        var enterElems = elems.enter()
          .append('path')
          .classed('arc', true)
          .each(function (d) {
            this._startAngle = 0
            this._endAngle = 0
          })

        /*
            --------------------------------------
            Update phase, elements need to be updated
        */
        elems.merge(enterElems)
          .transition()
          .duration(time)
          .ease(d3.easeCubicInOut)
          .attrTween('d', function (d) {
            const i1 = d3.interpolate(this._startAngle, d.startAngle)
            const i2 = d3.interpolate(this._endAngle, d.endAngle)
            this._startAngle = d.startAngle
            this._endAngle = d.endAngle
            return t => {
              d.startAngle = i1(t)
              d.endAngle = i2(t)
              return arc(d)
            }
          })
          .style('fill', colors)

        /*
            --------------------------------------
            Exit phase, elements need to go away
        */
        var exitElems = elems.exit()
            .transition()
            .duration(time / 2)
            .ease(d3.easeExpInOut)
            .style('opacity', 0)
            .remove()

        // keep a reference of the list of objects
        var _objects = elems.merge(enterElems).merge(exitElems)
        var group = _objects.nodes()

        /*
            --------------------------------------
            Mouse/Touch interactions
        */

        _objects.on('click', function (d, i, _group) {
          d._picked = true
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

    build.innerRadius = function (value) {
      if (!arguments.length) return innerRadius
      innerRadius = value
      return build
    }

    build.outerRadius = function (value) {
      if (!arguments.length) return outerRadius
      outerRadius = value
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
