const express = require('express');
const sampleData = require('./sample-data/sample-poems.json');

const app = express();
app.set('view engine', 'pug');

app.use(express.static('public'));

app.get('/', (req, res) => {
    res.render('index', { poems: sampleData } );
});

app.listen(3000, () => {console.log("The server is running")});