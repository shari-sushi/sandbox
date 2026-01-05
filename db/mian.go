package infra

import (
	"fmt"
	"os"

	_ "github.com/go-sql-driver/mysql"
	"gorm.io/driver/mysql"
	"gorm.io/gorm"
)

type SqlHandler struct {
	Conn *gorm.DB
}

func dbInit() SqlHandler {
	user := os.Getenv("MYSQL_USER")
	pw := os.Getenv("MYSQL_PASSWORD")
	dbName := ""
	port := "3306"
	dbUrl := ""

	if common.IsOnCloud {
		fmt.Println("common.IsOnCloud : true")
		//クラウド環境
		dbUrl = os.Getenv("RDS_END_PIONT")
		dbName = os.Getenv("AWS_DATABASE")
		fmt.Printf("環境変数より取得: dbUrl=%v, dbName=%v, \n", dbUrl, dbName)

		// クラウド環境で、環境変数使ってなくて、
		// MySQLとGoがlocal接続するよ(１つのインスタンス内で両方立ててるとか)みたいな状況用
		if dbName == "" && dbUrl == "" {
			dbName = "v_kara_db"
			dbUrl = "localhost"
			// mysqlでユーザー作って、// 権限も付与すること
			user = "shari"
			pw = "shari_sushi"
		}
	} else if common.IsOnLocalWithDockerCompose {
		fmt.Println("common.IsOnLoclaWithDockerCompose : true")
		// Golangはローカルのdocker-compose or ターミナルの go run で起動
		// MySQLはローカルのdocker上(compose使用) で起動
		if user == "" {
			user = "root"
		}
		dbUrl = "v_kara_db"
		dbName = os.Getenv("MYSQL_DATABASE")
	} else if common.IsOnLocalWithOutDockerCompose {
		fmt.Println("develop env. is unknown")
		// Golangはローカルのdocker-compose or  VSCodeで起動
		// MySQLはローカルでdockerを使用せずに起動
		if user == "" {
			// ローカルの環境や準備によってはrootの方が良い可能性あり
			user = "user"
		}
		dbUrl = "localhost"
		dbName = "db"
		pw = "password"
	} else {
		fmt.Println("common.hoge : false ")

		dbUrl = "localhost"
		dbName = "db"
		user = "user"
		pw = "password"
	}
	// mysql -uroot -ppassword --host 127.0.0.1
	path := fmt.Sprintf("%s:%s@tcp(%s:%s)/%s?charset=utf8mb4&parseTime=true", user, pw, dbUrl, port, dbName)

	fmt.Printf("path=%v \n", path)
	var err error
	var sqlHandler *SqlHandler
	gormDB, err := gorm.Open(mysql.Open(path), &gorm.Config{})
	if !common.IsOnCloud {
		gormDB = gormDB.Debug()
	}
	if err == nil {
		sqlHandler = new(SqlHandler)
		sqlHandler.Conn = gormDB
		sqlHandler.migration()
	} else {
		panic("failed to connect database")
	}

	return sqlHandler
}

var isDidDBMigration bool

func (Db *SqlHandler) migration() {
	// NOTE: v1, v2で２回migrationが走るので、それを防ぐためのフラグ
	if !isDidDBMigration {
		fmt.Print("migratoin開始")
		Db.Conn.Set("gorm:table_options", "ENGINE=InnoDB").AutoMigrate(
			// User
			domain.Listener{},
			// Like Relatoin
			domain.Favorite{}, domain.Follow{},
			// Vtuber Contents
			domain.Karaoke{}, domain.Movie{}, domain.Vtuber{}, domain.OriginalSong{},
		)
		isDidDBMigration = true
	}
}

// SELECT * FROM animals;

// SELECT COUNT(id) as count
// 	from animals
// ;

// SELECT COUNT(name) as count
// 	from animals
// ;
// SELECT COUNT(status) as count
// 	from animals

// 	CREATE TABLE animals (
// 		id MEDIUMINT NOT NULL  AUTO_INCREMENT PRIMARY KEY ,
// 		name CHAR(30) NOT NULL,
// 		`status` int
// );

// INSERT INTO animals (name, `status`) VALUES
// 	 ('dog',1),('dog',2),('penguin', null)

// -- null がカウントでどうなるか
// -- 同じ値がカウントでどうなるか
