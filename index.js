var express             = require('express')
var expressFormidable   = require('express-formidable')
var betterSqlite3       = require('better-sqlite3')
var app                 = express()
var db                  = betterSqlite3(process.env.JELOPOS_DB)
var api                 = require('./lib/api.js')
var view                = require('./lib/view.js')
global.HTTP_NOT_FOUND   = 404
global.HTTP_BAD_REQUEST = 400
var static = express.static(process.env.JELOPOS_ROOT + '/srv')
app.use(expressFormidable())
app.use(static)
view(app, db)
api(app, db)
app.get('*', function(req, res) {
    res.sendFile('index.html', {
        root: process.env.JELOPOS_ROOT + '/srv'
    })
})
app.listen(3000)
