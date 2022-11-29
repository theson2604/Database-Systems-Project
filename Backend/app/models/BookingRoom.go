package models

import (
	"time"

	
)

type BookingRoom struct {
	Booking_id		int		`gorm:"column:booking_id;primarykey"`
	Booking_date	time.Time	`gorm:"column:booking_date"`
	Num_of_guests	int		`gorm:"column:num_of_guests"`
	Checkin_date	time.Time		`gorm:"column:checkin_date"`
	Checkout_date	time.Time	`gorm:"column:checkout_date"`
	State			int	`gorm:"column:state"`
	Total_cost		int		`gorm:"total_cost"`
	Customer_id		string	`gorm:"column:customer_id"`
	Packet_name		string	`gorm:"column:_"`
}

func (BookingRoom) TableName() string {
	return "BOOKING_ROOM"
  }