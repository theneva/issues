import express from 'express';
import api from './api';

const app = express();

app.get('/hello', (req, res) => {
  res.send('hello');
});

app.use('/api', api);

app.listen(1234, () => console.log('http://localhost:1234'));
