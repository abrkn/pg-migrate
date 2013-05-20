var fs = require('fs')
, util = require('util')
, pgm = module.exports = {}

pgm.number = function(filename) {
    var match = /^(\d+).*\.sql$/i.exec(filename)
    if (!match) throw new Error(util.format('%s must start with a number and end in .sql', filename))
    return +match[1]
}

pgm.find = function(dir, from, to) {
    return fs.readdirSync(dir)
    .map(function(fn) {
        return {
            number: pgm.number(fn),
            filename: fn,
        }
    })
    .filter(function(f) {
        return f.number >= from && f.number <= to
    })
    .sort(function(a, b) {
        return a.number - b.number
    })
    .map(function(f) {
        return f.filename
    })
}
