import express from 'express';  
import path from 'path';  
import cookieParser from 'cookie-parser';  
import logger from 'morgan';  
import connectDB from './config/dbconfig.js';
import cors from 'cors';  
import dotenv from 'dotenv';
import session from 'express-session';
import initializePassport from './passport-setup.js';

const app = express();

dotenv.config();   

const port = process.env.PORT || 5000; 

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(express.static(path.join(path.resolve(), 'public')));

app.use(cors({
  origin: '*', 
  methods: ['GET', 'POST', "DELETE", "PUT", "PATCH"],
  credentials: true
}));

app.get('/', (req, res) => {
  res.send('Welcome to the Davy API!');
});

import usersRouter from './routes/users.js';  
import todoRoute from './routes/todos.js'

app.use('/users', usersRouter); 
app.use('/todos', todoRoute);

connectDB();

app.use(
  session({
    secret: process.env.SESSION_SECRET || 'your-secret-key',
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: process.env.NODE_ENV === 'production',
      maxAge: 24 * 60 * 60 * 1000 
    }
  })
);

initializePassport(app);

app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`, req.body);
  next();
});

app.use((err, req, res, next) => {  
  console.error('Error details:', err); 
  res.status(err.status || 500).json({  
    error: {  
      message: err.message,  
      status: err.status || 500,  
    },  
  });  
});

app.listen(port, () => console.log(`Server Running on PORT ${port}`));  

export default app;