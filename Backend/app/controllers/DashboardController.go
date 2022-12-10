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
	GetSupplyType func(*fiber.Ctx) error
	InsertRoom func(*fiber.Ctx) error
	UserList func(*fiber.Ctx) error
	ShowLogin func(*fiber.Ctx) error

}

func InitializeDashboardController() DashboardController {
	var dashboardController = DashboardController{}

	dashboardController.GetCustomer = func (c *fiber.Ctx) error {
		sess, err := store.Store.Get(c)
		if err != nil {
			return c.SendStatus(fiber.StatusUnauthorized)
		}
		if (sess.Get("username") == nil) {
			return c.SendStatus(fiber.StatusUnauthorized)
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
			return c.SendStatus(fiber.StatusUnauthorized)
		}
	
		// payload.Branch_id = 1
		// payload.Year = 2022
		stat := []struct {
			Month 			int `gorm:"column:month"`
			Total_customers int	`gorm:"column:total_customers"`  
		}{}
		sess, err := store.Store.Get(c)
		if err != nil {
			return c.SendStatus(fiber.StatusUnauthorized)
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
			Roomtype 	models.RoomType		`json:"room_type"`
			Bed 		[]models.Bed		`json:"bed"`
			Supply		[]models.SupplyType	`json:"supply"`

		}{}
		if err := c.BodyParser(&Room); err != nil {
			return c.SendStatus(fiber.StatusUnauthorized)
		}
		sess, err := store.Store.Get(c)
		if err != nil {
			return c.SendStatus(fiber.StatusUnauthorized)
		}
		db.ConnectDatabase(sess.Get("username").(string), sess.Get("password").(string))
		defer func() {
			sqll, _ := db.Db.DB()
			sqll.Close()

		}()
		log.Println(Room)
		db.Db.Create(&Room.Roomtype)
		
		log.Println(Room.Roomtype)
		
		if (len(Room.Bed) > 0) {
			for i := 0; i < len(Room.Bed); i++ {
				Room.Bed[i].Roomtype_id = Room.Roomtype.Roomtype_id
			}
			db.Db.Create(&Room.Bed)
		}
		if (len(Room.Supply) > 0){
			var supplyInRoom []models.SupplyInRoom
			for i := 0; i < len(Room.Supply); i++ {
				item := models.SupplyInRoom{}
				item.Roomtype_id = Room.Roomtype.Roomtype_id
				item.Supplytype_id = Room.Supply[i].Supplytype_id
				item.Quantity = 1
				supplyInRoom = append(supplyInRoom, item)
			}
			db.Db.Create(&supplyInRoom)
		}
		msg := struct {
			Message string
		}{"done"}

		return c.JSON(msg)
	}
	dashboardController.GetCustomerByName = func (c *fiber.Ctx) error {
		name := struct { Fullname string `json:"fullname"`}{}
		if err := c.BodyParser(&name); err != nil {
			panic(err)
		}
		log.Println(name)
		sess, err := store.Store.Get(c)
		if err != nil {
			return c.SendStatus(fiber.StatusUnauthorized)
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
		db.Db.Where(&models.BookingRoom{Customer_id: id.ID}).Order("booking_date DESC").Find(&Booking_room)
		
		
		return c.JSON(Booking_room)
	}
	dashboardController.GetSupplyType = func (c *fiber.Ctx) error {
		sess, err := store.Store.Get(c)
		if err != nil {
			panic(err)
		}
		supply := []models.SupplyType{}
		db.ConnectDatabase(sess.Get("username").(string), sess.Get("password").(string))
		defer func() {
			sqll, _ := db.Db.DB()
			sqll.Close()

		}()
		db.Db.Find(&supply)
		return c.JSON(supply)
	}
	return dashboardController
}
