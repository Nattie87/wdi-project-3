module.exports = {
  create: requestsCreate,
  show:   requestsShow
};

const Deed    = require("../models/deed");
const Request = require("../models/request");

// POST /api/deeds/:id/requests

function requestsCreate(req, res){
  Deed.findById(req.params.id, (err, deed) => {
    if (err) return res.status(500).json({ message: "Something went wrong." });
    if (!deed) return res.status(404).json({ message: "Deed not found." });

    const request = new Request({
      user: req.user._id,
      deed: deed._id
    });

    request.save((err, request) => {
      if (err) return res.status(500).json({ message: "Something went wrong." });
      return res.status(201).json({ request });
    });
  });
}

// POST /api/requests/:id

function requestsShow(req, res) {
  Request
  .findById(req.params.id)
  .populate(["messages.sender"])
  .exec((err, request) => {
    if (err) return res.status(500).json({ message: "Something went wrong." });
    if (!request) return res.status(404).json({ message: "Request not found." });
    return res.status(200).json({ request });
  });
}
