module.exports = {
  index:        deedsIndex,
  indexForUser: deedsIndexForUser,
  create:       deedsCreate,
  show:         deedsShow,
  update:       deedsUpdate,
  delete:       deedsDelete
};

const Deed     = require('../models/deed');

function deedsIndex(req, res) {
  Deed
  .find({
    user: {
      $ne: req.user._id
    }
  })
  .populate("user")
  .exec((err, deeds) => {
    if (err) return res.status(500).json({ message: "Something went wrong." });
             return res.status(200).json({ deeds });
  });
}

function deedsIndexForUser(req, res) {
  Deed.find({
    user: req.user._id
  })
  .populate("user")
  .exec((err, deeds) => {
    if (err)  return res.status(500).json({ message: "Something went wrong." });
              return res.status(200).json({ deeds });
  });
}

function deedsCreate(req, res) {
  let deed    = new Deed(req.body.deed);
  deed.user   = req.user._id;
  deed.save((err, deed) => {
    if (err)  return res.status(500).json({ message: "Something went wrong." });
              return res.status(201).json({ deed });
  });
}

function deedsShow(req, res) {
  Deed
  .findById(req.params.id, (err, deed) => {
    if (err)   return res.status(500).json({ message: "Something went wrong." });
    if (!deed) return res.status(404).json({ message: "Deed not found." });
               return res.status(200).json({ deed });
  });
}

function deedsUpdate(req, res) {
  Deed.findByIdAndUpdate(req.params.id, req.body.deed, { new: true }, (err, deed) => {
    if (err)   return res.status(500).json({ message: "Something went wrong." });
    if (!deed) return res.status(404).json({ message: "Deed not found." });
    return res.status(200).json({ deed });
  });
}

function deedsDelete(req, res) {
  Deed.findByIdAndRemove(req.params.id, (err, deed) => {
    if (err)   return res.status(500).json({ message: "Something went wrong." });
    if (!deed) return res.status(404).json({ message: "Deed not found." });
    return res.status(204).send();
  });
}
