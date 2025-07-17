import { DataTypes } from 'sequelize'
import { sequelize } from '../config/connection-db.js'

export const Ingredient = sequelize.define('Ingredient', {
  ing_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    field: 'ing_id'
  },
  ing_name: {
    type: DataTypes.STRING(100),
    allowNull: false,
    field: 'ing_name',
    validate: {
      notEmpty: {
        msg: 'Ingredient name cannot be empty'
      },
      len: {
        args: [2, 100],
        msg: 'Ingredient name must be between 2 and 100 characters'
      }
    }
  },
  ing_calories: {
    type: DataTypes.FLOAT,
    allowNull: false,
    field: 'ing_calories',
    validate: {
      min: {
        args: [0],
        msg: 'Calories must be a positive number'
      }
    }
  },
  ing_state: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: true,
    field: 'ing_state'
  }
}, {
  tableName: 'ingredients',
  timestamps: false,
  indexes: [
    {
      fields: ['ing_name']
    },
    {
      fields: ['ing_state']
    }
  ]
})
