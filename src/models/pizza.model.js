import { db } from '../config/connection-db.js'

export class PizzaModel {
  static async getAll () {
    const pizzas = await db.any('SELECT * FROM pizzas ORDER BY piz_id DESC')
    return pizzas
  }

  static async getById (id) {
    const pizza = await db.oneOrNone('SELECT * FROM pizzas WHERE piz_id = $1', [id])
    return pizza
  }

  static async create (input) {
    const {
      piz_name: pizName,
      piz_origin: pizOrigin,
      piz_state: pizState
    } = input

    const newPizza = await db.one(
      'INSERT INTO pizzas (piz_name, piz_origin, piz_state) VALUES ($1, $2, $3) RETURNING *',
      [pizName, pizOrigin, pizState]
    )

    return newPizza
  }

  static async update (id, input) {
    const {
      piz_name: pizName,
      piz_origin: pizOrigin,
      piz_state: pizState
    } = input

    const updatedPizza = await db.oneOrNone(
      'UPDATE pizzas SET piz_name = $1, piz_origin = $2, piz_state = $3 WHERE piz_id = $4 RETURNING *',
      [pizName, pizOrigin, pizState, id]
    )

    return updatedPizza
  }

  static async delete (id) {
    const result = await db.result('DELETE FROM pizzas WHERE piz_id = $1', [id])
    return result
  }

  static async getPizzaIngredients (id) {
    const pizzaIngredients = await db.any(`
        SELECT i.ing_id, i.ing_name, i.ing_calories, i.ing_state
        FROM pizza_ingredient pi
        JOIN ingredients i ON pi.ing_id = i.ing_id
        WHERE piz_id = $1`, [id]
    )
    return pizzaIngredients
  }

  static async addIngredient (id, ingredientId) {
    const result = await db.one(
      'INSERT INTO pizza_ingredient (piz_id, ing_id) VALUES ($1, $2) RETURNING *',
      [id, ingredientId]
    )
    return result
  }

  static async removeIngredient (id, ingredientId) {
    const result = await db.result(
      'DELETE FROM pizza_ingredient WHERE piz_id = $1 AND ing_id = $2',
      [id, ingredientId]
    )
    return result
  }
}
