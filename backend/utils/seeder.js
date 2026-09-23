/**
 * Database Seeder — Populates sample properties and testimonials for demo
 *
 * Usage:
 *   node backend/utils/seeder.js          → Seed data
 *   node backend/utils/seeder.js --clear  → Remove all seeded data
 */
const path = require('path');
const dotenv = require('dotenv');
const mongoose = require('mongoose');

dotenv.config({ path: path.join(__dirname, '..', 'config', 'config.env') });

const Property = require('../model/property_model');
const Testimonial = require('../model/testimonial_model');

const sampleProperties = [
  {
    title: 'Premium Residential Plot in Saravanampatti',
    description:
      'A premium DTCP-approved residential plot located in the heart of Saravanampatti, Coimbatore. Close to IT parks, schools, hospitals, and shopping centers. Well-laid tar road with underground drainage and 24/7 water supply. Ideal for building your dream home in a rapidly growing neighborhood.',
    propertyType: 'Residential Plot',
    location: {
      address: 'Saravanampatti Main Road',
      city: 'Coimbatore',
      state: 'Tamil Nadu',
      pincode: '641035',
      mapLink: 'https://maps.google.com/?q=Saravanampatti+Coimbatore',
    },
    price: 2500000,
    area: 1200,
    dimensions: '30 x 40',
    features: ['DTCP Approved', 'Corner Plot', 'East Facing', 'Ready for Construction'],
    amenities: ['Tar Road', 'Underground Drainage', 'Street Lights', 'Water Supply', 'Electricity'],
    images: [],
    status: 'Available',
    isFeatured: true,
  },
  {
    title: 'Spacious Villa Plot near Singanallur',
    description:
      'Exclusive villa plot in a gated community near Singanallur. Features include landscaped gardens, clubhouse access, children\'s play area, and 24/7 security. Perfect for families looking for a premium living experience with all modern amenities at your doorstep.',
    propertyType: 'Villa',
    location: {
      address: 'Near Singanallur Lake',
      city: 'Coimbatore',
      state: 'Tamil Nadu',
      pincode: '641005',
      mapLink: 'https://maps.google.com/?q=Singanallur+Coimbatore',
    },
    price: 4500000,
    area: 2400,
    dimensions: '40 x 60',
    features: ['Gated Community', 'RERA Registered', 'Vastu Compliant', 'Premium Location'],
    amenities: ['Clubhouse', 'Swimming Pool', 'Children Play Area', '24/7 Security', 'Gym', 'Landscaped Gardens'],
    images: [],
    status: 'Available',
    isFeatured: true,
  },
  {
    title: 'Commercial Plot on Avinashi Road',
    description:
      'Prime commercial plot on Avinashi Road, one of the busiest corridors in Coimbatore. High visibility frontage, suitable for showrooms, offices, or mixed-use developments. Excellent connectivity to railway station and airport.',
    propertyType: 'Commercial Plot',
    location: {
      address: 'Avinashi Road',
      city: 'Coimbatore',
      state: 'Tamil Nadu',
      pincode: '641018',
      mapLink: 'https://maps.google.com/?q=Avinashi+Road+Coimbatore',
    },
    price: 8500000,
    area: 3000,
    dimensions: '50 x 60',
    features: ['Main Road Frontage', 'Commercial Zone', 'High Visibility', 'Corner Property'],
    amenities: ['Wide Road Access', 'Electricity', 'Water Supply', 'Drainage'],
    images: [],
    status: 'Available',
    isFeatured: true,
  },
  {
    title: 'Farm Land in Pollachi',
    description:
      'Fertile agricultural land with coconut trees and bore well facility in Pollachi. Well-connected by road with fencing on all sides. Ideal for farming, farmhouse construction, or long-term investment in one of the most scenic regions of Tamil Nadu.',
    propertyType: 'Farm Land',
    location: {
      address: 'Pollachi - Palakkad Road',
      city: 'Pollachi',
      state: 'Tamil Nadu',
      pincode: '642001',
      mapLink: 'https://maps.google.com/?q=Pollachi+Tamil+Nadu',
    },
    price: 3200000,
    area: 43560,
    dimensions: '1 Acre',
    features: ['Bore Well', 'Coconut Trees', 'Fenced', 'Road Access'],
    amenities: ['Water Supply', 'Electricity Nearby', 'Farm Road'],
    images: [],
    status: 'Available',
    isFeatured: true,
  },
  {
    title: 'Budget Residential Plot in Vadavalli',
    description:
      'Affordable residential plot in Vadavalli, ideal for first-time home builders. Close to educational institutions, hospitals, and public transport. DTCP-approved with clear legal title and all basic amenities available.',
    propertyType: 'Residential Plot',
    location: {
      address: 'Vadavalli',
      city: 'Coimbatore',
      state: 'Tamil Nadu',
      pincode: '641041',
      mapLink: 'https://maps.google.com/?q=Vadavalli+Coimbatore',
    },
    price: 1500000,
    area: 800,
    dimensions: '20 x 40',
    features: ['DTCP Approved', 'Clear Title', 'Budget Friendly', 'South Facing'],
    amenities: ['Tar Road', 'Water Supply', 'Electricity', 'Street Lights'],
    images: [],
    status: 'Available',
    isFeatured: false,
  },
  {
    title: 'Luxury Villa Plot in Thudiyalur',
    description:
      'Premium villa plot in an upcoming luxury gated community in Thudiyalur. Surrounded by nature with mountain views, this plot offers the perfect blend of tranquility and connectivity. Phase 1 is almost sold out — book now!',
    propertyType: 'Villa',
    location: {
      address: 'Thudiyalur',
      city: 'Coimbatore',
      state: 'Tamil Nadu',
      pincode: '641034',
      mapLink: 'https://maps.google.com/?q=Thudiyalur+Coimbatore',
    },
    price: 6000000,
    area: 3200,
    dimensions: '40 x 80',
    features: ['Mountain View', 'Gated Community', 'RERA Registered', 'Premium Finish'],
    amenities: ['Clubhouse', 'Jogging Track', 'Garden', 'Security', 'Indoor Games'],
    images: [],
    status: 'Upcoming',
    isFeatured: true,
  },
  {
    title: 'Sold - Prime Plot near Gandhipuram',
    description:
      'This premium plot near Gandhipuram bus stand has been sold. Located in the commercial heart of Coimbatore with excellent appreciation potential. Similar properties are available — contact us for details.',
    propertyType: 'Commercial Plot',
    location: {
      address: 'Near Gandhipuram',
      city: 'Coimbatore',
      state: 'Tamil Nadu',
      pincode: '641012',
      mapLink: 'https://maps.google.com/?q=Gandhipuram+Coimbatore',
    },
    price: 12000000,
    area: 5000,
    dimensions: '50 x 100',
    features: ['Prime Location', 'Main Road', 'High Demand Area', 'Commercial Zone'],
    amenities: ['All Amenities Available'],
    images: [],
    status: 'Sold',
    isFeatured: false,
  },
  {
    title: 'Residential Plot in Ganapathy',
    description:
      'Well-located residential plot in Ganapathy with excellent connectivity to Coimbatore city center. Surrounded by established residential neighborhoods with schools, temples, and markets within walking distance.',
    propertyType: 'Residential Plot',
    location: {
      address: 'Ganapathy',
      city: 'Coimbatore',
      state: 'Tamil Nadu',
      pincode: '641006',
      mapLink: 'https://maps.google.com/?q=Ganapathy+Coimbatore',
    },
    price: 2800000,
    area: 1500,
    dimensions: '30 x 50',
    features: ['Clear Title', 'DTCP Approved', 'North Facing', 'Well Connected'],
    amenities: ['Tar Road', 'Water', 'Electricity', 'Drainage', 'Street Lights'],
    images: [],
    status: 'Available',
    isFeatured: true,
  },
];

