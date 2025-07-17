import { Ingredient, Pizza } from '../models/index.js'
import { Op } from 'sequelize'

export class IngredientService {
  static async getAll() {
    return await Ingredient.findAll({
      order: [['ing_id', 'DESC']]
    })
  }

  static async getById(id) {
    return await Ingredient.findByPk(id)
  }

  static async create(data) {
    const { ing_name, ing_calories = 0, ing_state = true } = data

    return await Ingredient.create({
      ing_name,
      ing_calories,
      ing_state
    })
  }

  static async update(id, data) {
    const ingredient = await Ingredient.findByPk(id)
    
    if (!ingredient) {
      return null
    }

    const { ing_name, ing_calories, ing_state } = data

    // Actualizar solo los campos proporcionados
    const updateData = {}
    if (ing_name !== undefined) updateData.ing_name = ing_name
    if (ing_calories !== undefined) updateData.ing_calories = ing_calories
    if (ing_state !== undefined) updateData.ing_state = ing_state

    return await ingredient.update(updateData)
  }

  static async delete(id) {
    const ingredient = await Ingredient.findByPk(id)
    
    if (!ingredient) {
      return false
    }

    await ingredient.destroy()
    return true
  }

  static async getPizzas(id) {
    const ingredient = await Ingredient.findByPk(id, {
      include: [{
        model: Pizza,
        as: 'pizzas',
        through: { attributes: ['created_at'] },
        where: { piz_state: true },
        required: false
      }]
    })

    return ingredient ? {
      ingredient: {
        ing_id: ingredient.ing_id,
        ing_name: ingredient.ing_name,
        ing_calories: ingredient.ing_calories
      },
      pizzas: ingredient.pizzas || []
    } : null
  }
}
