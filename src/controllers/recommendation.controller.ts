import pool from '../db';

export const createRecommendation = async (req: any, res: any) => {
  try {
    const { user_id, title, caption, category } = req.body;
    const created_at = new Date();

    const query = `
      INSERT INTO recommendations (user_id, title, caption, category, created_at)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING *;
    `;
    const values = [user_id, title, caption, category, created_at];

    const result = await pool.query(query, values);

    return res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error('Error creating recommendation:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
};
