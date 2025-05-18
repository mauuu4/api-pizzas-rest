import { PizzaModel } from '../models/pizza.model.js'

export const getPizzas = async (req, res) => {
  const pizzas = await PizzaModel.getAll()
  res.json(pizzas)
}

export const getPizzaById = async (req, res) => {
  const { id } = req.params
  const pizza = await PizzaModel.getById(id)

  if (!pizza) {
    return res.status(404).json({ message: 'Pizza not found' })
  }

  res.json(pizza)
}

export const createPizza = async (req, res) => {
  try {
    const newPizza = await PizzaModel.create(req.body)
    res.status(201).json(newPizza)
  } catch (error) {
    console.log(error)
    return res.status(500).json({ message: 'Error creating pizza' })
  }
}

export const updatePizza = async (req, res) => {
  try {
    const { id } = req.params

    const updatedPizza = await PizzaModel.update(id, req.body)

    if (!updatedPizza) {
      return res.status(404).json({ message: 'Pizza not found' })
    }

    res.json(updatedPizza)
  } catch (error) {
    console.log(error)
    return res.status(500).json({ message: 'Error updating pizza' })
  }
}

export const deletePizza = async (req, res) => {
  const { id } = req.params

  const { rowCount } = await PizzaModel.delete(id)

  if (rowCount === 0) {
    return res.status(404).json({ message: 'Pizza not found' })
  }

  res.sendStatus(204)
}

export const getPizzaIngredients = async (req, res) => {
  const { id } = req.params
  const pizzaIngredients = await PizzaModel.getPizzaIngredients(id)

  if (pizzaIngredients.length === 0) {
    return res.status(404).json({ message: 'Pizza not found or has no ingredients' })
  }

  res.json(pizzaIngredients)
}
