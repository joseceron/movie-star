import request from 'supertest'
import { Server } from '../../Server'

const PORT = process.env.PORT ?? '8000'
const server = new Server(PORT)
const app = server._app

let movieId: String = ''
const token: string = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InRlc3QzQGdtYWlsLmNvbSIsImlhdCI6MTY2NTQxNjI4MX0.dNGh_kDwFvwJpMH9bU0bSNjg85CfEX727nf0JDMt3Zw'

describe.skip('Test GET /v1/movies', () => {
  test('It should response with 200 success', async () => {
    const response = await request(app)
      .get('/v1/movies')
      .set('Authorization', `Bearer ${token}`)
      .expect('Content-Type', /json/)
      .expect(200)
    expect(Array.isArray(response.body)).toBe(true)
  })
})

describe.skip('Test POST /v1/movies', () => {
  const completeMovieData = {
    title: 'Test-2',
    year: '2022',
    rating: 3,
    castAndCrew: {
      actors: [
        'Silvestre Stalon',
        'ronaldo',
        'halan'
      ],
      director: [
        'Silvestre Stalon',
        'migue cerón'
      ]
    },
    genre: {
      id: 1
    }
  }

  test('It should respond with 201 created', async () => {
    const response = await request(app)
      .post('/v1/movies')
      .set('Authorization', `Bearer ${token}`)
      .send(completeMovieData)
      .expect('Content-Type', /json/)
      .expect(201)

    const body = response.body
    movieId = body.id
    expect(Object.keys(body).length).toBe(6)
    expect(body).toMatchObject(completeMovieData)
  })
})

describe.skip('Test GET /v1/movies/movieId', () => {
  test('It should get movie by movieId', async () => {
    const response = await request(app)
      .get(`/v1/movies/${movieId}`)
      .set('Authorization', `Bearer ${token}`)
      .expect('Content-Type', /json/)
      .expect(200)

    const body = response.body
    const keysSize = Object.keys(body).length
    expect(keysSize).toBe(6)
    expect(body.id).toBe(movieId)
  })
})

describe.skip('Test PUT /movies', () => {
  const movieUpdateData = {
    title: 'Test-Updated',
    year: '2022',
    rating: 3,
    castAndCrew: {
      actors: [
        'Silvestre Stalon',
        'ronaldo',
        'halan'
      ],
      director: [
        'Silvestre Stalon',
        'migue cerón'
      ]
    },
    genre: {
      id: 1
    }
  }
  test('It should update the movie', async () => {
    const response = await request(app)
      .put(`/v1/movies/${movieId}`)
      .set('Authorization', `Bearer ${token}`)
      .send(movieUpdateData)
      .expect('Content-Type', /json/)
      .expect(200)

    const body = response.body
    expect(Object.keys(body).length).toBe(6)
  })
})

describe.skip('Test DELETE /v1/movies', () => {
  test('It should respond with 204', async () => {
    console.log('movieId: ', movieId)
    const response = await request(app)
      .delete(`/v1/movies/${movieId}`)
      .set('Authorization', `Bearer ${token}`)
      .expect(204)
    expect(response.noContent).toBe(true)
  })
})
