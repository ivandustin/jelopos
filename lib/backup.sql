PRAGMA foreign_keys=OFF;
BEGIN TRANSACTION;
CREATE TABLE customer (
    id      INTEGER PRIMARY KEY,
    name    TEXT NOT NULL UNIQUE,
    address TEXT,
    contact TEXT
);
INSERT INTO "customer" VALUES(1,'Louise','Tabaco','0930');
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
INSERT INTO "item" VALUES(1,1564827808,'Insulation Foam','5mm','pcs',100,100.0);
INSERT INTO "item" VALUES(2,1564827846,'Insulation Foam','5mm','pcs',0,0.0);
INSERT INTO "item" VALUES(3,1564842971,'Insulation Foam','5mm','pcs',0,0.0);
INSERT INTO "item" VALUES(4,1566624962,'Insulation Foam','5mm','pcs',0,0.0);
INSERT INTO "item" VALUES(5,1566625247,'Insulation Foam','5mm','pcs',-2,0.0);
CREATE TABLE coil_design (
    id          INTEGER PRIMARY KEY,
    design      TEXT NOT NULL
);
INSERT INTO "coil_design" VALUES(1,'YY-255-255-255');
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
INSERT INTO "sale_item" VALUES(1,1564827846,1,'Insulation Foam','5mm',1,10.0,2,1);
INSERT INTO "sale_item" VALUES(2,1564842971,2,'Insulation Foam','5mm',1,10.0,3,1);
INSERT INTO "sale_item" VALUES(3,1566624962,3,'Insulation Foam','5mm',4,5.0,4,1);
INSERT INTO "sale_item" VALUES(4,1566625247,3,'Insulation Foam','5mm',2,3.0,5,0);
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
INSERT INTO "sale_coil" VALUES(1,1564829547,1,'YY-255-255-255','Red',0.55,1024.0,'A','5m',2,3.0,1);
INSERT INTO "sale_coil" VALUES(2,1564842996,2,'YY-255-255-255','Red',0.55,1024.0,'A','5mm',2,1.0,1);
CREATE TABLE job_order_coil (
    id              INTEGER PRIMARY KEY,
    created_at      INTEGER NOT NULL DEFAULT (strftime('%s', 'now')),
    job_order       INTEGER NOT NULL,
    coil_id         INTEGER NOT NULL,
    FOREIGN KEY (coil_id) REFERENCES coil(id)
);
INSERT INTO "job_order_coil" VALUES(1,1564844758,1,2);
INSERT INTO "job_order_coil" VALUES(2,1564844917,1,3);
CREATE TABLE job_order_precut_coil (
    id              INTEGER PRIMARY KEY,
    created_at      INTEGER NOT NULL DEFAULT (strftime('%s', 'now')),
    job_order       INTEGER NOT NULL,
    precut_coil_id  INTEGER NOT NULL,
    FOREIGN KEY (precut_coil_id) REFERENCES precut_coil(id)
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
INSERT INTO "coil" VALUES(1,1564829491,'Red',0.55,1024.0,2048.0,200.0,'W9','A');
INSERT INTO "coil" VALUES(2,1564844758,'Red',0.55,1024.0,-100.0,0.0,'W9','A');
INSERT INTO "coil" VALUES(3,1564844916,'Red',0.55,1024.0,-10.0,-50.0,'W9','A');
COMMIT;
