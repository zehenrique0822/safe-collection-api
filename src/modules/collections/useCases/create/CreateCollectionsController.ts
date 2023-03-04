import { type Request, type Response } from 'express'
import { container } from 'tsyringe'
import * as Yup from 'yup'

import { CreateCollectionsUseCase } from './CreateCollectionsUseCase'

class CreateCollectionsController {
  async handle (request: Request, response: Response): Promise<Response> {
    const createCollectionsUseCase = container.resolve(CreateCollectionsUseCase)
    try {
      const { id_points, id_parameters, value, date_collect } = request.body

      const schema = Yup.object({
        id_points: Yup.number().required('O ponto é obrigatório.'),
        id_parameters: Yup.number().required('O parâmetro é obrigatório.'),
        value: Yup.number().required('O valor é obrigatório.'),
        date_collect: Yup.date()
          .max(new Date(), 'A data de coleta não pode ser maior que hoje')
          .required('A data de coleta é obrigatória.')
      })

      const data = { id_points, id_parameters, value, date_collect }

      await schema.validate(data)

      const createdParameter = await createCollectionsUseCase.execute(data)

      return response.status(201).json(createdParameter)
    } catch (err) {
      if (err instanceof Error) {
        return response.status(400).json({ error: err.message })
      }
      return response.status(500).json({ error: err })
    }
  }
}

export { CreateCollectionsController }
