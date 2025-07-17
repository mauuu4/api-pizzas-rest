import Joi from 'joi'

export const validateId = (req, res, next) => {
  const schema = Joi.object({
    id: Joi.number().integer().positive().required()
  })

  const { error } = schema.validate({ id: req.params.id })

  if (error) {
    return res.status(400).json({
      message: 'Invalid ID parameter',
      details: error.details[0].message
    })
  }

  req.params.id = parseInt(req.params.id)
  next()
}

export const pizzaSchemas = {
  create: Joi.object({
    piz_name: Joi.string().min(2).max(100).required(),
    piz_origin: Joi.string().min(2).max(100).required(),
    piz_state: Joi.boolean().default(true),
    ingredients: Joi.array().items(
      Joi.alternatives().try(
        Joi.number().integer().positive(),
        Joi.object({
          ing_id: Joi.number().integer().positive().required(),
          ing_quantity: Joi.number().integer().positive().default(1)
        })
      )
    ).default([])
  }),

  update: Joi.object({
    piz_name: Joi.string().min(2).max(100),
    piz_origin: Joi.string().min(2).max(100),
    piz_state: Joi.boolean(),
    ingredients: Joi.array().items(
      Joi.alternatives().try(
        Joi.number().integer().positive(),
        Joi.object({
          ing_id: Joi.number().integer().positive().required(),
          ing_quantity: Joi.number().integer().positive().default(1)
        })
      )
    )
  }).min(1)
}

export const ingredientSchemas = {
  create: Joi.object({
    ing_name: Joi.string().min(2).max(100).required(),
    ing_calories: Joi.number().min(0).required(),
    ing_state: Joi.boolean().default(true)
  }),

  update: Joi.object({
    ing_name: Joi.string().min(2).max(100),
    ing_calories: Joi.number().min(0),
    ing_state: Joi.boolean()
  }).min(1)
}

export const validateBody = (schema) => {
  return (req, res, next) => {
    const { error } = schema.validate(req.body, { abortEarly: false })

    if (error) {
      return res.status(400).json({
        message: 'Validation error',
        details: error.details.map(err => err.message)
      })
    }

    next()
  }
}
