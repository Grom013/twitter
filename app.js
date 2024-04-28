import express from 'express';
import pkg from 'pg';

const { Pool } = pkg;
const app = express();
const port = process.env.PORT || 3000;

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

app.get('/topics.json', (req, res) => {
  pool.query('SELECT * FROM topics', (err, result) => {
    if (err) {
      console.error('Ошибка выполнения запроса', err);
      res.status(500).json({ error: 'Произошлa ошибка при получении данных' });
    } else {
      const topicsData = result.rows;
      res.json(topicsData);
    }
  });
});

app.get('/lastMessages.json', (req, res) => {
  pool.query('SELECT * FROM lastMessages', (err, result) => {
    if (err) {
      console.error('Ошибка выполнения запроса', err);
    } else {
      const lastMessagesData = result.rows; // Объявляем переменную с помощью const
      res.json(lastMessagesData);
    }
  });
});

app.get('/blogs.json', (req, res) => {
  pool.query('SELECT * FROM blogs', (err, result) => {
    if (err) {
      console.error('Ошибка выполнения запроса', err);
    } else {
      const blogsData = result.rows; // Объявляем переменную с помощью const
      res.json(blogsData);
    }
  });
});

app.delete('/lastMessages/:id.json', (req, res) => {
  const messageId = req.params.id;

  pool.query('DELETE FROM lastMessages WHERE id = $1', [messageId], (err, result) => {
    if (err) {
      console.error('Ошибка выполнения запроса', err);
      res.status(500).json({ error: 'Произошла ошибка при удалении сообщения' });
    } else {
      res.json({ message: 'Сообщение успешно удалено' });
    }
  });
});

app.post('/lastMessages.json', (req, res) => {
  const { message } = req.body; 

  pool.query('INSERT INTO lastMessages (message) VALUES ($1)', [message], (err, result) => {
    if (err) {
      console.error('Ошибка выполнения запроса', err);
      res.status(500).json({ error: 'Произошла ошибка при создании сообщения' });
    } else {
      res.status(201).json({ message: 'Сообщение успешно создано' });
    }
  });
});

app.delete('/lastMessages/:id.json', (req, res) => {
  const messageId = req.params.id;

  pool.query('DELETE FROM lastMessages WHERE id = $1', [messageId], (err, result) => {
    if (err) {
      console.error('Ошибка выполнения запроса', err);
      res.status(500).json({ error: 'Произошла ошибка при удалении сообщения' });
    } else {
      res.json({ message: 'Сообщение успешно удалено' });
    }
  });
});

app.post('/lastMessages.json', (req, res) => {
  const { message } = req.body; 

  pool.query('INSERT INTO lastMessages (message) VALUES ($1)', [message], (err, result) => {
    if (err) {
      console.error('Ошибка выполнения запроса', err);
      res.status(500).json({ error: 'Произошла ошибка при создании сообщения' });
    } else {
      res.status(201).json({ message: 'Сообщение успешно создано' });
    }
  });
});

app.post('/lastMessages/:id.json', (req, res) => {
  const messageId = req.params.id;
  const { message } = req.body; // Предполагается, что вы отправляете тело запроса с обновленными данными сообщения

  pool.query('UPDATE lastMessages SET message = $1 WHERE id = $2', [message, messageId], (err, result) => {
    if (err) {
      console.error('Ошибка выполнения запроса', err);
      res.status(500).json({ error: 'Произошла ошибка при редактировании сообщения' });
    } else {
      res.json({ message: 'Сообщение успешно отредактировано' });
    }
  });
});

app.listen(port, () => {
  console.log(`Сервер запущен на порту ${port}`);
});
