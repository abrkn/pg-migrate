var fs = require('fs')
, pgm = module.exports = {}

pgm.number = function(filename) {
    var match = /^(\d+).*\.sql$/i.exec(filename)
    if (!match) return null
    return +match[1]
}

pgm.find = function(dir, from, to) {
    return fs.readdirSync(dir)
    .filter(function(fn) {
        return pgm.number(fn) !== null
    })
    .map(function(fn) {
        return {
            number: pgm.number(fn),
            filename: fn
        }
    })
    .filter(function(f) {
        return f.number >= from && f.number <= to
    })
    .sort(function(a, b) {
        return a.number - b.number
    })
}
