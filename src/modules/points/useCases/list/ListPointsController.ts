import { type Request, type Response } from 'express'
import { container } from 'tsyringe'
import { ListPointsUseCase } from './ListPointsUseCase'

class ListPointsController {
  async handle (request: Request, response: Response): Promise<Response> {
    const listPointsUseCase = container.resolve(ListPointsUseCase)
    try {
      const { search, skip, limit } = request.query

      const list = await listPointsUseCase.execute({
        search: String(search) ?? null,
        skip: Number(skip) ?? 0,
        limit: Number(limit) ?? 0
      })

      if (!list.data?.length) {
        return response.status(404).json({ error: "Nenhum ponto encontrado!" })
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

export { ListPointsController }
