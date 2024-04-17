import express from 'express';
import pkg from 'pg';

const { Pool } = pkg;

const app = express();
const port = 3000;

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*'); // Разрешить доступ с любых источников
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
let lastMessagesData = [];
let blogsData = [];
let topicsData = [];

app.get('/topics.json', (req, res) => {
  pool.query('SELECT * FROM topics', (err, result) => {
    if (err) {
      console.error('Ошибка выполнения запроса', err);
      res.status(500).json({ error: 'Произошла ошибка при получении данных' });
    } else {
      topicsData = result.rows;
      res.json(topicsData); // Отправляем просто массив данных без оборачивания в объект
    }
  });
});

app.get('/lastMessages.json', (req, res) => {
  pool.query('SELECT * FROM lastMessages', (err, result) => {
    if (err) {
      console.error('Ошибка выполнения запроса', err);
    } else {
      lastMessagesData = result.rows;
      res.json(lastMessagesData);
    }
  });
});

app.get('/blogs.json', (req, res) => {
  pool.query('SELECT * FROM blogs', (err, result) => {
    if (err) {
      console.error('Ошибка выполнения запроса', err);
    } else {
      blogsData = result.rows;
      res.json(blogsData);
    }
  });
});

app.listen(port, () => {
  console.log(`Сервер запущен на порту ${port}`);
});
