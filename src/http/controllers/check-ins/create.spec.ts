import request from 'supertest'
import { app } from '@/app'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import { createAndAuthenticateUser } from '@/utils/test/create-and-authenticate-user'
import { prisma } from '@/lib/prisma'

describe('Create Checkin (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to create a checkin', async () => {
    const { token } = await createAndAuthenticateUser(app)

    const gym = await prisma.gym.create({
      data: {
        title: 'Javascript Gym',
        latitude: -23.0260736,
        longitude: -43.4733056,
      },
    })

    const response = await request(app.server)
      .post(`/gyms/${gym.id}/checkins`)
      .set('Authorization', `Bearer ${token}`)
      .send({
        latitude: -23.0260736,
        longitude: -43.4733056,
      })

    expect(response.statusCode).toEqual(201)
  })
})
