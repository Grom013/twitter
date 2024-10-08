import express from 'express';
import pkg from 'pg';
import cors from 'cors';
import bcrypt from 'bcrypt';
import crypto from 'crypto';
import cookieParser from 'cookie-parser';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const { Pool } = pkg;
const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(cookieParser());
app.use(express.json());
app.use(express.static('public'));

const pool = new Pool({
  user: 'dbname_c3b7_user',
  host: 'dpg-cre0073v2p9s73co1dq0-a.oregon-postgres.render.com',
  database: 'dbname_c3b7',
  password: 'pGOCtowGGmLo6S59wacVDO2FAJHS5hXo',
  port: 5432,
  ssl: true,
});

app.get('/posts', (req, res) => {
  pool.query('SELECT * FROM posts', (err, result) => {
    if (err) {
      console.error('Ошибка выполнения запроса', err);
      return res.status(500).json({ error: 'Произошла ошибка при получении сообщений' });
    }
    res.json(result.rows);
  });
});

app.post('/posts', async (req, res) => {
  const { message, imgUrl } = req.body; // Извлечение данных из тела запроса

  try {
    // Вставка данных в таблицу
    const result = await pool.query(
      'INSERT INTO posts (message, img_url) VALUES ($1, $2) RETURNING *',
      [message, imgUrl],
    );

    // Отправка ответа клиенту
    res.status(201).json({
      message: 'Сообщение успешно создано',
      post: result.rows[0], // Возвращаем созданное сообщение
    });
  } catch (err) {
    console.error('Ошибка выполнения запроса', err);
    res.status(500).json({ error: 'Произошла ошибка при создании сообщения' });
  }
});

app.post('/createUser', async (req, res) => {
  const { email, password } = req.body;

  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    pool.query('INSERT INTO users (email, password) VALUES ($1, $2)', [email, hashedPassword], (err, result) => {
      if (err) {
        console.error('Ошибка выполнения запроса', err);
        return res.status(500).json({ error: 'Произошла ошибка при создании пользователя' });
      }
      res.status(201).json({ message: 'Пользователь успешно создан' });
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
      const passwordMatch = await bcrypt.compare(password, user.password);

      if (passwordMatch) {
        const token = crypto.randomUUID();

        await pool.query('DELETE FROM sessions WHERE user_id = $1', [user.id]);

        await pool.query('INSERT INTO sessions (user_id, token) VALUES ($1, $2)', [user.id, token]);

        res.cookie('token', token, { httpOnly: true });
        res.cookie('email', email, { httpOnly: true });

        return res.status(200).json({ message: 'Успешная аутентификация', email, token });
      }
      return res.status(401).json({ error: 'Неверный пароль' });
    }
    return res.status(404).json({ error: 'Пользователь с таким email не найден' });
  } catch (err) {
    console.error('Ошибка при проверке пользователя:', err.message);
    res.status(500).json({ error: 'Произошла ошибка при проверке пользователя' });
  }
});

async function isValidToken(token) {
  try {
    const result = await pool.query('SELECT created_at FROM sessions WHERE token = $1', [token]);

    if (result.rows.length === 0) {
      return false;
    }

    const { created_at } = result.rows[0];
    const createdAt = new Date(created_at);

    const tokenValidityPeriod = 10800000 + 15000;
    const now = new Date();
    const tokenExpiry = new Date(createdAt.getTime() + tokenValidityPeriod);

    return now <= tokenExpiry;
  } catch (error) {
    console.error('Ошибка при проверке действительности токена:', error);
    return false;
  }
}

// app.get('/feed', async (req, res) => {
//   const { token } = req.cookies;

//   if (!token || !(await isValidToken(token))) {
//     res.clearCookie('token');
//     res.clearCookie('email');
//     return res.redirect('/');
//   }
//   res.sendFile(path.join(__dirname, 'public', 'index.html'));
// });

// app.get('*', (req, res) => {
//   res.sendFile(path.join(__dirname, 'public', 'index.html'));
// });

app.listen(port, () => {
  console.log(`Сервер запущен на порту ${port}`);
});

// app.delete('/lastMessages/:id.json', (req, res) => {
//   const messageId = req.params.id;

//   pool.query('DELETE FROM lastMessages WHERE id = $1', [messageId], (err, result) => {
//     if (err) {
//       console.error('Ошибка выполнения запроса', err);
//       res.status(500).json({ error: 'Произошла ошибка при удалении сообщения' });
//     } else {
//       res.json({ message: 'Сообщение успешно удалено' });
//     }
//   });
// });

// app.delete('/lastMessages/:id.json', (req, res) => {
//   const messageId = req.params.id;

//   pool.query('DELETE FROM lastMessages WHERE id = $1', [messageId], (err, result) => {
//     if (err) {
//       console.error('Ошибка выполнения запроса', err);
//       res.status(500).json({ error: 'Произошла ошибка при удалении сообщения' });
//     } else {
//       res.json({ message: 'Сообщение успешно удалено' });
//     }
//   });
// });

// app.post('/lastMessages/:id.json', (req, res) => {
//   const messageId = req.params.id;
//   const { message } = req.body;

//   pool.query('UPDATE lastMessages SET message = $1 WHERE id = $2', [message, messageId], (err, result) => {
//     if (err) {
//       console.error('Ошибка выполнения запроса', err);
//       res.status(500).json({ error: 'Произошла ошибка при редактировании сообщения' });
//     } else {
//       res.json({ message: 'Сообщение успешно отредактировано' });
//     }
//   });
// });

// app.get('/blogs.json', (req, res) => {
//   pool.query('SELECT * FROM blogs', (err, result) => {
//     if (err) {
//       console.error('Ошибка выполнения запроса', err);
//     } else {
//       const blogsData = result.rows;
//       res.json(blogsData);
//     }
//   });
// });

// app.get('/topics.json', (req, res) => {
//   pool.query('SELECT * FROM topics', (err, result) => {
//     if (err) {
//       console.error('Ошибка выполнения запроса', err);
//       res.status(500).json({ error: 'Произошлa ошибка при получении данных' });
//     } else {
//       const topicsData = result.rows;
//       res.json(topicsData);
//     }
//   });
// });
