const mongoose = require('mongoose');

const rosterSchema = new mongoose.Schema({
  id: { type: Number, required: true, unique: true },
  name: { type: String, required: true },
  sprite: { type: String, required: true },
});

module.exports = mongoose.model('Roster', rosterSchema);
