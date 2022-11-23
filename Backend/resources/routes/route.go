package route

import (
	

	"github.com/gofiber/fiber/v2"
)

func Route(app *fiber.App) {
	

	home := app.Group("/")
	HomeRouter(home)

	dashboard := app.Group("/db")
	DashboardRouter(dashboard)
}
