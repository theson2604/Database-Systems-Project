package route

import (
	"github.com/gofiber/fiber/v2"

	controllers "database_assignment/app/controllers"
	middleware "database_assignment/app/middlewares"
)


var dashboardController controllers.DashboardController= controllers.InitializeDashboardController()

func DashboardRouter(dashboard fiber.Router) {
	
	dashboard.Post("/GetCustomer", middleware.IsAuthenticated,dashboardController.GetCustomer)
	dashboard.Post("/AddRoom", middleware.IsAuthenticated, dashboardController.InsertRoom)
	dashboard.Post("/GetCustomerStat", middleware.IsAuthenticated, dashboardController.GetCustomerStat)
	
}