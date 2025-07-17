import { Router } from 'express'
import { 
  getPizzas, 
  getPizzaById, 
  createPizza, 
  updatePizza, 
  deletePizza, 
  getPizzaIngredients
} from '../controllers/pizza.controller.js'
import { validateId } from '../middlewares/validation.js'

export const pizzasRouter = Router()

// Rutas de pizzas
pizzasRouter.get('/', getPizzas)
pizzasRouter.get('/:id', validateId, getPizzaById)
pizzasRouter.post('/', createPizza)
pizzasRouter.put('/:id', validateId, updatePizza)
pizzasRouter.delete('/:id', validateId, deletePizza)

// Rutas de ingredientes de pizzas
pizzasRouter.get('/:id/ingredients', validateId, getPizzaIngredients)
