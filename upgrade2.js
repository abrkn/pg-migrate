var fs = require('fs')
, path = require('path')
, async = require('async')

module.exports = function(dir, url, conn, cb) {
    var statePath = path.join(dir, 'migrations.json')
    if (!fs.existsSync(statePath)) return cb()
    var state = require(path.resolve(statePath))
    , databaseId = url.host + url.pathname
    , databaseState = state[databaseId]
    if (!databaseState) return cb()

    require('./upgrade1')(state, dir)

    console.log('Upgrading from v1.2 format to v2.0 format...')

    console.log(state)

    async.eachSeries(databaseState.completed, function(id, cb) {
        conn.query({
            text: [
                'INSERT INTO pg_migrate (migration_id)',
                'SELECT $1',
                'WHERE NOT EXISTS (',
                '   SELECT migration_id',
                '   FROM pg_migrate',
                '   WHERE migration_id = $1',
                ')'
            ].join('\n'),
            values: [id]
        }, cb)
    }, function(err) {
        if (err) return cb(err)
        delete state[databaseId]
        if (!Object.keys(state).length) return fs.unlink(statePath, cb)
        fs.writeFile(statePath, JSON.stringify(state, null, 4), cb)
    })
}
