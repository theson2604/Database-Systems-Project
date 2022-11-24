package controllers

import (
	// "context"
	// "time"
	// "encoding/json"
	// "log"
	// "fmt"
	// "github.com/jinzhu/copier"



	"github.com/gofiber/fiber/v2"

	"database_assignment/app/models"
	"database_assignment/config/db"
)




type DashboardController struct {
	GetCustomer func(*fiber.Ctx) error
	GetCustomerStat func(*fiber.Ctx) error
	InsertRoom func(*fiber.Ctx) error
	UserList func(*fiber.Ctx) error
	ShowLogin func(*fiber.Ctx) error

}

func InitializeDashboardController() DashboardController {
	var dashboardController = DashboardController{}

	dashboardController.GetCustomer = func (c *fiber.Ctx) error {
		Customer := []models.Customer{}
		db.Db.Find(&Customer)
		return c.JSON(Customer)
	}
	dashboardController.GetCustomerStat = func (c *fiber.Ctx) error {
		payload := struct {
			Branch_id 	int
			Year 		int  
		}{}
		payload.Branch_id = 1
		payload.Year = 2022
		stat := []struct {
			Month int `gorm:"column:month"`
			Total_customers int	`gorm:"column:total_customers"`  
		}{}
		
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

	return dashboardController
}