const sampleTestimonials = [
  {
    name: 'Rajesh Kumar',
    role: 'Home Buyer',
    message:
      'Excellent service from start to finish! The team helped me find the perfect plot in Saravanampatti. All documentation was handled professionally and transparently. Highly recommend LandPromoters!',
    rating: 5,
    isApproved: true,
  },
  {
    name: 'Priya Shanmugam',
    role: 'Investor',
    message:
      'I have invested in multiple plots through LandPromoters and every transaction has been smooth. Their knowledge of the Coimbatore real estate market is exceptional. Great returns on my investments!',
    rating: 5,
    isApproved: true,
  },
  {
    name: 'Mohammed Faisal',
    role: 'Business Owner',
    message:
      'Purchased a commercial plot on Avinashi Road for my showroom. The team\'s guidance on commercial zoning and legal compliance was invaluable. Very professional and trustworthy.',
    rating: 4,
    isApproved: true,
  },
  {
    name: 'Lakshmi Narayanan',
    role: 'Retiree',
    message:
      'After retirement, I wanted to build a farmhouse in Pollachi. LandPromoters found me the perfect piece of land with all the facilities I needed. Thank you for making my dream come true!',
    rating: 5,
    isApproved: true,
  },
  {
    name: 'Santhosh Vijay',
    role: 'IT Professional',
    message:
      'Being an NRI, I was worried about buying property remotely. But the LandPromoters team kept me updated at every step with photos and video calls. Smooth and hassle-free experience!',
    rating: 4,
    isApproved: true,
  },
  {
    name: 'Deepa Rajan',
    role: 'Home Maker',
    message:
      'We bought our first plot through LandPromoters for building our family home. The prices were very reasonable and the location is perfect. The entire process was transparent and quick.',
    rating: 5,
    isApproved: true,
  },
];

