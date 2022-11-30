INSERT INTO DB_Assignment.BRANCH
VALUES (0, 'Ho Chi Minh', '123 Ly Thuong Kiet phuong 10 Quan 10', '0908035980', 'HoChiMinh@gmail.com'),
	(0, 'Binh Duong', 'So 1, Quang Trung, phuong Phu Cuong', '0177535689', 'BinhDuong@gmail.com'),
       (0, 'Nha Trang', '20 Tran Phu phuong Loc Tho', '0182055689', 'Nha Trang@gmail.com'),
       (0, 'Da Nang', '59 To Hieu phuong Hoa Minh quan Lien Chieu', '0923651289', 'DaNang@gmail.com');

INSERT INTO DB_Assignment.BRANCH_PHOTO
VALUES (1, 'https://statics.vinpearl.com/Tong%20quan_1647360666_1647850027.png'),
	(2, 'https://statics.vinpearl.com/Hinh-anh-Vinpearl-Discovery-Golflink-Nha-Trang-Villa-51_1639500422.jpg'),
       (3, 'https://go2joy.s3.ap-southeast-1.amazonaws.com/blog/wp-content/uploads/2022/04/05104501/vinpearl-land-nha-trang-o-dau.jpg'),
       (4, 'https://tanthoidai.com.vn/images/gallery/images/22(2).jpg');

INSERT INTO DB_Assignment.ZONE
VALUES (1, 'san vuon'),
       (2, 'bien'),
       (3, 'vip'),
       (4, 'biet thu');

INSERT INTO DB_Assignment.ROOM_TYPE
VALUES (1, '2 giuong', 1.2, 3, ''),
       (2, '1 giuong', 1.5, 4, 'co may say'),
       (3, '2 giuong', 2, 4, 'co may say + ban ui'),
       (4, '2 giuong', 3, 5, 'co may say + ban ui');

INSERT INTO DB_Assignment.BED
VALUES (1, 1.5, 3),
       (2, 1.2, 2),
       (3, 2.0, 4),
       (4, 2.5, 5);

INSERT INTO DB_Assignment.BRANCH_HAVE_ROOMTYPE
VALUES (2, 2, 200),
       (1, 1, 100),
       (3, 3, 400),
       (4, 3, 700);

INSERT INTO DB_Assignment.ROOM
VALUES ('101', 1, 1, 'san vuon'),
       ('102', 2, 2, 'bien'),
       ('103', 3, 3, 'vip'),
       ('104', 4, 4, 'biet thu');

INSERT INTO DB_Assignment.SUPPLY_TYPE
VALUES ('VT2329', 'goi 1'),
       ('VT2328', 'goi 2'),
       ('VT2327', 'goi 3'),
       ('VT2326', 'goi 4');

INSERT INTO DB_Assignment.SUPPLY_IN_ROOM
VALUES ('VT2329', 1, 2),
       ('VT2328', 2, 3),
       ('VT2327', 3, 4),
       ('VT2326', 4, 4);

INSERT INTO DB_Assignment.SUPPLY
VALUES (1, 'VT2329', 2, 1, '101'),
       (2, 'VT2328', 3, 2, '102'),
       (3, 'VT2327', 1, 3, '103'),
       (4, 'VT2326', 5, 2, '104');
    
INSERT INTO DB_Assignment.SUPPLIER
VALUES ('NCC2329', 'vietphat', 'vietphat@gmail.com', '78 nguyen tri phuong phuong quan 10'),
       ('NCC2328', 'hoaphat', 'hoaphat@gmail.com', '129 xo viet nghe tinh phuong 9 quan binh thanh'),
       ('NCC2327', 'vietnhat', 'vietnhat@gmail.com', '111 nguyen huu huan phuong 6 quan 7'),
       ('NCC2326', 'bachkhoa', 'bachkhoa@gmail.com', '382 le van sy phuong 13 quan 3');

INSERT INTO DB_Assignment.PROVIDE_SUPPLY
VALUES ('VT2329', 1 ,'NCC2329'),
       ('VT2328', 2 ,'NCC2328'),
       ('VT2327', 3 ,'NCC2327'),
       ('VT2326', 4 ,'NCC2326');

