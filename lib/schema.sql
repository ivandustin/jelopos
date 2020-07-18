-- WIDTH AND LENGTH UNITS SHALL BE ENCODED IN METER.
-- WEIGHT UNIT SHALL BE ENCODED IN KG.
-- SALE, ITEM, AND COIL TABLES REPRESENTS A LOG BOOK.

CREATE TABLE customer (
    id      INTEGER PRIMARY KEY,
    name    TEXT NOT NULL UNIQUE,
    address TEXT,
    contact TEXT
);

CREATE TABLE sale (
    id          INTEGER PRIMARY KEY,
    created_at  INTEGER NOT NULL DEFAULT (strftime('%s', 'now')),
    customer_id INTEGER NOT NULL,
    job_order   INTEGER UNIQUE,
    weight      REAL,
    username    TEXT    NOT NULL,
    note        TEXT,
    terms       TEXT,
    void        INTEGER NOT NULL DEFAULT 0,
    FOREIGN KEY (customer_id) REFERENCES customer(id)
);

CREATE TABLE item (
    id          INTEGER PRIMARY KEY,
    created_at  INTEGER NOT NULL DEFAULT (strftime('%s', 'now')),
    name        TEXT NOT NULL,
    size        TEXT NOT NULL,
    unit        TEXT NOT NULL,
    qty         INTEGER NOT NULL,
    weight      REAL NOT NULL
);

CREATE TABLE coil_design (
    id          INTEGER PRIMARY KEY,
    design      TEXT NOT NULL
);

CREATE TABLE coil (
    id          INTEGER PRIMARY KEY,
    created_at  INTEGER NOT NULL DEFAULT (strftime('%s', 'now')),
    color       TEXT NOT NULL,
    thickness   REAL NOT NULL,
    width       REAL NOT NULL,
    length      REAL NOT NULL,
    weight      REAL NOT NULL,
    serial      TEXT NOT NULL,
    code        TEXT NOT NULL
);

CREATE TABLE precut_coil (
    id          INTEGER PRIMARY KEY,
    created_at  INTEGER NOT NULL DEFAULT (strftime('%s', 'now')),
    design      TEXT NOT NULL,
    color       TEXT NOT NULL,
    thickness   REAL NOT NULL,
    width       REAL NOT NULL,
    length      REAL NOT NULL,
    code        TEXT NOT NULL,
    qty         INTEGER NOT NULL
);

CREATE TABLE sale_item (
    id              INTEGER PRIMARY KEY,
    created_at      INTEGER NOT NULL DEFAULT (strftime('%s', 'now')),
    sale_id         INTEGER NOT NULL,
    name            TEXT NOT NULL,
    size            TEXT NOT NULL,
    qty             INTEGER NOT NULL,
    price           REAL NOT NULL,
    item_id         INTEGER,
    void            INTEGER NOT NULL DEFAULT 0,
    FOREIGN KEY (sale_id)   REFERENCES sale(id),
    FOREIGN KEY (item_id)   REFERENCES item(id)
);

CREATE TABLE sale_coil (
    id              INTEGER PRIMARY KEY,
    created_at      INTEGER NOT NULL DEFAULT (strftime('%s', 'now')),
    sale_id         INTEGER NOT NULL,
    design          TEXT NOT NULL,
    color           TEXT NOT NULL,
    thickness       REAL NOT NULL,
    width           REAL NOT NULL,
    code            TEXT NOT NULL,
    length          TEXT NOT NULL,
    qty             INTEGER NOT NULL,
    price           REAL NOT NULL,
    void            INTEGER NOT NULL DEFAULT 0,
    FOREIGN KEY (sale_id) REFERENCES sale(id)
);

CREATE TABLE job_order_coil (
    id              INTEGER PRIMARY KEY,
    created_at      INTEGER NOT NULL DEFAULT (strftime('%s', 'now')),
    job_order       INTEGER NOT NULL,
    coil_id         INTEGER NOT NULL,
    FOREIGN KEY (coil_id) REFERENCES coil(id)
);

CREATE TABLE job_order_precut_coil (
    id              INTEGER PRIMARY KEY,
    created_at      INTEGER NOT NULL DEFAULT (strftime('%s', 'now')),
    job_order       INTEGER NOT NULL,
    precut_coil_id  INTEGER NOT NULL,
    FOREIGN KEY (precut_coil_id) REFERENCES precut_coil(id)
);
