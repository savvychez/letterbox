import Fastify from 'fastify'
import dotenv from 'dotenv'

// load env variables
dotenv.config()

const server = Fastify({
  logger: true
})

server.get('/', async (request, reply) => {
  return { status: 'OK' }
})

server.get('/latest', async (request, reply) => {
  const data = {
    "type": "live",
    "hash": "abcdefg",
    "timestamp": "Jan 1, 2021",
    "message": "hey neha!! how are you? this is a test message im testing the api so you won't see it but i hope you have a great day!",
    "bg": "#F3F3F3",
    "color": "#000000"
  }
  return data;
})

server.get('/daily', async (request, reply) => {
  const data = {
    "type": "daily",
    "hash": "abcdefg",
    "timestamp": "Jan 1, 2021",
    "message": "Hello daily",
    "bg": "#F3F3F3",
    "color": "#000000"
  }
  return data;
})

// run server
try {
  await server.listen({ port: process.env.PORT || 3000 })
} catch (err) {
  server.log.error(err)
  process.exit(1)
}