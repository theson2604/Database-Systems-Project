package main

import (
	_ "fmt"
	"log"
	"os"

	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/cors"

	"github.com/joho/godotenv"

	"database_assignment/config/session"
	routes "database_assignment/resources/routes"
)

func main() {
    // Run chat room
    
    // Load env variables
    godotenv.Load()
    // Connect database
    
    // Start store session
    session.InitializeSession()
    // View engine
    
    // Initialize server
    app := fiber.New(fiber.Config{
		
       
	})
    app.Use(cors.New())
    app.Static("/", "./public/build")
    
    routes.Route(app)
  
    
    log.Fatal(app.Listen(os.Getenv("PORT")))
    
}
