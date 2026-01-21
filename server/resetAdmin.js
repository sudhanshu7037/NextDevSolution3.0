require('dotenv').config();
const mongoose = require('mongoose');
const User = require('./models/User');

const resetAdmin = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to MongoDB');
    
    const adminUsername = process.env.ADMIN_USERNAME || 'admin';
    const adminPassword = process.env.ADMIN_PASSWORD || 'password123';
    
    // Find and delete existing admin user
    await User.deleteOne({ username: adminUsername });
    console.log(`🗑️  Deleted existing admin user: ${adminUsername}`);
    
    // Create fresh admin user
    await User.create({ username: adminUsername, password: adminPassword });
    console.log(`✅ Admin user recreated: ${adminUsername}`);
    console.log(`🔑 Password: ${adminPassword}`);
    console.log('\n✨ You can now login with these credentials!');
    
    process.exit(0);
  } catch (err) {
    console.error('Error:', err);
    process.exit(1);
  }
};

resetAdmin();
