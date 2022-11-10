const router = require('express').Router();

//Import Pizza Controller routes
const {
    getAllPizza,
    getPizzaById,
    createPizza,
    updatePizza,
    deletePizza
} = require('../../controllers/pizza-controller');

//Set up Get ALL and POST at /api/pizzas
router
.route('/')
.get(getAllPizza)
.post(createPizza);

//Set up Get ONE, PUT and DELETE at /api/pizzas/:id
router
.route('/:id')
.get(getPizzaById)
.put(updatePizza)
.delete(deletePizza);

module.exports = router;