import dotenv from 'dotenv';
import express from 'express';
import collectionRoutes from './routes/collection.routes';
import collectionRecommendationRoutes from './routes/collectionRecommendation.routes';
import recommendationRoutes from './routes/recommendation.routes';
import userRoutes from './routes/user.routes';


dotenv.config();
const app = express();

app.use(express.json());

app.get('/', (_req, res) => {
  res.send('API is running 2 ...');
  console.log("API is running 2 final checks ✅")
});
app.use('/api/users', userRoutes);
app.use('/api/collections', collectionRoutes);
app.use('/api/recommendations', recommendationRoutes)
app.use('/api/collection_recommendations', collectionRecommendationRoutes)

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
