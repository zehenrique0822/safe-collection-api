import { Router } from 'express'
import { CreateParametersController } from '../../modules/parameters/useCases/create/CreateParamatersController'
import { DeleteParametersController } from '../../modules/parameters/useCases/delete/DeleteParametersController'
import { ListParametersController } from '../../modules/parameters/useCases/list/ListParametersController'
import { UpdateParametersController } from '../../modules/parameters/useCases/update/UpdateParametersController'

const parameteresRouter = Router()

const createParametersController = new CreateParametersController()
const listParametersController = new ListParametersController()
const updateParametersController = new UpdateParametersController()
const deleteParametersController = new DeleteParametersController()

parameteresRouter.post('/new', createParametersController.handle)
parameteresRouter.get('/', listParametersController.handle)
parameteresRouter.put('/edit/:id', updateParametersController.handle)
parameteresRouter.delete('/delete/:id', deleteParametersController.handle)

export default parameteresRouter
