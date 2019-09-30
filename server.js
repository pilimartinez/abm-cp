const express = require ("express")
const logger = require('morgan');
const cors = require('cors');
const bodyParser = require('body-parser')
const uuidv1 = require ('uuid/v1')
const router = require('./modules/router');

const server = express ()
const port = 3000

server.use(
	bodyParser.urlencoded({
		extended: true
	}));
server.use(bodyParser.json());
server.use(logger('dev'));
server.use('/statics', express.static('public'));
server.use(router);
server.use(cors);
server.use(uuidv1)

server.listen(port, ()=>{
    console.log(`Running on port ${port}`)
})