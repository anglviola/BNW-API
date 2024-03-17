import { accountLogin } from '../../controllers/accounts.js';

export default async function handler(req, res, next) {
  if (req.method === 'POST') {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: 'Email and password are required.' });
        }

        await accountLogin(req, res, next); 
    } catch (error) {
      console.error('Error during login:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  } else {
    res.status(405).json({ message: 'Method Not Allowed' });
  }
}
