import request from 'supertest';
import express from 'express';
import contactRoutes from '../routes/contactRoutes';
import { submitContactForm } from '../controllers/contactController';

// Mock the logger to prevent actual file writes during tests
jest.mock('../utils/logger', () => ({
  info: jest.fn(),
  error: jest.fn(),
  warn: jest.fn(),
}));

const app = express();
app.use(express.json());
app.use('/api', contactRoutes);

describe('POST /api/contact', () => {
  it('should return 200 and success message for valid contact form data', async () => {
    const response = await request(app)
      .post('/api/contact')
      .send({
        name: 'John Doe',
        email: 'john.doe@example.com',
        subject: 'Inquiry',
        message: 'This is a test message.',
      });

    expect(response.statusCode).toEqual(200);
    expect(response.body).toEqual({
      status: 'success',
      message: 'Contact form submitted successfully!',
    });
  });

  it('should return 400 and validation errors for invalid contact form data (missing fields)', async () => {
    const response = await request(app)
      .post('/api/contact')
      .send({
        name: '',
        email: 'invalid-email',
        subject: '',
        message: 'This is a test message.',
      });

    expect(response.statusCode).toEqual(400);
    expect(response.body.status).toEqual('error');
    expect(response.body.message).toEqual('Validation failed');
    expect(response.body.errors).toBeInstanceOf(Array);
    expect(response.body.errors.length).toBeGreaterThan(0);
    expect(response.body.errors).toContainEqual(expect.objectContaining({ msg: 'Name is required' }));
    expect(response.body.errors).toContainEqual(expect.objectContaining({ msg: 'Valid email is required' }));
    expect(response.body.errors).toContainEqual(expect.objectContaining({ msg: 'Subject is required' }));
  });

  it('should return 400 and validation errors for invalid email format', async () => {
    const response = await request(app)
      .post('/api/contact')
      .send({
        name: 'John Doe',
        email: 'invalid-email',
        subject: 'Inquiry',
        message: 'This is a test message.',
      });

    expect(response.statusCode).toEqual(400);
    expect(response.body.errors).toContainEqual(expect.objectContaining({ msg: 'Valid email is required' }));
  });
});
