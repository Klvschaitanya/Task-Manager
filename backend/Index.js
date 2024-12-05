import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import UserSchema from './Db.js';
import dotenv from 'dotenv'


const app = express();
const app1 = express.Router()
const PORT = 5000;
dotenv.config()
const URI = process.env.uri;


app.use(cors({
  origin: 'http://localhost:3000',
  methods: ['GET', 'POST','PUT','DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));
app.use(express.json()); 


mongoose.connect(URI)
  .then(() => {
    console.log('MongoDB connected');
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error('Error connecting to MongoDB:', err.message);
    process.exit(1);
  });
 



 
  app1.post('/create', async (req, res) => {
    const Title= req.body.Title;
    const Description = req.body.Description;
    try {
      await UserSchema.create({ Title:Title, Description:Description });
      res.status(201).json({ message: 'Task created successfully', success: true });
    } catch (error) {
      res.status(500).json({ message: 'Error creating task', success: false, error });
    }
  });

  app1.put('/update', async (req, res) => {
    const Title= req.body.Title;
    const Description = req.body.Description;
    const Id = req.body.Id;
    try {
      await UserSchema.findByIdAndUpdate(Id,{ Title:Title, Description:Description },{ new: true });
      res.status(203).json({ message: 'Task updated successfully', success: true });
    } catch (error) {
      res.status(540).json({ message: 'Error creating task', success: false, error });
    }
  });

  app1.delete('/delete', async (req, res) => {
    const Id = req.body.Id;
  
    try {
      await UserSchema.findByIdAndDelete(Id);
      res.status(203).json({ message: 'Task deleted successfully', success: true });
    } catch (error) {
      res.status(540).json({ message: 'Error deleting task', success: false, error });
    }
  });
  
  app1.get('/tasks', async (req, res) => { 
    try {
      const tasks = await UserSchema.find();
      res.status(200).json(tasks);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching tasks', success: false, error });
   console.log(error)
    }
  });

  app.use(app1)

