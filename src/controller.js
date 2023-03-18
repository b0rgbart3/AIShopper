//const passport = require("passport");
const bcrypt = require("bcrypt");
const saltRounds = 10;
const fs = require("fs");
const path = require("path");
const axios = require("axios");
const vision = require("@google-cloud/vision");
var Sequelize = require("sequelize");
const Op = Sequelize.Op;
const pluralize = require("pluralize");
let db = require("./models");
const staticProducts = [
  "bed",
  "bicycle",
  "bicyclewheel",
  "chair",
  "couch",
  "desk",
  "houseplant",
  "lamp",
  "laptop",
  "lighting",
  "loveseat",
  "pictureframe",
  "pillow",
  "table",
];

async function extractObjectFromImageURL(url) {
  // [START vision_localize_objects_gcs]
  // Imports the Google Cloud client libraries

  // Creates a client
  console.log("Creating a new Vision Client...");
  // Loading credentials from json file -- on both local and deployed sites.

  const client = new vision.ImageAnnotatorClient();
  const gcsUri = url.imageUrl;
  // console.log("gcsUri: ", url);
  const [result] = await client.objectLocalization(gcsUri);

  // console.log("result: ", result);
  //console.log("lOAs: ", result.localizedObjectAnnotations);
  const objects = result.localizedObjectAnnotations;
  objects.forEach((object) => {
    //   console.log(`Name: ${object.name}`);
    //  console.log(`Confidence: ${object.score}`);
    const veritices = object.boundingPoly.normalizedVertices;
    veritices.forEach((v) => console.log(`x: ${v.x}, y:${v.y}`));
  });
  // [END vision_localize_objects_gcs]
  const objectNames = objects.map((object) => object.name);
  return objectNames;
}

