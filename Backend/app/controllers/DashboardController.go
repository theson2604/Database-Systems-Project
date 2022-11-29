package controllers

import (
	// "context"
	// "time"
	// "encoding/json"
	// "log"
	// "fmt"
	// "github.com/jinzhu/copier"

	"log"

	"github.com/gofiber/fiber/v2"

	"database_assignment/app/models"
	"database_assignment/config/db"
	store "database_assignment/config/session"
)




type DashboardController struct {
	GetCustomer func(*fiber.Ctx) error
	GetCustomerStat func(*fiber.Ctx) error
	GetCustomerByName func(*fiber.Ctx) error
	GetRoomBooking func(*fiber.Ctx) error
	InsertRoom func(*fiber.Ctx) error
	UserList func(*fiber.Ctx) error
	ShowLogin func(*fiber.Ctx) error

}

func InitializeDashboardController() DashboardController {
	var dashboardController = DashboardController{}

	dashboardController.GetCustomer = func (c *fiber.Ctx) error {
		sess, err := store.Store.Get(c)
		if err != nil {
			panic(err)
		}
		
		db.ConnectDatabase(sess.Get("username").(string), sess.Get("password").(string))
		Customer := []models.Customer{}
		db.Db.Find(&Customer)
		return c.JSON(Customer)
	}
	dashboardController.GetCustomerStat = func (c *fiber.Ctx) error {
		payload := struct {
			Branch_id 	int	`json:"branch_id"`
			Year 		int `json:"year"`
		}{}
		if err := c.BodyParser(&payload); err != nil {
			return err
		}
	
		// payload.Branch_id = 1
		// payload.Year = 2022
		stat := []struct {
			Month 			int `gorm:"column:month"`
			Total_customers int	`gorm:"column:total_customers"`  
		}{}
		sess, err := store.Store.Get(c)
		if err != nil {
			panic(err)
		}
		
		db.ConnectDatabase(sess.Get("username").(string), sess.Get("password").(string))
		db.Db.Raw("CALL ThongKeLuotKhach(?, ?)", payload.Branch_id, payload.Year).Scan(&stat)
		
		// if err != nil {
		// 	return nil
		// }
		// rows := []Stat{}
		// var month int
		// var num int
		// for cursor.Next() {
		// 	cursor.Scan(&month, &num)
		// 	rows = append(rows, Stat{month, num})
		// }
		// res, _ := json.Marshal(rows)
		// log.Println(res)
		
		return c.JSON(stat)
	}
	dashboardController.InsertRoom = func (c *fiber.Ctx) error {
		Room := struct {
			Roomtype models.RoomType
			Bed 	models.Bed

		}{}
		if err := c.BodyParser(&Room); err != nil {
			return err
		}

		db.Db.Create(&Room.Roomtype)
		db.Db.Create(&Room.Bed)

		return c.SendString("done")
	}
	dashboardController.GetCustomerByName = func (c *fiber.Ctx) error {
		name := struct { Fullname string `json:"fullname"`}{}
		if err := c.BodyParser(&name); err != nil {
			panic(err)
		}
		log.Println(name)
		sess, err := store.Store.Get(c)
		if err != nil {
			panic(err)
		}
		
		Customer := []models.Customer{}
		db.ConnectDatabase(sess.Get("username").(string), sess.Get("password").(string))
		defer func() {
			sqll, _ := db.Db.DB()
			sqll.Close()

		}()
			
		db.Db.Where(&models.Customer{Fullname: name.Fullname}).Find(&Customer)
		return c.JSON(Customer)
	}

	dashboardController.GetRoomBooking = func (c *fiber.Ctx) error {
		id := struct {
			ID string `json:"id"`
		}{}
		if err := c.BodyParser(&id); err != nil {
			panic(err)
		}
		
		sess, err := store.Store.Get(c)
		if err != nil {
			panic(err)
		}
		
		Booking_room := []models.BookingRoom{}
		db.ConnectDatabase(sess.Get("username").(string), sess.Get("password").(string))
		defer func() {
			sqll, _ := db.Db.DB()
			sqll.Close()

		}()
		db.Db.Where(&models.BookingRoom{Customer_id: id.ID}).Find(&Booking_room)
		
		
		return c.JSON(Booking_room)
	}

	return dashboardController
}
