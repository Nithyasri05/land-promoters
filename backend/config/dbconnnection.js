const mongoose = require('mongoose');

const connectDatabase = () => {
  mongoose
    .connect(process.env.DB_LOCAL_PORT)
    .then((conn) => {
      console.log(`✅ MongoDB connected: ${conn.connection.host}`);
    })
    .catch((err) => {
      console.error(`❌ MongoDB connection error: ${err.message}`);
      // Retry after 5 seconds
      console.log('Retrying connection in 5 seconds...');
      setTimeout(connectDatabase, 5000);
    });

  mongoose.connection.on('disconnected', () => {
    console.log('⚠️  MongoDB disconnected');
  });
};

module.exports = connectDatabase;