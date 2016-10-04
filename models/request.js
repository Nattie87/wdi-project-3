const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema({
  sender: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  body:   { type: String, trim: true}
}, {
  timestamps: true
});

const requestSchema = new mongoose.Schema({
  sender:   { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  receiver: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  deed:     { type: mongoose.Schema.Types.ObjectId, ref: "Deed", required: true },
  messages: [messageSchema],
  rating:   { type: Number, min: 0, max: 5 }
}, {
  timestamps: true
});

requestSchema.pre("validate", function(done) {
  const self = this;
  self.model("Deed").findById(self.deed, (err, deed) => {
    if (err) return done(err);
    deed.requests.addToSet(self);
    deed.save((err, deed) => {
      if (err) return done(err);

      self.receiver = deed.user;
      return done();
    });
  });
});

module.exports = mongoose.model("Request", requestSchema);