INSERT INTO DB_Assignment.CUSTOMER
VALUES ('KH258329', 079302042382, 'nguyenvana', 0173955261, 'nguyenvana@gmail.com' ,'nguyenvana', '123456', 188, 1),
       ('KH258328', 079693093209, 'nguyenvanb', 0923829612, 'nguyenvanb@gmail.com' ,'nguyenvanb', '123456', 200, 2),
       ('KH258327', 079802066383, 'nguyenvanc', 0994738027, 'nguyenvanc@gmail.com' ,'nguyenvanc', '123456', 439, 4),
       ('KH258326', 079205642127, 'nguyenvand', 0928729612, 'nguyenvand@gmail.com' ,'nguyenvand', '123456', 215, 2);

INSERT INTO DB_Assignment.PACKET
VALUES ('1', 10, 2 ,600),
       ('2', 20, 3 ,1200),
       ('3', 30, 4 ,1800),
       ('4', 40, 5 ,2400);

INSERT INTO DB_Assignment.INVOICE_PACKET
VALUES ('KH258329', '1', '2022-02-08 13:23:44', '2022-02-09 13:23:44', 12, 600),
       ('KH258328', '2', '2022-02-08 13:23:44', '2022-02-09 13:23:44', 22, 1200),
       ('KH258327', '3', '2022-02-08 13:23:44', '2022-02-09 13:23:44', 32, 1800),
       ('KH258326', '4', '2022-02-08 13:23:44', '2022-02-09 13:23:44', 42, 2400);

-- 16. Đơn đặt phòng
INSERT INTO DB_Assignment.BOOKING_ROOM
VALUES (0, '2022-01-10 13:23:44', 2, '2022-01-12 13:23:44', '2022-01-14 11:23:44', 1, 100, 'KH258329', null),
       (0, '2022-01-12 13:23:44', 3, '2022-01-13 13:23:44', '2022-01-18 11:23:44', 1, 650, 'KH258326', null),
       (0, '2022-01-12 18:23:44', 3, '2022-01-14 13:23:44', '2022-01-18 12:23:44', 1, 450, 'KH258328', null),
       --
       (0, '2022-02-10 13:23:44', 2, '2022-02-12 13:23:44', '2022-02-14 11:23:44', 1, 0, 'KH258329', '1'),
       (0, '2022-02-12 13:23:44', 3, '2022-02-13 13:23:44', '2022-02-18 11:23:44', 1, 0, 'KH258326', '4'),
       (0, '2022-02-12 18:23:44', 3, '2022-02-14 13:23:44', '2022-02-18 12:23:44', 1, 0, 'KH258328', '2'),
       --
       (0, '2022-04-01 13:23:44', 4, '2022-04-05 13:23:44', '2022-04-08 13:23:44', 1, 0, 'KH258327', '3'),
       (0, '2022-04-10 13:23:44', 3, '2022-04-10 13:23:44', '2022-04-12 11:23:44', 1, 0, 'KH258328', '2'),
       (0, '2022-04-10 13:23:44', 2, '2022-04-17 13:23:44', '2022-04-25 10:23:44', 1, 0, 'KH258329', '1'),
       --
       (0, '2022-05-01 13:23:44', 4, '2022-05-02 13:23:44', '2022-05-08 13:23:44', 1, 0, 'KH258326', '4'),
       (0, '2022-05-15 13:23:44', 3, '2022-05-17 13:23:44', '2022-05-20 11:23:44', 1, 0, 'KH258328', '2'),
       (0, '2022-05-20 13:23:44', 2, '2022-05-21 13:23:44', '2022-05-23 10:23:44', 1, 150, 'KH258329', null),
       --
       (0, '2022-07-11 13:23:44', 2, '2022-07-12 13:23:44', '2022-07-15 10:23:44', 1, 220, 'KH258328', null),
       --
       (0, '2022-08-02 13:23:44', 4, '2022-08-04 13:23:44', '2022-08-08 13:23:44', 1, 0, 'KH258326', '4'),
       (0, '2022-08-02 13:23:44', 3, '2022-08-04 13:23:44', '2022-08-15 11:23:44', 1, 0, 'KH258328', '2'),
       (0, '2022-08-13 13:23:44', 2, '2022-08-14 13:23:44', '2022-08-24 10:23:44', 1, 0, 'KH258327', '3'),
       (0, '2022-08-15 13:23:44', 2, '2022-08-18 13:23:44', '2022-08-21 10:23:44', 1, 220, 'KH258329', null),
       --
       (0, '2022-09-01 13:23:44', 3, '2022-09-04 13:23:44', '2022-09-08 13:23:44', 1, 350, 'KH258329', null),
       (0, '2022-09-10 13:23:44', 3, '2022-09-12 13:23:44', '2022-09-16 11:23:44', 1, 0, 'KH258327', '3'),
       (0, '2022-09-20 13:23:44', 5, '2022-09-21 13:23:44', '2022-09-30 10:23:44', 1, 0, 'KH258326', '4'),
       --
       (0, '2022-10-05 13:23:44', 3, '2022-10-06 13:23:44', '2022-10-16 13:23:44', 1, 0, 'KH258327', '3'),
       (0, '2022-10-08 13:23:44', 4, '2022-10-11 13:23:44', '2022-10-15 11:23:44', 1, 0, 'KH258326', '4'),
       --
       (0, '2022-11-04 13:23:44', 3, '2022-11-07 13:23:44', '2022-11-10 13:23:44', 1, 300, 'KH258328', null),
       --
       (0, '2022-12-05 13:23:44', 5, '2022-12-10 13:23:44', '2022-12-15 13:12:44', 1, 800, 'KH258329', null),
       (0, '2022-12-10 13:23:44', 4, '2022-12-14 13:23:44', '2022-12-17 13:12:44', 1, 0, 'KH258327', '3');

