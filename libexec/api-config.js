var fs          = require('fs')
var api         = require('../etc/api.json')
var tables      = fs.readFileSync(process.env.JELOPOS_ROOT + '/etc/tables').toString()
var columns     = {}
var datatypes   = {}
var attrs       = {}

tables  = tables.split('\n').map(function(line) {
    return line.split(' ')
})
tables.forEach(function(row) {
    var table       = row[0]
    var column      = row[1]
    var datatype    = row[2]
    var attributes  = row[3]
    if (!columns[table])
        columns[table] = []
    columns[table].push(column)
    datatypes[table + column] = datatype
    attrs[table + column] = attributes
})
api.forEach(function(object) {
    object.title = object.table.replace('_', ' ')
    object.columns = columns[object.table].map(function(name) {
        var datatype    = datatypes[object.table + name]
        var attributes  = attrs[object.table + name]
        return {
            name:       name,
            title:      name.replace('_', ' '),
            internal:   ~['id', 'created_at'].indexOf(name),
            datetime:   ~['created_at'].indexOf(name),
            required:   ~attributes.indexOf('NOTNULL'),
            integer:    datatype == 'INTEGER',
            real:       datatype == 'REAL'
        }
    })
})
fs.writeFileSync(process.env.JELOPOS_ROOT + '/etc/api-config.json', JSON.stringify({api: api}, null, 4))
