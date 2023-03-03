import { type IUpdatePointRequestDTO } from '../../modules/points/useCases/update/IUpdatePointDTO'
import { api } from '../api'

describe('points update', () => {
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

  it('Should list points', async () => {
    const request = { search: '', skip: 0, limit: 0 }
    const response = await api.get('/points').query(request)

    const foundCreatedPoint: IUpdatePointRequestDTO = response?.body.data?.find((point: IUpdatePointRequestDTO) => point.id === data.createdPointId)

    expect(response.status).toEqual(200)
    expect(response.body.data.length).toBeGreaterThan(0)
    expect(foundCreatedPoint).toBeDefined()
  })

  it('Should point update', async () => {
    const request = {
      name: 'Ponto test 2',
      address: 'Tadashi matsumoto ts 3',
      latitude: -22.28545454124,
      longitude: -51.51771154124
    }

    const response = await api.put(`/points/edit/${data.createdPointId}`).send(request)

    expect(response.status).toEqual(200)
    expect(response.body.name).toEqual(request.name)
    expect(response.body.address).toEqual(request.address)
    expect(response.body.latitude).toEqual(request.latitude)
    expect(response.body.longitude).toEqual(request.longitude)
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
})
