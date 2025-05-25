import { Request, Response, NextFunction } from 'express';
import { body, validationResult } from 'express-validator';
import logger from '../utils/logger';

export const validateContactForm = [
  body('name').trim().notEmpty().withMessage('Name is required'),
  body('email').isEmail().withMessage('Valid email is required'),
  body('subject').trim().notEmpty().withMessage('Subject is required'),
  body('message').trim().notEmpty().withMessage('Message is required'),
];

export const submitContactForm = (req: Request, res: Response, next: NextFunction) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    logger.warn('Contact form validation failed', { errors: errors.array() });
    return res.status(400).json({
      status: 'error',
      message: 'Validation failed',
      errors: errors.array()
    });
  }

  const { name, email, subject, message } = req.body;

  // In a real application, you would save this to a database or send an email.
  // For now, we'll just log it.
  logger.info('Contact form submission received', { name, email, subject, message });

  res.status(200).json({
    status: 'success',
    message: 'Contact form submitted successfully!'
  });
};
