package controllers

import (
	// "context"
	// "time"
	// "encoding/json"
	"log"

	// "github.com/jinzhu/copier"
	
	"github.com/sujit-baniya/flash"
	"github.com/gofiber/fiber/v2"
	
	"database_assignment/config/db"
	store "database_assignment/config/session"
)




type HomeController struct {
	Home func(*fiber.Ctx) error
	InsertPage func(*fiber.Ctx) error
	Insert func(*fiber.Ctx) error
	UserList func(*fiber.Ctx) error
	ShowLogin func(*fiber.Ctx) error
	Login func(*fiber.Ctx) error
	Logout func(*fiber.Ctx) error
	Dashboard func(*fiber.Ctx) error
	EmptyPage func(*fiber.Ctx) error
}

func InitializeHomeController() HomeController {
	var homeController = HomeController{}

	
	
	homeController.Home = func(c *fiber.Ctx) error {
		return c.Render("home", flash.Get(c))
	}
	homeController.EmptyPage = func (c *fiber.Ctx) error {
		c.Status(404)
		return c.Render("alert", fiber.Map{"content":"We cannot find your page :("})
	}
	homeController.Login = func(c *fiber.Ctx) error {
		payload := struct {
			Username  string `json:"username"`
			Password string  `json:"password"`
		}{}
	
		if err := c.BodyParser(&payload); err != nil {
			return err
		}
		if !(db.ConnectDatabase(payload.Username, payload.Password)) {
			mp := fiber.Map{
				"error": true,
				"message": "login failed",
			}
			return flash.WithError(c, mp).Redirect("/")
			
		} else {
			sess, err := store.Store.Get(c)
			if err != nil {
				log.Println(err)
				return err
			}
			sess.Set("username", payload.Username)
			sess.Save()
			return c.Redirect("/dashboard")
		}
	}
	homeController.Logout = func(c *fiber.Ctx) error {
		sess, err := store.Store.Get(c)
		if err != nil {
			log.Println(err)
			return err
		}
		if err := sess.Destroy(); err != nil {
            panic(err)
        }
		return c.Redirect("/")

	}
	homeController.Dashboard = func(c *fiber.Ctx) error {
		var year, branch []int
		db.Db.Table("BRANCH").Select("BRANCH.branch_id AS branch_id").Order("branch_id").Scan(&branch)
		db.Db.Table("INVOICE").Distinct("YEAR(INVOICE.invoice_date) AS year").Order("year").Scan(&year)
		return c.Render("dashboard", fiber.Map{"branch": branch, "year": year})
	}

	return homeController
}
