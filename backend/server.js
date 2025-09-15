import express from 'express';
import helmet from 'helmet';
import morgan from 'morgan';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json()); // parse incoming JSON requests
app.use(cors()); 
app.use(helmet()); // helmet helps to secure Express apps by setting various HTTP headers
app.use(morgan('dev')); // morgan is HTTP request logger middleware for node.js

app.get('/', (req, res) => {
  console.log(res.getHeaders());
  res.send('Hello World!');
});

app.listen(PORT, () => {
  console.log('Server has started on port ' + PORT);
});