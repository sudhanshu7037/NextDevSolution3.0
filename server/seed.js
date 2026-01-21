require('dotenv').config();
const mongoose = require('mongoose');
const User = require('./models/User');
const Content = require('./models/Content');
const Service = require('./models/Service');
const Blog = require('./models/Blog');

const seed = async () => {
  await mongoose.connect(process.env.MONGO_URI);
  
  // Create Admin ONLY if it doesn't exist (one-time setup)
  const adminUsername = process.env.ADMIN_USERNAME || 'admin';
  const adminPassword = process.env.ADMIN_PASSWORD || 'password123';
  
  const adminUser = await User.findOne({ username: adminUsername });
  if (!adminUser) {
    await User.create({ username: adminUsername, password: adminPassword });
    console.log(`✅ Admin user created: ${adminUsername}`);
    console.log(`⚠️  IMPORTANT: Change your password from the Admin Panel Settings!`);
  } else {
    console.log(`ℹ️  Admin user already exists. Use Admin Panel Settings to update credentials.`);
  }

  // Clear existing content to avoid index conflicts during re-seed
  await Content.deleteMany({});
  await Blog.deleteMany({});
  
  const contents = [
    // HOME PAGE
    {
      page: 'home',
      section: 'hero',
      data: {
        title: 'WE REINVENTED FOR YOU',
        subtitle: 'We specialize in custom solutions tailored to your business needs—delivering fast, secure, and scalable experiences. From startups to enterprises, we turn your ideas into powerful digital realities.',
        image: `/content/uploads/hero.jpg`
      }
    },
    {
      page: 'home',
      section: 'products',
      data: {
        title: 'Elevating Tomorrow\'s IT Landscape',
        list: [
          { id: 'crm', name: 'CRM', fullName: 'Customer Relationship Management', image: `/content/uploads/crm.jpg` },
          { id: 'hrm', name: 'HRM', fullName: 'Human Resource Management', image: `/content/uploads/hrm.jpg` },
          { id: 'sms', name: 'SMS', fullName: 'School Management System', image: `/content/uploads/sms.jpg` },
          { id: 'ims', name: 'IMS', fullName: 'Institute Management System', image: `/content/uploads/ims.jpg` },
          { id: 'ams', name: 'AMS', fullName: 'Attendance Management System', image: `/content/uploads/ams.jpg` },
          { id: 'bim', name: 'BIM', fullName: 'Billing & Invoice Management', image: `/content/uploads/bim.jpg` },
        ]
      }
    },
    {
      page: 'home',
      section: 'technologies',
      data: {
        title: 'Technologies We Work On',
        list: [
          { name: 'HTML5', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg' },
          { name: 'CSS3', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg' },
          { name: 'Bootstrap5', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/bootstrap/bootstrap-original.svg' },
          { name: 'Tailwind', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg' },
          { name: 'React', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg' },
          { name: 'Angular', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/angularjs/angularjs-original.svg' },
          { name: 'Sass', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/sass/sass-original.svg' },
          { name: 'JavaScript', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg' },
          { name: 'Node.js', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg' },
          { name: 'Express', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg' },
          { name: 'Python', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg' },
          { name: 'Java', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg' },
          { name: 'PHP', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/php/php-original.svg' },
          { name: 'Laravel', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/laravel/laravel-original.svg' },
          { name: 'CodeIgniter', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/codeigniter/codeigniter-plain.svg' },
          { name: 'MongoDB', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg' },
          { name: 'MySQL', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg' },
          { name: 'AWS', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-original-wordmark.svg' },
        ]
      }
    },
    {
      page: 'home',
      section: 'partners',
      data: {
        title: 'Partnership & Collaborations',
        list: [
          { name: 'AWS', logo: `/content/uploads/aws.png` },
          { name: 'Microsoft', logo: `/content/uploads/microsoft.svg` },
          { name: 'Google', logo: `/content/uploads/google.svg` },
          { name: 'Facebook', logo: `/content/uploads/facebook.svg` },
          { name: 'Innonex', logo: `/content/uploads/innonex.png` },
          { name: 'NIR 1 FZCO', logo: `/content/uploads/nir.png` },
          { name: 'Steadfast', logo: `/content/uploads/steadfast.png` },
          { name: 'Star India', logo: `/content/uploads/star.png` },
          { name: 'Power Text', logo: `/content/uploads/power.png` },
        ]
      }
    },
    {
      page: 'home',
      section: 'about_summary',
      data: {
        title: "Empowering Excellence: Our IT Solutions Story",
        subtitle: "NEXTDEVSOLUTION offers scalable and future-ready IT infrastructure for businesses of all sizes. Our solutions are designed to expand with your organization while ensuring seamless platform integration and operational efficiency.",
        points: [
          "Development: Custom software and web platforms",
          "Production: IT infrastructure and video content",
          "Branding: Impactful strategies and messaging"
        ],
        image: `/content/uploads/about.jpg`
      }
    },
    // ABOUT PAGE
    {
      page: 'about',
      section: 'main',
      data: {
        title: 'Empowering Excellence: Our IT Solutions Story',
        subtitle: 'At NEXTDEVSOLUTION, we believe in providing scalable infrastructure tailored to businesses of all sizes.',
        content: 'We are a team of passionate developers, designers, and marketers committed to delivering excellence. Our approach combines technical expertise with creative strategy to help our clients achieve their business goals in an ever-evolving digital landscape.',
        points: [
          "Custom-coded websites for maximum performance",
          "Impactful branding strategies and messaging",
          "Scalable IT infrastructure for business growth"
        ],
        image: `/content/uploads/about.jpg`
      }
    },
    {
      page: 'about',
      section: 'vision_mission',
      data: {
        vision: {
          title: 'Our Vision',
          text: 'Making every dream visible to the world. We aspire to be the global leader in providing innovative IT solutions that bridge the gap between imagination and reality.'
        },
        mission: {
          title: 'Our Mission',
          text: 'To deliver cutting-edge solutions that empower businesses with innovative technology, driving growth and efficiency in the digital world. We strive to provide unparalleled value through our dedication to quality and customer success.'
        }
      }
    },
    // SERVICES PAGES
    {
      page: 'web-development',
      section: 'main',
      data: {
        title: "Web Development",
        subtitle: "Create stunning, high-performance websites that represent your brand and engage your audience.",
        content: "Our web development services focus on creating fast, secure, and responsive websites. We use the latest technologies to ensure your site is not just a digital placeholder, but a powerful business tool that drives results.",
        image: `/content/uploads/hero.jpg`,
        features: ["Custom Web Design", "E-commerce Solutions", "CMS Integration", "Progressive Web Apps"]
      }
    },
    {
      page: 'app-development',
      section: 'main',
      data: {
        title: "App Development",
        subtitle: "Build powerful mobile applications for iOS and Android that deliver exceptional user experiences.",
        content: "We develop native and cross-platform mobile apps that are intuitive, robust, and scalable. Our team handles everything from conceptualization and UI/UX design to development and deployment on app stores.",
        image: `/content/uploads/blog3.jpg`,
        features: ["Native iOS & Android Apps", "Cross-Platform Development", "App UI/UX Design", "Backend API Integration"]
      }
    },
    {
      page: 'software',
      section: 'main',
      data: {
        title: "Custom Software Development",
        subtitle: "Build robust, scalable, and custom software solutions tailored to your unique business needs.",
        content: "Our custom software development services are focused on solving complex business challenges through innovative technology. We design and build high-performance software systems that streamline your operations and drive efficiency.",
        image: `/content/uploads/ims.jpg`,
        features: ["Enterprise Software Solutions", "Cloud-Native Applications", "API Development & Integration", "Software Maintenance & Support"]
      }
    },
    {
      page: 'digital-marketing',
      section: 'main',
      data: {
        title: "Digital Marketing",
        subtitle: "Drive growth and engagement with our comprehensive digital marketing strategies.",
        content: "We offer a full suite of digital marketing services to help your business reach its full potential online. From performance marketing to content strategy, we use data-driven insights to deliver measurable results.",
        image: `/content/uploads/blog2.jpg`,
        features: ["Performance Marketing", "Content Strategy", "Email Marketing", "PPC Advertising"]
      }
    },
    {
      page: 'seo',
      section: 'main',
      data: {
        title: "Search Engine Optimization",
        subtitle: "Elevate your online presence and dominate search rankings with our expert SEO services.",
        content: "Our SEO strategies are designed to increase your visibility and drive organic traffic. We focus on both on-page and off-page optimization to ensure your site ranks higher on search engines.",
        image: `/content/uploads/blog4.jpg`,
        features: ["Keyword Research", "On-page Optimization", "Backlink Building", "Technical SEO Audit", "Content Strategy"]
      }
    },
    {
      page: 'graphics',
      section: 'main',
      data: {
        title: "Graphics & Video Editing",
        subtitle: "Graphics and video editing involve creation and enhancement of visual content.",
        content: "Visual content is key to capturing attention in the digital age. Our expert designers and editors create stunning graphics and high-quality videos that tell your brand's story effectively.",
        image: `/content/uploads/blog6.jpg`,
        features: ["Social Media Graphics", "Video Production & Editing", "Business Profiles", "Custom Banners"]
      }
    },
    // CONTACT PAGE
    {
      page: 'contact',
      section: 'info',
      data: {
        title: "Get In Touch",
        subtitle: "Have a project in mind? Let's talk about how we can help your business grow.",
        address: "Nextdevsolution, Pune, Maharashtra, India",
        email: "info@nextdevsolution.in",
        phone: "+91 70333 13450",
        whatsapp: "+91 70333 13450"
      }
    },
    // CAREER PAGE
    {
      page: 'career',
      section: 'main',
      data: {
        title: "Work With Us",
        subtitle: "We're looking for passionate individuals to join our mission in building world-class digital experiences.",
        jobs: [
          { title: "React Developer", location: "Remote / Pune", type: "Full Time" },
          { title: "Node.js Developer", location: "Pune, India", type: "Full Time" },
          { title: "UI/UX Designer", location: "Remote", type: "Contract" }
        ]
      }
    }
  ];

  await Content.insertMany(contents);

  const blogs = [
    {
      title: "How AI is Revolutionizing Custom Software Development",
      excerpt: "Explore how artificial intelligence is streamlining coding processes and enhancing software scalability in 2026.",
      category: "Technology",
      author: "Admin",
      date: "Jan 15, 2026",
      image: `/content/uploads/blog1.jpg`,
      content: `
        <p class="mb-6">Artificial Intelligence (AI) is no longer just a buzzword; it's a transformative force that is fundamentally changing how custom software is developed, deployed, and maintained.</p>
        <h2 class="text-2xl font-bold mb-4 text-gray-900">Automated Future</h2>
        <p class="mb-6">AI coding assistants are now capable of generating production-ready code with minimal human intervention, allowing for rapid prototyping and deployment.</p>
      `
    },
    {
      title: "The Future of Digital Marketing: Trends to Watch",
      excerpt: "From personalized consumer experiences to AI-driven analytics, discover the future of digital marketing strategies.",
      category: "Marketing",
      author: "Admin",
      date: "Jan 12, 2026",
      image: `/content/uploads/blog2.jpg`,
      content: "<p>Marketing is shifting towards deep personalization using data analytics.</p>"
    }
  ];

  await Blog.insertMany(blogs);

  console.log('Seeding complete');
  process.exit();
};

seed();
