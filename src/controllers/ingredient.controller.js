import { IngredientService } from '../services/ingredient.service.js'

export const getIngredients = async (req, res) => {
  try {
    const ingredients = await IngredientService.getAll()
    res.json(ingredients)
  } catch (error) {
    console.error('Error getting ingredients:', error)
    res.status(500).json({ message: 'Error retrieving ingredients' })
  }
}

export const getIngredientById = async (req, res) => {
  try {
    const ingredient = await IngredientService.getById(req.params.id)

    if (!ingredient) {
      return res.status(404).json({ message: 'Ingredient not found' })
    }

    res.json(ingredient)
  } catch (error) {
    console.error('Error getting ingredient:', error)
    res.status(500).json({ message: 'Error retrieving ingredient' })
  }
}

export const createIngredient = async (req, res) => {
  try {
    const ingredient = await IngredientService.create(req.body)
    res.status(201).json(ingredient)
  } catch (error) {
    console.error('Error creating ingredient:', error)
    
    if (error.name === 'SequelizeUniqueConstraintError') {
      return res.status(409).json({ message: 'Ingredient name already exists' })
    }
    
    if (error.name === 'SequelizeValidationError') {
      return res.status(400).json({ 
        message: 'Validation error',
        errors: error.errors.map(err => err.message)
      })
    }

    res.status(500).json({ message: 'Error creating ingredient' })
  }
}

export const updateIngredient = async (req, res) => {
  try {
    const ingredient = await IngredientService.update(req.params.id, req.body)

    if (!ingredient) {
      return res.status(404).json({ message: 'Ingredient not found' })
    }

    res.json(ingredient)
  } catch (error) {
    console.error('Error updating ingredient:', error)
    
    if (error.name === 'SequelizeUniqueConstraintError') {
      return res.status(409).json({ message: 'Ingredient name already exists' })
    }
    
    if (error.name === 'SequelizeValidationError') {
      return res.status(400).json({ 
        message: 'Validation error',
        errors: error.errors.map(err => err.message)
      })
    }

    res.status(500).json({ message: 'Error updating ingredient' })
  }
}

export const deleteIngredient = async (req, res) => {
  try {
    const deleted = await IngredientService.delete(req.params.id)
    
    if (!deleted) {
      return res.status(404).json({ message: 'Ingredient not found' })
    }

    res.status(204).send()
  } catch (error) {
    console.error('Error deleting ingredient:', error)
    res.status(500).json({ message: 'Error deleting ingredient' })
  }
}