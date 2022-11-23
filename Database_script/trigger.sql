-- TOTAL COST FOR PACKET VOICE
DELIMITER $$
DROP TRIGGER IF EXISTS DB_Assignment.TongTienGoiDichVu $$
CREATE TRIGGER DB_Assignment.TongTienGoiDichVu BEFORE INSERT ON INVOICE_PACKET
FOR EACH ROW
BEGIN
	DECLARE customer_type INT;
    DECLARE packet_price INT;
    DECLARE packet_max_days INT;
    
    SELECT CUSTOMER.customer_type
    INTO customer_type
    FROM CUSTOMER
    WHERE CUSTOMER.customer_id  = NEW.customer_id;
    
    SELECT PACKET.price, PACKET.max_days
    INTO packet_price, packet_max_days
    FROM PACKET
    WHERE PACKET.packet_name = NEW.packet_name;
    
    IF customer_type = 3 THEN
		SET NEW.total_cost = 0.85*packet_price;
	ELSEIF customer_type = 4 THEN
		SET NEW.total_cost = 0.8*packet_price;
	ELSE
		SET NEW.total_cost = packet_price;
	END IF;
    
    SET NEW.remaining_days = packet_max_days;
END;$$
DELIMITER ;

-- TOTAL COST BOOKING ROOM (NOT YET :( )
DELIMITER $$
DROP TRIGGER IF EXISTS DB_Assignment.TongTienDonDatPhong $$
CREATE TRIGGER DB_Assignment.TongTienDonDatPhong AFTER INSERT ON RENTING_ROOM
FOR EACH ROW
BEGIN
	DECLARE total_cost INT;
    DECLARE customer_type INT;
    
	UPDATE BOOKING_ROOM
    SET BOOKING_ROOM.total_cost = total_cost
    WHERE BOOKING_ROOM.booking_id = NEW.booking_id;
    
END;$$
DELIMITER ;

-- UPDATE CUSTOMER SCORE
DELIMITER $$
DROP TRIGGER IF EXISTS DB_Assignment.DiemCuaKhachHang1 $$
CREATE TRIGGER DB_Assignment.DiemCuaKhachHang1 AFTER INSERT ON INVOICE_PACKET
FOR EACH ROW
BEGIN
	UPDATE CUSTOMER
	SET CUSTOMER.score = CUSTOMER.score + NEW.total_cost DIV 1000
	WHERE CUSTOMER.customer_id = NEW.customer_id;
END;$$
DELIMITER ;

DELIMITER $$
DROP TRIGGER IF EXISTS DB_Assignment.DiemCuaKhachHang2 $$
CREATE TRIGGER DB_Assignment.DiemCuaKhachHang2 AFTER UPDATE ON BOOKING_ROOM
FOR EACH ROW
BEGIN
	IF (OLD.state <> 1 AND NEW.state = 1) THEN
		UPDATE CUSTOMER
		SET CUSTOMER.score = CUSTOMER.score + NEW.total_cost DIV 1000
		WHERE CUSTOMER.customer_id = NEW.customer_id;
	END IF;
END;$$
DELIMITER ;

-- UPDATE CUSTOMER TYPE
DELIMITER $$
DROP TRIGGER IF EXISTS DB_Assignment.LoaiKhachHang $$
CREATE TRIGGER DB_Assignment.LoaiKhachHang BEFORE UPDATE ON CUSTOMER
FOR EACH ROW
BEGIN
	IF (OLD.score <> NEW.score) THEN
		IF (NEW.score >= 1000) THEN
			SET NEW.customer_type = 4;
		ELSEIF (NEW.score >= 100) THEN
			SET NEW.customer_type = 3;
		ELSEIF (NEW.score >= 50) THEN
			SET NEW.customer_type = 2;
		ELSE
			SET NEW.customer_type = 1;
        END IF;
    END IF;
END;$$
DELIMITER ;

-- NOT ALLOW CUSTOMER TO BUY 2 SAME PACKET IN PERIOD
DELIMITER $$
DROP TRIGGER IF EXISTS DB_Assignment.UniquePacket $$
CREATE TRIGGER DB_Assignment.UniquePacket BEFORE INSERT ON INVOICE_PACKET
FOR EACH ROW
BEGIN
	DECLARE finished INTEGER DEFAULT 0;
    DECLARE start_date DATE;
    DECLARE end_date DATE;
    
    DECLARE packet_date CURSOR FOR    
		SELECT DATE(INVOICE_PACKET.start_date), DATE(DATE_ADD(INVOICE_PACKET.start_date, INTERVAL 1 YEAR)) AS end_date
		FROM INVOICE_PACKET
		WHERE INVOICE_PACKET.customer_id = NEW.customer_id AND INVOICE_PACKET.packet_name = NEW.packet_name;
	DECLARE CONTINUE HANDLER FOR NOT FOUND SET finished = 1;	
    
    OPEN packet_date;
    validateDate: LOOP
				  FETCH packet_date INTO start_date, end_date;
                  IF finished = 1 THEN
					LEAVE validateDate;
				  END IF;
                  IF NEW.start_date BETWEEN start_date AND end_date THEN
					CLOSE packet_date;
                    SIGNAL SQLSTATE '45000'
					SET MESSAGE_TEXT = "Exist a packet at this time";
				  END IF;
	END LOOP validateDate;
    CLOSE packet_date;
                  
    
END;$$
DELIMITER ;
