const mongoose = require ("mongoose");

const deedSchema = new mongoose.Schema({
  deed:       { type: String, unique: true, trim: true, required: true },
  image:      { type: String, trim: true },
  location:   { type: String, trim: true },
  userid:     {type: mongoose.Schema.ObjectId, ref: 'User'} 
}, {
timestamps: true
});

module.exports = mongoose.model("Deed", deedSchema);
