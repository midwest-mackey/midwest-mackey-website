import express from 'express';
import cors from 'cors';
import path from 'path';
import dotenv from 'dotenv';
import cookieParser from "cookie-parser";

import { fileURLToPath } from 'url';
import { initDb } from './db/database.js';
import { requireAuth } from './middleware/auth.middleware.js';
import { requireAdmin } from "./middleware/roles.middleware.js";



import twitchRoutes from './routes/twitch.routes.js';
import spotifyRoutes from './routes/spotify.routes.js';
import fortniteRoutes from './routes/fortnite.routes.js';
import ordersRoutes from './routes/orders.routes.js';
import adminOrdersRoutes from './routes/admin.orders.routes.js';
import adminRoutes from './routes/admin.routes.js';
import loginRoutes from './routes/auth.routes.js';
import protectedRoutes from './routes/protected.routes.js'


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express();

dotenv.config();


const allowedOrigins = [
  // local development
  "http://localhost:4200",
  "http://192.168.1.165:4200",

  // production sites
  "https://midwestmackey.com",
  "https://eggs.midwestmackey.com"
];

const corsOptions = {
  origin(origin, callback) {
    if (!origin) {
      return callback(null, true);
    }

    if (allowedOrigins.includes(origin)) {
      return callback(null, true);
    }

    console.log("❌ Blocked CORS:", origin);
    return callback(new Error(`Blocked by CORS: ${origin}`));
  },

  credentials: true,

  methods: [
    "GET",
    "POST",
    "PUT",
    "PATCH",
    "DELETE",
    "OPTIONS"
  ],

  allowedHeaders: [
    "Content-Type",
    "Authorization"
  ]
};

app.use(cors(corsOptions));
app.options("*", cors(corsOptions));
app.use(cookieParser());
app.use(express.json());

let isReady = false;

// Routes
app.use('/twitch', twitchRoutes);
app.use('/spotify', spotifyRoutes);
app.use('/fortnite', fortniteRoutes);
app.use('/orders', ordersRoutes);
app.use('/admin/orders', adminOrdersRoutes);
app.use('/admin', adminRoutes);
app.use('/auth', loginRoutes);
app.use("/api", requireAuth, protectedRoutes);


// Static
app.use('/images', express.static(path.join(__dirname, '../public/images')));

// Health check (Dockpeek uses this)
app.get('/health', (req, res) => {
  if (!isReady) {
    return res.status(503).json({ status: 'starting' });
  }

  res.json({
    status: 'ok',
    uptime: process.uptime(),
    timestamp: Date.now()
  });
});

const PORT = process.env.PORT || 3000;

async function start() {
  try {
    // 1. Initialize DB first
    await initDb();

    // 2. Start server only AFTER DB is ready
    app.listen(PORT, '0.0.0.0', () => {
      console.log(`✅ Backend API running on port ${PORT}`);
      console.log(`📁 Static images path ready`);

      isReady = true;
    });

  } catch (err) {
    console.error('❌ Failed to start server:', err);
    process.exit(1);
  }
}

start();