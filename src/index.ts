import express, { Express } from "express";
import * as dotenv from 'dotenv';
import artistRouter from './routes/artist'
import gameRouter from './routes/game'
const path = require('path');

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3001;

app.use(express.json())

app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', '*');

  next();
});

app.use('/api/artists', artistRouter)
app.use('/api/games', gameRouter)


if (process.env.NODE_ENV === "production") {
  app.use(express.static('client/build'));
  app.get("*", (req, res, next) => {
    res.sendFile(path.join(__dirname, './client/build/index.html'));
  });
}

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
