const supertest = require('supertest')

const db = require('../data/dbConfig.js')
const {
  addUser,
  findUsers,
  findUserById,
  findByUserCreds,
  removeUser,
  updateUser } = require('./user-models.js')

describe('users model', () => {

  beforeEach(async () => {
    await db('users').truncate()
  })

    it('is process.env.DB_ENV is pointing to testing', () => {
      expect(process.env.DB_ENV).toBe('testing')
    })

    describe('addUser()', () => {
      const newUser = {
        username: 'zach',
        fullname: 'Zach Christy',
        password: '1234',
        email: 'zchristy44@gmail.com',
        userImgUrl: 'image.png'
      }

        it('add user', async () => {
          await addUser(newUser)

          const users = await db('users')

          expect(users).toHaveLength(1)
        })

        it('add provided team', async () => {
          const newUser = {
            username: 'zach',
            fullname: 'Zach Christy',
            password: '1234',
            email: 'zchristy44@gmail.com',
            userImgUrl: 'image.png'
          }

          let user = newUser
          let added = await addUser(user)
          expect(added.username).toBe(user.username)
        })
    })

    describe('findUsers()', () => {

        it('find all users', async () => {
          const newUser_1 = {
            username: 'zach',
            fullname: 'Zach Christy',
            password: '1234',
            email: 'zchristy44@gmail.com',
            userImgUrl: 'image.png'
          }
          const newUser_2 = {
            username: 'test',
            fullname: 'Zach Christy',
            password: '1234',
            email: 'zchristy44@gmail.com',
            userImgUrl: 'image.png'
          }
          const newUser_3 = {
            username: 'test2',
            fullname: 'Zach Christy',
            password: '1234',
            email: 'zchristy44@gmail.com',
            userImgUrl: 'image.png'
          }
          await addUser(newUser_1)
          await addUser(newUser_2)
          await addUser(newUser_3)

          const users = await findUsers()

          expect(users).toHaveLength(3)
        })

        it('find user by id', async () => {
          const newUser_1 = {
            username: 'zach',
            fullname: 'Zach Christy',
            password: '1234',
            email: 'zchristy44@gmail.com',
            userImgUrl: 'image.png'
          }
          const newUser_2 = {
            username: 'test',
            fullname: 'Zach Christy',
            password: '1234',
            email: 'zchristy44@gmail.com',
            userImgUrl: 'image.png'
          }
          const newUser_3 = {
            username: 'test2',
            fullname: 'Zach Christy',
            password: '1234',
            email: 'zchristy44@gmail.com',
            userImgUrl: 'image.png'
          }
          const found = await addUser(newUser_1)
          await addUser(newUser_2)
          await addUser(newUser_3)

          const user = await findUserById(1)

          expect(user).toEqual(found)
        })

        it('find user by credentials', async () => {
          const newUser_1 = {
            username: 'zach',
            fullname: 'Zach Christy',
            password: '1234',
            email: 'zchristy44@gmail.com',
            userImgUrl: 'image.png'
          }
          const newUser_2 = {
            username: 'test',
            fullname: 'Zach Christy',
            password: '1234',
            email: 'zchristy44@gmail.com',
            userImgUrl: 'image.png'
          }
          const newUser_3 = {
            username: 'test2',
            fullname: 'Zach Christy',
            password: '1234',
            email: 'zchristy44@gmail.com',
            userImgUrl: 'image.png'
          }
          const found = await addUser(newUser_1)
          await addUser(newUser_2)
          await addUser(newUser_3)

          const creds = {
            username: newUser_1.username,
            password: newUser_1.password
          }

          const user = await findByUserCreds(creds)

          expect(user).toEqual(found)
        })

    })

    describe('removeUser()', () => {

        it('remove specific user', async () => {
          const newUser_1 = {
            username: 'zach',
            fullname: 'Zach Christy',
            password: '1234',
            email: 'zchristy44@gmail.com',
            userImgUrl: 'image.png'
          }
          const newUser_2 = {
            username: 'test',
            fullname: 'Zach Christy',
            password: '1234',
            email: 'zchristy44@gmail.com',
            userImgUrl: 'image.png'
          }
          const newUser_3 = {
            username: 'test2',
            fullname: 'Zach Christy',
            password: '1234',
            email: 'zchristy44@gmail.com',
            userImgUrl: 'image.png'
          }
          await addUser(newUser_1)
          await addUser(newUser_2)
          await addUser(newUser_3)

          await removeUser(1)

          const users = await db('users')

          expect(users).toHaveLength(2)
        })

    })

    describe('updateUser()', () => {

        it('update specific user', async () => {
          const newUser_1 = {
            username: 'zach',
            fullname: 'Zach Christy',
            password: '1234',
            email: 'zchristy44@gmail.com',
            userImgUrl: 'image.png'
          }
          const newUser_2 = {
            username: 'test',
            fullname: 'Zach Christy',
            password: '1234',
            email: 'zchristy44@gmail.com',
            userImgUrl: 'image.png'
          }
          const newUser_3 = {
            username: 'test2',
            fullname: 'Zach Christy',
            password: '1234',
            email: 'zchristy44@gmail.com',
            userImgUrl: 'image.png'
          }
          await addUser(newUser_1)
          await addUser(newUser_2)
          await addUser(newUser_3)

          const changes = {
            username: 'Zachary',
            fullname: 'Zach Christy',
            password: '1234',
            email: 'zchristy44@gmail.com',
            userImgUrl: 'image.png'
          }

          await updateUser(1, changes)

          const updated = await findUserById(1)

          expect(updated.username).toEqual(changes.username)
        })

    })
})
