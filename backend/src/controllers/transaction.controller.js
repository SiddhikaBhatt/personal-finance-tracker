import { pool } from '../config/db.js';
import { redis } from '../config/redis.js';

export const createTransaction = async (req, res) => {
  try {
    const { type, amount, category, description, date } = req.body;

    const result = await pool.query(
      `INSERT INTO transactions (user_id, type, amount, category, description, date)
       VALUES ($1, $2, $3, $4, $5, $6)
       RETURNING *`,
      [req.user.id, type, amount, category, description, date]
    );

    await redis.del(`transactions:${req.user.id}`);

    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to create transaction' });
  }
};

export const getTransactions = async (req, res) => {
  try {
    const cacheKey = `transactions:${req.user.id}`;

    const cached = await redis.get(cacheKey);
    if (cached) {
      return res.json(JSON.parse(cached));
    }

    const result = await pool.query(
      `SELECT * FROM transactions
       WHERE user_id = $1
       ORDER BY date DESC`,
      [req.user.id]
    );

    await redis.set(cacheKey, JSON.stringify(result.rows), 'EX', 60);

    res.json(result.rows);
  } catch (error) {
  console.error('TRANSACTION FETCH ERROR:', error);
  res.status(500).json({ message: error.message });
}
};
