import { Application } from 'express';
import request from 'supertest';
import app from '../server';

describe('Contact Form API', () => {
  let serverApp: Application;

  beforeAll(() => {
    serverApp = app;
  });

  it('should submit contact form successfully', async () => {
    const response = await request(serverApp)
      .post('/api/contact')
      .send({
        name: 'John Doe',
        email: 'john.doe@example.com',
        message: 'This is a test message.',
      });

    expect(response.statusCode).toBe(200);
    expect(response.body.message).toBe('Contact form submitted successfully!');
  });

  it('should return 400 if name is missing', async () => {
    const response = await request(serverApp)
      .post('/api/contact')
      .send({
        email: 'john.doe@example.com',
        message: 'This is a test message.',
      });

    expect(response.statusCode).toBe(400);
    expect(response.body.error).toBe('Invalid input. All fields are required.');
  });

  it('should return 400 if email is missing', async () => {
    const response = await request(serverApp)
      .post('/api/contact')
      .send({
        name: 'John Doe',
        message: 'This is a test message.',
      });

    expect(response.statusCode).toBe(400);
    expect(response.body.error).toBe('Invalid input. All fields are required.');
  });

  it('should return 400 if message is missing', async () => {
    const response = await request(serverApp)
      .post('/api/contact')
      .send({
        name: 'John Doe',
        email: 'john.doe@example.com',
      });

    expect(response.statusCode).toBe(400);
    expect(response.body.error).toBe('Invalid input. All fields are required.');
  });
});
