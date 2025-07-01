import request from 'supertest';
import app from '../index';

describe('POST /api/contact', () => {
  it('should return 200 OK with a success message when the request is valid', async () => {
    const res = await request(app)
      .post('/api/contact')
      .send({
        name: 'John Doe',
        email: 'john.doe@example.com',
        phone: '1234567890',
        message: 'This is a test message.',
      });
    expect(res.status).toBe(200);
    expect(res.body).toEqual({ message: 'Message sent successfully!' });
  });

  it('should return 400 Bad Request with an error message when the name is missing', async () => {
    const res = await request(app)
      .post('/api/contact')
      .send({
        email: 'john.doe@example.com',
        phone: '1234567890',
        message: 'This is a test message.',
      });
    expect(res.status).toBe(400);
    expect(res.body).toEqual({
      errors: [{ field: 'name', message: 'Name is required.' }],
    });
  });

  it('should return 400 Bad Request with an error message when the email is missing', async () => {
    const res = await request(app)
      .post('/api/contact')
      .send({
        name: 'John Doe',
        phone: '1234567890',
        message: 'This is a test message.',
      });
    expect(res.status).toBe(400);
    expect(res.body).toEqual({
      errors: [{ field: 'email', message: 'Email is required.' }],
    });
  });

  it('should return 400 Bad Request with an error message when the phone is missing', async () => {
    const res = await request(app)
      .post('/api/contact')
      .send({
        name: 'John Doe',
        email: 'john.doe@example.com',
        message: 'This is a test message.',
      });
    expect(res.status).toBe(400);
    expect(res.body).toEqual({
      errors: [{ field: 'phone', message: 'Phone is required.' }],
    });
  });

  it('should return 400 Bad Request with an error message when the message is missing', async () => {
    const res = await request(app)
      .post('/api/contact')
      .send({
        name: 'John Doe',
        email: 'john.doe@example.com',
        phone: '1234567890',
      });
    expect(res.status).toBe(400);
    expect(res.body).toEqual({
      errors: [{ field: 'message', message: 'Message is required.' }],
    });
  });

  it('should return 400 Bad Request with multiple error messages when multiple fields are missing', async () => {
    const res = await request(app)
      .post('/api/contact')
      .send({});
    expect(res.status).toBe(400);
    expect(res.body).toEqual({
      errors: [
        { field: 'name', message: 'Name is required.' },
        { field: 'email', message: 'Email is required.' },
        { field: 'phone', message: 'Phone is required.' },
        { field: 'message', message: 'Message is required.' },
      ],
    });
  });
});
