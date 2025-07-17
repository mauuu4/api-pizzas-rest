-- =====================================================
-- Script de creación de base de datos para API Pizzas
-- =====================================================

-- Crear la base de datos (ejecutar como superusuario)
-- CREATE DATABASE pizzas_db;
-- \c pizzas_db;

-- =====================================================
-- Tabla: ingredients
-- =====================================================
CREATE TABLE IF NOT EXISTS ingredients (
    ing_id SERIAL PRIMARY KEY,
    ing_name VARCHAR(100) NOT NULL,
    ing_calories FLOAT NOT NULL,
    ing_state BOOLEAN NOT NULL DEFAULT true
);

-- =====================================================
-- Tabla: pizzas
-- =====================================================
CREATE TABLE IF NOT EXISTS pizzas (
    piz_id SERIAL PRIMARY KEY,
    piz_name VARCHAR(100) NOT NULL,
    piz_origin VARCHAR(100) NOT NULL,
    piz_state BOOLEAN NOT NULL DEFAULT true
);

-- =====================================================
-- Tabla: pizza_ingredient (relación muchos a muchos)
-- =====================================================
CREATE TABLE IF NOT EXISTS pizza_ingredient (
    piz_id INTEGER NOT NULL,
    ing_id INTEGER NOT NULL,
    ing_quantity INTEGER NOT NULL,
    PRIMARY KEY (piz_id, ing_id),
    FOREIGN KEY (piz_id) REFERENCES pizzas(piz_id) ON DELETE CASCADE,
    FOREIGN KEY (ing_id) REFERENCES ingredients(ing_id) ON DELETE CASCADE
);

INSERT INTO ingredients (ing_name, ing_calories, ing_state) VALUES
('Masa de pizza', 150, true),
('Salsa de tomate', 25, true),
('Queso mozzarella', 280, true),
('Pepperoni', 135, true),
('Jamón', 120, true),
('Champiñones', 15, true),
('Pimientos', 20, true),
('Cebolla', 40, true),
('Aceitunas negras', 155, true),
('Aceitunas verdes', 140, true),
('Tomate cherry', 18, true),
('Albahaca', 5, true),
('Orégano', 3, true),
('Piña', 50, true),
('Salami', 125, true);

-- =====================================================
-- Datos de ejemplo para pizzas
-- =====================================================
INSERT INTO pizzas (piz_name, piz_origin, piz_state) VALUES
('Margarita', 'Italia', true),
('Pepperoni', 'Estados Unidos', true),
('Hawaiana', 'Canadá', true),
('Quattro Stagioni', 'Italia', true),
('Vegetariana', 'Italia', true),
('Napolitana', 'Italia', true),
('Americana', 'Estados Unidos', true),
('Carbonara', 'Italia', true);

-- =====================================================
-- Relaciones pizza-ingrediente de ejemplo
-- =====================================================
-- Pizza Margarita (ID: 1)
INSERT INTO pizza_ingredient (piz_id, ing_id, ing_quantity) VALUES
(1, 1, 1), -- Masa (1 unidad)
(1, 2, 1), -- Salsa de tomate (1 unidad)
(1, 3, 200), -- Queso mozzarella (200g)
(1, 12, 10); -- Albahaca (10g)

-- Pizza Pepperoni (ID: 2)
INSERT INTO pizza_ingredient (piz_id, ing_id, ing_quantity) VALUES
(2, 1, 1), -- Masa (1 unidad)
(2, 2, 1), -- Salsa de tomate (1 unidad)
(2, 3, 150), -- Queso mozzarella (150g)
(2, 4, 100);  -- Pepperoni (100g)

-- Pizza Hawaiana (ID: 3)
INSERT INTO pizza_ingredient (piz_id, ing_id, ing_quantity) VALUES
(3, 1, 1), -- Masa (1 unidad)
(3, 2, 1), -- Salsa de tomate (1 unidad)
(3, 3, 180), -- Queso mozzarella (180g)
(3, 5, 80), -- Jamón (80g)
(3, 14, 100); -- Piña (100g)