import { inject, injectable } from 'tsyringe'
import AppError from '../../../../errors/AppError'
import type Collections from '../../../../models/Collections'
import { ICollectionsRepository } from '../../repositories/ICollectionsRepository'
import { type IUpdateCollectionRequestDTO } from './IUpdateCollectionsDTO'

@injectable()
class UpdateCollectionsUseCase {
  constructor (
    @inject('CollectionsRepository')
    private readonly repository: ICollectionsRepository
  ) {}

  async execute ({
    id,
    id_points,
    id_parameters,
    value,
    date_collect
  }: IUpdateCollectionRequestDTO): Promise<Collections | null> {
    const foundCollection = await this.repository.findOne({ id })
    if (!foundCollection) throw new AppError('A coleta não existe!', 404)

    const updatedCollection = await this.repository.update({
      id,
      id_points,
      id_parameters,
      value,
      date_collect
    })

    return updatedCollection
  }
}

export { UpdateCollectionsUseCase }
