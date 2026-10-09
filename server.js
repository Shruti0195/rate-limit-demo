const express = require('express');
const rateLimit = require('express-rate-limit');

const app = express();
app.use(express.json());

// ---------- General limiter (applied to all /api/ routes) ----------
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100,                 // limit each IP to 100 requests per window
  standardHeaders: true,    // adds RateLimit-* headers to the response
  legacyHeaders: false,     // disables the older X-RateLimit-* headers
  skip: (req) => req.originalUrl === '/api/health' || req.originalUrl === '/api/login', // health check and login are excluded here; login has its own limiter below. (req.originalUrl is used instead of req.path, since Express strips the '/api' mount prefix from req.path inside this middleware.)
  message: { error: 'Too many requests, please try again later.' }
});

app.use('/api/', limiter);

// ---------- Stricter limiter, specifically for login ----------
const loginLimiter = rateLimit({
  windowMs: 10 * 60 * 1000, // 10 minutes
  max: 5,                   // only 5 login attempts per window
  standardHeaders: true,
  legacyHeaders: false,
  keyGenerator: (req) => req.body.email || req.ip, // limit per account, not just per IP
  handler: (req, res) => {
    res.status(429).json({ error: 'Too many login attempts. Try again later.' });
  }
});

// ---------- Routes ----------
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok' });
});

app.get('/api/data', (req, res) => {
  res.json({ message: 'Request successful', timestamp: new Date() });
});

app.post('/api/login', loginLimiter, (req, res) => {
  res.json({ message: 'Login endpoint reached' });
});

const PORT = 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));