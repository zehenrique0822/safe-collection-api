import { type Request, type Response } from 'express'
import { container } from 'tsyringe'
import { ListCollectionsUseCase } from './ListCollectionsUseCase'

class ListCollectionsController {
  async handle (request: Request, response: Response): Promise<Response> {
    const listCollectionsUseCase = container.resolve(ListCollectionsUseCase)
    try {
      const { skip, limit } = request.query

      const list = await listCollectionsUseCase.execute({
        skip: skip ? Number(skip) : 0,
        limit: limit ? Number(limit) : 0
      })

      if (!list.data?.length) {
        return response.status(404).json({ error: "Nenhuma coleta encontrada!" })
      }

      return response.status(200).json(list)
    } catch (err) {
      if (err instanceof Error) {
        return response.status(400).json({ error: err.message })
      }
      return response.status(500).json({ error: err })
    }
  }
}

export { ListCollectionsController }
