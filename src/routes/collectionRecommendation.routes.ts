import express from 'express';
import { addRecommendationToCollection, getRecommendationsByCollection } from '../controllers/collectionRecommendation.controller';

const router = express.Router();

router.post('/', addRecommendationToCollection);
router.get('/:collection_id', getRecommendationsByCollection);

export default router;
