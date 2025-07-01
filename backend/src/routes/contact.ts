import { Router, Request, Response } from 'express';

const router = Router();

router.post('/contact', (req: Request, res: Response) => {
  const { name, email, phone, message } = req.body;

  const errors = [];
  if (!name) {
    errors.push({ field: 'name', message: 'Name is required.' });
  }
  if (!email) {
    errors.push({ field: 'email', message: 'Email is required.' });
  }
  if (!phone) {
    errors.push({ field: 'phone', message: 'Phone is required.' });
  }
  if (!message) {
    errors.push({ field: 'message', message: 'Message is required.' });
  }

  if (errors.length > 0) {
    return res.status(400).json({ errors });
  }

  console.log('New contact form submission:');
  console.log(`Name: ${name}`);
  console.log(`Email: ${email}`);
  console.log(`Phone: ${phone}`);
  console.log(`Message: ${message}`);

  res.status(200).json({ message: 'Message sent successfully!' });
});

export default router;
