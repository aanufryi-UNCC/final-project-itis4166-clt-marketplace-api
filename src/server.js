import express from 'express';
import morgan from 'morgan';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(morgan('dev'));

//Test route to see if server starts
app.get('/', (req, res) => {
    res.json({ message: 'Marketplace API running!' });
})

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

app.listen(PORT, () => console.log(`Server is up and running on http://localhost:${PORT}`));

export default app;