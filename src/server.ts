import 'reflect-metadata'
import express from 'express'
import routes from './routes'
import cors from 'cors'
import { AppDataSource } from './database/index'

AppDataSource.initialize()
  .then(async () => {
    console.log('📦 Successfully connected with database!')

    const app = express()

    app.use(cors())
    app.use(express.json())
    app.use(routes)

    app.listen(process.env.API_PORT ?? 3333, () => {
      console.log('🔥 Server started at http://localhost:3333')
    })
  })
  .catch((err) => {
    console.error('❌ Error during Data Source initialization', err)
  })
