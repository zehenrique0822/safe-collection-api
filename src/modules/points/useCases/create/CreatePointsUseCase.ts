import { inject, injectable } from 'tsyringe'

import AppError from '../../../../errors/AppError'
import type Points from '../../../../models/Points'
import { IPointsRepository } from '../../repositories/IPointsRepository'
import { type ICreatePointRequestDTO } from './ICreatePointDTO'

@injectable()
class CreatePointsUseCase {
  constructor (
    @inject('PointsRepository')
    private readonly repository: IPointsRepository
  ) {}

  async execute ({ name, address, latitude, longitude }: ICreatePointRequestDTO): Promise<Points> {
    const foundPoint = await this.repository.findOne({
      where: {
        or: [
          { name },
          { latitude, longitude }
        ]
      }
    })

    if (foundPoint) throw new AppError('Ponto com esse nome e/ou latitude e longitude já cadastrado!', 400)

    const createdPoint = await this.repository.create({
      name,
      address,
      latitude,
      longitude
    })

    return createdPoint
  }
}

export { CreatePointsUseCase }
