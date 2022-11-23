INSERT INTO DB_Assignment.BRANCH
VALUES ( 0,'Ho Chi Minh', '123 ly thuong kiet', '0120455689', '123@gmail.com'),
	   (0,'Binh Duong', '123 to hien thanh', '0123555689', '123@gmail.com'),
       ( 0,'Binh Thuan', '123 3/2', '0123455689', '123@gmail.com'),
       (0,'Binh Phuoc', '59 nguyen trai', '0123655689', '123@gmail.com');

-- INSERT INTO DB_Assignment.BRANCH_PHOTO
-- VALUES (1, 'Ho Chi Minh'),
-- 	   (2, 'Binh Duong'),
--        (3, 'Binh Thuan'),
--        (4, 'Binh Phuoc');

-- INSERT INTO DB_Assignment.ZONE
-- VALUES (1, 'san vuon'),
--        (2, 'bien'),
--        (3, 'vip'),
--        (4, 'biet thu');

-- INSERT INTO DB_Assignment.ROOM_TYPE
-- VALUES (1, '2 giuong', 1.2, 3, '...'),
--        (2, '1 giuong', 1.5, 2, '...'),
--        (3, '2 giuong', 2, 6, '...'),
--        (4, '2 giuong', 3, 5, '...');

-- INSERT INTO DB_Assignment.BED
-- VALUES (1, 1.5, 3),
--        (2, 1.2, 2),
--        (3, 2.0, 4),
--        (4, 2.5, 5);

-- INSERT INTO DB_Assignment.BRANCH_HAVE_ROOMTYPE
-- VALUES (2, 1, 200),
--        (1, 1, 100),
--        (3, 2, 400),
--        (2, 3, 700);

-- INSERT INTO DB_Assignment.ROOM
-- VALUES ('101', 1, 1, 'san vuon'),
--        ('102', 2, 2, 'bien'),
--        ('103', 3, 3, 'vip'),
--        ('104', 4, 4, 'biet thu');

-- INSERT INTO DB_Assignment.SUPPLY_TYPE
-- VALUES ('VT2329', 'goi'),
--        ('VT2328', 'goi'),
--        ('VT2327', 'goi'),
--        ('VT2326', 'goi');

-- INSERT INTO DB_Assignment.SUPPLY_IN_ROOM
-- VALUES ('VT2329', 1, 1),
--        ('VT2328', 2, 2),
--        ('VT2327', 3, 3),
--        ('VT2326', 4, 4);

-- INSERT INTO DB_Assignment.SUPPLY
-- VALUES (1, 'VT2329', 2, 2, '101'),
--        (2, 'VT2328', 3, 2, '102'),
--        (3, 'VT2327', 1, 2, '103'),
--        (4, 'VT2326', 5, 2, '104');
--     
-- INSERT INTO DB_Assignment.SUPPLIER
-- VALUES ('NCC2329', 'vietphat', 'vietphat@gmail.com', '238 nguyen tri phuong'),
--        ('NCC2328', 'hoaphat', 'hoaphat@gmail.com', '238 nguyen tat thanh'),
--        ('NCC2327', 'vietnhat', 'vietnhat@gmail.com', '238 nguyen huu huan'),
--        ('NCC2326', 'bachkhoa', 'bachkhoa@gmail.com', '238 nguyen gia tri');

-- INSERT INTO DB_Assignment.PROVIDE_SUPPLY
-- VALUES ('VT2329', 1 ,'NCC2329'),
--        ('VT2328', 2 ,'NCC2328'),
--        ('VT2327', 3 ,'NCC2327'),
--        ('VT2326', 4 ,'NCC2326');

-- INSERT INTO DB_Assignment.CUSTOMER
-- VALUES ('KH258329', 079202042382, 'nguyenvana', 0123829612, 'nguyenvana@gmail.com' ,'nguyenvana', '123456', 5, 3),
--        ('KH258328', 079202042389, 'nguyenvanb', 0223829612, 'nguyenvanb@gmail.com' ,'nguyenvanb', '123456', 5, 2),
--        ('KH258327', 079202042383, 'nguyenvanc', 0323829612, 'nguyenvanc@gmail.com' ,'nguyenvanc', '123456', 5, 1),
--        ('KH258326', 079202042387, 'nguyenvand', 0423829612, 'nguyenvand@gmail.com' ,'nguyenvand', '123456', 5, 3);

-- INSERT INTO DB_Assignment.PACKET
-- VALUES ('1', 19, 5 ,200),
--        ('2', 29, 5 ,400),
--        ('3', 39, 5 ,600),
--        ('4', 49, 5 ,800);