INSERT INTO DB_Assignment.RENTING_ROOM
VALUES (1, 2, '102'),
       (1, 3, '103'),
       (2, 4, '104'),
       (3, 2, '102'),
       (4, 3, '103'),
       (5, 1,'101'),
       (6, 4, '104'),
       (7, 3, '103'),
       (8, 2, '102'),
       (9, 4, '104'),
       (10, 3, '103'),
       (11, 2, '102'),
       (12, 1,'101'),
       (13, 4, '104'),
       (14, 1,'101'),
       (15, 2, '102'),
       (16, 2, '102'),
       (17, 1,'101'),
       (18, 3, '103'),
       (19, 1,'101'),
       (20, 3, '103'),
       (21, 4, '104'),
       (22, 3, '103'),
       (23, 1,'101'),
       (24, 4, '104');

-- 18 Hóa đơn
INSERT INTO DB_Assignment.INVOICE
VALUES (0, '2022-01-12 13:23:44', '13:23:44', '11:23:44', 1),
       (0, '2022-01-12 18:23:44', '13:23:44', '12:23:44', 2),
       (0, '2022-02-10 13:23:44', '13:23:44', '11:23:44', 3),
       (0, '2022-02-12 13:23:44', '13:23:44', '11:23:44', 4),
       (0, '2022-02-12 18:23:44', '13:23:44', '12:23:44', 5),
       (0, '2022-04-01 13:23:44', '13:23:44', '13:23:44', 6),
       (0, '2022-04-10 13:23:44', '13:23:44', '11:23:44', 7),
       (0, '2022-04-10 13:23:44', '13:23:44', '10:23:44', 8),
       (0, '2022-05-01 13:23:44', '13:23:44', '13:23:44', 9),
       (0, '2022-05-15 13:23:44', '13:23:44', '11:23:44', 10),
       (0, '2022-05-20 13:23:44', '13:23:44', '10:23:44', 11),
       (0, '2022-07-11 13:23:44', '13:23:44', '10:23:44', 12),
       (0, '2022-08-02 13:23:44', '13:23:44', '13:23:44', 13),
       (0, '2022-08-02 13:23:44', '13:23:44', '11:23:44', 14),
       (0, '2022-08-13 13:23:44', '13:23:44', '10:23:44', 15),
       (0, '2022-08-15 13:23:44', '13:23:44', '10:23:44', 16),
       (0, '2022-09-01 13:23:44', '13:23:44', '13:23:44', 17),
       (0, '2022-09-10 13:23:44', '13:23:44', '11:23:44', 18),
       (0, '2022-09-20 13:23:44', '13:23:44', '10:23:44', 19),
       (0, '2022-10-05 13:23:44', '13:23:44', '13:23:44', 20),
       (0, '2022-10-08 13:23:44', '13:23:44', '11:23:44', 21),
       (0, '2022-11-04 13:23:44', '13:23:44', '13:23:44', 22),
       (0, '2022-12-05 13:23:44', '13:23:44', '13:12:44', 23),
       (0, '2022-12-10 13:23:44', '13:23:44', '13:12:44', 24);

