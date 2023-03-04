import { inject, injectable } from "tsyringe"
import AppError from "../../../../errors/AppError"
import { ICollectionsRepository } from "../../repositories/ICollectionsRepository"

@injectable()
class DeleteCollectionsUseCase {
  constructor (
    @inject("CollectionsRepository")
    private readonly repository: ICollectionsRepository
  ) {}

  async execute (id: number): Promise<void> {
    const foundCollection = await this.repository.findOne({ id })

    if (!foundCollection) throw new AppError("A coleta não existe!", 400)

    await this.repository.delete(id)
  }
}

export { DeleteCollectionsUseCase }
