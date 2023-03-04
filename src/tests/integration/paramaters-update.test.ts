import { type IUpdateParameterRequestDTO } from '../../modules/parameters/useCases/update/IUpdateParameterDTO'
import { api } from '../api'

describe('parameters update', () => {
  const data: any = {}

  it('Should create a parameter', async () => {
    const request = {
      name: 'Alumínio dissolvido',
      unit: 'mg/l',
      limit: 0.5
    }
    const response = await api.post('/parameters/new').send(request)

    expect(response.status).toEqual(201)
    expect(response.body.id).toBeDefined()

    data.createdParameterId = response.body.id
  })

  it('Should list parameters', async () => {
    const request = { search: '', skip: 0, limit: 0 }
    const response = await api.get('/parameters').query(request)

    const foundCreatedParameter: IUpdateParameterRequestDTO = response?.body.data?.find((parameter: IUpdateParameterRequestDTO) => parameter.id === data.createdParameterId)

    expect(response.status).toEqual(200)
    expect(response.body.data.length).toBeGreaterThan(0)
    expect(foundCreatedParameter).toBeDefined()
  })

  it('Should parameter update', async () => {
    const request = {
      name: 'Alumínio dissolvido',
      unit: 'mg/l',
      limit: 0.1
    }

    const response = await api.put(`/parameters/edit/${data.createdParameterId}`).send(request)

    expect(response.status).toEqual(200)
    expect(response.body.name).toEqual(request.name)
    expect(response.body.unit).toEqual(request.unit)
    expect(response.body.limit).toEqual(request.limit)
  })

  it('Should delete parameter', async () => {
    const response = await api.delete(`/parameters/delete/${data.createdParameterId}`)

    expect(response.status).toEqual(204)

    const getRequest = { search: '', skip: 0, limit: 0 }

    const showParametersAfterDelete = await api.get('/parameters').query(getRequest)

    const foundParameter = showParametersAfterDelete.body.data?.find(
      (parameter: IUpdateParameterRequestDTO) => parameter.id === data.createdParameterId
    )
    expect(foundParameter).toBeUndefined()
  })
})
