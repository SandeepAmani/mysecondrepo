// pages/api/submit-cr.ts
import type { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    console.log('🛠️ Received submission:', req.body);
    return res.status(200).json({ message: 'Success' });
  }

  res.status(405).json({ message: 'Method Not Allowed' });
}
