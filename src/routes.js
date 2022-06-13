const express = require('express');
const routes = express.Router();

routes.get('/bounce', (req, res) => {
    return res.send('Funfando mesmo esse bounce!');
});

routes.post('/bounce', (req, res) => {
    console.log(req.body);
    res.sendStatus(200);
});

module.exports = routes;