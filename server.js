const express = require ("express")
// const logger = require('morgan');
const router = require('./modules/router');
const server = express ()
const port = 3000

// server.use(logger('dev'));
server.use('/statics', express.static('public'));
server.use(router);

server.listen(port, ()=>{
    console.log(`Running on port ${port}`)
})