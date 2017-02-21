package conf

const (
	DB_USER = "postgres"
	DB_PASSWORD = "123456"
	DB_NAME = "sqlrest"
)
const DB_Conn_Postgres = "postgresql://postgres:123456@localhost:5432/sqlrest?sslmode=disable"
const DB_Conn = "host=localhost user=postgres password=123456 sslmode=disable dbname=sqlrest"
const DB_Query_limit = 50
