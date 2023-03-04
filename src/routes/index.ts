import { Router } from "express"
import parameteresRouter from "./parameters/parameters.routes"
import pointsRouter from "./points/points.routes"

const routes = Router()

routes.use('/points', pointsRouter)
routes.use('/parameters', parameteresRouter)
routes.use('/', (req, res) => {
  res.send({ api: 'safe-collection-api' })
})

export default routes
