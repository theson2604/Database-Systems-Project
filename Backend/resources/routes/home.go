package route

import (
	"github.com/gofiber/fiber/v2"

	controllers "database_assignment/app/controllers"
	middleware "database_assignment/app/middlewares"
)


var homeController controllers.HomeController= controllers.InitializeHomeController()

func HomeRouter(home fiber.Router) {
	
	home.Post("/login", homeController.Login)
	home.Get("/logout", homeController.Logout)
	home.Get("/dashboard", middleware.IsAuthenticated, homeController.Dashboard)
	home.Get("/", middleware.SwithcRoute, homeController.Home)
	home.Get("*", homeController.EmptyPage)
}