import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import Users from '../models/Users.js';

dotenv.config();

const authorization = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return res.status(401).json({ message: 'Not authenticated' });
    }

    const token = authHeader.split(' ')[1];
    const decodedToken = jwt.verify(token, process.env.SECRETKEY);

    if (!decodedToken) {
      return res.status(401).json({ message: 'Not authenticated' });
    }

    const user = await Users.findByPk(decodedToken.userId);

    if (!user) {
      return res.status(401).json({ message: 'User token not valid' });
    }

    req.userId = decodedToken.userId;

    next();
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
};

export default authorization;
