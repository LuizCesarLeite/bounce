const express = require('express');
const routes = require('./avisaBounce');
const app = express();

app.use(express.json());
app.use(routes);

app.listen(3848, () => {
    console.log('Rodando suavaço na porta 3848');
});