INSERT INTO DB_Assignment.BUSINESS
VALUES ('DN7359', 'vietphat'),
       ('DN7358', 'hoaphat'),
       ('DN7357', 'vietnhat'),
       ('DN7356', 'bachkhoa'),
       ('DN2329', 'hoanghai'),
       ('DN2328', 'tanhoangminh'),
       ('DN2327', 'vingroup'),
       ('DN2326', 'sungroup');

INSERT INTO DB_Assignment.SERVICE
VALUES ('DVR619', 'R', 3, 'nha hang', 'DN7359'),
       ('DVS618', 'S', 4, 'spa', 'DN7358'),
       ('DVC617', 'C', 5, 'cua hang', 'DN7357'),
       ('DVM616', 'M', 6, 'do luu niem', 'DN7356');

INSERT INTO DB_Assignment.SPA_SERVICE
VALUES ('DVS618', 'DN7359'),
       ('DVS618', 'DN7358'),
       ('DVS618', 'DN7357'),
       ('DVS618', 'DN7356');

INSERT INTO DB_Assignment.SOUVERNIR_SERVICE
VALUES ('DVM616', 'DN2329'),
       ('DVM616', 'DN2328'),
       ('DVM616', 'DN2327'),
       ('DVM616', 'DN2326');

INSERT INTO DB_Assignment.SOUVENIR_BRAND
VALUES ('DVM616', 'bandai'),
       ('DVM616', 'wonderland'),
       ('DVM616', 'amazingbay'),
       ('DVM616', 'superworld');

INSERT INTO DB_Assignment.PREMISE
VALUES (1, 12, 3.3, 5.6, 400, 'gan bien', 'DVR329', 'FoodCircles', 'https://thietkeaz.com/images/thiet-ke-logo-nha-hang-04.jpg'),
       (2, 4, 2.3, 5.6, 300, 'gan nha hang', 'DVS328', 'Keangnam Spa', 'http://xuonginhanoi.vn/files/thiet-ke-lo-go-spa-01.png'),
       (3, 38, 5, 9.5, 650, 'gan cong ra vao', 'DVC327', 'Circle K', 'https://images.glints.com/unsafe/360x0/glints-dashboard.s3.amazonaws.com/company-logo/2df2cb4a69b799e4827bfdb25816d00a.png'),
       (4, 26, 4.2, 7.6, 520, 'trung tam resort', 'DVM326', 'Gift Shop', 'https://banner2.cleanpng.com/20180417/opw/kisspng-gift-shop-shopping-souvenir-retail-bioshock-5ad5f4220eb287.9289110715239711060602.jpg');

INSERT INTO DB_Assignment.SHOP_PHOTO
VALUES (1, 12, 'https://media-cdn.tripadvisor.com/media/photo-s/06/eb/6d/ca/vinpearl-resort-phu-quoc.jpg'),
       (2, 4, 'https://product.hstatic.net/1000067077/product/gs_17ce84db4a9347159b83d43e4c1f4b16_master_95eb54f1c5e64f1fb393d40674b0f1dc_master.jpg'),
       (3, 38, 'https://aeros.vn/upload/images/thiet-ke-cua-hang-qua-luu-niem-3.webp'),
       (4, 26, 'https://acihome.vn/wp-content/uploads/2020/08/nha-hang-phuc-vu-theo-ban-Ressort.jpg');
    
INSERT INTO DB_Assignment.SHOP_WORKING_TIME
VALUES (1, 12, '08:30:00', '21:30:00'),
       (2, 4, '08:30:00', '21:30:00'),
       (3, 50, '08:30:00', '21:30:00'),
       (4, 26, '08:30:00', '21:30:00');
