const mongoose = require('mongoose');
const User = require('./models/User');
require('dotenv').config();

const seedAdmin = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('MongoDB Connected for seeding...');

        const adminExists = await User.findOne({ email: 'officer@city.gov' });

        if (adminExists) {
            console.log('Officer account already exists.');
            process.exit();
        }

        const admin = await User.create({
            name: 'Municipal Officer',
            email: 'officer@city.gov',
            password: 'officerpassword123',
            role: 'admin',
            employeeId: 'OFF-001'
        });

        console.log('Officer account created successfully:');
        console.log('Email: officer@city.gov');
        console.log('Password: officerpassword123');

        process.exit();
    } catch (err) {
        console.error('Error seeding admin:', err);
        process.exit(1);
    }
};

seedAdmin();
