import { type Request, type Response } from 'express'
import { container } from 'tsyringe'
import * as Yup from 'yup'

import { CreateParametersUseCase } from './CreateParametersUseCase'

class CreateParametersController {
  async handle (request: Request, response: Response): Promise<Response> {
    const createParametersUseCase = container.resolve(CreateParametersUseCase)
    try {
      const { name, unit, limit } = request.body

      const schema = Yup.object({
        name: Yup.string()
          .required('O nome é obrigatório.')
          .min(3, 'O nome precisa ter no mínimo 3 caracteres.')
          .max(255, 'O nome precisa ter no máximo 255 caracteres.'),
        unit: Yup.string()
          .required('A unidade de medida é obrigatório.')
          .min(3, 'A unidade de medida precisa ter no mínimo 1 caractere.')
          .max(255, 'A unidade de medida precisa ter no máximo 1000 caracteres.'),
        limit: Yup.number()
          .required('O limite é obrigatório.')
      })

      const data = { name, unit, limit }

      await schema.validate(data)

      const createdParameter = await createParametersUseCase.execute(data)

      return response.status(201).json(createdParameter)
    } catch (err) {
      if (err instanceof Error) {
        return response.status(400).json({ error: err.message })
      }
      return response.status(500).json({ error: err })
    }
  }
}

export { CreateParametersController }
