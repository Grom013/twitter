import express from 'express';
import { Pool } from 'pg';

const app = express();
const port = 3000;

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

const pool = new Pool({
  user: 'twitter_production_tj6f_user',
  host: 'dpg-co6qgumv3ddc73c79nr0-a.oregon-postgres.render.com',
  database: 'twitter_production_tj6f',
  password: 'tAlg5YJAHimpM9tZNiUM5J0hnTkCAfYa',
  port: 5432,
  ssl: true,
});

app.get('/topics.json', async (req, res) => {
  try {
    const { rows } = await pool.query('SELECT * FROM topics');
    res.json(rows);
  } catch (error) {
    console.error('Ошибка выполнения запроса', error);
    res.status(500).json({ error: 'Произошла ошибка при получении данных' });
  }
});

app.get('/lastMessages.json', async (req, res) => {
  try {
    const { rows } = await pool.query('SELECT * FROM lastMessages');
    res.json(rows);
  } catch (error) {
    console.error('Ошибка выполнения запроса', error);
    res.status(500).json({ error: 'Произошла ошибка при получении данных' });
  }
});

app.get('/blogs.json', async (req, res) => {
  try {
    const { rows } = await pool.query('SELECT * FROM blogs');
    res.json(rows);
  } catch (error) {
    console.error('Ошибка выполнения запроса', error);
    res.status(500).json({ error: 'Произошла ошибка при получении данных' });
  }
});

app.listen(port, () => {
  console.log(`Сервер запущен на порту ${port}`);
});