const propertyImageSets = {
  'Premium Residential Plot in Saravanampatti': [
    'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&w=1200&q=80',
  ],
  'Spacious Villa Plot near Singanallur': [
    'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
  ],
  'Commercial Plot on Avinashi Road': [
    'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80',
  ],
  'Farm Land in Pollachi': [
    'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1200&q=80',
  ],
  'Budget Residential Plot in Vadavalli': [
    'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1200&q=80',
  ],
  'Luxury Villa Plot in Thudiyalur': [
    'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1200&q=80',
  ],
  'Sold - Prime Plot near Gandhipuram': [
    'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80',
  ],
  'Residential Plot in Ganapathy': [
    'https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=1200&q=80',
  ],
  villa: [
    'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
  ],
  land: [
    'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1200&q=80',
  ],
};

const seedDatabase = async () => {
  try {
    await mongoose.connect(process.env.DB_LOCAL_PORT);
    console.log('✅ Connected to database');

    if (process.argv.includes('--clear')) {
      await Property.deleteMany({});
      await Testimonial.deleteMany({});
      console.log('🗑️  All properties and testimonials deleted');
    } else {
      // Check if data already exists
      const existingProperties = await Property.countDocuments();
      const existingTestimonials = await Testimonial.countDocuments();

      if (existingProperties === 0) {
        for (const property of sampleProperties) {
          await Property.create({
            ...property,
            images: propertyImageSets[property.title] || property.images,
          });
        }
        console.log(`✅ Seeded ${sampleProperties.length} properties`);
      } else {
        let updatedProperties = 0;
        const propertiesWithoutImages = await Property.find(
          { $or: [{ images: { $exists: false } }, { images: { $size: 0 } }] },
          'title',
        );
        for (const property of propertiesWithoutImages) {
          const imageSet = propertyImageSets[property.title];
          if (!imageSet) continue;

          const result = await Property.updateOne(
            { _id: property._id },
            { $set: { images: imageSet } },
          );
          updatedProperties += result.modifiedCount;
        }
        console.log(`⏭️  Found ${existingProperties} properties; added photos to ${updatedProperties}`);
      }

      if (existingTestimonials === 0) {
        for (const testimonial of sampleTestimonials) {
          await Testimonial.create(testimonial);
        }
        console.log(`✅ Seeded ${sampleTestimonials.length} testimonials`);
      } else {
        console.log(`⏭️  Skipped testimonials — ${existingTestimonials} already exist`);
      }
    }

    console.log('🎉 Seeding complete!');
    process.exit(0);
  } catch (err) {
    console.error('❌ Seeder error:', err.message);
    process.exit(1);
  }
};

seedDatabase();
