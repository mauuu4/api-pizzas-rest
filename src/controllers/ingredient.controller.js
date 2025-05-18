import { db } from '../config/connection-db.js'

export const getIngredients = async (req, res) => {
  const ingredients = await db.any('SELECT * FROM ingredients ORDER BY ing_id DESC')
  res.json(ingredients)
}

export const getIngredientById = async (req, res) => {
  const { id } = req.params
  const ingredient = await db.oneOrNone(`
    SELECT * FROM ingredients 
    WHERE ing_id = $1`, [id]
  )

  if (!ingredient) {
    return res.status(404).json({ message: 'Ingredient not found' })
  }

  res.json(ingredient)
}

export const createIngredient = async (req, res) => {
  try {
    const {
      ing_calories: ingCalories,
      ing_name: ingName,
      ing_state: ingState
    } = req.body

    const newIngredient = await db.one(`
    INSERT INTO ingredients (ing_calories, ing_name, ing_state)
    VALUES ($1, $2, $3)
    RETURNING *`, [ingCalories, ingName, ingState]
    )

    res.status(201).json(newIngredient)
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: 'Error creating ingredient' })
  }
}

export const updateIngredient = async (req, res) => {
  try {
    const { id } = req.params
    const {
      ing_calories: ingCalories,
      ing_name: ingName,
      ing_state: ingState
    } = req.body

    const updatedIngredient = await db.oneOrNone(`
    UPDATE ingredients 
    SET ing_calories = $1, ing_name = $2, ing_state = $3
    WHERE ing_id = $4
    RETURNING *`, [ingCalories, ingName, ingState, id]
    )

    if (!updatedIngredient) {
      return res.status(404).json({ message: 'Ingredient not found' })
    }

    res.json(updatedIngredient)
  } catch (error) {
    console.log(error)
    return res.status(500).json({ message: 'Error updating ingredient' })
  }
}

export const deleteIngredient = async (req, res) => {
  const { id } = req.params

  const { rowCount } = await db.result(`
    DELETE FROM ingredients 
    WHERE ing_id = $1`, [id]
  )

  if (rowCount === 0) {
    return res.status(404).json({ message: 'Ingredient not found' })
  }

  res.sendStatus(204)
}
