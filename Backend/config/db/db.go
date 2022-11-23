package db

import (
	"fmt"
	"log"
	"os"
	

	"gorm.io/driver/mysql"
	"gorm.io/gorm"
)

func createDSN(username string, password string) string{
	return fmt.Sprintf("%s:%s@tcp(%s)/%s?charset=utf8mb4&parseTime=True&loc=Local", username, password, os.Getenv("HOST_DATABASE"), os.Getenv("DATABASE_NAME"))
}

var Db *gorm.DB

func ConnectDatabase(username, password string) bool{
	database, err := gorm.Open(mysql.Open(createDSN(username, password)), &gorm.Config{})
	if err != nil {
		log.Println(err)
		return false
	} else {
		log.Println("Database connected")
		Db = database
		return true
	}
	
}
