import express from 'express';
const shopprController = require("./controller.js");

const app = express();



app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));

app.get('/hello', (req, res) => res.send('hello'));
app.get('/api/searches', (req,res) => {

    shopprController.getAllSearches(req, res);
 //   res.send('Searches:');
})

app.listen(8000, () => console.log('Listening on port 8000'));


