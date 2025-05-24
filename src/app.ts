import express, { Request, Response, NextFunction } from 'express';
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
app.get('/healthz', (req: Request, res: Response) => {
  res.status(200).send('OK');
});

// Centralized error handling middleware
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
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
  (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, message } = req.body;

    logger.info('Received contact form submission:', { name, email, message });

    res.status(200).json({ message: 'Form submitted successfully' });
  }
);

app.listen(port, () => {
  logger.info(`Server is running on port ${port}`);
});