import { type Repository } from 'typeorm'
import { AppDataSource } from '../../../../database/index'
import Parameters from '../../../../models/Parameters'
import { type ICreateParameterRequestDTO } from '../../useCases/create/ICreateParameterDTO'
import { type IListParametersDTO } from '../../useCases/list/IListParametersDTO'
import { type IUpdateParameterRequestDTO } from '../../useCases/update/IUpdateParameterDTO'
import { type IParametersRepository } from '../IParametersRepository'

class ParametersRepository implements IParametersRepository {
  private readonly repository: Repository<Parameters>

  constructor () {
    this.repository = AppDataSource.getRepository(Parameters)
  }

  async find (
    where: { [key: string]: any },
    relations?: string[],
    order?: { [key: string]: any }
  ): Promise<Parameters[] | null> {
    const foundParameters = await this.repository.find({
      where,
      relations,
      order
    })

    return foundParameters
  }

  async findOne (
    where: { [key: string]: any },
    relations?: string[],
    order?: { [key: string]: any }
  ): Promise<Parameters | null> {
    const foundParameter = await this.repository.findOne({
      where,
      relations,
      order
    })

    return foundParameter
  }

  async create (parameter: ICreateParameterRequestDTO): Promise<Parameters> {
    const createdParameter = this.repository.create(parameter)
    await this.repository.save(createdParameter)
    return createdParameter
  }

  async list (pagination: IListParametersDTO): Promise<{ data: Parameters[], count: number }> {
    const query = this.repository.createQueryBuilder('Parameters')

    if (pagination.search) {
      query.where(`LOWER(Parameters.name) LIKE '%${pagination.search.toLowerCase()}%'`)
    }

    if (pagination.skip && pagination.limit) {
      query.skip(pagination.skip * pagination.limit).take(pagination.limit)
    }

    query.orderBy('Parameters.id', 'ASC')

    const [data, count] = await query.getManyAndCount()

    return { data, count }
  }

  async update (parameter: IUpdateParameterRequestDTO): Promise<Parameters | null> {
    await this.repository.update(parameter.id, parameter)
    const updatedParameter = await this.repository.findOne({ where: { id: parameter.id } })
    return updatedParameter
  }

  async delete (id: number): Promise<void> {
    await this.repository.delete(id)
  }
}

export { ParametersRepository }
