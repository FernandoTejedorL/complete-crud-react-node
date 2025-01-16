const express = require('express');
const usersRoutes = express.Router();
const usersController = require('../controllers/users.controller');

usersRoutes.get('/', usersController.getAllUsers);
usersRoutes.get('/:id', usersController.getUserById);
usersRoutes.post('/', usersController.createNewUser);
usersRoutes.delete('/:id', usersController.deleteUser);
usersRoutes.patch('/:id', usersController.updateUser);

module.exports = usersRoutes;
