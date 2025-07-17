import { Pizza, Ingredient, PizzaIngredient } from '../models/index.js'

export class PizzaService {
  static async getAll () {
    return await Pizza.findAll({
      order: [['piz_id', 'DESC']],
      include: [{
        model: Ingredient,
        as: 'ingredients',
        through: {
          attributes: ['ing_quantity'],
          as: 'pizzaIngredient'
        },
        required: false
      }]
    })
  }

  static async getById (id) {
    return await Pizza.findByPk(id, {
      include: [{
        model: Ingredient,
        as: 'ingredients',
        through: {
          attributes: ['ing_quantity'],
          as: 'pizzaIngredient'
        },
        required: false
      }]
    })
  }

  static async create (data) {
    const { piz_name, piz_origin, piz_state = true, ingredients = [] } = data
    const pizza = await Pizza.create({ piz_name, piz_origin, piz_state })

    if (ingredients.length > 0) {
      const ingredientIds = ingredients.map(ing =>
        typeof ing === 'object' ? ing.ing_id : ing
      )

      const existingIngredients = await Ingredient.findAll({
        where: { ing_id: ingredientIds }
      })

      if (existingIngredients.length !== ingredientIds.length) {
        await pizza.destroy()
        throw new Error('Some ingredients do not exist')
      }

      const pizzaIngredients = ingredients.map(ing => {
        if (typeof ing === 'object') {
          return {
            piz_id: pizza.piz_id,
            ing_id: ing.ing_id,
            ing_quantity: ing.ing_quantity || 1
          }
        } else {
          return {
            piz_id: pizza.piz_id,
            ing_id: ing,
            ing_quantity: 1
          }
        }
      })

      await PizzaIngredient.bulkCreate(pizzaIngredients)
    }

    return await this.getById(pizza.piz_id)
  }

  static async update (id, data) {
    const pizza = await Pizza.findByPk(id)

    if (!pizza) {
      return null
    }

    const { piz_name, piz_origin, piz_state, ingredients } = data
    const updateData = {}
    if (piz_name !== undefined) updateData.piz_name = piz_name
    if (piz_origin !== undefined) updateData.piz_origin = piz_origin
    if (piz_state !== undefined) updateData.piz_state = piz_state

    if (Object.keys(updateData).length > 0) {
      await pizza.update(updateData)
    }

    if (ingredients && Array.isArray(ingredients)) {
      await PizzaIngredient.destroy({ where: { piz_id: id } })

      if (ingredients.length > 0) {
        const ingredientIds = ingredients.map(ing =>
          typeof ing === 'object' ? ing.ing_id : ing
        )

        const existingIngredients = await Ingredient.findAll({
          where: { ing_id: ingredientIds }
        })

        if (existingIngredients.length !== ingredientIds.length) {
          throw new Error('Some ingredients do not exist')
        }

        const pizzaIngredients = ingredients.map(ing => {
          if (typeof ing === 'object') {
            return {
              piz_id: id,
              ing_id: ing.ing_id,
              ing_quantity: ing.ing_quantity || 1
            }
          } else {
            return {
              piz_id: id,
              ing_id: ing,
              ing_quantity: 1
            }
          }
        })

        await PizzaIngredient.bulkCreate(pizzaIngredients)
      }
    }

    return await this.getById(id)
  }

  static async delete (id) {
    const pizza = await Pizza.findByPk(id)

    if (!pizza) {
      return false
    }

    await pizza.destroy()
    return true
  }

  static async getIngredients (id) {
    const pizza = await Pizza.findByPk(id, {
      include: [{
        model: Ingredient,
        as: 'ingredients',
        through: {
          attributes: ['ing_quantity'],
          as: 'pizzaIngredient'
        },
        required: false
      }]
    })

    if (!pizza) {
      return null
    }

    return {
      pizza: {
        piz_id: pizza.piz_id,
        piz_name: pizza.piz_name,
        piz_origin: pizza.piz_origin
      },
      ingredients: pizza.ingredients || []
    }
  }
}
