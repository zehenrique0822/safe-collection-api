import { type Repository } from 'typeorm'
import { AppDataSource } from '../../../../database/index'
import Collections from '../../../../models/Collections'
import { type ICreateCollectionRequestDTO } from '../../useCases/create/ICreateCollectionDTO'
import { type IListCollectionsRequestDTO } from '../../useCases/list/IListCollectionsDTO'
import { type IUpdateCollectionRequestDTO } from '../../useCases/update/IUpdateCollectionsDTO'
import { type ICollectionsRepository } from '../ICollectionsRepository'

class CollectionsRepository implements ICollectionsRepository {
  private readonly repository: Repository<Collections>

  constructor () {
    this.repository = AppDataSource.getRepository(Collections)
  }

  async find (
    where: { [key: string]: any },
    relations?: string[],
    order?: { [key: string]: any }
  ): Promise<Collections[] | null> {
    const foundCollections = await this.repository.find({
      where,
      relations,
      order
    })

    return foundCollections
  }

  async findOne (
    where: { [key: string]: any },
    relations?: string[],
    order?: { [key: string]: any }
  ): Promise<Collections | null> {
    const foundCollect = await this.repository.findOne({
      where,
      relations,
      order
    })

    return foundCollect
  }

  async create (collection: ICreateCollectionRequestDTO): Promise<Collections> {
    const createdCollect = this.repository.create(collection)
    await this.repository.save(createdCollect)
    return createdCollect
  }

  async list (pagination: IListCollectionsRequestDTO): Promise<{ data: Collections[], count: number }> {
    const query = this.repository.createQueryBuilder('Collections')

    if (pagination.skip && pagination.limit) {
      query.skip(pagination.skip * pagination.limit).take(pagination.limit)
    }

    query.orderBy('Collections.id', 'ASC')

    const [data, count] = await query.getManyAndCount()

    return { data, count }
  }

  async update (collection: IUpdateCollectionRequestDTO): Promise<Collections | null> {
    await this.repository.update(collection.id, collection)
    const updatedCollect = await this.repository.findOne({ where: { id: collection.id } })
    return updatedCollect
  }

  async delete (id: number): Promise<void> {
    await this.repository.delete(id)
  }
}

export { CollectionsRepository }
