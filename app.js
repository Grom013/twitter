import express from 'express';
import cors from 'cors';
// import fs from 'fs';

const app = express();
const port = 3000;

// const html = fs.readFileSync('public/main.html', 'utf8');

app.use(express.static('public'));
app.use(cors());

app.get('/posts', (req, res) => {
  res.type('json').send({ posts: [{ id: 1, message: 'hello' }, { id: 2, message: 'hello2' }] });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
