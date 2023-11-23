import Fastify from 'fastify'
import dotenv from 'dotenv'

// load env variables
dotenv.config()

const fastify = Fastify({
  logger: true
})

fastify.get('/', async (request, reply) => {
  return { status: 'OK' }
})


// run server
try {
  await fastify.listen({ port: process.env.PORT || 3000 })
} catch (err) {
  fastify.log.error(err)
  process.exit(1)
}