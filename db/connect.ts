import mongoose from 'mongoose';

const uri = process.env.MONGODB_URI || '';

async function connectToDB() {
  console.log('Connecting to MongoDB...');

  try {
    // Connect to MongoDB using Mongoose
    await mongoose.connect(uri, {

    });

    console.log('Connected to MongoDB');
    console.log('Mongoose connection state:', mongoose.connection.readyState);
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    throw error; // Propagate the error
  }
}

export default connectToDB;
