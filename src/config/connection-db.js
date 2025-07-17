import { Sequelize } from 'sequelize'
import { DB_DATABASE, DB_HOST, DB_PASSWORD, DB_PORT, DB_USER } from './config.js'

// Configuración de Sequelize
const sequelize = new Sequelize(DB_DATABASE, DB_USER, DB_PASSWORD, {
  host: DB_HOST,
  port: DB_PORT,
  dialect: 'postgres',
  logging: false,
  define: {
    timestamps: true,
    underscored: true,
    freezeTableName: true
  }
})

// Función para conectar a la base de datos
export const connectDB = async () => {
  try {
    await sequelize.authenticate()
    console.log('✅ Database connected successfully')
    
    await sequelize.sync({ alter: false })
    console.log('✅ Database synchronized')
  } catch (error) {
    console.error('❌ Unable to connect to database:', error)
    throw error
  }
}

export { sequelize }
