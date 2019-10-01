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
router.get('/api/users/:name', users.getSearchUser);
router.delete('/api/users/delete/:id', users.deleteUser)

// NOT FOUND HANDLER //
router.use((req, res) => {
	res.status(404).send('Error');
});

module.exports = router;
