import mongoose from 'mongoose';  
import dotenv from 'dotenv';  

dotenv.config();  

const connectDB = async () => {  
  try {  
    await mongoose.connect(process.env.MONGODB_URI, {  
      connectTimeoutMS: 10000,   
    });  
    console.log('Conneted To MongoDB');  
  } catch (error) {  
    console.error('MongoDB connection error:', error.message);  
    process.exit(1);  
  }  
};  

export default connectDB;