// Middleware para validar parámetros de ID
export const validateId = (req, res, next) => {
  const { id } = req.params
  
  if (!id || isNaN(parseInt(id)) || parseInt(id) <= 0) {
    return res.status(400).json({
      message: 'Invalid ID parameter'
    })
  }
  
  req.params.id = parseInt(id)
  next()
}

// Middleware para validar parámetros de ingrediente
export const validateIngredientId = (req, res, next) => {
  const { ingredientId } = req.params
  
  if (!ingredientId || isNaN(parseInt(ingredientId)) || parseInt(ingredientId) <= 0) {
    return res.status(400).json({
      message: 'Invalid ingredient ID parameter'
    })
  }
  
  req.params.ingredientId = parseInt(ingredientId)
  next()
}