import express from "express";
import path from "path";
const shopprController = require("./controller.js");

const app = express();

app.use(express.static(path.join(__dirname, "../build")));
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);

app.get("/hello", (req, res) => res.send("hello"));
app.get("/api/findSearchByUrl", (req, res) => {
  console.log("in the api, doing a search.");
  shopprController.getSearchByUrl(req, res);
});
app.get("/api/searches/:userId", (req, res) => {
  shopprController.getSearches(req, res);
});

app.get("/api/itemsBySearchId/:id", (req, res) => {
  shopprController.getItemsBySearchId(req, res);
});
app.get("/api/products/:item", (req, res) => {
  console.log("Getting products");
  shopprController.getProducts(req, res);
});
app.get("/api/users", (req, res) => {
  //  console.log("GOT USER GET");
  shopprController.getUsers(req, res);
});
app.get("/api/user/:userId", (req, res) => {
  //  console.log("GOT USER GET");
  shopprController.getUser(req, res);
});
app.delete("/api/user/:userId", (req, res) => {
  console.log("GOT USER DELETE REQUEST");
  shopprController.deleteUser(req, res);
});
app.post("/api/extractUrl", (req, res) => {
  shopprController.extractFromUrl(req, res);
});
app.post("/api/saveSearch", (req, res) => {
  shopprController.saveSearch(req, res);
});
app.post("/api/login", (req, res) => {
  shopprController.login(req, res);
});
app.post("/api/signup", (req, res) => {
  console.log("api signup:");
  shopprController.create(req, res);
});

// pass all get requests that aren't part of the API to the React App
app.get("*", (req, res) => {
  console.log("sending request to react app");
  res.sendFile(path.join(__dirname, "../build"));
});

app.listen(8000, () => console.log("Listening on port 8000"));
