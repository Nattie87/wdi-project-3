const express         = require("express");
const router          = express.Router();

const authentications = require("../controllers/authentications");
const users           = require("../controllers/users");
const deeds           = require("../controllers/deeds");
const requests        = require("../controllers/requests");

router.route("/register")
  .post(authentications.register);
router.route("/login")
  .post(authentications.login);

router.route("/users")
  .get(users.index);
router.route("/users/:id")
  .get(users.show)
  .put(users.update)
  .patch(users.update)
  .delete(users.delete);
router.route("/my-deeds")
  .get(deeds.indexForUser);

router.route("/deeds")
  .get(deeds.index)
  .post(deeds.create);
router.route("/deeds/:id")
  .get(deeds.show)
  .put(deeds.update)
  .delete(deeds.delete);
router.route("/requests")
  .post(requests.create)
  .get(requests.index);
router.route("/requests/:id")
  .get(requests.show);
router.route("/requests/:id/reply")
  .put(requests.reply);

module.exports = router;
