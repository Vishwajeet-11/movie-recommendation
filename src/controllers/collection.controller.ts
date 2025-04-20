import { Request, Response } from 'express';
import pool from '../db';

// Function to create a new collection
export const createCollection = async (req: any, res: any) => {
  const { user_id, title } = req.body;
  const created_at = new Date().toISOString(); // Timestamp for created_at

  try {
      // Validate the user_id exists in the users table
      const userExists = await pool.query('SELECT id FROM users WHERE id = $1', [user_id]);

      if (userExists.rowCount === 0) {
          return res.status(400).json({ message: 'User not found' });
      }

      // Insert new collection into the collections table
      const result = await pool.query(
          'INSERT INTO collections (user_id, title, created_at) VALUES ($1, $2, $3) RETURNING *',
          [user_id, title, created_at]
      );

      // Return the newly created collection
      res.status(201).json(result.rows[0]);
  } catch (error) {
      console.error('Error creating collection:', error);
      res.status(500).json({ message: 'Internal Server Error' });
  }
};


// Get all collections
export const getCollections = async (_req: Request, res: Response) => {
  try {
    const result = await pool.query(`SELECT * FROM collections`);
    res.json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching collections' });
  }
};
