import { Router } from 'express'
import { CreatePointsController } from '../../modules/points/useCases/create/CreatePointsController'
import { DeletePointsController } from '../../modules/points/useCases/delete/DeletePointsController'
import { ListPointsController } from '../../modules/points/useCases/list/ListPointsController'
import { UpdatePointsController } from '../../modules/points/useCases/update/UpdatePointsController'

const pointsRouter = Router()

const createPointsController = new CreatePointsController()
const listPointsController = new ListPointsController()
const updatePointsController = new UpdatePointsController()
const deletePointsController = new DeletePointsController()

pointsRouter.post('/new', createPointsController.handle)
pointsRouter.get('/', listPointsController.handle)
pointsRouter.put('/edit/:id', updatePointsController.handle)
pointsRouter.delete('/delete/:id', deletePointsController.handle)

export default pointsRouter
