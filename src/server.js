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
app.get('/api/findSearchByUrl', (req,res) => {
    console.log("in the api, doing a search.");
    shopprController.getSearchByUrl(req, res);
});
app.get('/api/searches', (req,res) => {
  shopprController.getSearches(req, res);
});

app.get('/api/itemsBySearchId/:id', (req,res) => {
  shopprController.getItemsBySearchId(req,res);
});
app.get('/api/products/:item', (req,res) => {
  shopprController.getProducts(req,res);
});
app.get('/api/users', (req,res) => {
  shopprController.getUsers(req,res);
});
app.post('/api/extractUrl', (req,res) => {
  shopprController.extractFromUrl(req,res);
});
app.post('/api/saveSearch', (req, res) => {
  shopprController.saveSearch(req,res);
});
app.post('/api/login', (req,res) => {
  shopprController.login(req,res);
});
app.post('/api/signup', (req,res) => {
  console.log('api signup:');
  shopprController.create(req,res);
})



// pass all get requests that aren't part of the API to the React App
app.get('*', (req,res) => {
    res.sendFile(path.join(__dirname + '../build/index.html'));
});


app.listen(8000, () => console.log('Listening on port 8000'));


