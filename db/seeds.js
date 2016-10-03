const mongoose   = require("mongoose");
const config     = require("../config/config");
const async      = require("async");
const Bluebird   = require("bluebird");

mongoose.Promise = Bluebird;

mongoose.connect(config.db);

const User    = require("../models/user");
const Deed    = require("../models/deed");
const Request = require("../models/request");

User.collection.drop();
Deed.collection.drop();
Request.collection.drop();

async.waterfall([
  createUsers,
  createDeeds
], function(err) {
  if (err) return console.log(err);
  console.log("Seeding complete");
  return process.exit();
});

function createUsers(done){
  const users = [
    {
      username:     "turnip",
      firstName:    "turnip",
      lastName:     "turnip",
      image:        "http://fillmurray.com/300/300",
      about:        "turnip",
      email:        "turnip@turnip.com",
      location:     "London",
      password:     "password",
      passwordConfirmation: "password"
    },
    {
      username:     "carrot",
      firstName:    "carrot",
      lastName:     "carrot",
      image:        "http://fillmurray.com/301/301",
      about:        "carrot",
      email:        "carrot@carrot.com",
      location:     "London",
      password:     "password",
      passwordConfirmation: "password"
    }
  ];

  Bluebird.map(users, user => {
    return User.create(user);
  }).then((users) => {
    done(null);
  }).catch(done);
}

function createDeeds(done){
  User.find((err, users) => {
    if (err) return done(err);

    Deed.create({
      userid:   users[0]._id,
      deed:     "Need some help",
      location: "London",
    }, (err, deed) => {
      if (err) return done(err);

      const request = new Request({
        user: users[1]._id,
        deed: deed._id,
        messages: [
          {
            sender: users[1]._id,
            body: "Hello, I'd like to help",
          },
          {
            sender: users[0]._id,
            body: "I need some help!"
          }
        ],
        rating: 5
      });

      request.save((err, request) => {
        if (err) return done(err);
        done(null, request);
      });
    });
  });
}
