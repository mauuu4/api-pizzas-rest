import { db } from '../config/connection-db.js'

export const getPizzas = async (req, res) => {
  const pizzas = await db.any('SELECT * FROM pizzas ORDER BY piz_id DESC')
  res.json(pizzas)
}

export const getPizzaById = async (req, res) => {
  const { id } = req.params
  const pizza = await db.oneOrNone(`
    SELECT * FROM pizzas 
    WHERE piz_id = $1`, [id]
  )

  if (!pizza) {
    return res.status(404).json({ message: 'Pizza not found' })
  }

  res.json(pizza)
}

export const createPizza = async (req, res) => {
  try {
    const {
      piz_name: pizName,
      piz_origin: pizOrigin,
      piz_state: pizState
    } = req.body

    const newPizza = await db.one(`
    INSERT INTO pizzas (piz_name, piz_origin, piz_state)
    VALUES ($1, $2, $3)
    RETURNING *`, [pizName, pizOrigin, pizState]
    )

    res.status(201).json(newPizza)
  } catch (error) {
    console.log(error)
    return res.status(500).json({ message: 'Error creating pizza' })
  }
}

export const updatePizza = async (req, res) => {
  try {
    const { id } = req.params
    const {
      piz_name: pizName,
      piz_origin: pizOrigin,
      piz_state: pizState
    } = req.body

    const updatedPizza = await db.oneOrNone(`
    UPDATE pizzas 
    SET piz_name = $1, piz_origin = $2, piz_state = $3
    WHERE piz_id = $4
    RETURNING *`, [pizName, pizOrigin, pizState, id]
    )

    if (!updatedPizza) {
      return res.status(404).json({ message: 'Pizza not found' })
    }

    res.json(updatedPizza)
  } catch (error) {
    console.log(error)
    return res.status(500).json({ message: 'Error updating pizza' })
  }
}

export const deletePizza = async (req, res) => {
  const { id } = req.params

  const { rowCount } = await db.result(`
    DELETE FROM pizzas 
    WHERE piz_id = $1`, [id]
  )

  if (rowCount === 0) {
    return res.status(404).json({ message: 'Pizza not found' })
  }

  res.sendStatus(204)
}
