import { inject, injectable } from 'tsyringe'
import type Collections from '../../../../models/Collections'
import { ICollectionsRepository } from '../../repositories/ICollectionsRepository'
import { type IListCollectionsRequestDTO } from './IListCollectionsDTO'

@injectable()
class ListCollectionsUseCase {
  constructor (
    @inject('CollectionsRepository')
    private readonly repository: ICollectionsRepository
  ) {}

  async execute ({ skip, limit }: IListCollectionsRequestDTO): Promise<{ data: Collections[], count: number }> {
    const list = await this.repository.list({ skip, limit })
    return list
  }
}

export { ListCollectionsUseCase }
