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
  const toCheck = req.body.email;

  fs.readFile(pathFile, (error, data) => {
    if (error) {
      return res.status(500).json({ error: 'Error reading file' });
    }
    const jsonData = JSON.parse(data);
    const checked = jsonData.some((item) => item.email === toCheck);
    if (checked) {
      return res.status(409).json(jsonData);
    } else {
      const newData = [...jsonData, toCreate];

      fs.writeFile(pathFile, JSON.stringify(newData), (error) => {
        if (error) {
          return res.status(500).json({ error: 'Error creating user' });
        }

        return res.status(200).json(newData);
      });
    }
  });
};

usersController.updateUser = (req, res) => {
  const { id } = req.params;
  const info = req.body;
  const mail = info.email;
  console.log(mail);
  fs.readFile(pathFile, (error, data) => {
    if (error) {
      return res.status(500).json({ error: 'Error reading file' });
    }
    const jsonData = JSON.parse(data);

    const checked = jsonData.some((item) => item.email === mail);

    const userFoundIndex = jsonData.findIndex((user) => user.userId === id);

    if (checked) {
      return res.status(409).json(jsonData[userFoundIndex]);
    }
    jsonData[userFoundIndex] = { ...jsonData[userFoundIndex], ...info };

    fs.writeFile(pathFile, JSON.stringify(jsonData), (error) => {
      if (error) {
        return res.status(404).json({ error: 'User not found' });
      }

      return res.status(200).json(jsonData[userFoundIndex]);
    });
  });
};

usersController.deleteUser = (req, res) => {
  const { id } = req.params;
  fs.readFile(pathFile, (error, data) => {
    if (error) {
      return res.status(500).json({ error: 'Error reading file' });
    }
    const jsonData = JSON.parse(data);
    const newData = jsonData.filter((item) => item.userId !== id);
    fs.writeFile(pathFile, JSON.stringify(newData), (error) => {
      if (error) {
        return res.status(404).json({ error: 'User not found' });
      }

      res.status(200).json({ message: 'User deleted successfully' });
    });
  });
};

module.exports = usersController;
