const mongoose   = require("mongoose");
const config     = require("../config/config");
const async      = require("async");
const Bluebird   = require("bluebird");

mongoose.Promise = Bluebird;

mongoose.connect(config.db);

const User       = require("../models/user");
const Deed       = require("../models/deed");
const Request    = require("../models/request");

User.collection.    drop();
Deed.collection.    drop();
Request.collection. drop();

async.waterfall([
  createUsers,
  createDeeds
], function(err) {
  if (err) return console.log(err);
  console.log("Seeding complete");
  return process.exit();
});

function createUsers(done){
  const users     = [
    {
      username:             "turnip",
      firstName:            "turnip",
      lastName:             "turnip",
      image:                "http://fillmurray.com/300/300",
      about:                "turnip",
      email:                "turnip@turnip.com",
      location:             "London",
      password:             "password",
      passwordConfirmation: "password"
    },
    {
      username:             "carrot",
      firstName:            "carrot",
      lastName:             "carrot",
      image:                "http://fillmurray.com/301/301",
      about:                "carrot",
      email:                "carrot@carrot.com",
      location:             "London",
      password:             "password",
      passwordConfirmation: "password"
    },
    {
      username:             "Miriam",
      firstName:            "Miriam",
      lastName:             "Wodrich",
      image:       "https://files.slack.com/files-pri/T0351JZQ0-F2JP11X50/14755221972588859690.jpg",
      about:                 "",
      email:                 "miriam@miriam.com",
      location:              "London",
      password:              "password",
      passwordConfirmation:  "password"
    },
    {
      username:              "Ben",
      firstName:             "Benedict",
      lastName:              "Green",
      image:        "https://files.slack.com/files-pri/T0351JZQ0-F2JM1HKNX/1475522442760495344.jpg",
      about:                 "carrot",
      email:                 "ben@ben.com",
      location:              "London",
      password:              "password",
      passwordConfirmation:  "password"
    },
    {
      username:              "Nat",
      firstName:             "Natalie",
      lastName:              "Huitson",
      image:        "https://files.slack.com/files-pri/T0351JZQ0-F2JNPT8KX/14755220523014632552.jpg",
      about:                 "carrot",
      email:                 "nat@nat.com",
      location:              "London",
      password:              "password",
      passwordConfirmation:  "password"
    },
    {
      username:              "Laura",
      firstName:             "Laura",
      lastName:              "Tombs",
      image:        "https://files.slack.com/files-pri/T0351JZQ0-F2JNUCHBR/14755225571885542899.jpg",
      about:                 "carrot",
      email:                 "laura@laura.com",
      location:              "London",
      password:              "password",
      passwordConfirmation:  "password"
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
      user:     users[0]._id,
      deed:     "Walk my dog",
      image:    "http://www.dogwalkerscheltenham.co.uk/wp-content/uploads/2015/02/Prices-300x198.jpg",
      location: "London",
    }, (err, deed) => {
      if (err) return done(err);

      const request = new Request({
        sender: users[1]._id,
        receiver: deed.user,
        deed:     deed._id,
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
