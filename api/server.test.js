const supertest = require('supertest')

const db = require('../data/dbConfig.js')

const server = require('../api/server.js')

const {
  addUser,
  findUsers,
  findUserById,
  findByUserCreds,
  removeUser,
  updateUser } = require('../models/user-models.js')

const {
  addCategory,
  findCategories,
  findCategoryById,
  findCategoryByUser,
  findCategoryByHabit,
  updateCategory,
  removeCategory,
  removeAllCategoriesByUser } = require('../models/category-models.js')

const {
  findHabits,
  findHabitById,
  findHabitByUser,
  findHabitByCategory,
  addHabit,
  updateHabit,
  removeHabit,
  removeAllHabitsByUser } = require('../models/habit-models.js')

describe('All Routes', () => {
  afterAll(async () => {
    await db('users').truncate()
    await db('categories').truncate()
    await db('habits').truncate()
    console.log("server truncate")
  })

  let token = ''
  let regUserId
  let categoryId
  let habitId

  describe('Auth-routes', () => {

    describe('POST /api/register', () => {

      it('register responds with 201 created', async () => {
        const user = {
          username: 'zchristy',
          fullname: 'Zach Christy',
          password: '1234',
          email: 'zchristy44@gmail.com',
          userImgUrl: 'image.png'
        }
        await supertest(server)
          .post('/api/register')
          .send(user)
          .set('Accept', 'application/json')
          .expect('Content-Type', /json/)
          .expect(201)
          .then(res => {
            regUserId = res.body.id
          })

          const user2 = {
            username: 'zachc4',
            fullname: 'Zach Christy',
            password: '1234',
            email: 'zchristy44@gmail.com',
            userImgUrl: 'image.png'
          }
          await supertest(server)
            .post('/api/register')
            .send(user2)
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(201)

      })

    })

    describe('POST /api/login', () => {

      it('login responds with token and status 200', async () => {
        const creds = {
          username: 'zchristy',
          password: '1234'
        }

        await supertest(server)
          .post('/api/login')
          .send(creds)
          .set('Accept', 'application/json')
          .expect('Content-Type', /json/)
          .expect(200)
          .then(res => {
            token = res.body.token
          })

      })

    })

  })

  describe('User-routes', () => {

    describe('GET /api/users', () => {
      it('responds with 200', async () => {
        await supertest(server)
          .get('/api/users')
          .set('authorization', token)
          .expect(200)
      })

      it('responds with list of users', async () => {
        const usersList = await findUsers()
        await supertest(server)
          .get('/api/users')
          .set('authorization', token)
          .then(res => {
            expect(res.body).toEqual(usersList)
          })
      })
    })

    describe('GET /api/users/:id', () => {

      it('responds with 200 OK', async () => {
        await supertest(server)
          .get(`/api/users/${regUserId}`)
          .set('authorization', token)
          .expect(200)
      })

      it('responds with list of users', async () => {
        const user = await findUserById(regUserId)
        await supertest(server)
          .get(`/api/users/${regUserId}`)
          .set('authorization', token)
          .then(res => {
            expect(res.body).toEqual(user)
          })
      })

    })

    describe('GET /api/users/categories/:id', () => {

      it('responds with 200 OK', async () => {

        await supertest(server)
          .get(`/api/users/categories/${regUserId}`)
          .set('authorization', token)
          .expect(200)
      })

      it('responds all the categories of specific user', async () => {

        const categories = await findCategoryByUser(regUserId)
        await supertest(server)
          .get(`/api/users/categories/${regUserId}`)
          .set('authorization', token)
          .then(res => {
            expect(res.body.categories).toEqual(categories)
          })
      })

    })

    describe('GET /api/users/habits/:id', () => {

      it('responds with 200 OK', async () => {

        await supertest(server)
          .get(`/api/users/habits/${regUserId}`)
          .set('authorization', token)
          .expect(200)
      })

      it('responds all the habits of specific user', async () => {

        const habits = await findHabitByUser(regUserId)
        await supertest(server)
          .get(`/api/users/habits/${regUserId}`)
          .set('authorization', token)
          .then(res => {
            expect(res.body.habits).toEqual(habits)
          })
      })

    })

    describe('PUT /api/users/:id', () => {

      it('responds with 200 OK', async () => {
        const id = 1
        const changes = {
          username: 'zchristy4',
          fullname: 'Zach Christy',
          password: '1234',
          email: 'zchristy44@gmail.com',
          userImgUrl: 'image.png'
        }

        await supertest(server)
          .put(`/api/users/${regUserId}`)
          .send(changes)
          .set('authorization', token)
          .set('Accept', 'application/json')
          .expect(201)
      })

      it('responds with updated user', async () => {
        const changes = {
          username: 'zchristy44',
          fullname: 'Zach Christy',
          password: '1234',
          email: 'zchristy44@gmail.com',
          userImgUrl: 'image.png'
        }

        await supertest(server)
          .put(`/api/users/${regUserId}`)
          .send(changes)
          .set('authorization', token)
          .set('Accept', 'application/json')
          .expect(201)

        await supertest(server)
          .get(`/api/users/${regUserId}`)
          .set('authorization', token)
          .then(res => {
            expect(res.body.username).toEqual(changes.username)
          })
      })

    })

  })

  describe('Categories-routes', () => {

    describe('POST /api/categories', () => {
      it('responds with 200', async () => {
        const category = {
          categoryTitle: 'test1 category',
          color: 'blue'
        }

        const category2 = {
          categoryTitle: 'test2 category',
          color: 'blue'
        }

        await supertest(server)
          .post('/api/categories')
          .send(category)
          .set('authorization', token)
          .expect(201)

        await supertest(server)
          .post('/api/categories')
          .send(category2)
          .set('authorization', token)
          .expect(201)
      })

      it('responds with list of users', async () => {
        const categoryList = await findCategories()
        await supertest(server)
          .get('/api/categories')
          .set('authorization', token)
          .then(res => {
            expect(res.body).toEqual(categoryList)
          })
      })
    })

    describe('GET /api/categories', () => {
      it('responds with 200', async () => {
        await supertest(server)
          .get('/api/categories')
          .set('authorization', token)
          .expect(200)
      })

      it('responds with list of users', async () => {
        const categoryList = await findCategories()
        await supertest(server)
          .get('/api/categories')
          .set('authorization', token)
          .then(res => {
            categoryId = res.body[0].id
            expect(res.body).toEqual(categoryList)
          })
      })
    })

    describe('GET /api/categories/:id', () => {

      it('responds with 200 OK', async () => {
        await supertest(server)
          .get(`/api/categories/${categoryId}`)
          .set('authorization', token)
          .expect(200)
      })

      it('responds with list of catgories', async () => {
        const category = await findCategoryById(categoryId)
        await supertest(server)
          .get(`/api/categories/${categoryId}`)
          .set('authorization', token)
          .then(res => {
            expect(res.body).toEqual(category)
          })
      })

    })

    describe('GET /api/categories/habits/:id', () => {

      it('responds with 200 OK', async () => {

        await supertest(server)
          .get(`/api/categories/habits/${categoryId}`)
          .set('authorization', token)
          .expect(200)
      })

      it('responds all the habits of specific category', async () => {

        const habits = await findCategoryByHabit(categoryId)
        await supertest(server)
          .get(`/api/categories/habits/${categoryId}`)
          .set('authorization', token)
          .then(res => {
            expect(res.body.habits).toEqual(habits)
          })
      })

    })

    describe('PUT /api/catgories/:id', () => {

      it('responds with 200 OK', async () => {
        const changes = {
          categoryTitle: 'test1 category-',
          color: 'blue'
        }

        await supertest(server)
          .put(`/api/categories/${categoryId}`)
          .send(changes)
          .set('authorization', token)
          .set('Accept', 'application/json')
          .expect(201)
      })

      it('responds with updated user', async () => {
        const changes = {
          categoryTitle: 'test1 category-->',
          color: 'green'
        }

        await supertest(server)
          .put(`/api/categories/${categoryId}`)
          .send(changes)
          .set('authorization', token)
          .set('Accept', 'application/json')
          .expect(201)

        await supertest(server)
          .get(`/api/categories/${categoryId}`)
          .set('authorization', token)
          .then(res => {
            expect(res.body.categoryTitle).toEqual(changes.categoryTitle)
          })
      })

    })

  })

  describe('Habits-routes', () => {

    describe('POST /api/habits', () => {
      it('responds with 200', async () => {
        const habit = {
            habitTitle: "Running 3 miles",
            categoryId: categoryId,
        }

        const habit2 = {
            habitTitle: "drinking water",
            categoryId: categoryId,
        }

        await supertest(server)
          .post('/api/habits')
          .send(habit)
          .set('authorization', token)
          .expect(201)

        await supertest(server)
          .post('/api/habits')
          .send(habit2)
          .set('authorization', token)
          .expect(201)
      })

      it('responds with list of habits', async () => {
        const habitsList = await findHabits()
        await supertest(server)
          .get('/api/habits')
          .set('authorization', token)
          .then(res => {
            expect(res.body).toEqual(habitsList)
          })
      })
    })

    describe('GET /api/habits', () => {
      it('responds with 200', async () => {
        await supertest(server)
          .get('/api/habits')
          .set('authorization', token)
          .expect(200)
      })

      it('responds with list of habits', async () => {
        const habitsList = await findHabits()
        await supertest(server)
          .get('/api/habits')
          .set('authorization', token)
          .then(res => {
            habitId = res.body[0].id
            expect(res.body).toEqual(habitsList)
          })
      })
    })

    describe('GET /api/habits/:id', () => {

      it('responds with 200 OK', async () => {
        await supertest(server)
          .get(`/api/habits/${habitId}`)
          .set('authorization', token)
          .expect(200)
      })

      it('responds with list of habits', async () => {
        const habit = await findHabitById(habitId)
        await supertest(server)
          .get(`/api/habits/${habitId}`)
          .set('authorization', token)
          .then(res => {
            expect(res.body).toEqual(habit)
          })
      })

    })


    describe('PUT /api/habits/:id', () => {

      it('responds with 200 OK', async () => {
        const changes = {
            habitTitle: "Running 3 miles",
            completed: true,
            completionPoints: 1,
            categoryId: categoryId,
            createdAt: "2019-06-25T07:16:50.709Z",
            history: "xxx xxx"
        }

        await supertest(server)
          .put(`/api/habits/${habitId}`)
          .send(changes)
          .set('authorization', token)
          .set('Accept', 'application/json')
          .expect(201)
      })

      it('responds with updated user', async () => {
        const changes = {
            habitTitle: "Running 3 milessss",
            completed: true,
            completionPoints: 1,
            categoryId: categoryId,
            createdAt: "2019-06-25T07:16:50.709Z",
            history: "xxx xxx"
        }

        await supertest(server)
          .put(`/api/habits/${habitId}`)
          .send(changes)
          .set('authorization', token)
          .set('Accept', 'application/json')
          .expect(201)

        await supertest(server)
          .get(`/api/habits/${habitId}`)
          .set('authorization', token)
          .then(res => {
            expect(res.body.habitTitle).toEqual(changes.habitTitle)
          })
      })

    })

  })

  describe('DELETE-routes', () => {

    describe('DELETE /api/habits/:id', () => {

      it('responds with 200 OK', async () => {

        await supertest(server)
          .delete(`/api/habits/${habitId}`)
          .set('authorization', token)
          .expect(200)
      })

      it('responds with delete message', async () => {

        await supertest(server)
        .delete(`/api/habits/2`)
        .set('authorization', token)
        .then(res => {
          expect(res.body).toEqual({message: "The habit was successfully deleted"})
        })
      })

    })

    describe('DELETE /api/categories/:id', () => {

      it('responds with 200 OK', async () => {

        await supertest(server)
          .delete(`/api/categories/${categoryId}`)
          .set('authorization', token)
          .expect(200)
      })

      it('responds with delete message', async () => {

        await supertest(server)
        .delete(`/api/categories/2`)
        .set('authorization', token)
        .then(res => {
          expect(res.body).toEqual({message: "The category was successfully deleted"})
        })
      })

    })

    describe('DELETE /api/users/:id', () => {

      it('responds with 200 OK', async () => {

        await supertest(server)
          .delete(`/api/users/${regUserId}`)
          .set('authorization', token)
          .expect(200)
      })

      it('responds with delete message', async () => {

        await supertest(server)
        .delete(`/api/users/3`)
        .set('authorization', token)
        .then(res => {
          expect(res.body).toEqual({message: "The user was successfully deleted"})
        })
      })

    })

  })

})
