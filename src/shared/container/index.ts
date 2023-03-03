import { container } from 'tsyringe'
import { PointsRepository } from '../../modules/points/repositories/implementations/PointsRepository'
import { type IPointsRepository } from '../../modules/points/repositories/IPointsRepository'

container.registerSingleton<IPointsRepository>(
  'PointsRepository',
  PointsRepository
)