// Defining methods for the controller
module.exports = {
  //
  //
  //  LOGIN - a user
  //
  //
  login: function (req, res) {
    // console.log("In the login method of the controller:");

    db.User.findOne({
      where: { email: req.body.email },
    })
      .then((foundUser) => {
        //      console.log("found user in DB: ", foundUser.dataValues);
        // console.log(
        //   "comparing: ",
        //   req.body.p,
        //   ", with: ",
        //   foundUser.dataValues.password
        // );
        bcrypt
          .compare(req.body.p, foundUser.dataValues.password)
          .then((approved) => {
            //    console.log("BCRYPT COMPARED: ", approved);
            if (approved) {
              res.status(200).json(foundUser);
            }
          })
          .catch((err) => console.error(err.message));
      })
      .catch((err) => {
        //  console.log("In the catch block.");
        res.status(500).json({ err: err });
      });
  },
  //
  //  CREATE a New User Account
  //
  //

  //'$2b$10$AWuX/QhoKnmDj6D2np8QXuSXUxwyYS7zz0cng.21p9zEws7RS/1Iu'
  //$2b$10$AWuX/QhoKnmDj6D2np8QXuSXUxwyYS7zz0cng.21p9zEws7RS/1Iu

  create: function (req, res) {
    // console.log("Inside the controller create: ", req.body);
    // res.end("In the create route in the controller.");
    //   bcrypt.genSalt(saltRounds)
    //   .then( salt => {
    //     console.log(`Salt: ${salt}`);

    //     return bcrypt.hash(req.body.p, salt);
    //   })

    //     .then((hashphrase) => {
    //       // Store hash in your password DB.
    //       console.log("Out of password:", req.body.p, ", Created the hash:", hashphrase);
    //       db.User.create({
    //         email: req.body.email.toLowerCase(),
    //         username: req.body.email.toLowerCase(),
    //         password: hashphrase,
    //       })
    //         .then(function (newUser) {
    //           console.log("In the then method of the controller create: ", newUser);

    //           // res.redirect("/login");
    //           // Why does this redirect not work??
    //           res.json(newUser);
    //         })
    //         .catch(err =>
    //           console.error(err.message));

    // })
    console.log("++++++CREATING NEW USER____", req.body);

    bcrypt
      .hash(req.body.p, saltRounds)
      .then((hash) => {
        // console.log(`Hash: ${hash}`);
        // Store hash in your password DB.
        db.User.create({
          email: req.body.email.toLowerCase(),
          username: req.body.email.toLowerCase(),
          password: hash,
          admin: req.body.admin
        })
          .then(function (newUser) {
            // console.log(
            //   "In the then method of the controller create: ",
            //   newUser
            // );
            res.json(newUser);
          })
          .catch((err) => {
            console.error(err.message);
            res.json(false);
          });
      })
      .catch((err) => {
        console.error(err.message);
        res.json(false);
      });
  },
  deleteUser: function (req, res) {
    let id = req.params.userId;
    db.User.destroy({
      where: {
        id: id
      }
    }).then(function(response) {
      if (response)
      res.json(true);
    }).catch((err) => console.error(err.message));
  },

  findFriend: function (req, res) {
    //   console.log("In the controller - finding Friend: ", req.body.searchTerm);
    db.User.findAll({
      where: {
        email: {
          [Op.like]: "%" + req.body.searchTerm.toLowerCase() + "%",
        },
      },
    })
      .then(function (foundUser) {
        //console.log("In the then method of the findFriend method in the controller: ", foundUser);
        res.json(foundUser);
      })
      .catch(function (err) {
        res.status(401).json(err);
      });
  },

  addFriend: function (req, res) {
    console.log("In the controller, about to add a friend: ", req.body);

    db.Friend_Connection.create({
      UserId: req.body.User,
      FriendId: req.body.Friend,
    }).then((response) => {
      res.json(response);
    });
  },

  getSearches: function (req, res) {
    //console.log("In Controller, searching the db.");
    //res.status(400);

    db.Search.findAll({
      raw: true,
      where: { userid: req.query.userId },
    })
      .then((response) => {
        // console.log(
        //   "In getALLSearches: response from searching db for matching urls: ",
        //   response
        // );
        res.json(response);
      })
      .catch((error) => {
        console.log("There was an error: ", error);
      });
  },
  getSearchByUrl: function (req, res) {
    if (req.query) {
      //   console.log("Searching searches for: ", req.query);
      db.Search.findAll({
        raw: true,
        where: { image_url: req.query.url },
      }).then((response) => {
        //  console.log("In getSearches: response from searching db for matching urls: ", response);
        res.json(response);
      });
    }
  },
  getFriends: function (req, res) {
    // console.log("Inside controller getFriends>>>>>", req.params.id);
    if (req.params && req.params.id) {
      // Post.find({ where: { ...}, include: [User]})

      //db.User.findAll({where: { }})

      // db.Friend_Connection.findAll({
      //   // where: { user_id: req.params.id },
      //   include: [{
      //     model: db.User,
      //     as: 'Friends'
      //   }  ]})

      db.Friend_Connection.findAll({
        raw: true,
        where: { UserId: req.params.id },
      })

        .then((response) => {
          //  console.log("In Controller, getting friends:", response);
          let friendListId = [];
          for (let elem of response) {
            // console.log(elem);
            friendListId.push(elem.FriendId);
          }

          //friendListId = new Set([...friendListId]);
          //  console.log(friendListId);
          db.User.findAll({
            raw: true,
            where: {
              id: {
                [Op.in]: friendListId,
              },
            },
          }).then((friendResponse) => {
            //  console.log('Received response of friend detail from user table>>>>>>>>> ', friendResponse);
            res.json(friendResponse);
          });
        })
        .catch((err) => console.log(err));
    } else {
      res.end();
    }
  },
  getUser: function (req, res) {
    let id = req.params.userId;
    console.log("in Get USer: ", req.params);
    if (id) {
      db.User.findAll({
        raw: true,
        where: {
          id: id,
        },
      })
        .then((user) => {
          console.log("--------------------");
          console.log("found user: ", user);
          res.json(user);
        })
        .catch((err) => console.log(err));
    }
  },
  getUsers: function (req, res) {
    db.User.findAll({
      raw: true,
    })
      .then((users) => {
        res.json(users);
      })
      .catch((err) => console.log(err));
  },

  getFriendsSearches: function (req, res) {
    let friendsSearches = [];

    let friendsIds = req.body.friendsIds;
    let item = req.body.item;

    // based on the user and the item, first get a list of their friends,
    // and then search through their friends searches to look for matching items
    console.log(
      "In FriendsSearches in the controller: friendIds:",
      friendsIds,
      item
    );
    db.Product.findAll({
      raw: true,
      where: {
        [Op.and]: [
          {
            UserId: {
              [Op.in]: friendsIds,
            },
          },
          { itemName: item },
        ],
      },
    })
      .then((friendProducts) => {
        res.json(friendProducts);
      })
      .catch((err) => console.log(err));
  },

  saveSearch: function (req, res) {
    // data like : {UserId:'',image_url:'',itemNames: []}
    console.log("about to save a search:", req.body.data);
    console.log("The user id is:", req.body.data.UserId);
    db.Search.create({
      image_url: req.body.data.image_url,
      UserId: req.body.data.UserId,
    })
      .then(function (newSearch) {
        // get searchId
        console.log("We have created a new search: ", newSearch);
        let searchId = newSearch.get({ plain: true }).id;
        let bulkCreateArr = [];
        console.log("Search Id: ", searchId);
        console.log("About to save the items too.");
        console.log(req.body.data);

        if (req.body.data.itemNames.length < 1) {
          throw "No items extracted.";
          res.status(200).json(null);
        } else {
          console.log("About to save items: ", req.body.data.itemNames);

          for (let i = 0; i < req.body.data.itemNames.length; i++) {
            // used to be itemNames
            let itemObj = {
              searchId: searchId,
              name: req.body.data.itemNames[i], // used to be itemNames
            };
            bulkCreateArr.push(itemObj);
          }
          console.log("Bulk Array: ", bulkCreateArr);

          db.Item.bulkCreate(bulkCreateArr, {
            returning: true,
          })
            .then(function (afterSave) {
              res.json(afterSave);
            })
            .catch((err) => {
              console.log("There as a problem with the bulk saving of items:");
              console.log(err);
              res.status(404).json({ err: err });
            });
        }
      })
      .catch((err) => {
        console.log("Not able to save the search: ", err);
        res.status(500).json({ err: err });
      });
  },

  getSearchObject: function (req, res) {
    let searchId = req.params.searchId;

    db.Search.Find({
      raw: true,
      where: {
        SearchId: searchId,
      },
    }).then((result) => {
      res.json(result);
    });
  },
  getItemsBySearchId: function (req, res) {
    console.log("The incoming query: ", req.query);
    //let SearchId = req.query.searchId;
    let searchId = req.params.id;
    console.log("Searching for items with search ID of: ", searchId);

    db.Item.findAll({
      raw: true,
      where: {
        searchId: searchId,
      },
    }).then((items) => {
      res.json(items);
    });
  },

  getSearchHistory: function (req, res) {
    let userId = req.params.userId;
    db.Search.findAll({
      raw: true,
      where: {
        UserId: userId,
      },
    })
      .then((searchRes) => {
        let responseJSON = [];
        let searchIdArr = searchRes.map((search) => search.id);
        db.Item.findAll({
          raw: true,
          where: {
            SearchId: {
              [Op.in]: searchIdArr,
            },
          },
        })
          .then((itemRes) => {
            for (let i of searchRes) {
              let searchObj = {
                image_url: "",
                items: [],
              };
              searchObj.image_url = i.image_url;
              let filterItems = itemRes.filter((item) => {
                return item.SearchId === i.id;
              });
              searchObj.items = filterItems.map((item) => item.name);
              responseJSON.push(searchObj);
            }
            //console.log("response after getting all search data", responseJSON);
            res.json(responseJSON);
          })
          .catch((err) => res.status(404).json({ err: err }));
      })
      .catch((err) => {
        res.status(404).json({ err: "No search history!" });
      });
  },

  getHello: function (req, res) {
    console.log("In the GetHello Route of the controller");
    res.end("Got to the GetHello route.");
  },

  extractFromUrl: async function (req, res) {
    console.log("Extract from Url in the controller: ", req.body);

    // tobe removed : faking data
    if (req.body.imageUrl == "bedroom") {
      //console.log(">>>>> here inside bedroom");
      // "https://cloud.google.com/vision/docs/images/bicycle_example.png",
      let bedroom = {
        image_url:
          "https://www.bocadolobo.com/en/inspiration-and-ideas/wp-content/uploads/2018/03/Discover-the-Ultimate-Master-Bedroom-Styles-and-Inspirations-6_1.jpg",

        items: ["Bed", "Lamp", "Desk", "Picture frame"],
      };
      res.json(bedroom);
    } else if (req.body.imageUrl == "workspace") {
      let workspace = {
        image_url:
          "https://www.invaluable.com/blog/wp-content/uploads/2018/05/workspace-hero.jpg",
        items: ["Table", "Lamp", "Desk", "Laptop"],
      };
      res.json(workspace);
    } else {
      console.log("Analyzing a Fresh URL.....");
      console.log("Request: ", req.body);
      extractObjectFromImageURL(req.body)
        .then((gvResponse) => {
          let responseObj = {
            image_url: req.body.imageUrl,
            items: gvResponse,
          };
          res.json(responseObj);
        })
        .catch((err) => {
          console.log(err);
          res.status(404).json({ err: "Image not found!" });
        });
    }
  },
  getProducts: function (req, res) {
    console.log("Getting products.");
    if (!req.params.item) {
      res.end({ error: "undefined search query" });
    }
    let item = req.params.item.toLowerCase();

    // take the spaces out and convert to a singluar version
    item = pluralize.singular(item.replace(/\s/g, ""));

    console.log("In Controller getProducts: item:", item);

    if (staticProducts.includes(item)) {
      //  console.log("About to load the static json file: ", item+".json");

      const staticFolder = path.resolve(__dirname, "../rainforest_sample_data");

      // console.log("staticFolder: ", staticFolder);
      // console.log("file: ", path.resolve(staticFolder, "static_" + item + ".json"));

      fs.readFile(
        path.resolve(staticFolder, "static_" + item + ".json"),
        "utf-8",
        (err, data) => {
          if (err) {
            console.log(err);
            res.status(404).json({ err: err });
          } else {
            console.log(data);
            res.end(data);
          }
        }
      );

      // fs.readFile(path.resolve(staticFolder, "static_" + item + ".json"))
      //   .then((results) => {
      //     res.json(results);
      //   })
      //   .catch((err) => console.log(err));
    } else {
      console.log(
        "Here we will actually call the rainforest API, to get " +
          item +
          " products"
      );

      let params = {
        api_key: process.env.RAINFOREST_API_KEY,
        type: "search",
        amazon_domain: "amazon.com",
        search_term: item,
        sort_by: "price_high_to_low",
      };

      // make the http GET request to Rainforest API
      axios
        .get("https://api.rainforestapi.com/request", { params })
        .then((response) => {
          //  axios.get("/api/getRainForest/" + item)
          //  .then( (response) => {

          console.log("back from Rainforest...", response.data.search_results);
          res.json(response.data.search_results);
        })
        .catch((err) => console.log(err));
    }
  },

  saveProducts: function (req, res) {
    let dataFromClient = req.body.data;
    db.Product.create(dataFromClient)
      .then((productRes) => {
        console.log("Saved data in products table: ", productRes);
        res.json(productRes);
      })
      .catch((err) => {
        res.status(404).json({ err: err });
      });
  },
};
