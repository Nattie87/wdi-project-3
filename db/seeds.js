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

      username:     "Woderz",
      firstName:    "Miriam",
      lastName:     "Wodrich",
      image:        "https://cloud.githubusercontent.com/assets/18631052/19105976/e1202476-8adc-11e6-895a-3a7926c69a5a.jpg",
      about:        "Hey guys!! So glad to be here guys!! I just really love helping people out...guys!!! Also interested in learning how to moonwalk...obvz!",
      email:        "woderz@wodnet.net",
      location:     "221B Baker Street",
      password:     "password",
      passwordConfirmation: "password"
    },
    {
      username:     "Tombs-Day",
      firstName:    "Laura",
      lastName:     "Tombs",
      image:        "https://cloud.githubusercontent.com/assets/18631052/19106025/10258748-8add-11e6-8cf0-81468cb18750.jpg",
      about:        "Oh hello. I am mostly here for the vibe ratings. Give me VIBE RATINGS!",
      email:        "laura@tombs.net",
      location:     "Angel",
      password:     "password",
      passwordConfirmation: "password"
    },
    {
      username:     "Connatinate",
      firstName:    "Nat",
      lastName:     "Huitson",
      image:       "https://cloud.githubusercontent.com/assets/18631052/19106086/66aed2c2-8add-11e6-91a8-822926d14327.jpg",
      about:        "I am one cakey gal. Just lookin' to help y'all out, learn some new skills and hopefully meet a couple of right gateaux.",
      email:        "nat@huitson.net",
      location:     "London",
      password:     "password",
      passwordConfirmation: "password"
    },
    {
      username:     "Chinternet",
      firstName:    "Alex",
      lastName:     "Chin",
      image:        "https://cloud.githubusercontent.com/assets/18631052/19106166/c3de49f0-8add-11e6-9812-347ba0a6163d.jpg",
      about:        "I am just here to hack the site to be honest. If you could just message me your account details that would make my life a lot easier. Cheers.",
      email:        "alexpchin@chinter.net",
      location:     "Shoreditch",
      password:     "password",
      passwordConfirmation: "password"
    },
    {
      username:     "Flower_child_67",
      firstName:    "Ben",
      lastName:     "Green",
      image:        "https://cloud.githubusercontent.com/assets/18631052/19106188/f9027322-8add-11e6-833b-69c3a06bdafc.jpg",
      about:        "I spend most of my time in the garden so very happy to lend a hand with botanical services.",
      email:        "lurkinginflowerbeds@overthere.net",
      location:     "Your garden",
      password:     "password",
      passwordConfirmation: "password"
    },
    {
      username:     "Ranedear",
      firstName:    "Rane",
      lastName:     "Gowan",
      image:        "https://cloud.githubusercontent.com/assets/18631052/19106236/3cac9e04-8ade-11e6-92e7-4b8b586a07f6.jpg",
      about:        "I was looking for something called 'stack overflow', found this instead. Can someone please help me find the 'any key'?! ",
      email:        "rane@gowan.net",
      location:     "Schuh",
      password:     "password",
      passwordConfirmation: "password"
    },
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
