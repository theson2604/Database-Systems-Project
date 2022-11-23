

-- CREATE TABLE
-- ----------------------------------------------------------- --
-- Branch
CREATE TABLE IF NOT EXISTS DB_Assignment.BRANCH (
	branch_id INT NOT NULL AUTO_INCREMENT,
    province NVARCHAR(31) NOT NULL,
    address NVARCHAR(127) NOT NULL,
    phone VARCHAR(11) NOT NULL,
    email VARCHAR(31) NOT NULL,
    UNIQUE (province, address),
    PRIMARY KEY (branch_id)
);

-- Branch photos
CREATE TABLE IF NOT EXISTS DB_Assignment.BRANCH_PHOTO (
	branch_id INT NOT NULL,
    photo VARCHAR(512) NOT NULL,
    PRIMARY KEY (branch_id, photo),
    FOREIGN KEY (branch_id) REFERENCES BRANCH(branch_id)
);

-- Zones
CREATE TABLE IF NOT EXISTS DB_Assignment.ZONE (
	branch_id INT NOT NULL,
	zone_name NVARCHAR(31) NOT NULL,
    PRIMARY KEY (branch_id, zone_name),
    FOREIGN KEY (branch_id) REFERENCES BRANCH(branch_id)
);

-- Room Type
CREATE TABLE IF NOT EXISTS DB_Assignment.ROOM_TYPE (
	roomtype_id INT NOT NULL AUTO_INCREMENT,
    type_name NVARCHAR(31) NOT NULL,
    area FLOAT NOT NULL,
    max_guests INT UNSIGNED NOT NULL CHECK (max_guests BETWEEN 1 AND 10),
    other_description TEXT,
    PRIMARY KEY (roomtype_id)
);

-- BED INFO
CREATE TABLE IF NOT EXISTS DB_Assignment.BED (
	roomtype_id INT NOT NULL AUTO_INCREMENT,
    size DECIMAL(2,1) NOT NULL,
    quantity INT NOT NULL,
    PRIMARY KEY (roomtype_id, size),
    FOREIGN KEY (roomtype_id) REFERENCES ROOM_TYPE(roomtype_id)
);

-- branch has room type
CREATE TABLE IF NOT EXISTS DB_Assignment.BRANCH_HAVE_ROOMTYPE (
	roomtype_id INT NOT NULL,
    branch_id INT NOT NULL,
    price INT NOT NULL,
    PRIMARY KEY (roomtype_id, branch_id),
    FOREIGN KEY (roomtype_id) REFERENCES ROOM_TYPE(roomtype_id),
    FOREIGN KEY (branch_id) REFERENCES BRANCH(branch_id)
);

-- Room
CREATE TABLE IF NOT EXISTS DB_Assignment.ROOM (
	room_id CHAR(3) NOT NULL,
    branch_id INT NOT NULL,
    roomtype_id INT,
    zone_name NVARCHAR(31),
    PRIMARY KEY (branch_id, room_id),
    FOREIGN KEY (branch_id) REFERENCES BRANCH(branch_id),
    FOREIGN KEY (branch_id, zone_name) REFERENCES ZONE(branch_id, zone_name)
);

-- Supply type
CREATE TABLE IF NOT EXISTS DB_Assignment.SUPPLY_TYPE (
	supplytype_id CHAR(6) NOT NULL CHECK (supplytype_id RLIKE 'VT[0-9]{4}$'),
    supplyname NVARCHAR(15) NOT NULL,
    PRIMARY KEY (supplytype_id)
);

-- Supplies in room
CREATE TABLE IF NOT EXISTS DB_Assignment.SUPPLY_IN_ROOM (
	supplytype_id CHAR(6) NOT NULL CHECK (supplytype_id RLIKE 'VT[0-9]{4}$'),
    roomtype_id INT NOT NULL,
    quantity INT NOT NULL CHECK (quantity BETWEEN 1 AND 20) DEFAULT 1,
    PRIMARY KEY (supplytype_id, roomtype_id),
    FOREIGN KEY (supplytype_id) REFERENCES SUPPLY_TYPE(supplytype_id),
    FOREIGN KEY (roomtype_id) REFERENCES ROOM_TYPE(roomtype_id)
);

