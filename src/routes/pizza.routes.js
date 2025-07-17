import { Router } from 'express'
import {
  getPizzas,
  getPizzaById,
  createPizza,
  updatePizza,
  deletePizza,
  getPizzaIngredients
} from '../controllers/pizza.controller.js'
import { validateId, validateBody, pizzaSchemas } from '../middlewares/validation.js'

export const pizzasRouter = Router()

pizzasRouter.get('/', getPizzas)
pizzasRouter.get('/:id', validateId, getPizzaById)
pizzasRouter.post('/', validateBody(pizzaSchemas.create), createPizza)
pizzasRouter.put('/:id', validateId, validateBody(pizzaSchemas.update), updatePizza)
pizzasRouter.delete('/:id', validateId, deletePizza)

pizzasRouter.get('/:id/ingredients', validateId, getPizzaIngredients)
