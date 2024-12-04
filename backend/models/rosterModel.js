import mongoose from 'mongoose';

// Schema definition for the roster with stats
const rosterSchema = new mongoose.Schema({
  id: { type: Number, required: true },
  name: { type: String, required: true },
  sprite: { type: String, required: true },
  stats: { 
    type: [{ name: String, value: Number }],
    required: true 
  },
}, { timestamps: true });  // Optionally include timestamps

const Roster = mongoose.model('Roster', rosterSchema);

export default Roster;
