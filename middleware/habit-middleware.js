const Habits = require('../models/habit-models.js')

module.exports = {
  validateHabitId,
  validateHabitChanges,
  validateHabitPost
};

//custom middleware

function validateHabitId(req, res, next) {
  const { id } = req.params

    Habits.findHabitById(id)
    .then(habit => {
      if(habit) {
        req.habitId = habit.id
        next()
      } else {
        res.status(400).json({ message: "Invalid habit id" })
      }
    })
    .catch(err => {
      res.status(500).json({message: "Error finding Habit"})
    })

};

function validateHabitChanges(req, res, next) {
  const { habitTitle, completed, completionPoints, userId, categoryId } = req.body

    if(Object.keys(req.body).length) {
      if(habitTitle && userId && categoryId) {
        req.changes = {
          ...req.body
        }
        next()
      } else {
        res.status(428).json({ message: "missing required field" })
      }
    } else {
      res.status(404).json({ message: "missing Habit information" })
    }

}

function validateHabitPost(req, res, next) {
  const { habitTitle, categoryId } = req.body

    if(Object.keys(req.body).length) {
      if(habitTitle && categoryId) {
        req.post = {
          ...req.body,
          userId: res.decoded.subject
        }
        next()
      } else {
        res.status(428).json({ message: "missing required field" })
      }
    } else {
      res.status(404).json({ message: "missing Habit information" })
    }

}
