const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//article model
const repertoireSchema = new Schema({
  title: { type: String, required: true },
  composer: { type: String },
  timeFrame: { type: String },
  synopsis: { type: String }
});

const Repertoire = mongoose.model("Repertoire", repertoireSchema);

module.exports = Repertoire;