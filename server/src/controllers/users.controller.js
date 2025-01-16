const path = require('path');
const fs = require('fs');
const { v4 } = require('uuid');
const pathFile = path.resolve(__dirname, '../../data/users.json');
const usersController = {};

usersController.getAllUsers = (req, res) => {
  fs.readFile(pathFile, (error, data) => {
    if (error) {
      return res.status(500).json({ error: 'Error reading file' });
    }
    const jsonData = JSON.parse(data);
    return res.status(200).json(jsonData);
  });
};

usersController.getUserById = (req, res) => {
  const { id } = req.params;
  fs.readFile(pathFile, (error, data) => {
    if (error) {
      return res.status(500).json({ error: 'Error reading file' });
    } else {
      const jsonData = JSON.parse(data);
      const userFound = jsonData.find((user) => user.userId === id);
      if (userFound) {
        res.status(200).json(userFound);
      } else {
        res.status(404).json({ error: 'User not found' });
      }
    }
  });
};

usersController.createNewUser = (req, res) => {
  const toCreate = { userId: v4(), ...req.body };

  fs.readFile(pathFile, (error, data) => {
    if (error) {
      return res.status(500).json({ error: 'Error reading file' });
    }
    const jsonData = JSON.parse(data);
    const newData = [...jsonData, toCreate];
    fs.writeFile(pathFile, JSON.stringify(newData), (error) => {
      if (error) {
        res.status(409).json({ error: 'Error creating user' });
      }

      res.status(200).send('Data saved OK');
    });
  });
};

module.exports = usersController;
