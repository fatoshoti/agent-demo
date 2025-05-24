import request from 'supertest';
import express from 'express';
import bodyParser from 'body-parser';
import { body, validationResult } from 'express-validator';
import winston from 'winston';
import * as dotenv from 'dotenv';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

// Configure Winston logger
const logger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  defaultMeta: { service: 'contact-form-api' },
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: 'error.log', level: 'error' }),
    new winston.transports.File({ filename: 'combined.log' }),
  ],
});

app.use(bodyParser.json());

// Healthcheck endpoint
app.get('/healthz', (req, res) => {
  res.status(200).send('OK');
});

// Centralized error handling middleware
app.use((err, req, res, next) => {
  logger.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

// Contact form submission endpoint
app.post(
  '/api/contact',
  [
    // Validate request body
    body('name').trim().notEmpty().withMessage('Name is required'),
    body('email').isEmail().withMessage('Invalid email address'),
    body('message').trim().notEmpty().withMessage('Message is required'),
  ],
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, message } = req.body;

    logger.info('Received contact form submission:', { name, email, message });

    res.status(200).json({ message: 'Form submitted successfully' });
  }
);

describe('API Endpoints', () => {
  it('should return 200 OK for /healthz endpoint', async () => {
    const response = await request(app).get('/healthz');
    expect(response.status).toBe(200);
    expect(response.text).toBe('OK');
  });

  it('should return 200 OK for valid contact form submission', async () => {
    const response = await request(app)
      .post('/api/contact')
      .send({
        name: 'Test Name',
        email: 'test@example.com',
        message: 'Test Message',
      });
    expect(response.status).toBe(200);
    expect(response.body.message).toBe('Form submitted successfully');
  });

  it('should return 400 Bad Request for invalid contact form submission', async () => {
    const response = await request(app)
      .post('/api/contact')
      .send({
        name: '',
        email: 'invalid-email',
        message: '',
      });
    expect(response.status).toBe(400);
    expect(response.body.errors).toBeDefined();
  });
});