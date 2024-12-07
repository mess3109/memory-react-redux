import express, { Express } from "express";
import * as dotenv from 'dotenv';
import imageRouter from './routes/image'
import artistRouter from './routes/artist'
import gameRouter from './routes/game'
// const { createProxyMiddleware } = require('http-proxy-middleware');

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3001;

app.use(express.json())

app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', '*');

  next();
});

app.use('/api/images', imageRouter)
app.use('/api/artists', artistRouter)
app.use('/api/games', gameRouter)

// app.use(
//   '/api',
//   createProxyMiddleware({
//     target: 'http://localhost:3000',
//     changeOrigin: true,
//     pathRewrite: function(path, req) {
//       return '/api'.concat(path)
//     }
//   })
// );
// Enable CORS for all methods

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
