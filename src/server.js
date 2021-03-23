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
    console.log("in the api, doing a search.");
    shopprController.getSearches(req, res);
});
app.post('/api/extractUrl', (req,res) => {
  shopprController.extractFromUrl(req,res);
});
app.post('/api/saveSearch', (req, res) => {
  shopprController.saveSearch(req,res);
})


// pass all get requests that aren't part of the API to the React App
app.get('*', (req,res) => {
    res.sendFile(path.join(__dirname + '../build/index.html'));
});


app.listen(8000, () => console.log('Listening on port 8000'));


