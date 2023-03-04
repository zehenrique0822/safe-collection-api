import { Router } from "express"
import collectionsRouter from "./collections/collections.routes"
import parametersRouter from "./parameters/parameters.routes"
import pointsRouter from "./points/points.routes"

const routes = Router()

routes.use('/points', pointsRouter)
routes.use('/parameters', parametersRouter)
routes.use('/collections', collectionsRouter)
routes.use('/', (req, res) => {
  res.send({ api: 'safe-collection-api' })
})

export default routes
