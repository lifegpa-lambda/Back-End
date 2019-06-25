const express = require('express');

const { authenticate } = require('../auth/authenticate')
const {
  validateHabitId,
  validateHabitChanges,
  validateHabitPost } = require('../middleware/habit-middleware.js')

const Habits = require('../models/habit-models.js')

const router = express.Router();

router.get('/', authenticate, (req, res) => {

  Habits.findHabits()
    .then(habits => {
      res.status(200).json(habits)
    })
    .catch(err => {
      res.status(500).json({message: "Error finding Habits"})
    })
})

router.get('/:id', authenticate, validateHabitId, (req, res) => {
  const { habitId } = req

  Habits.findHabitById(habitId)
    .then(habit => {
      res.status(200).json(habit)
    })
    .catch(err => {
      res.status(500).json({message: "Error finding Habit"})
    })
})

router.post('/', authenticate, validateHabitPost,  (req, res) => {
  Habits.addHabit(req.post)
  .then(habit => {
    res.status(201).json(habit)
  })
  .catch(err => {
    res.status(500).json({message: "Error could not post habit"})
  })
})

router.put('/:id', authenticate, validateHabitId, validateHabitChanges, (req, res) => {
  const { habitId, changes } = req

  Habits.updateHabit(habitId, changes)
    .then(updated => {
      Habits.findHabitById(habitId)
        .then(habit => {
          res.status(201).json({
            message: "Habit has successfully updated",
            habit: habit
          })
        })
        .catch(err => {
          res.status(500).json({message: "Error finding Habit"})
        })
    })
    .catch(err => {
      res.status(500).json({message: "Error updating Habit"})
    })
})

router.delete('/:id', authenticate, validateHabitId, (req, res) => {
  const { habitId } = req

  Habits.removeHabit(habitId)
    .then(habit => {
      res.status(200).json({message: `The habit was successfully deleted`})
    })
    .catch(err => {
      res.status(500).json({message: "Error deleting Habit"})
    })
})

module.exports = router
