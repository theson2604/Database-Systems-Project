package main

import (
	_ "fmt"
	"log"
	_ "net/http"
	"os"

	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/cors"
	"github.com/gofiber/template/handlebars"
	"github.com/joho/godotenv"

	"database_assignment/config/session"
	routes "database_assignment/resources/routes"
	utils "database_assignment/util"
)

func main() {
    // Run chat room
    
    // Load env variables
    godotenv.Load()
    // Connect database
    
    // Start store session
    session.InitializeSession()
    // View engine
    engine := handlebars.New("./resources/views", ".hbs")
    for key, element := range utils.Helpers {
        engine.AddFunc(key, element)
    }
    engine.Reload(true)
    // Initialize server
    app := fiber.New(fiber.Config{
		Views: engine,
       
	})
    app.Use(cors.New())
    app.Static("/", "./public")
    
    routes.Route(app)
   
    
    log.Fatal(app.Listen(os.Getenv("HOST") + os.Getenv("PORT")))
    
}