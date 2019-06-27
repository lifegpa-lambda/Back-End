const supertest = require('supertest')

const db = require('../data/dbConfig.js')
const {
  addUser,
  findUsers,
  findUserById,
  findByUserCreds,
  removeUser,
  updateUser } = require('./user-models.js')
const {
  addCategory,
  findCategories,
  findCategoryById,
  findCategoryByUser,
  findCategoryByHabit,
  updateCategory,
  removeCategory,
  removeAllCategoriesByUser } = require('./category-models.js')
const {
  findHabits,
  findHabitById,
  findHabitByUser,
  findHabitByCategory,
  addHabit,
  updateHabit,
  removeHabit,
  removeAllHabitsByUser } = require('./habit-models.js')

describe('All models', () => {
  beforeEach(async () => {
    await db('users').truncate()
    await db('categories').truncate()
    await db('habits').truncate()
  })

  it('is process.env.DB_ENV is pointing to testing', () => {
    expect(process.env.DB_ENV).toBe('testing')
  })

  describe('users model', () => {

      describe('addUser()', () => {

          it('add user', async () => {
            const newUser = {
              username: 'zach',
              fullname: 'Zach Christy',
              password: '1234',
              email: 'zchristy44@gmail.com',
              userImgUrl: 'image.png'
            }

            await addUser(newUser)

            const users = await db('users')

            expect(users).toHaveLength(1)
          })

          it('add provided user', async () => {
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

  describe('categories model', () => {

      describe('addCategory()', () => {

          it('add category', async () => {
            const newUser = {
              username: 'zach',
              fullname: 'Zach Christy',
              password: '1234',
              email: 'zchristy44@gmail.com',
              userImgUrl: 'image.png'
            }

            await addUser(newUser)

            const newCategory = {
              categoryTitle: 'test category',
              color: 'blue',
              userId: 1
            }

            await addCategory(newCategory)

            const catgories = await db('categories')

            expect(catgories).toHaveLength(1)
          })

          it('add provided category', async () => {
            const newUser = {
              username: 'zach',
              fullname: 'Zach Christy',
              password: '1234',
              email: 'zchristy44@gmail.com',
              userImgUrl: 'image.png'
            }

            await addUser(newUser)

            const newCategory = {
              categoryTitle: 'test category',
              color: 'blue',
              userId: 1
            }

            let category = newCategory
            let added = await addCategory(category)
            expect(added.categoryTitle).toBe(category.categoryTitle)
          })
      })

      describe('findCategories()', () => {

          it('find all categories', async () => {
            const newUser = {
              username: 'zach',
              fullname: 'Zach Christy',
              password: '1234',
              email: 'zchristy44@gmail.com',
              userImgUrl: 'image.png'
            }

            await addUser(newUser)

            const newCategory_1 = {
              categoryTitle: 'test1 category',
              color: 'blue',
              userId: 1
            }
            const newCategory_2 = {
              categoryTitle: 'test2 category',
              color: 'green',
              userId: 1
            }
            const newCategory_3 = {
              categoryTitle: 'test3 category',
              color: 'red',
              userId: 1
            }
            await addCategory(newCategory_1)
            await addCategory(newCategory_2)
            await addCategory(newCategory_3)

            const categories = await findCategories()

            expect(categories).toHaveLength(3)
          })

          it('find category by id', async () => {
            const newUser = {
              username: 'zach',
              fullname: 'Zach Christy',
              password: '1234',
              email: 'zchristy44@gmail.com',
              userImgUrl: 'image.png'
            }

            await addUser(newUser)

            const newCategory_1 = {
              categoryTitle: 'test1 category',
              color: 'blue',
              userId: 1
            }
            const newCategory_2 = {
              categoryTitle: 'test2 category',
              color: 'green',
              userId: 1
            }
            const newCategory_3 = {
              categoryTitle: 'test3 category',
              color: 'red',
              userId: 1
            }
            const found = await addCategory(newCategory_1)
            await addCategory(newCategory_2)
            await addCategory(newCategory_3)

            const category = await findCategoryById(1)

            expect(category).toEqual(found)
          })

          it('find category by user', async () => {
            const newUser = {
              username: 'zach',
              fullname: 'Zach Christy',
              password: '1234',
              email: 'zchristy44@gmail.com',
              userImgUrl: 'image.png'
            }

            await addUser(newUser)

            const newCategory_1 = {
              categoryTitle: 'test1 category',
              color: 'blue',
              userId: 1
            }
            const newCategory_2 = {
              categoryTitle: 'test2 category',
              color: 'green',
              userId: 1
            }
            const newCategory_3 = {
              categoryTitle: 'test3 category',
              color: 'red',
              userId: 1
            }
            const found = [
              await addCategory(newCategory_1),
              await addCategory(newCategory_2),
              await addCategory(newCategory_3)
            ]

            const user = await findUserById(1)

            const categories = await findCategoryByUser(user.id)

            expect(categories).toEqual(found)
          })

          it('find category by habit', async () => {
            const newUser = {
              username: 'zach',
              fullname: 'Zach Christy',
              password: '1234',
              email: 'zchristy44@gmail.com',
              userImgUrl: 'image.png'
            }

            await addUser(newUser)

            const newCategory_1 = {
              categoryTitle: 'test1 category',
              color: 'blue',
              userId: 1
            }
            const newCategory_2 = {
              categoryTitle: 'test2 category',
              color: 'green',
              userId: 1
            }
            const newCategory_3 = {
              categoryTitle: 'test3 category',
              color: 'red',
              userId: 1
            }

            const found = await addCategory(newCategory_1)
            await addCategory(newCategory_2)
            await addCategory(newCategory_3)

            const newHabit_1 = {
              habitTitle: "No sugar",
              completed: 0,
              completionPoints: 0,
              userId: 1,
              categoryId: 1,
              createdAt: "2019-06-24 21:53:29",
              history: "x x x xxxx"
            }
            const newHabit_2 = {
              habitTitle: "Drink water",
              completed: 0,
              completionPoints: 0,
              userId: 1,
              categoryId: 1,
              createdAt: "2019-06-24 21:53:29",
              history: "x x x xxxx"
            }
            const newHabit_3 = {
              habitTitle: "Running 10 miles",
              completed: 0,
              completionPoints: 0,
              userId: 1,
              categoryId: 1,
              createdAt: "2019-06-24 21:53:29",
              history: "x x x xxxx"
            }

            const habitList = [
              await addHabit(newHabit_1),
              await addHabit(newHabit_2),
              await addHabit(newHabit_3)
            ]

            const habits = await findCategoryByHabit(found.id)

            expect(habits).toEqual(habitList)
          })

      })

      describe('removeCategory()', () => {

          it('remove specific category', async () => {
            const newUser = {
              username: 'zach',
              fullname: 'Zach Christy',
              password: '1234',
              email: 'zchristy44@gmail.com',
              userImgUrl: 'image.png'
            }

            await addUser(newUser)

            const newCategory_1 = {
              categoryTitle: 'test1 category',
              color: 'blue',
              userId: 1
            }
            const newCategory_2 = {
              categoryTitle: 'test2 category',
              color: 'green',
              userId: 1
            }
            const newCategory_3 = {
              categoryTitle: 'test3 category',
              color: 'red',
              userId: 1
            }

            await addCategory(newCategory_1)
            await addCategory(newCategory_2)
            await addCategory(newCategory_3)

            await removeCategory(1)

            const categories = await db('categories')

            expect(categories).toHaveLength(2)
          })

          it('remove all categories by user id', async () => {
            const newUser = {
              username: 'zach',
              fullname: 'Zach Christy',
              password: '1234',
              email: 'zchristy44@gmail.com',
              userImgUrl: 'image.png'
            }

            await addUser(newUser)

            const newCategory_1 = {
              categoryTitle: 'test1 category',
              color: 'blue',
              userId: 1
            }
            const newCategory_2 = {
              categoryTitle: 'test2 category',
              color: 'green',
              userId: 1
            }
            const newCategory_3 = {
              categoryTitle: 'test3 category',
              color: 'red',
              userId: 2
            }

            await addCategory(newCategory_1)
            await addCategory(newCategory_2)
            await addCategory(newCategory_3)

            await removeAllCategoriesByUser(1)

            const categories = await db('categories')

            expect(categories).toHaveLength(1)
          })

      })

      describe('updateCategory()', () => {

          it('update specific category', async () => {
            const newUser = {
              username: 'zach',
              fullname: 'Zach Christy',
              password: '1234',
              email: 'zchristy44@gmail.com',
              userImgUrl: 'image.png'
            }

            await addUser(newUser)

            const newCategory_1 = {
              categoryTitle: 'test1 category',
              color: 'blue',
              userId: 1
            }
            const newCategory_2 = {
              categoryTitle: 'test2 category',
              color: 'green',
              userId: 1
            }
            const newCategory_3 = {
              categoryTitle: 'test3 category',
              color: 'red',
              userId: 1
            }

            await addCategory(newCategory_1)
            await addCategory(newCategory_2)
            await addCategory(newCategory_3)

            const changes = {
              categoryTitle: 'Fitness',
              color: 'red',
              userId: 1
            }

            await updateCategory(1, changes)

            const updated = await findCategoryById(1)

            expect(updated.categoryTitle).toEqual(changes.categoryTitle)
          })

      })
  })

  describe('Habits model', () => {

      describe('addHabit()', () => {

          it('add habit', async () => {
            const newUser = {
              username: 'zach',
              fullname: 'Zach Christy',
              password: '1234',
              email: 'zchristy44@gmail.com',
              userImgUrl: 'image.png'
            }

            await addUser(newUser)

            const newCategory = {
              categoryTitle: 'test category',
              color: 'blue',
              userId: 1
            }

            await addCategory(newCategory)

            const newHabit = {
              habitTitle: "No sugar",
              completed: 0,
              completionPoints: 0,
              userId: 1,
              categoryId: 1,
              createdAt: "2019-06-24 21:53:29",
              history: "x x x xxxx"
            }

            await addHabit(newHabit)

            const habit = await db('habits')

            expect(habit).toHaveLength(1)
          })

          it('add provided habit', async () => {
            const newUser = {
              username: 'zach',
              fullname: 'Zach Christy',
              password: '1234',
              email: 'zchristy44@gmail.com',
              userImgUrl: 'image.png'
            }

            await addUser(newUser)

            const newCategory = {
              categoryTitle: 'test category',
              color: 'blue',
              userId: 1
            }

            await addCategory(newCategory)

            const newHabit = {
              habitTitle: "No sugar",
              completed: 0,
              completionPoints: 0,
              userId: 1,
              categoryId: 1,
              createdAt: "2019-06-24 21:53:29",
              history: "x x x xxxx"
            }

            let habit = newHabit
            let added = await addHabit(newHabit)
            expect(added.habitTitle).toBe(habit.habitTitle)
          })
      })

      describe('findHabits()', () => {

          it('find all habits', async () => {
            const newUser = {
              username: 'zach',
              fullname: 'Zach Christy',
              password: '1234',
              email: 'zchristy44@gmail.com',
              userImgUrl: 'image.png'
            }

            await addUser(newUser)

            const newCategory = {
              categoryTitle: 'test category',
              color: 'blue',
              userId: 1
            }

            await addCategory(newCategory)

            const newHabit_1 = {
              habitTitle: "No sugar",
              completed: 0,
              completionPoints: 0,
              userId: 1,
              categoryId: 1,
              createdAt: "2019-06-24 21:53:29",
              history: "x x x xxxx"
            }
            const newHabit_2 = {
              habitTitle: "Drink water",
              completed: 0,
              completionPoints: 0,
              userId: 1,
              categoryId: 1,
              createdAt: "2019-06-24 21:53:29",
              history: "x x x xxxx"
            }
            const newHabit_3 = {
              habitTitle: "Running 10 miles",
              completed: 0,
              completionPoints: 0,
              userId: 1,
              categoryId: 1,
              createdAt: "2019-06-24 21:53:29",
              history: "x x x xxxx"
            }

              await addHabit(newHabit_1)
              await addHabit(newHabit_2)
              await addHabit(newHabit_3)

            const habits = await findHabits()

            expect(habits).toHaveLength(3)
          })

          it('find habit by id', async () => {
            const newUser = {
              username: 'zach',
              fullname: 'Zach Christy',
              password: '1234',
              email: 'zchristy44@gmail.com',
              userImgUrl: 'image.png'
            }

            await addUser(newUser)

            const newCategory = {
              categoryTitle: 'test category',
              color: 'blue',
              userId: 1
            }

            await addCategory(newCategory)

            const newHabit_1 = {
              habitTitle: "No sugar",
              completed: 0,
              completionPoints: 0,
              userId: 1,
              categoryId: 1,
              createdAt: "2019-06-24 21:53:29",
              history: "x x x xxxx"
            }
            const newHabit_2 = {
              habitTitle: "Drink water",
              completed: 0,
              completionPoints: 0,
              userId: 1,
              categoryId: 1,
              createdAt: "2019-06-24 21:53:29",
              history: "x x x xxxx"
            }
            const newHabit_3 = {
              habitTitle: "Running 10 miles",
              completed: 0,
              completionPoints: 0,
              userId: 1,
              categoryId: 1,
              createdAt: "2019-06-24 21:53:29",
              history: "x x x xxxx"
            }

              const found = await addHabit(newHabit_1)
              await addHabit(newHabit_2)
              await addHabit(newHabit_3)

            const habit = await findHabitById(1)

            expect(habit).toEqual(found)
          })

          it('find habit by user', async () => {
            const newUser = {
              username: 'zach',
              fullname: 'Zach Christy',
              password: '1234',
              email: 'zchristy44@gmail.com',
              userImgUrl: 'image.png'
            }

            await addUser(newUser)

            const newCategory = {
              categoryTitle: 'test category',
              color: 'blue',
              userId: 1
            }

            await addCategory(newCategory)

            const newHabit_1 = {
              habitTitle: "No sugar",
              completed: 0,
              completionPoints: 0,
              userId: 1,
              categoryId: 1,
              createdAt: "2019-06-24 21:53:29",
              history: "x x x xxxx"
            }
            const newHabit_2 = {
              habitTitle: "Drink water",
              completed: 0,
              completionPoints: 0,
              userId: 1,
              categoryId: 1,
              createdAt: "2019-06-24 21:53:29",
              history: "x x x xxxx"
            }
            const newHabit_3 = {
              habitTitle: "Running 10 miles",
              completed: 0,
              completionPoints: 0,
              userId: 1,
              categoryId: 1,
              createdAt: "2019-06-24 21:53:29",
              history: "x x x xxxx"
            }

              const found = [
                await addHabit(newHabit_1),
                await addHabit(newHabit_2),
                await addHabit(newHabit_3)
              ]

            const category = await findCategoryById(1)

            const habits = await findHabitByUser(category.id)

            expect(habits).toEqual(found)
          })

      })

      describe('removeHabit()', () => {

          it('remove specific habit', async () => {
            const newUser = {
              username: 'zach',
              fullname: 'Zach Christy',
              password: '1234',
              email: 'zchristy44@gmail.com',
              userImgUrl: 'image.png'
            }

            await addUser(newUser)

            const newCategory = {
              categoryTitle: 'test category',
              color: 'blue',
              userId: 1
            }

            await addCategory(newCategory)

            const newHabit_1 = {
              habitTitle: "No sugar",
              completed: 0,
              completionPoints: 0,
              userId: 1,
              categoryId: 1,
              createdAt: "2019-06-24 21:53:29",
              history: "x x x xxxx"
            }
            const newHabit_2 = {
              habitTitle: "Drink water",
              completed: 0,
              completionPoints: 0,
              userId: 1,
              categoryId: 1,
              createdAt: "2019-06-24 21:53:29",
              history: "x x x xxxx"
            }
            const newHabit_3 = {
              habitTitle: "Running 10 miles",
              completed: 0,
              completionPoints: 0,
              userId: 1,
              categoryId: 1,
              createdAt: "2019-06-24 21:53:29",
              history: "x x x xxxx"
            }

            await addHabit(newHabit_1)
            await addHabit(newHabit_2)
            await addHabit(newHabit_3)

            await removeHabit(1)

            const habits = await db('habits')

            expect(habits).toHaveLength(2)
          })

          it('remove all Habits by user', async () => {
            const newUser = {
              username: 'zach',
              fullname: 'Zach Christy',
              password: '1234',
              email: 'zchristy44@gmail.com',
              userImgUrl: 'image.png'
            }

            await addUser(newUser)

            const newCategory = {
              categoryTitle: 'test category',
              color: 'blue',
              userId: 1
            }

            await addCategory(newCategory)

            const newHabit_1 = {
              habitTitle: "No sugar",
              completed: 0,
              completionPoints: 0,
              userId: 1,
              categoryId: 1,
              createdAt: "2019-06-24 21:53:29",
              history: "x x x xxxx"
            }
            const newHabit_2 = {
              habitTitle: "Drink water",
              completed: 0,
              completionPoints: 0,
              userId: 1,
              categoryId: 1,
              createdAt: "2019-06-24 21:53:29",
              history: "x x x xxxx"
            }
            const newHabit_3 = {
              habitTitle: "Running 10 miles",
              completed: 0,
              completionPoints: 0,
              userId: 2,
              categoryId: 1,
              createdAt: "2019-06-24 21:53:29",
              history: "x x x xxxx"
            }

            await addHabit(newHabit_1)
            await addHabit(newHabit_2)
            await addHabit(newHabit_3)

            await removeAllHabitsByUser(1)

            const habits = await db('habits')

            expect(habits).toHaveLength(1)
          })

      })

      describe('updateCategory()', () => {

          it('update specific category', async () => {
            const newUser = {
              username: 'zach',
              fullname: 'Zach Christy',
              password: '1234',
              email: 'zchristy44@gmail.com',
              userImgUrl: 'image.png'
            }

            await addUser(newUser)

            const newCategory = {
              categoryTitle: 'test category',
              color: 'blue',
              userId: 1
            }

            await addCategory(newCategory)

            const newHabit_1 = {
              habitTitle: "No sugar",
              completed: 0,
              completionPoints: 0,
              userId: 1,
              categoryId: 1,
              createdAt: "2019-06-24 21:53:29",
              history: "x x x xxxx"
            }
            const newHabit_2 = {
              habitTitle: "Drink water",
              completed: 0,
              completionPoints: 0,
              userId: 1,
              categoryId: 1,
              createdAt: "2019-06-24 21:53:29",
              history: "x x x xxxx"
            }
            const newHabit_3 = {
              habitTitle: "Running 10 miles",
              completed: 0,
              completionPoints: 0,
              userId: 1,
              categoryId: 1,
              createdAt: "2019-06-24 21:53:29",
              history: "x x x xxxx"
            }

            await addHabit(newHabit_1)
            await addHabit(newHabit_2)
            await addHabit(newHabit_3)

            const changes = {
              habitTitle: "No sugar at all",
              completed: 1,
              completionPoints: 1,
              userId: 1,
              categoryId: 1,
              createdAt: "2019-06-24 21:53:29",
              history: "x xxx xxxx"
            }

            await updateHabit(1, changes)

            const updated = await findHabitById(1)

            expect(updated.habitTitle).toEqual(changes.habitTitle)
          })

      })
  })

})
