import { Router } from 'express'
import { CreateParametersController } from '../../modules/parameters/useCases/create/CreateParametersController'
import { DeleteParametersController } from '../../modules/parameters/useCases/delete/DeleteParametersController'
import { ListParametersController } from '../../modules/parameters/useCases/list/ListParametersController'
import { UpdateParametersController } from '../../modules/parameters/useCases/update/UpdateParametersController'

const parametersRouter = Router()

const createParametersController = new CreateParametersController()
const listParametersController = new ListParametersController()
const updateParametersController = new UpdateParametersController()
const deleteParametersController = new DeleteParametersController()

parametersRouter.post('/new', createParametersController.handle)
parametersRouter.get('/', listParametersController.handle)
parametersRouter.put('/edit/:id', updateParametersController.handle)
parametersRouter.delete('/delete/:id', deleteParametersController.handle)

export default parametersRouter
