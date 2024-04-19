import express from 'express';
import pkg from 'pg';

const { Pool } = pkg;
const app = express();
const port = process.env.PORT || 3000; // process.env.PORT должен быть в верхнем регистре

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

app.get('/topics', (req, res) => {
  pool.query('SELECT * FROM topics', (err, result) => {
    if (err) {
      console.error('Ошибка выполнения запроса', err);
      res.status(500).json({ error: 'Произошла ошибка при получении данных' });
    } else {
      res.sendFile('/path/to/topics.json'); // Отправляем файл напрямую
    }
  });
});

app.get('/lastMessages', (req, res) => {
  pool.query('SELECT * FROM lastMessages', (err, result) => {
    if (err) {
      console.error('Ошибка выполнения запроса', err);
      res.status(500).json({ error: 'Произошла ошибка при получении данных' });
    } else {
      res.sendFile('/path/to/lastMessages.json'); // Отправляем файл напрямую
    }
  });
});

app.get('/blogs', async (req, res) => {
  try {
    const { rows } = await pool.query('SELECT * FROM blogs');
    res.json(rows); // Отправляем данные как JSON
  } catch (error) {
    console.error('Ошибка выполнения запроса', error);
    res.status(500).json({ error: 'Произошла ошибка при получении данных' });
  }
});

app.listen(port, () => {
  console.log(`Сервер запущен на порту ${port}`);
});
