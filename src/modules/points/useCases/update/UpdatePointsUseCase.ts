import { inject, injectable } from 'tsyringe'
import { Not } from 'typeorm'
import AppError from '../../../../errors/AppError'
import type Points from '../../../../models/Points'
import { IPointsRepository } from '../../repositories/IPointsRepository'
import { type IUpdatePointRequestDTO } from './IUpdatePointDTO'

@injectable()
class UpdatePointsUseCase {
  constructor (
    @inject('PointsRepository')
    private readonly repository: IPointsRepository
  ) {}

  async execute ({ id, name, address, latitude, longitude }: IUpdatePointRequestDTO): Promise<Points | null> {
    const foundPoint = await this.repository.findOne({ id })
    if (!foundPoint) throw new AppError('O ponto não existe!', 404)

    const FoundExistitsPoint = await this.repository.find({
      where: {
        id: Not(id),
        or: [
          { name },
          { latitude, longitude }
        ]
      }
    })

    if (FoundExistitsPoint?.length) throw new AppError('Este ponto já está cadastrado!', 409)

    const updatedPoint = await this.repository.update({
      id,
      name,
      address,
      latitude,
      longitude
    })

    return updatedPoint
  }
}

export { UpdatePointsUseCase }
