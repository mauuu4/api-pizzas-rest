import { Router } from 'express'
import {
  getIngredients,
  getIngredientById,
  createIngredient,
  updateIngredient,
  deleteIngredient,
  getIngredientPizzas
} from '../controllers/ingredient.controller.js'
import { validateId, validateBody, ingredientSchemas } from '../middlewares/validation.js'

export const ingredientsRouter = Router()

ingredientsRouter.get('/', getIngredients)
ingredientsRouter.get('/:id', validateId, getIngredientById)
ingredientsRouter.post('/', validateBody(ingredientSchemas.create), createIngredient)
ingredientsRouter.put('/:id', validateId, validateBody(ingredientSchemas.update), updateIngredient)
ingredientsRouter.delete('/:id', validateId, deleteIngredient)

ingredientsRouter.get('/:id/pizzas', validateId, getIngredientPizzas)
