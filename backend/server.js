import express, { request } from 'express';
import helmet from 'helmet';
import morgan from 'morgan';
import cors from 'cors';
import dotenv from 'dotenv';

import productRoutes from './routes/productRoutes.js';
import { sql } from './config/db.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json()); // parse incoming JSON requests
app.use(cors()); 
app.use(helmet()); // helmet helps to secure Express apps by setting various HTTP headers
app.use(morgan('dev')); // morgan is HTTP request logger middleware for node.js

app.use(async (req, res, next) => {
    try {
        const decision = await aj.protect(req,{
            request:1
        })
        console.log('Arcjet decision:', decision);
        if (decision.isDenied()) {
            if(decision.reason.isRateLimited()) {
                res.status(429).json({ error: 'Too Many Requests' });
            } else if(decision.reason.isBot()) {
                res.status(403).json({ error: 'Bot access denied' });
            } else {
                res.status(403).json({ error: 'Forbidden' });
            }
            return;
        }

        // check for spoofed bots
        if(decision.results.some((result) => result.reason.isBot() && result.reason.isSpoofed())) {
            res.status(403).json({ error: 'Bot access denied' });
            return;
        }

        next();
    } catch (err) {
        console.log('Arcjet error:', err);
        next(err);
    }
});

// Routes

app.use('/api/products', productRoutes);


async function initDB() {
    try {
        await sql`
        CREATE TABLE IF NOT EXISTS products (
            id SERIAL PRIMARY KEY,
            name VARCHAR(100) NOT NULL,
            image VARCHAR(255) NOT NULL,
            price DECIMAL(10, 2) NOT NULL,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
        `;
    } catch (error) {
        console.error('Database connection failed:', error);
    }
}

initDB().then(() =>{
    app.listen(PORT, () => {
  console.log('Server has started on port ' + PORT);
});
}).catch((err) => {
    console.error('Failed to initialize database:', err);
});