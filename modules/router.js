const express = require('express');
const path = require('path');

const users = require('../api/users');
const router = express.Router();

// PAGES ROUTES //
router.get('/', (req, res) => {
	res.sendFile(path.join(__dirname, '../pages/index.html'));
});

// API ROUTES //
router.get('/api/users', users.getUser);
router.post('/api/users', users.newUser)
router.get('/api/users/byname/:name', users.getSearchUser);
router.get('/api/users/byid/:id', users.getUserById)
router.delete('/api/users/delete/:id', users.deleteUser)
router.patch('/api/users/edit/:id', users.editUser)

// NOT FOUND HANDLER //
router.use((req, res) => {
	res.status(404).send('Error');
});

module.exports = router;
