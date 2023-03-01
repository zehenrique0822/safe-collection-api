import { Router } from "express";

const routes = Router();

routes.use('/', (req, res) => {
  res.send({ api: 'safe-collection-api' })
})

export default routes;