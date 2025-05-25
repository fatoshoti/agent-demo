import express from 'express';
import cors from 'cors';
import contactRoutes from './routes/contactRoutes';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.use('/api', contactRoutes);

app.get('/', (req, res) => {
  res.send('Morning Brew Backend API is running!');
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

export default app;
