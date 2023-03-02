import 'reflect-metadata'
import { DataSource } from 'typeorm'
import dotenv from "dotenv"

dotenv.config()

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  synchronize: false,
  entities: [
    './src/models/*.ts'
  ],
  migrations: [
    './src/database/migrations/*.ts'
  ]
})
