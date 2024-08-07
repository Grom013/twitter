import express from 'express';
import pkg from 'pg';
import cors from 'cors';
import bcrypt from 'bcrypt';
import crypto from 'crypto';
import cookieParser from 'cookie-parser';

const { Pool } = pkg;
const app = express();
const port = process.env.PORT || 3000;

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});
app.use(cors());
app.use(cookieParser());
app.use(express.json());

const pool = new Pool({
  user: 'twitter_production1_igfd_user',
  host: 'dpg-cqpo08qj1k6c73dtts1g-a.oregon-postgres.render.com',
  database: 'twitter_production1_igfd',
  password: 'ysJVTGc53FoH8iY5qVAFnBNmVh3VMZmS',
  port: 5432,
  ssl: true,
});

app.use(express.json());
app.use(express.static('public')); // делает возможным чтобы браузер мог обращаться к файлам которые лежат в папке public с помощью http запроса

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

// app.get('/lastMessages.json', (req, res) => {
//   pool.query('SELECT * FROM lastMessages', (err, result) => {
//     if (err) {
//       console.error('Ошибка выполнения запроса', err);
//     } else {
//       const lastMessagesData = result.rows;
//       res.json(lastMessagesData);
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

// app.post('/lastMessages.json', (req, res) => {
//   const { message } = req.body;

//   pool.query('INSERT INTO lastMessages (message) VALUES ($1)', [message], (err, result) => {
//     if (err) {
//       console.error('Ошибка выполнения запроса', err);
//       res.status(500).json({ error: 'Произошла ошибка при создании сообщения' });
//     } else {
//       res.status(201).json({ message: 'Сообщение успешно создано' });
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
      const passwordMatch = await bcrypt.compare(password, user.password);

      if (passwordMatch) {
        const token = crypto.randomUUID();

        await pool.query('DELETE FROM sessions WHERE user_id = $1', [user.id]);

        await pool.query('INSERT INTO sessions (user_id, token) VALUES ($1, $2)', [user.id, token]);

        res.cookie('token', token, { httpOnly: true });
        res.cookie('email', email, { httpOnly: true });

        res.status(200).json({ message: 'Успешная аутентификация', email, token });
      } else {
        res.status(401).json({ error: 'Неверный пароль' });
      }
    } else {
      res.status(404).json({ error: 'Пользователь с таким email не найден' });
    }
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

    const tokenValidityPeriod = 15000;

    const now = new Date();
    const tokenExpiry = new Date(createdAt.getTime() + tokenValidityPeriod);

    return now <= tokenExpiry;
  } catch (error) {
    console.error('Error checking token validity:', error);
    return false;
  }
}

// app.get('/', (req, res) => {
//   const { token } = req.cookies;

//   if (token) {
//     res.redirect('/feed');
//   } else {
//     res.send('Главная страница');
//   }
// });

app.get('/feed', async (req, res) => {
  const { token } = req.cookies;

  if (!token || !(await isValidToken(token))) {
    res.clearCookie('token');
    res.clearCookie('email');
    return res.redirect('/');
  }
  res.send('страница FEED');
});

app.listen(port, () => {
  console.log(`Сервер запущен на порту ${port}`);
});
