DELIMITER $$
DROP PROCEDURE IF EXISTS DB_Assignment.GoiDichVu $$
CREATE PROCEDURE DB_Assignment.GoiDichVu (
	IN customer_id VARCHAR(8)
) 
BEGIN
	SELECT INVOICE_PACKET.packet_name, 
		   PACKET.max_guests, 
           DATE_FORMAT(INVOICE_PACKET.start_date, "%d/%m/%Y") AS start_date, 
           DATE_FORMAT(DATE_ADD(INVOICE_PACKET.start_date, INTERVAL 1 YEAR), "%d/%m/%Y") AS end_date, 
           INVOICE_PACKET.remaining_days
    FROM INVOICE_PACKET
		 INNER JOIN PACKET ON INVOICE_PACKET.packet_name = PACKET.pack_name
    WHERE customer_id = INVOICE_PACKET.customer_id;

END; $$
DELIMITER ;
    
DELIMITER $$
DROP PROCEDURE IF EXISTS DB_Assignment.ThongKeLuotKhach $$
CREATE PROCEDURE DB_Assignment.ThongKeLuotKhach (
	IN branch_id INT,
    IN yearr SMALLINT
)
BEGIN
	SELECT MONTH(INVOICE.invoice_date) AS month, SUM(BOOKING_ROOM.num_of_guests) AS total_customers
    FROM INVOICE
		 INNER JOIN BOOKING_ROOM ON INVOICE.booking_id = BOOKING_ROOM.booking_id
         INNER JOIN RENTING_ROOM ON RENTING_ROOM.booking_id = BOOKING_ROOM.booking_id
    WHERE BOOKING_ROOM.state = 1 AND RENTING_ROOM.branch_id = branch_id AND YEAR(INVOICE.invoice_date) = yearr
    GROUP BY MONTH(INVOICE.invoice_date);
END; $$
DELIMITER ;

