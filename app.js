import express from 'express';
import fs from 'fs';
import path from 'path';

const app = express();
const port = 3000;

// Получаем абсолютный путь к файлу main.html
const htmlPath = path.join(__dirname, 'public', 'main.html');
const html = fs.readFileSync(htmlPath, 'utf8');

app.use(express.static('public'));

app.get('/', (req, res) => res.type('html').send(html));

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});