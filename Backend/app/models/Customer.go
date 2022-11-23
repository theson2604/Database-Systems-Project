package models

type Customer struct {
	Customer_id		string		`gorm:"column:customer_id;primarykey"`
	Customer_type	int			`gorm:"column:customer_type"`
	Fullname		string		`gorm:"column:fullname"`
	Email			string		`gorm:"column:email"`
	Phone			string		`gorm:"column:phone"`
	Username		string		`gorm:"column:username"`
	Password		string		`gorm:"-"`
	Ssn				string		`gorm:"column:ssn"`
	Score			uint		`gorm:"column:score"`
}

func (Customer) TableName() string {
	return "CUSTOMER"
  }