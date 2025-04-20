import { Request, Response } from 'express';
import pool from '../db';

export const createUser = async (req: Request, res: Response) => {
  const { fname, sname, profile_picture, bio, created_at } = req.body;
  try {
    const result = await pool.query(
      `INSERT INTO users (fname, sname, profile_picture, bio, created_at)
       VALUES ($1, $2, $3, $4, $5) RETURNING *`,
      [fname, sname, profile_picture, bio, created_at]
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error creating user' });
  }
};

export const getUsers = async (_req: Request, res: Response) => {
  try {
    const result = await pool.query(`SELECT * FROM users`);
    res.json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching users' });
  }
};
