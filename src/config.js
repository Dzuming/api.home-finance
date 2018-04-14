import dotenv from 'dotenv'
dotenv.config();

export default {
	db: {
		host: process.env.DB_HOST,
		user: process.env.DB_USER,
		password: process.env.DB_PASSWORD,
		database: process.env.DB_DATABASE,
	},
	port: 8000,
	bodyLimit: "100kb",
	corsHeaders: ["Link"],
  secret: process.env.SECRET
}
