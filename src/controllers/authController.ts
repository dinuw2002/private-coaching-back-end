import { type Request, type Response } from 'express';
import User from '../models/User';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret_key';

export const register = async (req: Request, res: Response): Promise<void> => {
  try {
    const { firstName, lastName, email, password, confirmPassword } = req.body;

    // 1. Basic validation: Check if all fields are present
    if (!firstName || !lastName || !email || !password || !confirmPassword) {
      res.status(400).json({ message: 'All fields are required' });
      return;
    }

    // 2. Validate matching passwords (Business logic check)
    if (password !== confirmPassword) {
      res.status(400).json({ message: 'Passwords do not match' });
      return;
    }

    // 3. Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      res.status(400).json({ message: 'User with this email already exists' });
      return;
    }

    // 4. Create and save new user
    const newUser = new User({
      firstName,
      lastName,
      email,
      password
    });

    await newUser.save();

    res.status(201).json({ 
      message: 'User registered successfully',
      user: {
        id: newUser._id,
        email: newUser.email,
        firstName: newUser.firstName,
        lastName: newUser.lastName
      }
    });
  } catch (error: any) {
    console.error('Registration Error:', error);
    res.status(500).json({ 
      message: 'Server error during registration', 
      error: error.message 
    });
  }
};


export const login = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      res.status(400).json({ message: 'Email and password are required' });
      return;
    }

    // Find user and explicitly select password because 'select: false' is set in model
    const user = await User.findOne({ email }).select('+password');
    if (!user) {
      res.status(401).json({ message: 'Invalid email or password' });
      return;
    }

    // Compare hashed password
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      res.status(401).json({ message: 'Invalid email or password' });
      return;
    }

    // Generate JWT
    const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: '1d' });

    res.status(200).json({
      message: 'Login successful',
      token,
      user: {
        id: user._id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName
      }
    });
  } catch (error: any) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};