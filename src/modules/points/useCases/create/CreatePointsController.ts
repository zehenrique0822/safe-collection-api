import { type Request, type Response } from 'express'
import { container } from 'tsyringe'
import * as Yup from 'yup'

import { CreatePointsUseCase } from './CreatePointsUseCase'

class CreatePointsController {
  async handle (request: Request, response: Response): Promise<Response> {
    const createPointsUseCase = container.resolve(CreatePointsUseCase)
    try {
      const { name, address, latitude, longitude } = request.body

      const schema = Yup.object({
        name: Yup.string()
          .required('O nome é obrigatório.')
          .min(3, 'O nome precisa ter no mínimo 3 caracteres.')
          .max(255, 'O nome precisa ter no máximo 255 caracteres.'),
        address: Yup.string()
          .required('O endereço é obrigatório.')
          .min(3, 'O endereço precisa ter no mínimo 3 caracteres.')
          .max(1000, 'O endereço precisa ter no máximo 1000 caracteres.'),
        latitude: Yup.number()
          .required('A latitude é obrigatória.'),
        longitude: Yup.number()
          .required('A longitude é obrigatória.')
      })

      const data = { name, address, latitude, longitude }

      await schema.validate(data)

      const createdPoint = await createPointsUseCase.execute(data)

      return response.status(201).json(createdPoint)
    } catch (err) {
      if (err instanceof Error) {
        return response.status(400).json({ error: err.message })
      }
      return response.status(500).json({ error: err })
    }
  }
}

export { CreatePointsController }
