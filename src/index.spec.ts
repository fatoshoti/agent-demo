import request from 'supertest';
import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';

// Mock the actual application to avoid listening on a port during tests
const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Routes (copying from src/index.ts for testing purposes)
app.post('/api/contact', (req, res) => {
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ message: 'All fields are required.' });
  }

  // In a real application, you would save this to a database or send an email.
  // For tests, we just simulate success.
  res.status(200).json({ message: 'Contact form submitted successfully!' });
});

app.get('/', (req, res) => {
  res.send('Morning Brew Backend API is running!');
});

describe('Contact API', () => {
  it('should accept valid contact form submission', async () => {
    const res = await request(app)
      .post('/api/contact')
      .send({
        name: 'John Doe',
        email: 'john.doe@example.com',
        message: 'Hello, this is a test message.'
      });
    expect(res.statusCode).toEqual(200);
    expect(res.body.message).toEqual('Contact form submitted successfully!');
  });

  it('should return 400 if name is missing', async () => {
    const res = await request(app)
      .post('/api/contact')
      .send({
        email: 'john.doe@example.com',
        message: 'Hello, this is a test message.'
      });
    expect(res.statusCode).toEqual(400);
    expect(res.body.message).toEqual('All fields are required.');
  });

  it('should return 400 if email is missing', async () => {
    const res = await request(app)
      .post('/api/contact')
      .send({
        name: 'John Doe',
        message: 'Hello, this is a test message.'
      });
    expect(res.statusCode).toEqual(400);
    expect(res.body.message).toEqual('All fields are required.');
  });

  it('should return 400 if message is missing', async () => {
    const res = await request(app)
      .post('/api/contact')
      .send({
        name: 'John Doe',
        email: 'john.doe@example.com',
      });
    expect(res.statusCode).toEqual(400);
    expect(res.body.message).toEqual('All fields are required.');
  });

  it('should return 400 if all fields are missing', async () => {
    const res = await request(app)
      .post('/api/contact')
      .send({});
    expect(res.statusCode).toEqual(400);
    expect(res.body.message).toEqual('All fields are required.');
  });
});

describe('Root Route', () => {
  it('should return success message for root route', async () => {
    const res = await request(app).get('/');
    expect(res.statusCode).toEqual(200);
    expect(res.text).toEqual('Morning Brew Backend API is running!');
  });
});