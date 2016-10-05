module.exports = {
  create: requestsCreate,
  show:   requestsShow,
  index:  requestsIndex,
  reply:  requestsReply
};

const Deed    = require("../models/deed");
const Request = require("../models/request");

function requestsIndex(req, res) {
  Request.find({
    $or: [
      { sender: req.user._id },
      { receiver: req.user._id }
    ]
  })
  .populate(["sender", "deed"])
  .exec((err, requests) => {
    if (err) return res.status(500).json({ message: "Something went wrong." });
    return res.status(201).json({ requests });
  });
}

function requestsCreate(req, res){
  const tempRequest              = req.body;
  tempRequest.sender             = req.user._id;
  tempRequest.messages[0].sender = req.user._id;

  const request = new Request(tempRequest);

  request.save((err, request) => {
    if (err) return res.status(500).json({ message: "Something went wrong." });
    return res.status(201).json({ request });
  });
}

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

function requestsReply(req, res){
  Request
  .findById(req.params.id, (err, request) => {
    if (err) return res.status(500).json({ message: "Something went wrong." });
    if (!request) return res.status(404).json({ message: "Request not found." });
    request.messages.push({
      sender: req.user._id,
      body: req.body.message.body
    });
    request.save((err, request) => {
      if (err) return res.status(500).json({ message: "Something went wrong." });
      Request
        .populate(request, {path: "messages.sender"}, (err, request) => {
          if (err) return res.status(500).json({ message: "Something went wrong." });
          return res.status(200).json({ request });
        });
    });
  });
}
