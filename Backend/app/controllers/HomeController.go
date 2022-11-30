package controllers

import (
	// "context"
	// "time"
	// "encoding/json"
	"log"

	// "github.com/jinzhu/copier"
	
	
	"github.com/gofiber/fiber/v2"
	
	"database_assignment/config/db"
	store "database_assignment/config/session"
)

type Token struct {
	Token string `json:"token"`
}


type HomeController struct {
	Home func(*fiber.Ctx) error
	InsertPage func(*fiber.Ctx) error
	Insert func(*fiber.Ctx) error
	UserList func(*fiber.Ctx) error
	GetBranchYear func(*fiber.Ctx) error
	Login func(*fiber.Ctx) error
	Logout func(*fiber.Ctx) error
	Dashboard func(*fiber.Ctx) error
	EmptyPage func(*fiber.Ctx) error
}

func InitializeHomeController() HomeController {
	var homeController = HomeController{}

	
	
	homeController.Home = func(c *fiber.Ctx) error {
		return c.SendFile("./public/build/index.html")
	}
	
	homeController.Login = func(c *fiber.Ctx) error {
		payload := struct {
			Username  string `json:"username"`
			Password string  `json:"password"`
		}{}
		token := Token{}
		if err := c.BodyParser(&payload); err != nil {
			return err
		}
		if !(db.ConnectDatabase(payload.Username, payload.Password)) {
			token.Token = ""
			return c.JSON(token)
			
		} else {
			sess, err := store.Store.Get(c)
			if err != nil {
				log.Println(err)
				return err
			}
			sess.Set("username", payload.Username)
			sess.Set("password", payload.Password)
			token.Token = sess.ID()
			
			sess.Save()
			return c.JSON(token)
		}
	}
	homeController.Logout = func(c *fiber.Ctx) error {
		sess, err := store.Store.Get(c)
		token := Token{}
		if err != nil {
			log.Println(err)
			return err
		}
		if err := sess.Destroy(); err != nil {
            panic(err)
        }
		token.Token = ""
		return c.JSON(token)

	}
	homeController.Dashboard = func(c *fiber.Ctx) error {
		var year, branch []int
		db.Db.Table("BRANCH").Select("BRANCH.branch_id AS branch_id").Order("branch_id").Scan(&branch)
		db.Db.Table("INVOICE").Distinct("YEAR(INVOICE.invoice_date) AS year").Order("year").Scan(&year)
		return c.Render("dashboard", fiber.Map{"branch": branch, "year": year})
	}

	homeController.GetBranchYear = func(c *fiber.Ctx) error {
		sess, err := store.Store.Get(c)
		if err != nil {
			panic(err)
		}
		
		branchyear := struct {Branch, Year []int}{}
		db.ConnectDatabase(sess.Get("username").(string), sess.Get("password").(string))
		defer func() {
			sqll, _ := db.Db.DB()
			sqll.Close()

		}()
		db.Db.Table("BRANCH").Select("BRANCH.branch_id AS branch_id").Order("branch_id").Scan(&branchyear.Branch)
		db.Db.Table("INVOICE").Distinct("YEAR(INVOICE.invoice_date) AS year").Order("year").Scan(&branchyear.Year)
		return c.JSON(branchyear)
	}

	return homeController
}
