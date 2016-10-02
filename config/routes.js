const express  = require("express");
const router   = express.Router();

const authentications = require("../controllers/authentications");
const users           = require("../controllers/users");
const deeds           = require("../controllers/deeds");

router.route("/register")
  .post(authentications.register);
router.route("/login")
  .post(authentications.login);

router.route('/users')
  .get(users.index);
router.route('/users/:id')
  .get(users.show)
  .put(users.update)
  .delete(users.delete);

  router.route('/deeds')
    .get(deeds.index)
    .post(deeds.create);
  router.route('/deeds/user=:userid')
      .get(deeds.indexForUser);
  router.route('/deeds/:id')
    .get(deeds.show)
    .put(deeds.update)
    .delete(deeds.delete);



module.exports = router;
