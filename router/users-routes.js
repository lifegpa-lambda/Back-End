const express = require('express');

const { authenticate } = require('../auth/authenticate')
const { validateUserId, validateUserChanges } = require('../middleware/user-middleware.js')

const Users = require('../models/user-models.js')
const Categories = require('../models/category-models.js')
const Habits = require('../models/habit-models.js')

const router = express.Router();

router.get('/', authenticate, (req, res) => {

  Users.findUsers()
    .then(users => {
      res.status(200).json(users)
    })
    .catch(err => {
      res.status(500).json({message: "Error finding Users"})
    })
})

router.get('/:id', authenticate, validateUserId, (req, res) => {
  const { userId } = req

  Users.findUserById(userId)
    .then(user => {
      res.status(200).json(user)
    })
    .catch(err => {
      res.status(500).json({message: "Error finding User"})
    })
})

router.get('/categories/:id', authenticate, validateUserId, (req, res) => {
  const { userId } = req

  Users.findUserById(userId)
    .then(user => {
      Categories.findCategoryByUser(userId)
        .then(categories => {
          const userObj = {
            ...user,
            categories: categories
          }
          res.status(200).json(userObj)
        })
        .catch(err => {
          res.status(500).json({message: "Error finding Categories for user"})
        })
    })
    .catch(err => {
      res.status(500).json({message: "Error finding User"})
    })
})

router.get('/habits/:id', authenticate, validateUserId, (req, res) => {
  const { userId } = req

  Users.findUserById(userId)
    .then(user => {
      console.log(user)
      Habits.findHabitByUser(userId)
        .then(habits => {
          const userObj = {
            ...user,
            habits: habits
          }
          res.status(200).json(userObj)
        })
        .catch(err => {
          res.status(500).json({message: "Error finding Habits for user"})
        })
    })
    .catch(err => {
      res.status(500).json({message: "Error finding User"})
    })
})

router.put('/:id', authenticate, validateUserId, validateUserChanges, (req, res) => {
  const { userId, changes } = req

  Users.updateUser(userId, changes)
    .then(updated => {
      res.status(201).json({
        message: "Your account has successfully updated",
        user: {
          ...changes,
          id: userId
        }
      })
    })
    .catch(err => {
      res.status(500).json({message: "Error updating User"})
    })
})

router.delete('/:id', authenticate, validateUserId, (req, res) => {
  const { userId } = req

  Users.removeUser(userId)
    .then(deleted => {
      Categories.removeAllCategoriesByUser(userId)
      .then(deleted => {
        Habits.removeAllHabitsByUser(userId)
        .then(deleted => {
          res.status(200).json({message: `The user was successfully deleted`})
        })
        .catch(err => {
          res.status(500).json({message: "Error deleting Habits"})
        })
      })
      .catch(err => {
        res.status(500).json({message: "Error deleting Categories"})
      })
    })
    .catch(err => {
      res.status(500).json({message: "Error deleting User"})
    })
})

module.exports = router
