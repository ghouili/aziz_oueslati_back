const express = require('express');
const articleController = require('../Controllers/article');


const route = express.Router();

route.get('/', articleController.GetAll);

route.get('/:id', articleController.FindById);

route.put('/:id', articleController.Update);

route.delete('/:id', articleController.Delete);

route.post('/add', articleController.Create);

module.exports = route