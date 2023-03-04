import { container } from 'tsyringe'
import { type ICollectionsRepository } from '../../modules/collections/repositories/ICollectionsRepository'
import { CollectionsRepository } from '../../modules/collections/repositories/implementations/CollectionsRepository'
import { ParametersRepository } from '../../modules/parameters/repositories/implementations/ParametersRepository'
import { type IParametersRepository } from '../../modules/parameters/repositories/IParametersRepository'
import { PointsRepository } from '../../modules/points/repositories/implementations/PointsRepository'
import { type IPointsRepository } from '../../modules/points/repositories/IPointsRepository'

container.registerSingleton<IPointsRepository>(
  'PointsRepository',
  PointsRepository
)

container.registerSingleton<IParametersRepository>(
  'ParametersRepository',
  ParametersRepository
)

container.registerSingleton<ICollectionsRepository>(
  'CollectionsRepository',
  CollectionsRepository
)
