import express from 'express'
import { pizzasRouter } from './routes/pizza.routes.js'
import { ingredientsRouter } from './routes/ingredient.routes.js'
import { PORT } from './config/config.js'
import { connectDB } from './config/connection-db.js'

const app = express()

app.use(express.json())

app.use('/pizzas', pizzasRouter)
app.use('/ingredients', ingredientsRouter)

app.get('/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() })
})

app.use((req, res) => {
  res.status(404).json({ message: 'Endpoint not found' })
})

const startServer = async () => {
  try {
    await connectDB()

    app.listen(PORT, () => {
      console.log(`🚀 Server running on http://localhost:${PORT}`)
    })
  } catch (error) {
    console.error('❌ Failed to start server:', error)
    process.exit(1)
  }
}

startServer()
