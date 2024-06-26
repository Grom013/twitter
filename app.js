import express from 'express';
import pkg from 'pg';
import cors from 'cors';
import bcrypt from 'bcrypt';
import crypto from 'crypto';
import cookieParser from 'cookie-parser';

const { Pool } = pkg;
const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(cookieParser());
app.use(express.json());

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
      const lastMessagesData = result.rows;
      res.json(lastMessagesData);
    }
  });
});

app.get('/blogs.json', (req, res) => {
  pool.query('SELECT * FROM blogs', (err, result) => {
    if (err) {
      console.error('Ошибка выполнения запроса', err);
    } else {
      const blogsData = result.rows;
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

app.post('/lastMessages/:id.json', (req, res) => {
  const messageId = req.params.id;
  const { message } = req.body;

  pool.query('UPDATE lastMessages SET message = $1 WHERE id = $2', [message, messageId], (err, result) => {
    if (err) {
      console.error('Ошибка выполнения запроса', err);
      res.status(500).json({ error: 'Произошла ошибка при редактировании сообщения' });
    } else {
      res.json({ message: 'Сообщение успешно отредактировано' });
    }
  });
});

app.post('/createUser', async (req, res) => {
  const { email, password } = req.body;

  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    pool.query('INSERT INTO users (email, password) VALUES ($1, $2)', [email, hashedPassword], (err, result) => {
      if (err) {
        console.error('Ошибка выполнения запроса', err);
        res.status(500).json({ error: 'Произошла ошибка при создании пользователя' });
      } else {
        res.status(201).json({ message: 'Пользователь успешно создан' });
      }
    });
  } catch (error) {
    console.error('Ошибка при хешировании пароля:', error);
    res.status(500).json({ error: 'Произошла ошибка при создании пользователя' });
  }
});

app.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const result = await pool.query('SELECT * FROM users WHERE email = $1', [email]);

    if (result.rows.length > 0) {
      const user = result.rows[0];

      if (user.password === password) {
        const token = crypto.randomUUID();

        await pool.query('INSERT INTO sessions (email, token) VALUES ($1, $2)', [email, token]);

        res.cookie('token', token, { httpOnly: true, secure: true, maxAge: 3600000 });
        res.cookie('email', email, { httpOnly: true, secure: true, maxAge: 3600000 });

        res.status(200).json({ message: 'Успешная аутентификация' });
      } else {
        res.status(401).json({ error: 'Неверный пароль' });
      }
    } else {
      res.status(404).json({ error: 'Пользователь с таким email не найден' });
    }
  } catch (err) {
    console.error('Ошибка выполнения запроса', err);
    res.status(500).json({ error: 'Произошла ошибка при проверке пользователя' });
  }
});

app.listen(port, () => {
  console.log(`Сервер запущен на порту ${port}`);
});
