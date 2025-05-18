import { Router } from 'express'
import { getPizzas, getPizzaById, createPizza, updatePizza, deletePizza } from '../controllers/pizza.controller.js'

export const pizzasRouter = Router()

pizzasRouter.get('/', getPizzas)
pizzasRouter.get('/:id', getPizzaById)
pizzasRouter.post('/', createPizza)
pizzasRouter.put('/:id', updatePizza)
pizzasRouter.delete('/:id', deletePizza)
