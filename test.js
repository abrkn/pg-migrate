var expect = require('expect.js')
, pgm = require('./')

describe('pg-migrate', function() {
    describe('number', function() {
        it('extracts number', function() {
            var input = '123-foo.sql'
            , output = pgm.number(input)
            expect(output).to.be(123)
        })

        it('extracts number', function() {
            var input = '001.sql'
            , output = pgm.number(input)
            expect(output).to.be(1)
        })
    })
})
