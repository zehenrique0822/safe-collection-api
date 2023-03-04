import { inject, injectable } from "tsyringe"
import AppError from "../../../../errors/AppError"
import { IParametersRepository } from "../../repositories/IParametersRepository"

@injectable()
class DeleteParametersUseCase {
  constructor (
    @inject("ParametersRepository")
    private readonly repository: IParametersRepository
  ) {}

  async execute (id: number): Promise<void> {
    const foundParameter = await this.repository.findOne({ id }, ["collections"])

    if (!foundParameter) throw new AppError("O parâmetro não existe!", 400)

    if (foundParameter.collections?.length) {
      throw new AppError(
        `O parâmetro ${foundParameter.name} não pode ser removido há ${foundParameter.collections?.length} coleta(as) dele!`,
        409
      )
    }

    await this.repository.delete(id)
  }
}

export { DeleteParametersUseCase }
