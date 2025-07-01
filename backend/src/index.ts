import express from 'express';
import contactRoutes from './routes/contact';

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use('/api', contactRoutes);

if (process.env.NODE_ENV !== 'test') {
  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
}

export default app;
