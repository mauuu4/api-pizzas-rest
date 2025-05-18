import { Router } from 'express'
import { getIngredients, getIngredientById, createIngredient, updateIngredient, deleteIngredient } from '../controllers/ingredient.controller.js'

export const ingredientsRouter = Router()

ingredientsRouter.get('/', getIngredients)
ingredientsRouter.get('/:id', getIngredientById)
ingredientsRouter.post('/', createIngredient)
ingredientsRouter.put('/:id', updateIngredient)
ingredientsRouter.delete('/:id', deleteIngredient)
