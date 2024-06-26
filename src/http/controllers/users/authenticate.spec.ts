import request from 'supertest'
import { app } from '@/app'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

describe('Registe(e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to register', async () => {
    await request(app.server).post('/users').send({
      name: 'john doe',
      email: 'jondoe@rocketseat.com',
      password: 'john123',
    })

    const response = await request(app.server).post('/sessions').send({
      email: 'jondoe@rocketseat.com',
      password: 'john123',
    })

    expect(response.statusCode).toEqual(200)
    expect(response.body).toEqual({
      token: expect.any(String),
    })
  })
})
