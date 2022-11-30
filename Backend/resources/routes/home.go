package route

import (
	"github.com/gofiber/fiber/v2"

	controllers "database_assignment/app/controllers"
	
)


var homeController controllers.HomeController= controllers.InitializeHomeController()

func HomeRouter(home fiber.Router) {
	
	home.Post("/login", homeController.Login)
	home.Post("/logout", homeController.Logout)
	home.Post("/branchyear", homeController.GetBranchYear)
	
	home.Get("*", homeController.Home)
}