package route

import (
	"github.com/gofiber/fiber/v2"

	controllers "database_assignment/app/controllers"
	_ "database_assignment/app/middlewares"
)


var dashboardController controllers.DashboardController= controllers.InitializeDashboardController()

func DashboardRouter(dashboard fiber.Router) {
	
	dashboard.Post("/GetCustomer",dashboardController.GetCustomer)
	dashboard.Post("/AddRoom", dashboardController.InsertRoom)
	dashboard.Post("/GetCustomerStat", dashboardController.GetCustomerStat)
	
}