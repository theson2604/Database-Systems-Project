package middlewares

import (
	_ "log"

	"github.com/gofiber/fiber/v2"
	

	store "database_assignment/config/session"
)

func IsAuthenticated(c* fiber.Ctx) error {
	sess, _ := store.Store.Get(c)
	if (sess.Get("username") == nil) {
		return c.Redirect("/")
	}
	

	return c.Next()
}

func SwithcRoute(c *fiber.Ctx) error {
	sess, _ := store.Store.Get(c)
	if (sess.Get("username") == nil) {
		return c.Next()
	} else {
		return c.Redirect("/dashboard")
	}
}