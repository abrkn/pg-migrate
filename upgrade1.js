var pgm = require('./')
, fs = require('fs')

function legacyFind(dir) {
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
    .sort(function(a, b) {
        return a.number - b.number
    })
}


module.exports = function(state, path) {
    var uris = Object.keys(state)

    if (!uris.some(function(uri) {
        return state[uri].current !== undefined
    })) {
        return
    }

    console.log('Upgrading from v1.1 format to v1.2 format...')

    var all = legacyFind(path)

    uris.forEach(function(uri) {
        var server = state[uri]
        , current = server.current
        , files = all.filter(function(f) {
            return f.number <= current
        })

        server.completed = files.map(function(f) {
            return f.number
        });

        delete server.current
    })
}
