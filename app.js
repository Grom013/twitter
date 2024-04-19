// import express from 'express';
// import pkg from 'pg';

// const { Pool } = pkg;
// const app = express();
// const port = 3000;

// app.use((req, res, next) => {
//   res.header('Access-Control-Allow-Origin', '*');
//   res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
//   next();
// });

// const pool = new Pool({
// user: 'twitter_production_tj6f_user',
// host: 'dpg-co6qgumv3ddc73c79nr0-a.oregon-postgres.render.com',
// database: 'twitter_production_tj6f',
// password: 'tAlg5YJAHimpM9tZNiUM5J0hnTkCAfYa',
// port: 5432,
// ssl: true,
// });

// let topicsData = [];
// let lastMessagesData = [];

// app.get('/topics.json', (req, res) => {
//   pool.query('SELECT * FROM topics', (err, result) => {
//     if (err) {
//       console.error('Ошибка выполнения запроса', err);
//       res.status(500).json({ error: 'Произошла ошибка при получении данных' });
//     } else {
//       topicsData = result.rows;
//       res.json(topicsData);
//     }
//   });
// });

// app.get('/lastMessages.json', (req, res) => {
//   pool.query('SELECT * FROM lastMessages', (err, result) => {
//     if (err) {
//       console.error('Ошибка выполнения запроса', err);
//       res.status(500).json({ error: 'Произошла ошибка при получении данных' });
//     } else {
//       lastMessagesData = result.rows;
//       res.json(lastMessagesData);
//     }
//   });
// });

// app.get('/blogs.json', async (req, res) => {
//   try {
//     const { rows } = await pool.query('SELECT * FROM blogs');
//     res.json(rows);
//   } catch (error) {
//     console.error('Ошибка выполнения запроса', error);
//     res.status(500).json({ error: 'Произошла ошибка при получении данных' });
//   }
// });

// app.listen(port, () => {
//   console.log(`Сервер запущен на порту ${port}`);
// });
import express from 'express';
import pkg from 'pg';

const { Client } = pkg;

const app = express();

// Параметры подключения к базе данных
const client = new Client({
  user: 'twitter_production_tj6f_user',
  host: 'dpg-co6qgumv3ddc73c79nr0-a.oregon-postgres.render.com',
  database: 'twitter_production_tj6f',
  password: 'tAlg5YJAHimpM9tZNiUM5J0hnTkCAfYa',
  port: 5432,
  ssl: true,
});

// Маршрут для получения данных
app.get('/topics.json', async (req, res) => {
  try {
    await client.connect();
    const result = await client.query('SELECT * FROM topics');
    res.json(result.rows);
  } catch (err) {
    console.error('Ошибка при выполнении запроса:', err);
    res.status(500).json({ error: 'Ошибка при выполнении запроса' });
  } finally {
    await client.end();
  }
});

app.get('/lastMessages.json', async (req, res) => {
  try {
    await client.connect();
    const result = await client.query('SELECT * FROM lastMessages');
    res.json(result.rows);
  } catch (err) {
    console.error('Ошибка при выполнении запроса:', err);
    res.status(500).json({ error: 'Ошибка при выполнении запроса' });
  } finally {
    await client.end();
  }
});

app.get('/blogs.json', async (req, res) => {
  try {
    await client.connect();
    const result = await client.query('SELECT * FROM blogs');
    res.json(result.rows);
  } catch (err) {
    console.error('Ошибка при выполнении запроса:', err);
    res.status(500).json({ error: 'Ошибка при выполнении запроса' });
  } finally {
    await client.end();
  }
});

// Маршрут для отдачи HTML-страницы
app.get('/', (req, res) => {
  res.sendFile(`${__dirname}/index.html`);
});

// Запуск сервера
const PORT = process.env.PORT || 80;
app.listen(PORT, () => {
  console.log(`Сервер запущен на порту ${PORT}`);
});
