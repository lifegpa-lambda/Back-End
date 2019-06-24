const express = require('express');

const { authenticate } = require('../auth/authenticate')
const {
  validateHabitId,
  validateHabitChanges,
  validateHabitPost } = require('../middleware/category-middleware.js')

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

// router.get('/habits/:id', authenticate, validateCategoryId, (req, res) => {
//   const { categoryId } = req
//
//   Categories.findCategoryById(categoryId)
//     .then(category => {
//       Categories.findCategoryByHabit(categoryId)
//       .then(habits => {
//           const categoryObj = {
//             ...category,
//             habits: habits
//           }
//           res.status(200).json(catergoryObj)
//       })
//       .catch(err => {
//         res.status(500).json({message: `Error Finding Habits`})
//       })
//     })
//     .catch(err => {
//       res.status(500).json({message: "Error finding Category"})
//     })
// })
//
// router.get('/:id', authenticate, validateCategoryId, (req, res) => {
//   const { categoryId } = req
//
//   Categories.findCategoryById(categoryId)
//     .then(category => {
//       res.status(200).json(category)
//     })
//     .catch(err => {
//       res.status(500).json({message: "Error finding Category"})
//     })
// })
//
// router.post('/', (req, res) => {
//   Categories.addCategory(req.post)
//   .then(category => {
//     res.status(201).json(category)
//   })
//   .catch(err => {
//     res.status(500).json({message: "Error could not post category"})
//   })
// })
//
// router.put('/:id', authenticate, validateCategoryId, validateCategoryChanges, (req, res) => {
//   const { categoryId, changes } = req
//
//   Categories.updateCategory(categoryId, changes)
//     .then(updated => {
//       res.status(201).json({
//         message: "Category has successfully updated",
//         category: changes
//       })
//     })
//     .catch(err => {
//       res.status(500).json({message: "Error updating Category"})
//     })
// })
//
// router.delete('/:id', authenticate, validateCategoryId, (req, res) => {
//   const { categoryId } = req
//
//   Categories.removeCategory(categoryId)
//     .then(category => {
//       res.status(200).json({message: `The category was successfully deleted`})
//     })
//     .catch(err => {
//       res.status(500).json({message: "Error deleting Category"})
//     })
// })

module.exports = router
