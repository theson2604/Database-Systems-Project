package models

type SupplyType struct {
	Supplytype_id		string		`gorm:"column:supplytype_id;primarykey"`
	Supplyname			string		`gorm:"column:supplyname"`
	
}

type SupplyInRoom struct {
	Supplytype_id		string		`gorm:"column:supplytype_id;primarykey"`
	Roomtype_id			int			`gorm:"column:roomtype_id;primarykey"`
	Quantity			int 		`gorm:"column:quantity"`
	
}


func (SupplyType) TableName() string {
	return "SUPPLY_TYPE"
  }

  func (SupplyInRoom) TableName() string {
	return "SUPPLY_IN_ROOM"
  }