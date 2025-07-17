import { DataTypes } from 'sequelize'
import { sequelize } from '../config/connection-db.js'

export const Pizza = sequelize.define('Pizza', {
  piz_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    field: 'piz_id'
  },
  piz_name: {
    type: DataTypes.STRING(100),
    allowNull: false,
    field: 'piz_name',
    validate: {
      notEmpty: {
        msg: 'Pizza name cannot be empty'
      },
      len: {
        args: [2, 100],
        msg: 'Pizza name must be between 2 and 100 characters'
      }
    }
  },
  piz_origin: {
    type: DataTypes.STRING(100),
    allowNull: false,
    field: 'piz_origin',
    validate: {
      notEmpty: {
        msg: 'Pizza origin cannot be empty'
      },
      len: {
        args: [2, 100],
        msg: 'Pizza origin must be between 2 and 100 characters'
      }
    }
  },
  piz_state: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: true,
    field: 'piz_state'
  }
}, {
  tableName: 'pizzas',
  timestamps: false,
  indexes: [
    {
      fields: ['piz_name']
    },
    {
      fields: ['piz_state']
    }
  ]
})

// Definir la tabla intermedia para la relación muchos a muchos
export const PizzaIngredient = sequelize.define('PizzaIngredient', {
  piz_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    field: 'piz_id'
  },
  ing_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    field: 'ing_id'
  },
  ing_quantity: {
    type: DataTypes.INTEGER,
    allowNull: false,
    field: 'ing_quantity',
    validate: {
      min: {
        args: [1],
        msg: 'Quantity must be at least 1'
      }
    }
  }
}, {
  tableName: 'pizza_ingredient',
  timestamps: false,
  indexes: [
    {
      fields: ['piz_id']
    },
    {
      fields: ['ing_id']
    }
  ]
})
