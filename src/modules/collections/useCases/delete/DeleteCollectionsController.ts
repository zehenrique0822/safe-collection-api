import { type Request, type Response } from 'express'
import { container } from 'tsyringe'
import * as Yup from 'yup'

import { DeleteCollectionsUseCase } from './DeleteCollectionsUseCase'

class DeleteCollectionsController {
  async handle (request: Request, response: Response): Promise<Response> {
    const deleteCollectionsUseCase = container.resolve(DeleteCollectionsUseCase)
    try {
      const { id } = request.params

      const schema = Yup.object({
        id: Yup.number()
          .required('O ID da coleta é obrigatório.')
      })

      await schema.validate({ id })

      await deleteCollectionsUseCase.execute(Number(id))

      return response.status(204).json()
    } catch (err) {
      if (err instanceof Error) {
        return response.status(400).json({ error: err.message })
      }
      return response.status(500).json({ error: err })
    }
  }
}

export { DeleteCollectionsController }
