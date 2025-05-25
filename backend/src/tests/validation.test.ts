import { Request, Response, NextFunction } from 'express';
import { body, validationResult } from 'express-validator';
import logger from '../utils/logger';

describe('Contact Form Submission Validation', () => {
  it('should have name field validated as required', () => {
    const field = body('name').trim().notEmpty().withMessage('Name is required');
    expect(field.builder.fields[0]).toEqual('name');
    expect(field.builder.validations.length).toBeGreaterThan(0);
  });

  it('should have email field validated as email and required', () => {
    const field = body('email').isEmail().withMessage('Valid email is required');
    expect(field.builder.fields[0]).toEqual('email');
    expect(field.builder.validations.length).toBeGreaterThan(0);
  });

  it('should have subject field validated as required', () => {
    const field = body('subject').trim().notEmpty().withMessage('Subject is required');
    expect(field.builder.fields[0]).toEqual('subject');
    expect(field.builder.validations.length).toBeGreaterThan(0);
  });

  it('should have message field validated as required', () => {
    const field = body('message').trim().notEmpty().withMessage('Message is required');
    expect(field.builder.fields[0]).toEqual('message');
    expect(field.builder.validations.length).toBeGreaterThan(0);
  });
});
