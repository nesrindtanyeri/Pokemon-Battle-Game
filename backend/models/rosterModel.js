import mongoose from 'mongoose';

const rosterSchema = new mongoose.Schema({
  id: { type: Number, required: true, unique: true },
  name: { type: String, required: true },
  sprite: { type: String, required: true },
});

const Roster = mongoose.model('Roster', rosterSchema);

export default Roster;