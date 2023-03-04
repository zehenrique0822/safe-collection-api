import { inject, injectable } from 'tsyringe'
import type Parameters from '../../../../models/Parameters'
import { IParametersRepository } from '../../repositories/IParametersRepository'
import { type IListParametersDTO } from './IListParametersDTO'

@injectable()
class ListParametersUseCase {
  constructor (
    @inject('ParametersRepository')
    private readonly repository: IParametersRepository
  ) {}

  async execute ({ search, skip, limit }: IListParametersDTO): Promise<{ data: Parameters[], count: number }> {
    const list = await this.repository.list({ search, skip, limit })
    return list
  }
}

export { ListParametersUseCase }
