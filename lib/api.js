module.exports = function(app, db) {
    app.get('/api/customer', function(req, res) {
        var st = db.prepare('SELECT * FROM customer ORDER BY id DESC LIMIT 100')
        res.send(st.all())
    })

    app.get('/api/customer/:id', function(req, res) {
        var st = db.prepare('SELECT * FROM customer WHERE id = ?')
        var row = st.get(req.params.id)
        if (!row)
            res.status(HTTP_NOT_FOUND)
        res.send(row)
    })

    app.post('/api/customer', function(req, res) {
        var st = db.prepare('INSERT INTO customer(name, address, contact) VALUES (?, ?, ?)')
        var info = st.run(req.fields.name, req.fields.address, req.fields.contact)
        if (info.changes == 0)
            res.status(HTTP_BAD_REQUEST)
        var row = db.prepare('SELECT * FROM customer WHERE id = ?').get(info.lastInsertRowid)
        res.send(row)
    })

    app.put('/api/customer/:id', function(req, res) {
        var st = db.prepare('UPDATE customer SET name = ?, address = ?, contact = ? WHERE id = ?')
        var info = st.run(req.fields.name, req.fields.address, req.fields.contact, req.params.id)
        if (info.changes == 0)
            res.status(HTTP_BAD_REQUEST)
        res.send(req.fields)
    })
    app.get('/api/sale', function(req, res) {
        var st = db.prepare('SELECT * FROM sale ORDER BY id DESC LIMIT 100')
        res.send(st.all())
    })

    app.get('/api/sale/:id', function(req, res) {
        var st = db.prepare('SELECT * FROM sale WHERE id = ?')
        var row = st.get(req.params.id)
        if (!row)
            res.status(HTTP_NOT_FOUND)
        res.send(row)
    })

    app.post('/api/sale', function(req, res) {
        var st = db.prepare('INSERT INTO sale(customer_id, job_order, weight, username, note, terms, void) VALUES (?, ?, ?, ?, ?, ?, ?)')
        var info = st.run(req.fields.customer_id, req.fields.job_order, req.fields.weight, req.fields.username, req.fields.note, req.fields.terms, req.fields.void)
        if (info.changes == 0)
            res.status(HTTP_BAD_REQUEST)
        var row = db.prepare('SELECT * FROM sale WHERE id = ?').get(info.lastInsertRowid)
        res.send(row)
    })

    app.put('/api/sale/:id', function(req, res) {
        var st = db.prepare('UPDATE sale SET customer_id = ?, job_order = ?, weight = ?, username = ?, note = ?, terms = ?, void = ? WHERE id = ?')
        var info = st.run(req.fields.customer_id, req.fields.job_order, req.fields.weight, req.fields.username, req.fields.note, req.fields.terms, req.fields.void, req.params.id)
        if (info.changes == 0)
            res.status(HTTP_BAD_REQUEST)
        res.send(req.fields)
    })
    app.get('/api/item', function(req, res) {
        var st = db.prepare('SELECT * FROM item ORDER BY id DESC LIMIT 100')
        res.send(st.all())
    })

    app.get('/api/item/:id', function(req, res) {
        var st = db.prepare('SELECT * FROM item WHERE id = ?')
        var row = st.get(req.params.id)
        if (!row)
            res.status(HTTP_NOT_FOUND)
        res.send(row)
    })

    app.post('/api/item', function(req, res) {
        var st = db.prepare('INSERT INTO item(name, size, unit, qty, weight) VALUES (?, ?, ?, ?, ?)')
        var info = st.run(req.fields.name, req.fields.size, req.fields.unit, req.fields.qty, req.fields.weight)
        if (info.changes == 0)
            res.status(HTTP_BAD_REQUEST)
        var row = db.prepare('SELECT * FROM item WHERE id = ?').get(info.lastInsertRowid)
        res.send(row)
    })

    app.put('/api/item/:id', function(req, res) {
        var st = db.prepare('UPDATE item SET name = ?, size = ?, unit = ?, qty = ?, weight = ? WHERE id = ?')
        var info = st.run(req.fields.name, req.fields.size, req.fields.unit, req.fields.qty, req.fields.weight, req.params.id)
        if (info.changes == 0)
            res.status(HTTP_BAD_REQUEST)
        res.send(req.fields)
    })
    app.get('/api/coil_design', function(req, res) {
        var st = db.prepare('SELECT * FROM coil_design ORDER BY id DESC LIMIT 100')
        res.send(st.all())
    })

    app.get('/api/coil_design/:id', function(req, res) {
        var st = db.prepare('SELECT * FROM coil_design WHERE id = ?')
        var row = st.get(req.params.id)
        if (!row)
            res.status(HTTP_NOT_FOUND)
        res.send(row)
    })

    app.post('/api/coil_design', function(req, res) {
        var st = db.prepare('INSERT INTO coil_design(design) VALUES (?)')
        var info = st.run(req.fields.design)
        if (info.changes == 0)
            res.status(HTTP_BAD_REQUEST)
        var row = db.prepare('SELECT * FROM coil_design WHERE id = ?').get(info.lastInsertRowid)
        res.send(row)
    })

    app.put('/api/coil_design/:id', function(req, res) {
        var st = db.prepare('UPDATE coil_design SET design = ? WHERE id = ?')
        var info = st.run(req.fields.design, req.params.id)
        if (info.changes == 0)
            res.status(HTTP_BAD_REQUEST)
        res.send(req.fields)
    })
    app.get('/api/coil', function(req, res) {
        var st = db.prepare('SELECT * FROM coil ORDER BY id DESC LIMIT 100')
        res.send(st.all())
    })

    app.get('/api/coil/:id', function(req, res) {
        var st = db.prepare('SELECT * FROM coil WHERE id = ?')
        var row = st.get(req.params.id)
        if (!row)
            res.status(HTTP_NOT_FOUND)
        res.send(row)
    })

    app.post('/api/coil', function(req, res) {
        var st = db.prepare('INSERT INTO coil(color, thickness, width, length, weight, serial, code) VALUES (?, ?, ?, ?, ?, ?, ?)')
        var info = st.run(req.fields.color, req.fields.thickness, req.fields.width, req.fields.length, req.fields.weight, req.fields.serial, req.fields.code)
        if (info.changes == 0)
            res.status(HTTP_BAD_REQUEST)
        var row = db.prepare('SELECT * FROM coil WHERE id = ?').get(info.lastInsertRowid)
        res.send(row)
    })

    app.put('/api/coil/:id', function(req, res) {
        var st = db.prepare('UPDATE coil SET color = ?, thickness = ?, width = ?, length = ?, weight = ?, serial = ?, code = ? WHERE id = ?')
        var info = st.run(req.fields.color, req.fields.thickness, req.fields.width, req.fields.length, req.fields.weight, req.fields.serial, req.fields.code, req.params.id)
        if (info.changes == 0)
            res.status(HTTP_BAD_REQUEST)
        res.send(req.fields)
    })
    app.get('/api/precut-coil', function(req, res) {
        var st = db.prepare('SELECT * FROM precut_coil ORDER BY id DESC LIMIT 100')
        res.send(st.all())
    })

    app.get('/api/precut-coil/:id', function(req, res) {
        var st = db.prepare('SELECT * FROM precut_coil WHERE id = ?')
        var row = st.get(req.params.id)
        if (!row)
            res.status(HTTP_NOT_FOUND)
        res.send(row)
    })

    app.post('/api/precut-coil', function(req, res) {
        var st = db.prepare('INSERT INTO precut_coil(design, color, thickness, width, length, code, qty) VALUES (?, ?, ?, ?, ?, ?, ?)')
        var info = st.run(req.fields.design, req.fields.color, req.fields.thickness, req.fields.width, req.fields.length, req.fields.code, req.fields.qty)
        if (info.changes == 0)
            res.status(HTTP_BAD_REQUEST)
        var row = db.prepare('SELECT * FROM precut_coil WHERE id = ?').get(info.lastInsertRowid)
        res.send(row)
    })

    app.put('/api/precut-coil/:id', function(req, res) {
        var st = db.prepare('UPDATE precut_coil SET design = ?, color = ?, thickness = ?, width = ?, length = ?, code = ?, qty = ? WHERE id = ?')
        var info = st.run(req.fields.design, req.fields.color, req.fields.thickness, req.fields.width, req.fields.length, req.fields.code, req.fields.qty, req.params.id)
        if (info.changes == 0)
            res.status(HTTP_BAD_REQUEST)
        res.send(req.fields)
    })
    app.get('/api/sale-item', function(req, res) {
        var st = db.prepare('SELECT * FROM sale_item ORDER BY id DESC LIMIT 100')
        res.send(st.all())
    })

    app.get('/api/sale-item/:id', function(req, res) {
        var st = db.prepare('SELECT * FROM sale_item WHERE id = ?')
        var row = st.get(req.params.id)
        if (!row)
            res.status(HTTP_NOT_FOUND)
        res.send(row)
    })

    app.post('/api/sale-item', function(req, res) {
        var st = db.prepare('INSERT INTO sale_item(sale_id, name, size, qty, price, item_id, void) VALUES (?, ?, ?, ?, ?, ?, ?)')
        var info = st.run(req.fields.sale_id, req.fields.name, req.fields.size, req.fields.qty, req.fields.price, req.fields.item_id, req.fields.void)
        if (info.changes == 0)
            res.status(HTTP_BAD_REQUEST)
        var row = db.prepare('SELECT * FROM sale_item WHERE id = ?').get(info.lastInsertRowid)
        res.send(row)
    })

    app.put('/api/sale-item/:id', function(req, res) {
        var st = db.prepare('UPDATE sale_item SET sale_id = ?, name = ?, size = ?, qty = ?, price = ?, item_id = ?, void = ? WHERE id = ?')
        var info = st.run(req.fields.sale_id, req.fields.name, req.fields.size, req.fields.qty, req.fields.price, req.fields.item_id, req.fields.void, req.params.id)
        if (info.changes == 0)
            res.status(HTTP_BAD_REQUEST)
        res.send(req.fields)
    })
    app.get('/api/sale-coil', function(req, res) {
        var st = db.prepare('SELECT * FROM sale_coil ORDER BY id DESC LIMIT 100')
        res.send(st.all())
    })

    app.get('/api/sale-coil/:id', function(req, res) {
        var st = db.prepare('SELECT * FROM sale_coil WHERE id = ?')
        var row = st.get(req.params.id)
        if (!row)
            res.status(HTTP_NOT_FOUND)
        res.send(row)
    })

    app.post('/api/sale-coil', function(req, res) {
        var st = db.prepare('INSERT INTO sale_coil(sale_id, design, color, thickness, width, code, length, qty, price, void) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)')
        var info = st.run(req.fields.sale_id, req.fields.design, req.fields.color, req.fields.thickness, req.fields.width, req.fields.code, req.fields.length, req.fields.qty, req.fields.price, req.fields.void)
        if (info.changes == 0)
            res.status(HTTP_BAD_REQUEST)
        var row = db.prepare('SELECT * FROM sale_coil WHERE id = ?').get(info.lastInsertRowid)
        res.send(row)
    })

    app.put('/api/sale-coil/:id', function(req, res) {
        var st = db.prepare('UPDATE sale_coil SET sale_id = ?, design = ?, color = ?, thickness = ?, width = ?, code = ?, length = ?, qty = ?, price = ?, void = ? WHERE id = ?')
        var info = st.run(req.fields.sale_id, req.fields.design, req.fields.color, req.fields.thickness, req.fields.width, req.fields.code, req.fields.length, req.fields.qty, req.fields.price, req.fields.void, req.params.id)
        if (info.changes == 0)
            res.status(HTTP_BAD_REQUEST)
        res.send(req.fields)
    })
    app.get('/api/job_order_coil', function(req, res) {
        var st = db.prepare('SELECT * FROM job_order_coil ORDER BY id DESC LIMIT 100')
        res.send(st.all())
    })

    app.get('/api/job_order_coil/:id', function(req, res) {
        var st = db.prepare('SELECT * FROM job_order_coil WHERE id = ?')
        var row = st.get(req.params.id)
        if (!row)
            res.status(HTTP_NOT_FOUND)
        res.send(row)
    })

    app.post('/api/job_order_coil', function(req, res) {
        var st = db.prepare('INSERT INTO job_order_coil(job_order, coil_id) VALUES (?, ?)')
        var info = st.run(req.fields.job_order, req.fields.coil_id)
        if (info.changes == 0)
            res.status(HTTP_BAD_REQUEST)
        var row = db.prepare('SELECT * FROM job_order_coil WHERE id = ?').get(info.lastInsertRowid)
        res.send(row)
    })

    app.put('/api/job_order_coil/:id', function(req, res) {
        var st = db.prepare('UPDATE job_order_coil SET job_order = ?, coil_id = ? WHERE id = ?')
        var info = st.run(req.fields.job_order, req.fields.coil_id, req.params.id)
        if (info.changes == 0)
            res.status(HTTP_BAD_REQUEST)
        res.send(req.fields)
    })
    app.get('/api/job_order_precut_coil', function(req, res) {
        var st = db.prepare('SELECT * FROM job_order_precut_coil ORDER BY id DESC LIMIT 100')
        res.send(st.all())
    })

    app.get('/api/job_order_precut_coil/:id', function(req, res) {
        var st = db.prepare('SELECT * FROM job_order_precut_coil WHERE id = ?')
        var row = st.get(req.params.id)
        if (!row)
            res.status(HTTP_NOT_FOUND)
        res.send(row)
    })

    app.post('/api/job_order_precut_coil', function(req, res) {
        var st = db.prepare('INSERT INTO job_order_precut_coil(job_order, precut_coil_id) VALUES (?, ?)')
        var info = st.run(req.fields.job_order, req.fields.precut_coil_id)
        if (info.changes == 0)
            res.status(HTTP_BAD_REQUEST)
        var row = db.prepare('SELECT * FROM job_order_precut_coil WHERE id = ?').get(info.lastInsertRowid)
        res.send(row)
    })

    app.put('/api/job_order_precut_coil/:id', function(req, res) {
        var st = db.prepare('UPDATE job_order_precut_coil SET job_order = ?, precut_coil_id = ? WHERE id = ?')
        var info = st.run(req.fields.job_order, req.fields.precut_coil_id, req.params.id)
        if (info.changes == 0)
            res.status(HTTP_BAD_REQUEST)
        res.send(req.fields)
    })
}