-- INSERT INTO DB_Assignment.INVOICE_PACKET
-- VALUES ('KH258329', '1', '2022-11-10 13:23:44', '2022-11-11 13:23:44', 12, 200),
--        ('KH258328', '2', '2022-11-10 13:23:44', '2022-11-11 13:23:44', 22, 400),
--        ('KH258327', '3', '2022-11-10 13:23:44', '2022-11-11 13:23:44', 32, 600),
--        ('KH258326', '4', '2022-11-10 13:23:44', '2022-11-11 13:23:44', 42, 800);

-- INSERT INTO DB_Assignment.BOOKING_ROOM
-- VALUES (1, '2022-11-10 13:23:44', 3, '2022-11-14 13:23:44', '2022-11-16 13:23:44', 1, 200, 'KH258329', '1'),
--        (2, '2022-11-10 13:23:44', 3, '2022-11-14 13:23:44', '2022-11-16 11:23:44', 2, 400, 'KH258328', '2'),
--        (3, '2022-11-10 13:23:44', 3, '2022-11-14 13:23:44', '2022-11-16 10:23:44', 3, 600, 'KH258327', '3'),
--        (4, '2022-11-10 13:23:44', 3, '2022-11-14 13:23:44', '2022-11-16 13:11:44', 0, 800, 'KH258326', '4');

-- INSERT INTO DB_Assignment.RENTING_ROOM
-- VALUES (1, 1, '101'),
--        (2, 2, '102'),
--        (3, 3, '103'),
--        (4, 4, '104');

-- INSERT INTO DB_Assignment.INVOICE
-- VALUES (1, '2022-11-16 13:23:44', '13:27:39', '22:27:39', 1),
--        (2, '2022-11-16 11:23:44', '11:27:39', '22:27:39', 2),
--        (3, '2022-11-16 10:23:44', '10:27:39', '22:27:39', 3),
--        (4, '2022-11-16 13:11:44', '13:17:39', '22:17:39', 4);

-- INSERT INTO DB_Assignment.BUSINESS
-- VALUES ('DN2329', 'vietphat'),
--        ('DN2328', 'hoaphat'),
--        ('DN2327', 'vietnhat'),
--        ('DN2326', 'bachkhoa');

-- INSERT INTO DB_Assignment.SERVICE
-- VALUES ('DVR329', '1', 3, 'nha hang', 'DN2329'),
--        ('DVS328', '1', 4, 'spa', 'DN2328'),
--        ('DVC327', '1', 5, 'cua hang', 'DN2327'),
--        ('DVM326', '1', 6, 'do luu niem', 'DN2326');

-- INSERT INTO DB_Assignment.SPA_SERVICE
-- VALUES ('DVS328', 'DN2329'),
--        ('DVS328', 'DN2328'),
--        ('DVS328', 'DN2327'),
--        ('DVS328', 'DN2326');

-- INSERT INTO DB_Assignment.SOUVERNIR_SERVICE
-- VALUES ('DVM326', 'DN2329'),
--        ('DVM326', 'DN2328'),
--        ('DVM326', 'DN2327'),
--        ('DVM326', 'DN2326');

-- INSERT INTO DB_Assignment.SOUVENIR_BRAND
-- VALUES ('DVM326', 'abc23d9'),
--        ('DVM326', 'abc2368'),
--        ('DVM326', 'abc23gh7'),
--        ('DVM326', 'abc2326');

-- INSERT INTO DB_Assignment.PREMISE
-- VALUES (1, 12, 2.3, 5.6, 400, 'DNasdklfgdsa29', 'DVR329', 'hihi1', '...'),
--        (2, 4, 2.3, 5.6, 400, 'DNasdklfgdsa28', 'DVS328', 'hihi2', '...'),
--        (3, 50, 2.3, 5.6, 400, 'DNasdklfgdsa27', 'DVC327', 'hihi3', '...'),
--        (4, 26, 2.3, 5.6, 400, 'DNasdklfgdsa26', 'DVM326', 'hihi4', '...');

-- INSERT INTO DB_Assignment.SHOP_PHOTO
-- VALUES (1, 12, 'DNasdklfgdsa29'),
--        (2, 4, 'DNasdklfgdsa28'),
--        (3, 50, 'DNasdklfgdsa27'),
--        (4, 26, 'DNasdklfgdsa26');
--     
-- INSERT INTO DB_Assignment.SHOP_WORKING_TIME
-- VALUES (1, 12, '08:30:00', '21:30:00'),
--        (2, 4, '08:30:00', '21:30:00'),
--        (3, 50, '08:30:00', '21:30:00'),
--        (4, 26, '08:30:00', '21:30:00');