import express from 'express'
import { pizzasRouter } from './routes/pizza.routes.js'
import { ingredientsRouter } from './routes/ingredient.routes.js'
import { PORT } from './config/config.js'

const app = express()

app.use(express.json())

app.use('/pizzas', pizzasRouter)
app.use('/ingredients', ingredientsRouter)

app.use((req, res, next) => {
  res.status(404).json({ message: 'Endpoint not found' })
})

app.listen(PORT, () => {
  console.log(`Server running in localhost:${PORT}`)
})