-- Supply STATE 0 : BAD, 1: MEDIUM, 2: GOOD
CREATE TABLE IF NOT EXISTS DB_Assignment.SUPPLY (
	branch_id INT NOT NULL,
    supplytype_id CHAR(6) NOT NULL CHECK (supplytype_id RLIKE 'VT[0-9]{4}$'),
    supply_id INT UNSIGNED  NOT NULL,
    state INT NOT NULL DEFAULT 2,
    room_id CHAR(3),
    PRIMARY KEY (branch_id, supplytype_id, supply_id),
    FOREIGN KEY (branch_id) REFERENCES BRANCH(branch_id),
    FOREIGN KEY (supplytype_id) REFERENCES SUPPLY_TYPE(supplytype_id),
    FOREIGN KEY (branch_id, room_id) REFERENCES ROOM(branch_id, room_id)
);

-- Supplier
CREATE TABLE IF NOT EXISTS DB_Assignment.SUPPLIER (
	supplier_id CHAR(7) NOT NULL CHECK (supplier_id RLIKE 'NCC[0-9]{4}$'),
    supplier_name NVARCHAR(31) NOT NULL,
    email NVARCHAR(31),
    address NVARCHAR(127),
    PRIMARY KEY (supplier_id)
);

-- Provide supplies
CREATE TABLE IF NOT EXISTS DB_Assignment.PROVIDE_SUPPLY (
	supplytype_id CHAR(6) NOT NULL CHECK (supplytype_id RLIKE 'VT[0-9]{4}$'),
    branch_id INT NOT NULL,
    supplier_id CHAR(7) CHECK (supplier_id RLIKE 'NCC[0-9]{4}$'),
    PRIMARY KEY (supplytype_id, branch_id),
    FOREIGN KEY (supplier_id) REFERENCES SUPPLIER(supplier_id),
    FOREIGN KEY (branch_id) REFERENCES BRANCH(branch_id),
    FOREIGN KEY (supplytype_id) REFERENCES SUPPLY_TYPE(supplytype_id)
);

-- Customer
CREATE TABLE IF NOT EXISTS DB_Assignment.CUSTOMER (
	customer_id CHAR(8) NOT NULL CHECK (customer_id RLIKE 'KH[0-9]{6}$'),
    ssn VARCHAR(12) NOT NULL, 
    fullname NVARCHAR(31) NOT NULL,
    phone NVARCHAR(11) NOT NULL,
    email NVARCHAR(31),
    username NVARCHAR(31),
    password NVARCHAR(31),
    score INT UNSIGNED NOT NULL DEFAULT 0,
    customer_type INT UNSIGNED NOT NULL CHECK (customer_type BETWEEN 1 AND 4) DEFAULT 1,
    UNIQUE(ssn, phone, email, username),
    PRIMARY KEY (customer_id)
);

-- Packet
CREATE TABLE IF NOT EXISTS DB_Assignment.PACKET (
	packet_name NVARCHAR(15) NOT NULL,
    max_days INT NOT NULL CHECK (max_days BETWEEN 1 AND 100),
    max_guests INT NOT NULL CHECK (max_guests BETWEEN 1 AND 10),
    price INT NOT NULL,
    PRIMARY KEY (packet_name)
);

-- Invoice Packet
CREATE TABLE IF NOT EXISTS DB_Assignment.INVOICE_PACKET (
	customer_id CHAR(8) NOT NULL CHECK (customer_id RLIKE 'KH[0-9]{6}$'),
    packet_name NVARCHAR(15) NOT NULL,
    payment_date DATETIME NOT NULL,
    start_date DATETIME,
    remaining_days INT,
    total_cost INT NOT NULL,
    PRIMARY KEY (customer_id, packet_name, payment_date),
    FOREIGN KEY (packet_name) REFERENCES PACKET(packet_name),
    FOREIGN KEY (customer_id) REFERENCES CUSTOMER(customer_id)
    
);

-- ROOM BOOKING
CREATE TABLE IF NOT EXISTS DB_Assignment.BOOKING_ROOM (
	booking_id INT NOT NULL AUTO_INCREMENT,
    booking_date DATETIME,
    num_of_guests INT NOT NULL DEFAULT 1,
    checkin_date DATETIME,
    checkout_date DATETIME,
    state INT CHECK(state BETWEEN 0 AND 3) NOT NULL DEFAULT 0,
    total_cost INT NOT NULL DEFAULT 0,
    customer_id CHAR(8) NOT NULL CHECK (customer_id RLIKE 'KH[0-9]{6}$'),
    packet_name NVARCHAR(15),
    PRIMARY KEY (booking_id),
    FOREIGN KEY (customer_id) REFERENCES CUSTOMER(customer_id),
    FOREIGN KEY (packet_name) REFERENCES PACKET(packet_name)
);

