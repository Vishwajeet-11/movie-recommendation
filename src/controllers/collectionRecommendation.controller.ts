import pool from '../db';

export const addRecommendationToCollection = async (req: any, res: any) => {
  try {
    const { collection_id, recommendation_id } = req.body;
    const created_at = new Date();

    const query = `
      INSERT INTO collection_recommendation (collection_id, recommendation_id)
      VALUES ($1, $2)
      RETURNING *;
    `;
    const values = [collection_id, recommendation_id];

    const result = await pool.query(query, values);
    return res.status(201).json({
      success: true,
      message: 'Recommendation added to collection successfully.',
      data: result.rows[0],
    });
  } catch (error) {
    console.error('Error adding recommendation to collection:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to add recommendation to collection.',
      error,
    });
  }
};

export const getRecommendationsByCollection = async (req: any, res: any) => {
  try {
    const { collection_id } = req.params;

    const query = `
      SELECT r.* FROM recommendations r
      INNER JOIN collection_recommendation cr
      ON r.id = cr.recommendation_id
      WHERE cr.collection_id = $1;
    `;
    const values = [collection_id];

    const result = await pool.query(query, values);
    return res.status(200).json({
      success: true,
      data: result.rows,
    });
  } catch (error) {
    console.error('Error fetching recommendations:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to fetch recommendations for this collection.',
      error,
    });
  }
};
