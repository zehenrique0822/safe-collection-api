import { type Request, type Response } from 'express'
import { container } from 'tsyringe'
import * as Yup from 'yup'
import { UpdateParametersUseCase } from './UpdateParametersUseCase'

class UpdateParametersController {
  async handle (request: Request, response: Response): Promise<Response> {
    const updateParametersUseCase = container.resolve(UpdateParametersUseCase)
    try {
      const { id } = request.params
      const { name, unit, limit } = request.body

      const schema = Yup.object({
        id: Yup.number()
          .required('O ID do ponto é obrigatório.'),
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

      const data = { id: Number(id), name, unit, limit }

      await schema.validate(data)

      const updatedParameter = await updateParametersUseCase.execute(data)

      return response.status(200).json(updatedParameter)
    } catch (err) {
      if (err instanceof Error) {
        return response.status(400).json({ error: err.message })
      }
      return response.status(500).json({ error: err })
    }
  }
}

export { UpdateParametersController }
