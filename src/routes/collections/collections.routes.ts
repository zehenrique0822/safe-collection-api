import { Router } from 'express'
import { CreateCollectionsController } from '../../modules/collections/useCases/create/CreateCollectionsController'
import { DeleteCollectionsController } from '../../modules/collections/useCases/delete/DeleteCollectionsController'
import { ListCollectionsController } from '../../modules/collections/useCases/list/ListCollectionsController'
import { UpdateCollectionsController } from '../../modules/collections/useCases/update/UpdateCollectionsController'

const collectionsRouter = Router()

const createCollectionsController = new CreateCollectionsController()
const listCollectionsController = new ListCollectionsController()
const updateCollectionsController = new UpdateCollectionsController()
const deleteCollectionsController = new DeleteCollectionsController()

collectionsRouter.post('/new', createCollectionsController.handle)
collectionsRouter.get('/', listCollectionsController.handle)
collectionsRouter.put('/edit/:id', updateCollectionsController.handle)
collectionsRouter.delete('/delete/:id', deleteCollectionsController.handle)

export default collectionsRouter
