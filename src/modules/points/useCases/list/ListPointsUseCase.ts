import { inject, injectable } from 'tsyringe'
import type Points from '../../../../models/Points'
import { IPointsRepository } from '../../repositories/IPointsRepository'
import { type IListPointsDTO } from './IListPointsDTO'

@injectable()
class ListPointsUseCase {
  constructor (
    @inject('PointsRepository')
    private readonly repository: IPointsRepository
  ) {}

  async execute ({ search, skip, limit }: IListPointsDTO): Promise<{ data: Points[], count: number }> {
    const list = await this.repository.list({ search, skip, limit })
    return list
  }
}

export { ListPointsUseCase }
