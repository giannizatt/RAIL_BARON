;(function () {
  var version = '0.0.0'

  var setProps = function (build, options) {
    for (var k in options) {
      if (build.hasOwnProperty(k)) {
        build[k] = options[k]
      }
    }
  }

  var calcFit = function (element) {
    var ratio = element.attr('ratio')
    var factor = (ratio) ? (ratio.split(' ')[1] / ratio.split(' ')[0]) : 1
    var computedW = parseInt(window.getComputedStyle(element.node()).width.split('px')[0])
    var attrH = element.attr('height')
    var calcH = (attrH) || parseInt(computedW * factor)
    element.attr('viewBox', `0 0 ${parseInt(computedW)} ${parseInt(calcH)}`)
    return {width: computedW, height: calcH}
  }

  d3.select(window).on('resize', () => {
    d3.selectAll('[ratio]').each(function () {
      var ratio = d3.select(this).attr('ratio')
      var factor = (ratio) ? (ratio.split(' ')[1] / ratio.split(' ')[0]) : 1
      var computedW = parseInt(window.getComputedStyle(this).width.split('px')[0])
      var attrH = d3.select(this).attr('height')
      var calcH = (attrH) || parseInt(computedW * factor)
      if (this.__generator) {
        d3.select(this)
          .attr('viewBox', `0 0 ${parseInt(computedW)} ${parseInt(calcH)}`)
          .call(this.__generator.width(computedW).height(calcH))
      }
    })
  })

  if (!window.VisPack) window.VisPack = {version: version, setProps: setProps, calcFit: calcFit}
})()
