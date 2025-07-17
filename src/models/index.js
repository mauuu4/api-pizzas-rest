// Importar modelos
import { Pizza, PizzaIngredient } from './pizza.model.js'
import { Ingredient } from './ingredient.model.js'

// Definir asociaciones
Pizza.belongsToMany(Ingredient, {
  through: {
    model: PizzaIngredient,
    attributes: ['ing_quantity']
  },
  foreignKey: 'piz_id',
  otherKey: 'ing_id',
  as: 'ingredients'
})

Ingredient.belongsToMany(Pizza, {
  through: {
    model: PizzaIngredient,
    attributes: ['ing_quantity']
  },
  foreignKey: 'ing_id',
  otherKey: 'piz_id',
  as: 'pizzas'
})

// Asociaciones directas para facilitar consultas
Pizza.hasMany(PizzaIngredient, { 
  foreignKey: 'piz_id', 
  as: 'pizzaIngredients' 
})

Ingredient.hasMany(PizzaIngredient, { 
  foreignKey: 'ing_id', 
  as: 'ingredientPizzas' 
})

PizzaIngredient.belongsTo(Pizza, { 
  foreignKey: 'piz_id', 
  as: 'pizza' 
})

PizzaIngredient.belongsTo(Ingredient, { 
  foreignKey: 'ing_id', 
  as: 'ingredient' 
})

// Exportar todos los modelos
export {
  Pizza,
  Ingredient,
  PizzaIngredient
}

// Exportar función para sincronizar la base de datos
export const syncDatabase = async (force = false) => {
  try {
    const { sequelize } = await import('../config/connection-db.js')
    
    if (force) {
      await sequelize.sync({ force: true })
      console.log('🔄 Database synchronized with force')
    } else {
      await sequelize.sync({ alter: false })
      console.log('✅ Database synchronized')
    }
  } catch (error) {
    console.error('❌ Error synchronizing database:', error)
    throw error
  }
}
