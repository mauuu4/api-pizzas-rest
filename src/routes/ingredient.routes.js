import { Router } from 'express'
import { 
  getIngredients, 
  getIngredientById, 
  createIngredient, 
  updateIngredient, 
  deleteIngredient
} from '../controllers/ingredient.controller.js'
import { validateId } from '../middlewares/validation.js'

export const ingredientsRouter = Router()

// Rutas de ingredientes
ingredientsRouter.get('/', getIngredients)
ingredientsRouter.get('/:id', validateId, getIngredientById)
ingredientsRouter.post('/', createIngredient)
ingredientsRouter.put('/:id', validateId, updateIngredient)
ingredientsRouter.delete('/:id', validateId, deleteIngredient)
