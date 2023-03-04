import { type IUpdateCollectionRequestDTO } from '../../modules/collections/useCases/update/IUpdateCollectionsDTO'
import { type IUpdateParameterRequestDTO } from '../../modules/parameters/useCases/update/IUpdateParameterDTO'
import { type IUpdatePointRequestDTO } from '../../modules/points/useCases/update/IUpdatePointDTO'
import { api } from '../api'

describe('collections update', () => {
  const data: any = {}

  it('Should create a point', async () => {
    const request = {
      name: 'Ponto test',
      address: 'Tadashi matsumoto ts',
      latitude: -22.28545454123,
      longitude: -51.51771154123
    }
    const response = await api.post('/points/new').send(request)

    expect(response.status).toEqual(201)
    expect(response.body.id).toBeDefined()

    data.createdPointId = response.body.id
  })

  it('Should create a parameter', async () => {
    const request = {
      name: 'Arsênio total',
      unit: 'mg/l',
      limit: 0.01
    }
    const response = await api.post('/parameters/new').send(request)

    expect(response.status).toEqual(201)
    expect(response.body.id).toBeDefined()

    data.createdParameterId = response.body.id
  })

  it('Should create a collection', async () => {
    const request = {
      id_points: data.createdPointId,
      id_parameters: data.createdParameterId,
      value: 0.6,
      date_collect: "2023-03-03"
    }
    const response = await api.post('/collections/new').send(request)

    expect(response.status).toEqual(201)
    expect(response.body.id).toBeDefined()

    data.createdCollectionId = response.body.id
  })

  it('Should list collections', async () => {
    const request = { skip: 0, limit: 0 }
    const response = await api.get('/collections').query(request)

    const foundCreatedCollection: IUpdateCollectionRequestDTO = response?.body.data?.find((collection: IUpdateCollectionRequestDTO) => collection.id === data.createdCollectionId)

    expect(response.status).toEqual(200)
    expect(response.body.data.length).toBeGreaterThan(0)
    expect(foundCreatedCollection).toBeDefined()
  })

  it('Should collection update', async () => {
    const request = {
      id_points: data.createdPointId,
      id_parameters: data.createdParameterId,
      value: 0.01,
      date_collect: "2023-03-03"
    }

    const response = await api.put(`/collections/edit/${data.createdCollectionId}`).send(request)

    expect(response.status).toEqual(200)
    expect(response.body.id_points).toEqual(request.id_points)
    expect(response.body.id_parameters).toEqual(request.id_parameters)
    expect(response.body.value).toEqual(request.value)
    expect(response.body.date_collect.substring(0, 10)).toEqual(request.date_collect)
  })

  it('Should delete collection', async () => {
    const response = await api.delete(`/collections/delete/${data.createdCollectionId}`)

    expect(response.status).toEqual(204)

    const getRequest = { skip: 0, limit: 0 }

    const showCollectionsAfterDelete = await api.get('/collections').query(getRequest)

    const foundCollection = showCollectionsAfterDelete.body.data?.find(
      (collection: IUpdateCollectionRequestDTO) => collection.id === data.createdCollectionId
    )
    expect(foundCollection).toBeUndefined()
  })

  it('Should delete point', async () => {
    const response = await api.delete(`/points/delete/${data.createdPointId}`)

    expect(response.status).toEqual(204)

    const getRequest = { search: '', skip: 0, limit: 0 }

    const showPointsAfterDelete = await api.get('/points').query(getRequest)

    const foundPoint = showPointsAfterDelete.body.data?.find(
      (point: IUpdatePointRequestDTO) => point.id === data.createdPointId
    )
    expect(foundPoint).toBeUndefined()
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
