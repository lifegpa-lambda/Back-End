const Categories = require('../models/category-models.js')

module.exports = {
  validateCategoryId,
  validateCategoryChanges,
  validateCategoryPost
};

//custom middleware

function validateCategoryId(req, res, next) {
  const { id } = req.params

    Categories.findCategoryById(id)
    .then(category => {
      if(category) {
        req.categoryId = category.id
        next()
      } else {
        res.status(400).json({ message: "Invalid category id" })
      }
    })
    .catch(err => {
      res.status(500).json({message: "Error finding Category"})
    })

};

function validateCategoryChanges(req, res, next) {
  const { categoryTitle, color } = req.body

    if(Object.keys(req.body).length) {
      if(categoryTitle && color) {
        req.changes = {
          ...req.body
        }
        next()
      } else {
        res.status(428).json({ message: "missing required field" })
      }
    } else {
      res.status(404).json({ message: "missing Category information" })
    }

}

function validateCategoryPost(req, res, next) {
  const { categoryTitle, color, userId } = req.body

    if(Object.keys(req.body).length) {
      if(categoryTitle && color && userId) {
        req.post = {
          ...req.body
        }
        next()
      } else {
        res.status(428).json({ message: "missing required field" })
      }
    } else {
      res.status(404).json({ message: "missing Category information" })
    }

}
