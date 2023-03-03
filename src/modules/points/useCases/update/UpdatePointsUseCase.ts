import { inject, injectable } from 'tsyringe'
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

    const FoundExistitsPoint = await this.repository.find(
      [
        { name },
        { address },
        { latitude, longitude }
      ]
    )

    if ((FoundExistitsPoint?.length === 1 && FoundExistitsPoint[0]?.id !== id) ||
      !FoundExistitsPoint || FoundExistitsPoint?.length > 1) {
      throw new AppError('Ponto com esse nome, endereço e/ou latitude e longitude já cadastrado!', 409)
    }

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
