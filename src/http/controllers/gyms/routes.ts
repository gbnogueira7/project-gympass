import { verifyJWT } from '@/http/middlewares/verify-JWT'
import { FastifyInstance } from 'fastify'
import { searchGym } from './searchGymsController'
import { nearbyGym } from './nearbyGymsController'
import { createGym } from './createGymsController'
import { verifyUserRole } from '@/http/middlewares/verifyUserRole'

export async function gymsRoutes(app: FastifyInstance) {
  app.addHook('onRequest', verifyJWT)
  app.get('/gyms/search', searchGym)
  app.get('/gyms/nearby', nearbyGym)
  app.post('/post/gyms', { onRequest: [verifyUserRole('ADMIN')] }, createGym)
}
