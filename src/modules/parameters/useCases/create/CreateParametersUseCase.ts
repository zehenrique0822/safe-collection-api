import { inject, injectable } from 'tsyringe'

import AppError from '../../../../errors/AppError'
import type Parameters from '../../../../models/Parameters'
import { IParametersRepository } from '../../repositories/IParametersRepository'
import { type ICreateParameterRequestDTO } from './ICreateParameterDTO'

@injectable()
class CreateParametersUseCase {
  constructor (
    @inject('ParametersRepository')
    private readonly repository: IParametersRepository
  ) {}

  async execute ({ name, unit, limit }: ICreateParameterRequestDTO): Promise<Parameters> {
    const foundParameter = await this.repository.findOne({ name })

    if (foundParameter) {
      throw new AppError('Parâmetro com esse nome já cadastrado!', 409)
    }

    const createdParameter = await this.repository.create({
      name,
      unit,
      limit
    })

    return createdParameter
  }
}

export { CreateParametersUseCase }
