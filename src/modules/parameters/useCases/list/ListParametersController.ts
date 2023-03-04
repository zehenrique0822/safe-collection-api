import { type Request, type Response } from 'express'
import { container } from 'tsyringe'
import { ListParametersUseCase } from './ListParametersUseCase'

class ListParametersController {
  async handle (request: Request, response: Response): Promise<Response> {
    const listParametersUseCase = container.resolve(ListParametersUseCase)
    try {
      const { search, skip, limit } = request.query

      const list = await listParametersUseCase.execute({
        search: search ? String(search) : null,
        skip: skip ? Number(skip) : 0,
        limit: limit ? Number(limit) : 0
      })

      if (!list.data?.length) {
        return response.status(404).json({ error: "Nenhum parâmetro encontrado!" })
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

export { ListParametersController }
