package models

type RoomType struct {
	Roomtype_id		int			`gorm:"column:roomtype_id;primarykey"`
	Roomtype_name	string		`gorm:"column:type_name"`
	Area			float32		`gorm:"column:area"`
	Max_guests		uint		`gorm:"column:max_guests"`
	Other			string		`gorm:"column:other_description"`
}

type Bed struct {
	Roomtype_id		int			`gorm:"column:roomtype_id;primarykey"`
	Size			float32		`gorm:"column:size;primarykey;type:decimal(2,1)"`
	Quantity		int			`gorm:"column:quantity"`
	
}

func (RoomType) TableName() string {
	return "ROOM_TYPE"
}

func (Bed) TableName() string {
	return "BED"
}