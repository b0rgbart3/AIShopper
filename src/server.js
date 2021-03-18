import express from 'express';
import path from 'path';
const shopprController = require("./controller.js");

const app = express();

app.use(express.static(path.join(__dirname, '../build')));
app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));

app.get('/hello', (req, res) => res.send('hello'));
app.get('/api/searches', (req,res) => {

    shopprController.getAllSearches(req, res);
 //   res.send('Searches:');
})

// pass all get requests that aren't part of the API to the React App
app.get('*', (req,res) => {
    res.sendFile(path.join(__dirname + '../build/index.html'));
});


app.listen(8000, () => console.log('Listening on port 8000'));


