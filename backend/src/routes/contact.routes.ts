import { Router, Request, Response } from 'express';
import prisma from '../lib/prisma';

const router = Router();


// POST /api/contact
router.post('/', async (req: Request, res: Response) => {
    try {
        const { name, email, phone, subject, message } = req.body;
        if (!name || !email || !message) {
            res.status(400).json({ error: 'Name, email, and message are required' });
            return;
        }
        const enquiry = await prisma.contactEnquiry.create({ data: { name, email, phone, subject, message } });
        res.status(201).json({ message: 'Enquiry submitted successfully', id: enquiry.id });
    } catch {
        res.status(500).json({ error: 'Failed to submit enquiry' });
    }
});

// POST /api/contact/quote
router.post('/quote', async (req: Request, res: Response) => {
    try {
        const { name, email, phone, institution, items, message } = req.body;
        if (!name || !email || !message) {
            res.status(400).json({ error: 'Name, email, and message are required' });
            return;
        }
        const quote = await prisma.quoteRequest.create({ data: { name, email, phone, institution, items, message } });
        res.status(201).json({ message: 'Quote request submitted successfully', id: quote.id });
    } catch {
        res.status(500).json({ error: 'Failed to submit quote request' });
    }
});

export default router;
