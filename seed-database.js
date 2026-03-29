/**
 * Database Seeder Script
 * Populates the database with realistic dummy data
 * 
 * Usage: node scripts/seed-database.js
 */

import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';
import User from '../src/models/user.model.js';
import ServicePartner from '../src/models/servicePartner.model.js';
import Service from '../src/models/service.model.js';
import Review from '../src/models/review.model.js';
import Booking from '../src/models/booking.model.js';

// Load environment variables
dotenv.config();

const seedDatabase = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGO_URI);
    console.log('✅ Connected to MongoDB');

    // Hash password for all users
    const hashedPassword = await bcrypt.hash('password123', 10);

    // 1. Create Customer Users
    console.log('👥 Creating customers...');
    const customers = await User.insertMany([
      {
        fullName: 'John Smith',
        email: 'john@example.com',
        password: hashedPassword,
        phone: '+1234567890',
        role: 'customer',
        address: '123 Main St, New York, NY 10001',
        isVerified: true
      },
      {
        fullName: 'Sarah Johnson',
        email: 'sarah@example.com',
        password: hashedPassword,
        phone: '+1234567891',
        role: 'customer',
        address: '456 Oak Ave, Los Angeles, CA 90210',
        isVerified: true
      },
      {
        fullName: 'Mike Davis',
        email: 'mike@example.com',
        password: hashedPassword,
        phone: '+1234567892',
        role: 'customer',
        address: '789 Pine St, Chicago, IL 60601',
        isVerified: true
      },
      {
        fullName: 'Emily Wilson',
        email: 'emily@example.com',
        password: hashedPassword,
        phone: '+1234567893',
        role: 'customer',
        address: '321 Elm St, Miami, FL 33101',
        isVerified: true
      }
    ]);

    // 2. Create Partner Users
    console.log('🔧 Creating service partners...');
    const partnerUsers = await User.insertMany([
      {
        fullName: 'Alex Rodriguez',
        email: 'alex@fixora.com',
        password: hashedPassword,
        phone: '+1555123001',
        role: 'partner',
        address: '100 Service Blvd, New York, NY 10001',
        isVerified: true
      },
      {
        fullName: 'Maria Garcia',
        email: 'maria@fixora.com',
        password: hashedPassword,
        phone: '+1555123002',
        role: 'partner',
        address: '200 Repair Ave, Los Angeles, CA 90210',
        isVerified: true
      },
      {
        fullName: 'David Chen',
        email: 'david@fixora.com',
        password: hashedPassword,
        phone: '+1555123003',
        role: 'partner',
        address: '300 Fix St, Chicago, IL 60601',
        isVerified: true
      },
      {
        fullName: 'Lisa Thompson',
        email: 'lisa@fixora.com',
        password: hashedPassword,
        phone: '+1555123004',
        role: 'partner',
        address: '400 Service Rd, Miami, FL 33101',
        isVerified: true
      },
      {
        fullName: 'James Parker',
        email: 'james@fixora.com',
        password: hashedPassword,
        phone: '+1555123005',
        role: 'partner',
        address: '500 Maintenance Ln, Austin, TX 78701',
        isVerified: true
      },
      {
        fullName: 'Anna Miller',
        email: 'anna@fixora.com',
        password: hashedPassword,
        phone: '+1555123006',
        role: 'partner',
        address: '600 Tech Dr, Seattle, WA 98101',
        isVerified: true
      }
    ]);

    // 3. Create Partner Profiles
    console.log('📋 Creating partner profiles...');
    const partners = await ServicePartner.insertMany([
      {
        user: partnerUsers[0]._id,
        bio: 'Expert plumber with 10+ years experience. Specializing in emergency repairs and installations.',
        skills: ['Plumbing', 'Pipe Repair', 'Installation'],
        experience: 10,
        isVerified: true,
        isOnline: true,
        averageRating: 4.8
      },
      {
        user: partnerUsers[1]._id,
        bio: 'Professional electrician certified for residential and commercial work. Fast and reliable service.',
        skills: ['Electrical', 'Wiring', 'Circuit Installation'],
        experience: 8,
        isVerified: true,
        isOnline: true,
        averageRating: 4.9
      },
      {
        user: partnerUsers[2]._id,
        bio: 'HVAC specialist with expertise in air conditioning, heating, and ventilation systems.',
        skills: ['HVAC', 'Air Conditioning', 'Heating'],
        experience: 12,
        isVerified: true,
        isOnline: false,
        averageRating: 4.7
      },
      {
        user: partnerUsers[3]._id,
        bio: 'Experienced house cleaner providing thorough and eco-friendly cleaning services.',
        skills: ['House Cleaning', 'Deep Cleaning', 'Eco-friendly'],
        experience: 5,
        isVerified: true,
        isOnline: true,
        averageRating: 4.6
      },
      {
        user: partnerUsers[4]._id,
        bio: 'Skilled handyman for all home repairs, installations, and maintenance work.',
        skills: ['General Repairs', 'Installation', 'Maintenance'],
        experience: 15,
        isVerified: true,
        isOnline: true,
        averageRating: 4.8
      },
      {
        user: partnerUsers[5]._id,
        bio: 'Tech support specialist for computer repairs, network setup, and smart home installations.',
        skills: ['Computer Repair', 'Network Setup', 'Smart Home'],
        experience: 6,
        isVerified: true,
        isOnline: true,
        averageRating: 4.5
      }
    ]);

    // 4. Create Services
    console.log('🛠️  Creating services...');
    const services = await Service.insertMany([
      // Plumbing Services
      {
        partner: partners[0]._id,
        name: 'Pipe Repair',
        description: 'Professional pipe repair and replacement services for leaks and damages.',
        category: 'Plumbing',
        price: 75,
        priceType: 'hourly',
        duration: 120,
        isActive: true
      },
      {
        partner: partners[0]._id,
        name: 'Toilet Installation',
        description: 'Complete toilet installation and replacement with all necessary fittings.',
        category: 'Plumbing',
        price: 150,
        priceType: 'fixed',
        duration: 180,
        isActive: true
      },
      // Electrical Services
      {
        partner: partners[1]._id,
        name: 'Electrical Wiring',
        description: 'Safe and certified electrical wiring for homes and offices.',
        category: 'Electrical',
        price: 85,
        priceType: 'hourly',
        duration: 240,
        isActive: true
      },
      {
        partner: partners[1]._id,
        name: 'Circuit Installation',
        description: 'Professional circuit installation and electrical panel upgrades.',
        category: 'Electrical',
        price: 200,
        priceType: 'fixed',
        duration: 300,
        isActive: true
      },
      // HVAC Services
      {
        partner: partners[2]._id,
        name: 'AC Repair',
        description: 'Air conditioning repair and maintenance for all major brands.',
        category: 'HVAC',
        price: 90,
        priceType: 'hourly',
        duration: 180,
        isActive: true
      },
      {
        partner: partners[2]._id,
        name: 'Heating System Installation',
        description: 'Complete heating system installation and setup.',
        category: 'HVAC',
        price: 500,
        priceType: 'fixed',
        duration: 480,
        isActive: true
      },
      // Cleaning Services
      {
        partner: partners[3]._id,
        name: 'House Cleaning',
        description: 'Thorough house cleaning including all rooms and surfaces.',
        category: 'Cleaning',
        price: 25,
        priceType: 'hourly',
        duration: 180,
        isActive: true
      },
      {
        partner: partners[3]._id,
        name: 'Deep Cleaning',
        description: 'Comprehensive deep cleaning service for move-ins or spring cleaning.',
        category: 'Cleaning',
        price: 120,
        priceType: 'fixed',
        duration: 300,
        isActive: true
      },
      // Handyman Services
      {
        partner: partners[4]._id,
        name: 'General Repairs',
        description: 'Various home repairs including doors, windows, and fixtures.',
        category: 'Handyman',
        price: 60,
        priceType: 'hourly',
        duration: 120,
        isActive: true
      },
      {
        partner: partners[4]._id,
        name: 'Furniture Assembly',
        description: 'Professional furniture assembly and installation service.',
        category: 'Handyman',
        price: 45,
        priceType: 'hourly',
        duration: 90,
        isActive: true
      },
      // Tech Support
      {
        partner: partners[5]._id,
        name: 'Computer Repair',
        description: 'Computer diagnostics, repair, and virus removal services.',
        category: 'Technology',
        price: 70,
        priceType: 'hourly',
        duration: 120,
        isActive: true
      },
      {
        partner: partners[5]._id,
        name: 'Smart Home Setup',
        description: 'Smart home device installation and network configuration.',
        category: 'Technology',
        price: 100,
        priceType: 'hourly',
        duration: 180,
        isActive: true
      }
    ]);

    // 5. Create Bookings
    console.log('📅 Creating bookings...');
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    const nextWeek = new Date(today);
    nextWeek.setDate(nextWeek.getDate() + 7);
    const lastWeek = new Date(today);
    lastWeek.setDate(lastWeek.getDate() - 7);

    const bookings = await Booking.insertMany([
      {
        customer: customers[0]._id,
        partner: partners[0]._id,
        service: services[0]._id,
        bookingDate: lastWeek,
        address: {
          street: '123 Main St',
          city: 'New York',
          state: 'NY',
          postalCode: '10001'
        },
        status: 'completed',
        totalPrice: 150,
        paymentStatus: 'paid'
      },
      {
        customer: customers[1]._id,
        partner: partners[0]._id,
        service: services[1]._id,
        bookingDate: lastWeek,
        address: {
          street: '456 Oak Ave',
          city: 'Los Angeles',
          state: 'CA',
          postalCode: '90210'
        },
        status: 'completed',
        totalPrice: 150,
        paymentStatus: 'paid'
      },
      {
        customer: customers[2]._id,
        partner: partners[1]._id,
        service: services[2]._id,
        bookingDate: lastWeek,
        address: {
          street: '789 Pine St',
          city: 'Chicago',
          state: 'IL',
          postalCode: '60601'
        },
        status: 'completed',
        totalPrice: 340,
        paymentStatus: 'paid'
      },
      {
        customer: customers[3]._id,
        partner: partners[1]._id,
        service: services[3]._id,
        bookingDate: lastWeek,
        address: {
          street: '321 Elm St',
          city: 'Miami',
          state: 'FL',
          postalCode: '33101'
        },
        status: 'completed',
        totalPrice: 200,
        paymentStatus: 'paid'
      },
      {
        customer: customers[0]._id,
        partner: partners[2]._id,
        service: services[4]._id,
        bookingDate: lastWeek,
        address: {
          street: '123 Main St',
          city: 'New York',
          state: 'NY',
          postalCode: '10001'
        },
        status: 'completed',
        totalPrice: 270,
        paymentStatus: 'paid'
      },
      {
        customer: customers[1]._id,
        partner: partners[3]._id,
        service: services[6]._id,
        bookingDate: lastWeek,
        address: {
          street: '456 Oak Ave',
          city: 'Los Angeles',
          state: 'CA',
          postalCode: '90210'
        },
        status: 'completed',
        totalPrice: 75,
        paymentStatus: 'paid'
      },
      {
        customer: customers[2]._id,
        partner: partners[4]._id,
        service: services[8]._id,
        bookingDate: lastWeek,
        address: {
          street: '789 Pine St',
          city: 'Chicago',
          state: 'IL',
          postalCode: '60601'
        },
        status: 'completed',
        totalPrice: 120,
        paymentStatus: 'paid'
      },
      {
        customer: customers[3]._id,
        partner: partners[5]._id,
        service: services[10]._id,
        bookingDate: lastWeek,
        address: {
          street: '321 Elm St',
          city: 'Miami',
          state: 'FL',
          postalCode: '33101'
        },
        status: 'completed',
        totalPrice: 140,
        paymentStatus: 'paid'
      },
      // Future bookings
      {
        customer: customers[0]._id,
        partner: partners[1]._id,
        service: services[2]._id,
        bookingDate: tomorrow,
        address: {
          street: '123 Main St',
          city: 'New York',
          state: 'NY',
          postalCode: '10001'
        },
        status: 'confirmed',
        totalPrice: 340,
        paymentStatus: 'pending'
      },
      {
        customer: customers[1]._id,
        partner: partners[3]._id,
        service: services[6]._id,
        bookingDate: nextWeek,
        address: {
          street: '456 Oak Ave',
          city: 'Los Angeles',
          state: 'CA',
          postalCode: '90210'
        },
        status: 'pending',
        totalPrice: 75,
        paymentStatus: 'pending'
      }
    ]);

    // 6. Create Reviews (for completed bookings only)
    console.log('⭐ Creating reviews...');
    const reviews = await Review.insertMany([
      {
        booking: bookings[0]._id,
        customer: customers[0]._id,
        partner: partners[0]._id,
        rating: 5,
        comment: 'Excellent work! Fixed my pipe leak quickly and professionally.'
      },
      {
        booking: bookings[1]._id,
        customer: customers[1]._id,
        partner: partners[0]._id,
        rating: 4,
        comment: 'Good service, arrived on time and got the job done.'
      },
      {
        booking: bookings[2]._id,
        customer: customers[2]._id,
        partner: partners[1]._id,
        rating: 5,
        comment: 'Outstanding electrical work! Very knowledgeable and safe.'
      },
      {
        booking: bookings[3]._id,
        customer: customers[3]._id,
        partner: partners[1]._id,
        rating: 5,
        comment: 'Perfect circuit installation. Clean work and fair pricing.'
      },
      {
        booking: bookings[4]._id,
        customer: customers[0]._id,
        partner: partners[2]._id,
        rating: 4,
        comment: 'Fixed my AC issue efficiently. Cooling perfectly now.'
      },
      {
        booking: bookings[5]._id,
        customer: customers[1]._id,
        partner: partners[3]._id,
        rating: 5,
        comment: 'Amazing house cleaning! Place looks spotless.'
      },
      {
        booking: bookings[6]._id,
        customer: customers[2]._id,
        partner: partners[4]._id,
        rating: 4,
        comment: 'Great handyman skills. Fixed multiple issues in one visit.'
      },
      {
        booking: bookings[7]._id,
        customer: customers[3]._id,
        partner: partners[5]._id,
        rating: 5,
        comment: 'Excellent tech support! Computer running like new.'
      }
    ]);

    console.log('✨ Database seeding complete!');
    console.log(`👥 Created ${customers.length} customers`);
    console.log(`🔧 Created ${partnerUsers.length} partner users`);
    console.log(`📋 Created ${partners.length} partner profiles`);
    console.log(`🛠️  Created ${services.length} services`);
    console.log(`⭐ Created ${reviews.length} reviews`);
    console.log(`📅 Created ${bookings.length} bookings`);

    // Test login credentials
    console.log('\n🔑 Test Login Credentials:');
    console.log('Customer: john@example.com / password123');
    console.log('Partner: alex@fixora.com / password123');

  } catch (error) {
    console.error('❌ Seeding failed:', error);
  } finally {
    // Close database connection
    await mongoose.connection.close();
    console.log('👋 Disconnected from MongoDB');
  }
};

// Run the seeder
seedDatabase();