-- renting room
CREATE TABLE IF NOT EXISTS DB_Assignment.RENTING_ROOM (
	booking_id INT NOT NULL,
    branch_id INT NOT NULL,
    room_id CHAR(3) NOT NULL,
    PRIMARY KEY (booking_id, branch_id, room_id),
    FOREIGN KEY (booking_id) REFERENCES BOOKING_ROOM(booking_id),
    FOREIGN KEY (branch_id, room_id) REFERENCES ROOM(branch_id, room_id)
);

-- invoice
CREATE TABLE IF NOT EXISTS DB_Assignment.INVOICE (
	invoice_id INT NOT NULL AUTO_INCREMENT,
    invoice_date DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
	checkin_time TIME,
    checkout_time TIME,
    booking_id INT NOT NULL,
    PRIMARY KEY (invoice_id, invoice_date),
    FOREIGN KEY (booking_id) REFERENCES BOOKING_ROOM(booking_id)
);

--  business
CREATE TABLE IF NOT EXISTS DB_Assignment.BUSINESS (
	business_id CHAR(6) NOT NULL CHECK (business_id RLIKE 'DN[0-9]{4}$'),
    business_name NVARCHAR(64) NOT NULL,
    PRIMARY KEY (business_id)
);

-- services
CREATE TABLE IF NOT EXISTS DB_Assignment.SERVICE (
	service_id CHAR(6) NOT NULL CHECK (service_id RLIKE 'DV[RSCMB][0-9]{3}$'),
    service_type CHAR(1) NOT NULL,
    max_guests INT,
    style NVARCHAR(15),
    business_id CHAR(6) CHECK (business_id RLIKE 'DN[0-9]{4}$'),
    PRIMARY KEY (service_id),
    FOREIGN KEY (business_id) REFERENCES BUSINESS(business_id)
);

-- spa servcie
CREATE TABLE IF NOT EXISTS DB_Assignment.SPA_SERVICE (
	service_id CHAR(6) NOT NULL CHECK (service_id RLIKE 'DVS[0-9]{3}$'),
    spa_service NVARCHAR(31) NOT NULL,
    PRIMARY KEY (service_id, spa_service),
    FOREIGN KEY (service_id) REFERENCES SERVICE(service_id)
);

-- sourvenir service
CREATE TABLE IF NOT EXISTS DB_Assignment.SOUVERNIR_SERVICE (
	service_id CHAR(6) NOT NULL CHECK (service_id RLIKE 'DVM[0-9]{3}$'),
    category NVARCHAR(31) NOT NULL,
    PRIMARY KEY (service_id, category),
    FOREIGN KEY (service_id) REFERENCES SERVICE(service_id)
);

-- souvernir brand
CREATE TABLE IF NOT EXISTS DB_Assignment.SOUVENIR_BRAND (
	service_id CHAR(6) NOT NULL CHECK (service_id RLIKE 'DVM[0-9]{3}$'),
    brand_name NVARCHAR(31),
    PRIMARY KEY (service_id, brand_name),
    FOREIGN KEY (service_id) REFERENCES SERVICE(service_id)
);

-- premises
CREATE TABLE IF NOT EXISTS DB_Assignment.PREMISE (
	branch_id INT NOT NULL,
    premise_id INT UNSIGNED NOT NULL CHECK(premise_id BETWEEN 1 AND 50),
    width FLOAT NOT NULL,
    length FLOAT NOT NULL,
    price INT NOT NULL,
    description TEXT,
    service_id CHAR(6) NOT NULL CHECK (service_id RLIKE 'DV[RSCMB][0-9]{3}$'),
    store_name NVARCHAR(31),
    logo VARCHAR(512),
    PRIMARY KEY (branch_id, premise_id),
    FOREIGN KEY (branch_id) REFERENCES BRANCH(branch_id),
    FOREIGN KEY (service_id) REFERENCES SERVICE(service_id)
);

-- shop photos
CREATE TABLE IF NOT EXISTS DB_Assignment.SHOP_PHOTO (
	branch_id INT NOT NULL,
    premise_id INT UNSIGNED NOT NULL CHECK (premise_id BETWEEN 1 AND 50),
    photo VARCHAR(512),
    PRIMARY KEY (branch_id, premise_id, photo),
    FOREIGN KEY (branch_id, premise_id) REFERENCES PREMISE(branch_id, premise_id)
);

-- working time of shop
CREATE TABLE IF NOT EXISTS DB_Assignment.SHOP_WORKING_TIME (
	branch_id INT NOT NULL,
    premise_id INT UNSIGNED NOT NULL CHECK (premise_id BETWEEN 1 AND 50),
    start_time TIME,
    end_time TIME,
    PRIMARY KEY (branch_id, premise_id, start_time),
    FOREIGN KEY (branch_id, premise_id) REFERENCES PREMISE(branch_id, premise_id)
);
