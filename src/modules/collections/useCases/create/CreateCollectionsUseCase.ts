import { inject, injectable } from 'tsyringe'

import type Collections from '../../../../models/Collections'
import { ICollectionsRepository } from '../../repositories/ICollectionsRepository'
import { type ICreateCollectionRequestDTO } from './ICreateCollectionDTO'

@injectable()
class CreateCollectionsUseCase {
  constructor (
    @inject('CollectionsRepository')
    private readonly repository: ICollectionsRepository
  ) {}

  async execute ({
    id_points,
    id_parameters,
    value,
    date_collect
  }: ICreateCollectionRequestDTO): Promise<Collections> {
    const createdCollection = await this.repository.create({
      id_points,
      id_parameters,
      value,
      date_collect
    })

    return createdCollection
  }
}

export { CreateCollectionsUseCase }
