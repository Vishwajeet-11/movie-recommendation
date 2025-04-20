import express from 'express';
import { createRecommendation } from '../controllers/recommendation.controller';

const router = express.Router();

router.post('/', createRecommendation);

export default router;
