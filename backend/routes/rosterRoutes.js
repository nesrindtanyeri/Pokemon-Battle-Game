import express from 'express';
import { getTest, getRoster, addToRoster, removeFromRoster } from '../controllers/rosterController.js';

const router = express.Router();


router.get('/test', getTest);


router.get('/',  getRoster);


router.post('/',  addToRoster);


router.delete('/:id', removeFromRoster);

export default router;

