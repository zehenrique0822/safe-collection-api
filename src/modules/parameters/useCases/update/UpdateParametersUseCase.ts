import { inject, injectable } from 'tsyringe'
import AppError from '../../../../errors/AppError'
import type Parameters from '../../../../models/Parameters'
import { IParametersRepository } from '../../repositories/IParametersRepository'
import { type IUpdateParameterRequestDTO } from './IUpdateParameterDTO'

@injectable()
class UpdateParametersUseCase {
  constructor (
    @inject('ParametersRepository')
    private readonly repository: IParametersRepository
  ) {}

  async execute ({ id, name, unit, limit }: IUpdateParameterRequestDTO): Promise<Parameters | null> {
    const foundParameter = await this.repository.findOne({ id })
    if (!foundParameter) throw new AppError('O parâmetro não existe!', 404)

    const FoundExistitsParameter = await this.repository.find({ name })

    if ((FoundExistitsParameter?.length === 1 && FoundExistitsParameter[0]?.id !== id) ||
      !FoundExistitsParameter || FoundExistitsParameter?.length > 1) {
      throw new AppError('Parâmetro com esse nome já cadastrado!', 409)
    }

    const updatedParameter = await this.repository.update({
      id,
      name,
      unit,
      limit
    })

    return updatedParameter
  }
}

export { UpdateParametersUseCase }
