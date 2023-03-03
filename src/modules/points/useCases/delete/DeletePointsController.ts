import { type Request, type Response } from 'express'
import { container } from 'tsyringe'
import * as Yup from 'yup'

import { DeletePointsUseCase } from './DeletePointsUseCase'

class DeletePointsController {
  async handle (request: Request, response: Response): Promise<Response> {
    const deletePointsUseCase = container.resolve(DeletePointsUseCase)
    try {
      const { id } = request.params

      const schema = Yup.object({
        id: Yup.number()
          .required('O ID do ponto é obrigatório.')
      })

      await schema.validate({ id })

      await deletePointsUseCase.execute(Number(id))

      return response.status(204).json()
    } catch (err) {
      if (err instanceof Error) {
        return response.status(400).json({ error: err.message })
      }
      return response.status(500).json({ error: err })
    }
  }
}

export { DeletePointsController }
