import express from 'express';

const app = express();
const PORT = 3000;

app.use(express.json());

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

app.listen(3000, () => console.log(`Server is up and running on port 3000`));

export default app;