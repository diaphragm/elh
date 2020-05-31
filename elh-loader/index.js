const { getOptions } = require('loader-utils')
const elh = require('elh')

module.exports = function(source, map) {
  this.cacheable()
  const options = getOptions(this) || {}

  return elh(source, options)
}
