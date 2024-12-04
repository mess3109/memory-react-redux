"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv = __importStar(require("dotenv"));
const image_1 = __importDefault(require("./routes/image"));
const artist_1 = __importDefault(require("./routes/artist"));
// const { createProxyMiddleware } = require('http-proxy-middleware');
dotenv.config();
const app = (0, express_1.default)();
const port = process.env.API_PORT || 3001;
app.use(express_1.default.json());
app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', '*');
    next();
});
app.use('/images', image_1.default);
app.use('/artists', artist_1.default);
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
