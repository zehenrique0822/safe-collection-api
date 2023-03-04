import { inject, injectable } from "tsyringe"
import AppError from "../../../../errors/AppError"
import { IPointsRepository } from "../../repositories/IPointsRepository"

@injectable()
class DeletePointsUseCase {
  constructor (
    @inject("PointsRepository")
    private readonly repository: IPointsRepository
  ) {}

  async execute (id: number): Promise<void> {
    const foundPoint = await this.repository.findOne({ id }, ["collections"])

    if (!foundPoint) throw new AppError("O ponto não existe!", 400)

    if (foundPoint.collections?.length) {
      throw new AppError(
        `O ponto ${foundPoint.name} não pode ser removido há ${foundPoint.collections?.length} coleta(as) associada(as) a ele!`,
        409
      )
    }

    await this.repository.delete(id)
  }
}

export { DeletePointsUseCase }
