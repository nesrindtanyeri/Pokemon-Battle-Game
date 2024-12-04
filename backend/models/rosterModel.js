import mongoose from 'mongoose';

const rosterSchema = new mongoose.Schema({
  id: { type: Number, required: true },
  name: { type: String, required: true },
  sprite: { type: String, required: true },
  stats: [
    {
      name: { type: String, required: true },
      base_stat: { type: Number, required: true }
    }
  ]
}, {
  toJSON: { virtuals: true }, // Ensures that virtuals are included when converting to JSON
  toObject: { virtuals: true } // Ensures that virtuals are included when converting to objects
});

const Roster = mongoose.model('Roster', rosterSchema);

export default Roster;

