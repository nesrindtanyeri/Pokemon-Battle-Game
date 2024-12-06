import mongoose from 'mongoose';

const rosterSchema = new mongoose.Schema({
  id: { type: Number, required: true, unique: true, },
  name: { type: String, required: true },
  sprite: { type: String, required: true },
  stats: [
    {
      name: { type: String, required: true },
      base_stat: { type: Number, required: true }
    }
  ]
}, {
  toJSON: { virtuals: true }, 
  toObject: { virtuals: true } 
});

const Roster = mongoose.model('Roster', rosterSchema);

export default Roster;

