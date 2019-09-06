const express = require('express');
const path = require('path');

const users = require('../api/users');
const router = express.Router();

// PAGES ROUTES //
router.get('/', (req, res) => {
	res.sendFile(path.join(__dirname, '../pages/index.html'));
});

// API ROUTES //
router.get('/api/users', users);

// NOT FOUND HANDLER //
router.use((req, res) => {
	res.status(404).send('Error');
});

module.exports = router;
