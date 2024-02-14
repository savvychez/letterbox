import Fastify from 'fastify'
import dotenv from 'dotenv'
import crypto from 'crypto'
import path from 'path'
import fastifyStatic from '@fastify/static'
import formbody from '@fastify/formbody'

// load env variables
dotenv.config()
let message = "oops there was an error! if ur seeing this text me!!"
let viewed = false;
const server = Fastify({
  logger: true
})

server.register(fastifyStatic, {
  root: path.join(process.cwd(), 'public'),
  prefix: '/', // optional: default '/'
})
server.register(formbody)


server.get('/', async (request, reply) => {
  return reply.sendFile('index.html') // serving path.join(__dirname, 'public', 'index.html') directly
})

server.post('/', async (request, reply) => {
  const message_txt  = request.body.message;
  // return request.body;
  message = message_txt;
  console.log('message:', message);
  // Do something with the message here
  viewed = false;
  return { status: 'OK', message }
})

server.get('/latest', async (request, reply) => {
  const viewParam = request.query.view;

  if (viewParam === 'true') {
    viewed = true;
  }

  const hash = crypto.createHash('md5');
  hash.update(message);
  const hashedMessage = hash.digest('hex');
  const data = {
    "type": "live",
    "hash": hashedMessage,
    "timestamp": "Jan 1, 2021",
    "viewed": viewed,
    "message": message,
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