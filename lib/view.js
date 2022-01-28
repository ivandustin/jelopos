module.exports = function(app, db) {
    app.get('/api/coil', function(req, res, next) {
        if (req.query.list) {
            // var st = db.prepare('SELECT DISTINCT design, color, thickness, width, code FROM coil JOIN coil_design')
            var st = db.prepare('SELECT DISTINCT color, thickness, width, code FROM coil')
            res.send(st.all())
        } else {
            next()
        }
    })

    app.get('/api/item', function(req, res, next) {
        if (req.query.inventory) {
            var st = db.prepare('SELECT name, size, unit, SUM(qty) AS qty, printf("%.2f", SUM(weight)) AS weight FROM item GROUP BY name, size, unit')
            res.send(st.all())
        } else {
            next()
        }
    })

    app.get('/api/coil', function(req, res, next) {
        if (req.query.inventory) {
            var st = db.prepare('SELECT color, thickness, width, printf("%.2f", SUM(length)) AS length, printf("%.2f", SUM(weight)) AS weight, serial, code, MAX(created_at) AS last_updated FROM coil GROUP BY color, thickness, width, serial, code')
            res.send(st.all())
        } else {
            next()
        }
    })

    app.get('/api/precut-coil', function(req, res, next) {
        if (req.query.inventory) {
            var st = db.prepare('SELECT design, color, thickness, width, length, code, MAX(created_at) AS last_updated, SUM(qty) as qty FROM precut_coil GROUP BY design, color, thickness, width, length, code')
            res.send(st.all())
        } else {
            next()
        }
    })

    app.get('/api/coil/:id', function(req, res, next) {
        if (req.query.serial) {
            var st = db.prepare('SELECT * FROM coil WHERE serial = ? ORDER BY id DESC LIMIT 1')
            var row = st.get(req.params.id)
            if (!row)
                res.status(HTTP_NOT_FOUND)
            res.send(row)
        } else {
            next()
        }
    })

    app.get('/api/sale', function(req, res, next) {
        if (req.query.customer_id) {
            var st = db.prepare('SELECT * FROM sale WHERE customer_id = ? ORDER BY id DESC')
            var rows = st.all(req.query.customer_id)
            res.send(rows)
        } else {
            next()
        }
    })

    app.get('/api/sale-item', function(req, res, next) {
        if (req.query.sale_id) {
            var st = db.prepare('SELECT * FROM sale_item WHERE sale_id = ?')
            var rows = st.all(req.query.sale_id)
            res.send(rows)
        } else {
            next()
        }
    })

    app.get('/api/sale-coil', function(req, res, next) {
        if (req.query.sale_id) {
            var st = db.prepare('SELECT * FROM sale_coil WHERE sale_id = ?')
            var rows = st.all(req.query.sale_id)
            res.send(rows)
        } else {
            next()
        }
    })

    app.get('/api/job_order_coil', function(req, res, next) {
        if (req.query.complete) {
            var st = db.prepare('SELECT * FROM job_order_coil INNER JOIN coil ON coil.id = job_order_coil.coil_id ORDER BY job_order_coil.created_at DESC LIMIT 500')
            var rows = st.all()
            res.send(rows)
        } else {
            next()
        }
    })
}
