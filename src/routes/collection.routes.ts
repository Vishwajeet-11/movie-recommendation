import express from 'express';
import { createCollection, getCollections } from '../controllers/collection.controller';

const router = express.Router();

router.post('/', createCollection);
router.get('/', getCollections);

export default router;
