const dotenv = require('dotenv');
const mongoose = require('mongoose');
const Category = require('../models/Category');
const Product = require('../models/Product');
const User = require('../models/User');

dotenv.config();

const categories = [
  {
    name: 'Herbs & Supplements',
    description: 'Pure Ayurvedic herbs and supplements for overall wellness',
    icon: '🌿',
    order: 1
  },
  {
    name: 'Ayurvedic Oils',
    description: 'Therapeutic oils for massage and body care',
    icon: '🫙',
    order: 2
  },
  {
    name: 'Herbal Tea',
    description: 'Wellness teas blended with Ayurvedic herbs',
    icon: '🍵',
    order: 3
  },
  {
    name: 'Skincare',
    description: 'Natural skincare products with Ayurvedic ingredients',
    icon: '✨',
    order: 4
  },
  {
    name: 'Hair Care',
    description: 'Ayurvedic solutions for healthy hair',
    icon: '💆',
    order: 5
  },
  {
    name: 'Digestive Health',
    description: 'Support your digestive system naturally',
    icon: '🌾',
    order: 6
  }
];

const getProducts = (categoryIds) => [
  // Herbs & Supplements
  {
    name: 'Organic Ashwagandha Capsules',
    shortDescription: 'Stress relief and vitality booster',
    description: 'Premium quality Ashwagandha (Withania Somnifera) capsules for stress management, improved energy levels, and overall wellness. Sourced from organic farms.',
    price: 599,
    comparePrice: 799,
    category: categoryIds['Herbs & Supplements'],
    images: [
      { url: 'https://images.unsplash.com/photo-1550572017-4a6c0c270e1a?w=800', alt: 'Ashwagandha Capsules', isPrimary: true }
    ],
    ingredients: [
      { name: 'Ashwagandha Root Extract', sanskritName: 'Withania Somnifera', percentage: 95, description: 'Adaptogenic herb for stress relief' },
      { name: 'Organic Gelatin Capsule', percentage: 5 }
    ],
    benefits: [
      'Reduces stress and anxiety',
      'Improves energy and stamina',
      'Supports immune system',
      'Promotes better sleep',
      'Enhances cognitive function'
    ],
    dosage: {
      adults: '1-2 capsules',
      frequency: 'Twice daily',
      bestTime: 'After meals',
      instructions: 'Take with lukewarm water or milk'
    },
    contraindications: [
      'Not recommended during pregnancy',
      'Avoid if you have hyperthyroidism',
      'Consult doctor if on thyroid medication'
    ],
    certifications: [
      { name: 'Organic', certificateNumber: 'ORG-2024-001' },
      { name: 'GMP Certified', certificateNumber: 'GMP-2024-045' }
    ],
    dosha: ['Vata', 'Kapha'],
    stock: 150,
    weight: { value: 60, unit: 'capsules' },
    isFeatured: true,
    isNewArrival: false,
    tags: ['stress-relief', 'energy', 'immunity', 'adaptogen']
  },
  {
    name: 'Triphala Powder',
    shortDescription: 'Traditional digestive and detox formula',
    description: 'Triphala is a combination of three fruits: Amalaki, Bibhitaki, and Haritaki. Perfect for gentle detoxification and digestive health.',
    price: 299,
    comparePrice: 399,
    category: categoryIds['Herbs & Supplements'],
    images: [
      { url: 'https://images.unsplash.com/photo-1505944357-2f7b5d9f2d8c?w=800', alt: 'Triphala Powder', isPrimary: true }
    ],
    ingredients: [
      { name: 'Amalaki', sanskritName: 'Emblica Officinalis', percentage: 33, description: 'Rich in Vitamin C' },
      { name: 'Bibhitaki', sanskritName: 'Terminalia Bellirica', percentage: 33, description: 'Supports respiratory health' },
      { name: 'Haritaki', sanskritName: 'Terminalia Chebula', percentage: 34, description: 'Promotes digestion' }
    ],
    benefits: [
      'Improves digestion',
      'Gentle detoxification',
      'Supports eye health',
      'Rich in antioxidants',
      'Promotes regular bowel movements'
    ],
    dosage: {
      adults: '1-2 teaspoons',
      frequency: 'Once or twice daily',
      bestTime: 'Before bed or early morning',
      instructions: 'Mix with warm water or honey'
    },
    certifications: [
      { name: 'Organic' },
      { name: 'Ayush Certified' }
    ],
    dosha: ['Vata', 'Pitta', 'Kapha'],
    stock: 200,
    weight: { value: 200, unit: 'g' },
    isFeatured: true,
    tags: ['digestion', 'detox', 'immunity']
  },
  {
    name: 'Turmeric Curcumin Tablets',
    shortDescription: 'Anti-inflammatory and immunity booster',
    description: 'High-potency curcumin tablets with black pepper extract for maximum absorption. Natural anti-inflammatory and antioxidant support.',
    price: 499,
    comparePrice: 699,
    category: categoryIds['Herbs & Supplements'],
    images: [
      { url: 'https://images.unsplash.com/photo-1615485290382-441e4d049cb5?w=800', alt: 'Turmeric Tablets', isPrimary: true }
    ],
    ingredients: [
      { name: 'Turmeric Root Extract', sanskritName: 'Curcuma Longa', percentage: 90, description: '95% Curcuminoids' },
      { name: 'Black Pepper Extract', sanskritName: 'Piper Nigrum', percentage: 10, description: 'Enhances absorption' }
    ],
    benefits: [
      'Powerful anti-inflammatory',
      'Supports joint health',
      'Boosts immune system',
      'Promotes healthy skin',
      'Supports liver function'
    ],
    dosage: {
      adults: '1-2 tablets',
      frequency: 'Twice daily',
      bestTime: 'With meals',
      instructions: 'Take with water'
    },
    certifications: [
      { name: 'GMP Certified' },
      { name: 'Non-GMO' }
    ],
    dosha: ['Kapha', 'Vata'],
    stock: 175,
    weight: { value: 60, unit: 'tablets' },
    isFeatured: true,
    tags: ['anti-inflammatory', 'immunity', 'joints']
  },
  // Oils
  {
    name: 'Pure Sesame Oil',
    shortDescription: 'Traditional massage and cooking oil',
    description: 'Cold-pressed sesame oil perfect for Abhyanga (self-massage), cooking, and oil pulling. Rich in antioxidants and minerals.',
    price: 349,
    category: categoryIds['Ayurvedic Oils'],
    images: [
      { url: 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=800', alt: 'Sesame Oil', isPrimary: true }
    ],
    ingredients: [
      { name: 'Cold-Pressed Sesame Seeds', sanskritName: 'Til', percentage: 100 }
    ],
    benefits: [
      'Nourishes skin',
      'Promotes joint health',
      'Supports bone strength',
      'Improves blood circulation',
      'Good for oil pulling'
    ],
    dosage: {
      adults: 'Apply as needed',
      instructions: 'For massage: Warm slightly before use. For cooking: Use as regular cooking oil.'
    },
    certifications: [
      { name: 'Organic' }
    ],
    dosha: ['Vata'],
    stock: 120,
    weight: { value: 500, unit: 'ml' },
    tags: ['massage', 'cooking', 'vata-balancing']
  },
  {
    name: 'Brahmi Hair Oil',
    shortDescription: 'Promotes hair growth and mental clarity',
    description: 'Enriched with Brahmi, Amla, and Bhringraj for strong, healthy hair and a calm mind. Perfect for scalp massage.',
    price: 429,
    comparePrice: 549,
    category: categoryIds['Ayurvedic Oils'],
    images: [
      { url: 'https://images.unsplash.com/photo-1608248597279-f99d160bfcbc?w=800', alt: 'Brahmi Hair Oil', isPrimary: true }
    ],
    ingredients: [
      { name: 'Brahmi Extract', sanskritName: 'Bacopa Monnieri', percentage: 30, description: 'Calms the mind' },
      { name: 'Bhringraj Extract', sanskritName: 'Eclipta Alba', percentage: 30, description: 'Hair growth' },
      { name: 'Amla Extract', sanskritName: 'Emblica Officinalis', percentage: 20, description: 'Prevents premature graying' },
      { name: 'Coconut Oil Base', percentage: 20 }
    ],
    benefits: [
      'Promotes hair growth',
      'Reduces hair fall',
      'Prevents premature graying',
      'Calms the mind',
      'Nourishes scalp'
    ],
    dosage: {
      adults: 'Apply 2-3 times weekly',
      instructions: 'Massage into scalp, leave for 30-60 minutes, then wash'
    },
    dosha: ['Pitta', 'Vata'],
    stock: 90,
    weight: { value: 200, unit: 'ml' },
    isFeatured: true,
    tags: ['hair-growth', 'scalp-health', 'stress-relief']
  },
  // Teas
  {
    name: 'Tulsi Green Tea',
    shortDescription: 'Immunity boosting herbal tea',
    description: 'A refreshing blend of holy basil (Tulsi) and green tea. Perfect for daily wellness and stress relief.',
    price: 249,
    category: categoryIds['Herbal Tea'],
    images: [
      { url: 'https://images.unsplash.com/photo-1564890369478-c89ca6d9cde9?w=800', alt: 'Tulsi Tea', isPrimary: true }
    ],
    ingredients: [
      { name: 'Tulsi Leaves', sanskritName: 'Ocimum Sanctum', percentage: 50, description: 'Holy Basil' },
      { name: 'Green Tea', percentage: 40 },
      { name: 'Natural Flavors', percentage: 10 }
    ],
    benefits: [
      'Boosts immunity',
      'Reduces stress',
      'Rich in antioxidants',
      'Supports respiratory health',
      'Promotes mental clarity'
    ],
    dosage: {
      adults: '1 tea bag or 1 teaspoon',
      frequency: '2-3 cups daily',
      instructions: 'Steep in hot water for 3-5 minutes'
    },
    certifications: [
      { name: 'Organic' }
    ],
    dosha: ['Kapha', 'Vata'],
    stock: 250,
    weight: { value: 25, unit: 'tablets' },
    tags: ['immunity', 'stress-relief', 'antioxidants']
  },
  {
    name: 'Digestive Wellness Tea',
    shortDescription: 'Soothing blend for digestive comfort',
    description: 'A warming blend of ginger, fennel, and cumin to support healthy digestion after meals.',
    price: 199,
    category: categoryIds['Herbal Tea'],
    images: [
      { url: 'https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=800', alt: 'Digestive Tea', isPrimary: true }
    ],
    ingredients: [
      { name: 'Ginger', sanskritName: 'Zingiber Officinale', percentage: 40 },
      { name: 'Fennel Seeds', sanskritName: 'Foeniculum Vulgare', percentage: 30 },
      { name: 'Cumin Seeds', sanskritName: 'Cuminum Cyminum', percentage: 30 }
    ],
    benefits: [
      'Aids digestion',
      'Reduces bloating',
      'Soothes stomach discomfort',
      'Promotes metabolism',
      'Refreshing taste'
    ],
    dosage: {
      adults: '1 cup',
      frequency: 'After meals',
      instructions: 'Steep in hot water for 5 minutes'
    },
    dosha: ['Vata', 'Kapha'],
    stock: 180,
    weight: { value: 100, unit: 'g' },
    tags: ['digestion', 'bloating', 'metabolism']
  },
  // Skincare
  {
    name: 'Kumkumadi Face Serum',
    shortDescription: 'Radiant skin complexion serum',
    description: 'Luxurious Ayurvedic serum with saffron and other precious herbs for glowing, youthful skin.',
    price: 899,
    comparePrice: 1199,
    category: categoryIds['Skincare'],
    images: [
      { url: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=800', alt: 'Face Serum', isPrimary: true }
    ],
    ingredients: [
      { name: 'Saffron', sanskritName: 'Crocus Sativus', description: 'Brightens complexion' },
      { name: 'Sandalwood', sanskritName: 'Santalum Album', description: 'Soothes skin' },
      { name: 'Turmeric', sanskritName: 'Curcuma Longa', description: 'Anti-inflammatory' },
      { name: 'Almond Oil', sanskritName: 'Prunus Amygdalus', description: 'Nourishes skin' }
    ],
    benefits: [
      'Brightens complexion',
      'Reduces dark spots',
      'Anti-aging properties',
      'Evens skin tone',
      'Hydrates deeply'
    ],
    dosage: {
      adults: '2-3 drops',
      frequency: 'Twice daily',
      bestTime: 'Morning and night',
      instructions: 'Apply to clean face and neck, massage gently'
    },
    dosha: ['Pitta', 'Vata'],
    stock: 75,
    weight: { value: 30, unit: 'ml' },
    isFeatured: true,
    isNewArrival: true,
    tags: ['anti-aging', 'brightening', 'luxury']
  },
  {
    name: 'Neem Face Pack',
    shortDescription: 'Purifying clay mask',
    description: 'Deep cleansing face pack with neem and multani mitti for clear, healthy skin.',
    price: 199,
    category: categoryIds['Skincare'],
    images: [
      { url: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=800', alt: 'Neem Face Pack', isPrimary: true }
    ],
    ingredients: [
      { name: 'Neem Powder', sanskritName: 'Azadirachta Indica', percentage: 40 },
      { name: 'Multani Mitti', percentage: 40, description: 'Fullers Earth' },
      { name: 'Turmeric', sanskritName: 'Curcuma Longa', percentage: 20 }
    ],
    benefits: [
      'Deep cleanses pores',
      'Reduces acne',
      'Controls oil',
      'Brightens skin',
      'Natural purification'
    ],
    dosage: {
      adults: '1-2 teaspoons',
      frequency: '2-3 times weekly',
      instructions: 'Mix with water or rose water, apply, leave for 15 minutes, rinse'
    },
    dosha: ['Kapha', 'Pitta'],
    stock: 160,
    weight: { value: 100, unit: 'g' },
    tags: ['acne', 'cleansing', 'oily-skin']
  }
];

const admin = {
  name: 'Admin User',
  email: 'admin@ayurveda.com',
  password: 'admin123',
  role: 'admin',
  isEmailVerified: true
};

// Connect to database
mongoose
  .connect(process.env.MONGODB_URI)
  .then(async () => {
    console.log('✅ MongoDB Connected for seeding');

    // Clear existing data
    await Category.deleteMany();
    await Product.deleteMany();
    await User.deleteMany();
    console.log('🗑️  Cleared existing data');

    // Insert categories
    const insertedCategories = await Category.insertMany(categories);
    console.log(`✅ ${insertedCategories.length} categories inserted`);

    // Create category ID map
    const categoryIds = {};
    insertedCategories.forEach(cat => {
      categoryIds[cat.name] = cat._id;
    });

    // Insert products
    const products = getProducts(categoryIds);
    const insertedProducts = await Product.insertMany(products);
    console.log(`✅ ${insertedProducts.length} products inserted`);

    // Insert admin user
    const adminUser = await User.create(admin);
    console.log(`✅ Admin user created: ${adminUser.email}`);

    console.log('🎉 Database seeded successfully!');
    console.log('');
    console.log('📧 Admin credentials:');
    console.log('   Email: admin@ayurveda.com');
    console.log('   Password: admin123');
    console.log('');
    process.exit(0);
  })
  .catch(err => {
    console.error('❌ Error seeding database:', err);
    process.exit(1);
  });
