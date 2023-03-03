import { type Repository } from 'typeorm'
import { AppDataSource } from '../../../../database/index'
import Points from '../../../../models/Points'
import { type ICreatePointRequestDTO } from '../../useCases/create/ICreatePointDTO'
import { type IListPointsDTO } from '../../useCases/list/IListPointsDTO'
import { type IUpdatePointRequestDTO } from '../../useCases/update/IUpdatePointDTO'
import { type IPointsRepository } from '../IPointsRepository'

class PointsRepository implements IPointsRepository {
  private readonly repository: Repository<Points>

  constructor () {
    this.repository = AppDataSource.getRepository(Points)
  }

  async find (
    where: { [key: string]: any },
    relations?: string[],
    order?: { [key: string]: any }
  ): Promise<Points[] | null> {
    const foundPoints = await this.repository.find({
      where,
      relations,
      order
    })

    return foundPoints
  }

  async findOne (
    where: { [key: string]: any },
    relations?: string[],
    order?: { [key: string]: any }
  ): Promise<Points | null> {
    const foundPoint = await this.repository.findOne({
      where,
      relations,
      order
    })

    return foundPoint
  }

  async create (point: ICreatePointRequestDTO): Promise<Points> {
    const createdPoint = this.repository.create(point)
    await this.repository.save(createdPoint)
    return createdPoint
  }

  async list (pagination: IListPointsDTO): Promise<{ data: Points[], count: number }> {
    const query = this.repository.createQueryBuilder('Points')

    if (pagination.search) {
      query.where(`LOWER(Points.name) LIKE '%${pagination.search.toLowerCase()}%'`)
    }

    if (pagination.skip && pagination.limit) {
      query.skip(pagination.skip * pagination.limit).take(pagination.limit)
    }

    query.orderBy('Points.id', 'ASC')

    const [data, count] = await query.getManyAndCount()

    return { data, count }
  }

  async update (point: IUpdatePointRequestDTO): Promise<Points | null> {
    await this.repository.update(point.id, point)
    const updatedPoint = await this.repository.findOne({ where: { id: point.id } })
    return updatedPoint
  }

  async delete (id: number): Promise<void> {
    await this.repository.delete(id)
  }
}

export { PointsRepository }
