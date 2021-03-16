import express from 'express';
// import bodyParser from 'body-parser';

const app = express();

let db = require("./models");

app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));

app.get('/hello', (req, res) => res.send('hello'));

app.listen(8000, () => console.log('Listening on port 8000'));


