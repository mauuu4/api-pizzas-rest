import { PizzaService } from '../services/pizza.service.js'

export const getPizzas = async (req, res) => {
  try {
    const pizzas = await PizzaService.getAll()
    res.json(pizzas)
  } catch (error) {
    console.error('Error getting pizzas:', error)
    res.status(500).json({ message: 'Error retrieving pizzas' })
  }
}

export const getPizzaById = async (req, res) => {
  try {
    const pizza = await PizzaService.getById(req.params.id)

    if (!pizza) {
      return res.status(404).json({ message: 'Pizza not found' })
    }

    res.json(pizza)
  } catch (error) {
    console.error('Error getting pizza:', error)
    res.status(500).json({ message: 'Error retrieving pizza' })
  }
}

export const createPizza = async (req, res) => {
  try {
    const pizza = await PizzaService.create(req.body)
    res.status(201).json(pizza)
  } catch (error) {
    console.error('Error creating pizza:', error)
    
    if (error.name === 'SequelizeUniqueConstraintError') {
      return res.status(409).json({ message: 'Pizza name already exists' })
    }
    
    if (error.name === 'SequelizeValidationError') {
      return res.status(400).json({ 
        message: 'Validation error',
        errors: error.errors.map(err => err.message)
      })
    }

    res.status(500).json({ message: 'Error creating pizza' })
  }
}

export const updatePizza = async (req, res) => {
  try {
    const pizza = await PizzaService.update(req.params.id, req.body)

    if (!pizza) {
      return res.status(404).json({ message: 'Pizza not found' })
    }

    res.json(pizza)
  } catch (error) {
    console.error('Error updating pizza:', error)
    
    if (error.name === 'SequelizeUniqueConstraintError') {
      return res.status(409).json({ message: 'Pizza name already exists' })
    }
    
    if (error.name === 'SequelizeValidationError') {
      return res.status(400).json({ 
        message: 'Validation error',
        errors: error.errors.map(err => err.message)
      })
    }

    res.status(500).json({ message: 'Error updating pizza' })
  }
}

export const deletePizza = async (req, res) => {
  try {
    const deleted = await PizzaService.delete(req.params.id)
    
    if (!deleted) {
      return res.status(404).json({ message: 'Pizza not found' })
    }

    res.status(204).send()
  } catch (error) {
    console.error('Error deleting pizza:', error)
    res.status(500).json({ message: 'Error deleting pizza' })
  }
}

export const getPizzaIngredients = async (req, res) => {
  try {
    const result = await PizzaService.getIngredients(req.params.id)

    if (!result) {
      return res.status(404).json({ message: 'Pizza not found' })
    }

    res.json(result)
  } catch (error) {
    console.error('Error getting pizza ingredients:', error)
    res.status(500).json({ message: 'Error retrieving pizza ingredients' })
  }
}
