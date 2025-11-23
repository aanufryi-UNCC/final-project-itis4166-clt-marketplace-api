import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import morgan from 'morgan';

import authRoutes from './routes/authRoutes.js'
import userRoutes from './routes/userRoutes.js'
import itemRoutes from './routes/itemRoutes.js'
import categoryRoutes from './routes/categoryRoutes.js'
import orderRoutes from './routes/orderRoutes.js'
import reviewRoutes  from './routes/reviewRoutes.js';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(morgan('dev'));

//Test route to see if server starts
app.get('/api', (req, res) => {
    res.json({ message: 'Marketplace API running!' });
})

app.use('/api/auth', authRoutes);
app.use('/api/user', userRoutes);
app.use('/api/items', itemRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/orders', orderRoutes)
app.use('/api/reviews',  reviewRoutes);

app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

app.use((err, req, res, next) => {
  console.log(err.stack);
  if (!err.status) {
    err.status = 500;
    err.message = 'Internal Server Error';
  }
  res.status(err.status).json({ error: err.message });
});

app.listen(PORT, () => console.log(`Server is up and running on http://localhost:${PORT}/api`));

export default app;