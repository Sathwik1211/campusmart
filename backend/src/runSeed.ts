/**
 * Production seed runner — compiled to dist/runSeed.js by tsc.
 * Called by the Railway start command to create the admin user and seed
 * homepage content on first deploy (upsert is safe to re-run).
 */
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

// ── Homepage feature cards (masonry grid) ─────────────────────────────────
const HOME_FEATURES = [
    { title: 'Digital Transformation', description: 'Cutting-edge digital infrastructure transforming how modern campuses operate and learn.', image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=800&q=90', href: '/digital-transformation', tag: 'Digital', color: '#3B82F6', h: 340 },
    { title: 'AI-Powered Learning Stations', description: 'Intelligent AI stations personalising education for every student at every level.', image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=800&q=90', href: '/ai-stations', tag: 'AI & Tech', color: '#8B5CF6', h: 220 },
    { title: 'Innovation Centres', description: 'Purpose-built spaces designed to unlock creativity, collaboration and breakthrough thinking.', image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=800&q=90', href: '/innovation-centres', tag: 'Innovation', color: '#EC4899', h: 270 },
    { title: 'Smart Classrooms', description: 'IoT-connected rooms with interactive boards, real-time analytics and immersive tools.', image: 'https://images.unsplash.com/photo-1580582932707-520aed937b7b?auto=format&fit=crop&w=800&q=90', href: '/tech-infra', tag: 'Tech Infra', color: '#06B6D4', h: 220 },
    { title: 'Campus Furniture Design', description: 'Thoughtfully engineered, ergonomic furniture that elevates the academic experience.', image: 'https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=800&q=90', href: '/furniture', tag: 'Furniture', color: '#F59E0B', h: 360 },
    { title: 'Sports Infrastructure', description: 'World-class athletic facilities nurturing champions, wellness, and team spirit.', image: 'https://images.unsplash.com/photo-1575361204480-aadea25e6e68?auto=format&fit=crop&w=800&q=90', href: '/sports-infra', tag: 'Sports', color: '#10B981', h: 240 },
    { title: 'Library Management', description: 'AI-driven smart library solutions providing seamless access to global knowledge.', image: 'https://images.unsplash.com/photo-1568667256549-094345857637?auto=format&fit=crop&w=800&q=90', href: '/library-management', tag: 'Library', color: '#6366F1', h: 300 },
    { title: 'Science & Tech Labs', description: 'Fully equipped STEM laboratories built for discovery, experimentation and innovation.', image: 'https://images.unsplash.com/photo-1532094349884-543290e34c7d?auto=format&fit=crop&w=800&q=90', href: '/labs', tag: 'Labs', color: '#14B8A6', h: 200 },
    { title: 'Campus Master Planning', description: 'Visionary campus planning from concept to construction, built to inspire generations.', image: 'https://images.unsplash.com/photo-1486325212027-8081e485255e?auto=format&fit=crop&w=800&q=90', href: '/campus-design', tag: 'Planning', color: '#F97316', h: 320 },
    { title: 'AR / VR Learning', description: 'Immersive reality experiences bringing complex concepts to vivid, unforgettable life.', image: 'https://images.unsplash.com/photo-1622979135225-d2ba269cf1ac?auto=format&fit=crop&w=800&q=90', href: '/digital-transformation', tag: 'AR / VR', color: '#A855F7', h: 240 },
    { title: 'Campus Automation', description: 'Smart systems automating admissions, attendance, finance and governance seamlessly.', image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=90', href: '/campus-automation', tag: 'Automation', color: '#0EA5E9', h: 200 },
    { title: 'Collaboration Spaces', description: 'Dynamic, flexible zones engineered for productive teamwork and creative ideation.', image: 'https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=800&q=90', href: '/collaboration', tag: 'Spaces', color: '#EF4444', h: 260 },
];

// ── Sidebar content ───────────────────────────────────────────────────────
const HOME_SIDEBAR = {
    classifieds: [
        { label: 'Colleges / Universities for Sale', href: '/classifieds' },
        { label: 'Education Infra Funding', href: '/classifieds' },
        { label: 'Partner with Running Colleges', href: '/partnership' },
    ],
    resources: [
        { label: 'Complete Guide on AI Implementation', href: '/ai-guide' },
        { label: 'Setting Up a College in India', href: '/setup-college' },
        { label: 'UGC Guidelines for Digital Campus', href: '/ugc-guidelines' },
        { label: 'Product Catalog 2025', href: '/product-catalog' },
        { label: 'Lookbook – Play Furniture', href: '/lookbook' },
    ],
    completedProjects: [
        { label: 'Campus Master Planning', href: '/catalogues' },
        { label: '20 Stunning College Buildings', href: '/catalogues' },
        { label: 'Academic buildings', href: '/catalogues' },
        { label: 'Research facilities', href: '/catalogues' },
        { label: 'Student life centers', href: '/catalogues' },
        { label: 'Athletic complexes', href: '/catalogues' },
    ],
    contacts: [
        { bg: '#FFD700', title: 'Design & Architecture', contact: 'info@campusmart.in', href: 'mailto:info@campusmart.in', isEmail: true },
        { bg: '#00c4cc', title: 'Campus Innovations', contact: '9966109191', href: 'tel:+919966109191', isEmail: false },
        { bg: '#C8FF00', title: 'Partner Campus', contact: '9866091111', href: 'tel:+919866091111', isEmail: false },
    ],
};

// ── Inner page data ───────────────────────────────────────────────────────
const PAGE_DATA: Record<string, object> = {
    'ai-ml': {
        heroTitle: 'AI & Machine Learning',
        heroSubtitle: 'Cutting-edge AI and ML solutions for educational institutions. Prepare students for the future with hands-on learning experiences.',
        heroImage: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80',
        section1Title: 'AI/ML Solutions',
        section2Title: 'Future-Ready Education',
        cards: [
            { title: 'AI Learning Stations', description: 'Interactive AI-powered learning environments' },
            { title: 'ML Labs', description: 'Machine learning experimentation setups' },
            { title: 'Coding Platforms', description: 'Programming and development environments' },
            { title: 'Computing Infrastructure', description: 'High-performance computing solutions' },
        ],
    },
    'campus-design': {
        heroTitle: 'Campus Design',
        heroSubtitle: 'Transform your educational vision into reality with our comprehensive campus design services. We create spaces that inspire learning and foster innovation.',
        heroImage: 'https://images.unsplash.com/photo-1562774053-701939374585?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80',
        section1Title: 'Our Design Services',
        section2Title: 'Why Choose Our Campus Design?',
        ctaTitle: 'Ready to Design Your Dream Campus?',
        ctaSubtitle: 'Let our expert team help you create a campus that inspires and empowers.',
        cards: [
            { title: 'Master Planning', description: 'Comprehensive campus master planning for new and existing institutions.', image: 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80' },
            { title: 'Architectural Design', description: 'Innovative architectural solutions for educational buildings.', image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80' },
            { title: 'Interior Design', description: 'Functional and aesthetic interior spaces for learning.', image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80' },
            { title: 'Landscape Design', description: 'Outdoor spaces that enhance the campus environment.', image: 'https://images.unsplash.com/photo-1562774053-701939374585?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80' },
        ],
        features: [
            'Space optimization and utilization analysis',
            'Sustainable and eco-friendly design',
            'NEP 2020 compliant layouts',
            'Accessibility and inclusivity',
            'Future-ready infrastructure',
            'Cost-effective solutions',
        ],
    },
    'furniture': {
        heroTitle: 'Furniture Solutions',
        heroSubtitle: 'Premium quality furniture designed for educational institutions. From classrooms to libraries, we provide durable and ergonomic solutions.',
        heroImage: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80',
        section1Title: 'Furniture Categories',
        section2Title: 'Why Our Furniture?',
        cards: [
            { title: 'Classroom Furniture', description: '45 products', image: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80' },
            { title: 'Library Furniture', description: '28 products', image: 'https://images.unsplash.com/photo-1568667256549-094345857637?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80' },
            { title: 'Office Furniture', description: '32 products', image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80' },
            { title: 'Hostel Furniture', description: '18 products', image: 'https://images.unsplash.com/photo-1505693416388-b0346ef414b8?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80' },
            { title: 'Play Furniture', description: '24 products', image: 'https://images.unsplash.com/photo-1566454544259-f4b94c3d758c?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80' },
            { title: 'Premium Furniture', description: '15 products', image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80' },
        ],
        features: [
            'Ergonomic designs for comfort',
            'Durable and long-lasting materials',
            'Customizable options available',
            'Eco-friendly manufacturing',
            'Bulk order discounts',
            'Installation services included',
        ],
    },
    'labs': {
        heroTitle: 'Laboratory Solutions',
        heroSubtitle: 'State-of-the-art laboratory setups for schools and colleges. From STEM labs to specialized research facilities, we deliver excellence.',
        heroImage: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80',
        section1Title: 'Lab Types',
        cards: [
            { title: 'Chemistry Lab', description: 'Fully equipped chemistry laboratories with modern apparatus', image: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80' },
            { title: 'Physics Lab', description: 'Advanced physics experimentation environments', image: 'https://images.unsplash.com/photo-1581093458791-9f3c3900df4b?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80' },
            { title: 'Biology Lab', description: 'Complete biology and science labs', image: 'https://images.unsplash.com/photo-1579154204601-01588f351e67?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80' },
            { title: 'Computer Lab', description: 'High-spec computer labs for digital learning', image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80' },
        ],
    },
    'libraries': {
        heroTitle: 'Library Solutions',
        heroSubtitle: 'Modern libraries designed to serve as knowledge hubs. From traditional reading rooms to digital resource centers, we create inspiring learning spaces.',
        heroImage: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80',
        section1Title: 'Our Library Solutions',
        cards: [
            { title: 'Traditional Libraries', description: 'Classic reading rooms with comprehensive book collections', image: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80' },
            { title: 'Digital Libraries', description: 'E-learning resources and digital content access', image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80' },
            { title: 'Study Zones', description: 'Quiet study areas and collaborative group spaces', image: 'https://images.unsplash.com/photo-1568667256549-094345857637?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80' },
            { title: 'Library Management', description: 'Smart library management systems and cataloguing', image: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80' },
        ],
    },
    'innovation': {
        heroTitle: 'Innovation Centers',
        heroSubtitle: 'Create spaces that nurture creativity and innovation. From maker spaces to research centers, we build environments that inspire breakthrough thinking.',
        heroImage: 'https://images.unsplash.com/photo-1497366216548-37526070297c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80',
        section1Title: 'Innovation Solutions',
        cards: [
            { title: 'Innovation Labs', description: 'Spaces for creative thinking and prototyping' },
            { title: 'Startup Incubators', description: 'Support for student entrepreneurship' },
            { title: 'Research Centers', description: 'Dedicated research and development spaces' },
            { title: 'Maker Spaces', description: 'Hands-on creation and experimentation areas' },
        ],
    },
    'sports-infra': {
        heroTitle: 'Sports Infrastructure',
        heroSubtitle: 'World-class sports facilities for schools and colleges. We design and build sports infrastructure that promotes physical education and athletic excellence.',
        heroImage: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80',
        section1Title: 'Our Sports Facilities',
        cards: [
            { title: 'Indoor Sports', description: 'Basketball, badminton, volleyball courts and gymnasiums', image: 'https://images.unsplash.com/photo-1546519638405-a9a10ea4b1b7?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80' },
            { title: 'Outdoor Facilities', description: 'Football fields, running tracks, and cricket grounds', image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80' },
            { title: 'Aquatic Centers', description: 'Swimming pools and aquatic training facilities', image: 'https://images.unsplash.com/photo-1530549387789-4c1017266635?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80' },
            { title: 'Fitness Centers', description: 'Modern gymnasium and fitness equipment', image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80' },
        ],
        features: [
            'NEP 2020 sports curriculum compliance',
            'Professional grade equipment',
            'Safety-first design approach',
            'Multi-sport versatile spaces',
            'Flood-lighting for evening use',
            'Spectator seating and facilities',
        ],
    },
    'tech-infra': {
        heroTitle: 'Technology Infrastructure',
        heroSubtitle: 'Future-proof your campus with cutting-edge technology infrastructure. From high-speed networks to smart classrooms, we build the digital backbone of modern education.',
        heroImage: 'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80',
        section1Title: 'Technology Solutions',
        cards: [
            { title: 'Network Infrastructure', description: 'High-speed campus-wide Wi-Fi and LAN systems', image: 'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80' },
            { title: 'Smart Classrooms', description: 'Interactive boards, projectors, and AV systems', image: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80' },
            { title: 'Data Centers', description: 'Campus servers, cloud integration and data management', image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80' },
            { title: 'Security Systems', description: 'CCTV surveillance, access control and safety systems', image: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80' },
        ],
    },
    'collaboration': {
        heroTitle: 'Collaboration Spaces',
        heroSubtitle: 'Foster teamwork and creativity with purpose-built collaboration environments. Modern spaces designed to bring students and faculty together.',
        heroImage: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80',
        section1Title: 'Our Collaboration Solutions',
        cards: [
            { title: 'Group Study Rooms', description: 'Sound-isolated rooms with whiteboards and AV equipment', image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80' },
            { title: 'Conference Halls', description: 'Fully equipped conference and seminar halls', image: 'https://images.unsplash.com/photo-1505373877841-8d25f7d46678?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80' },
            { title: 'Open Work Zones', description: 'Flexible, open-plan areas inspiring creativity', image: 'https://images.unsplash.com/photo-1497366754035-f200968a6e72?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80' },
            { title: 'Digital Hubs', description: 'Technology-rich spaces for digital collaboration', image: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80' },
        ],
    },
    'corporate': {
        heroTitle: 'About CampusMart',
        heroSubtitle: 'CampusMart is a consortium of architects, designers, campus innovators who strive to bring the learning outcome through latest infrastructure and edtech. The first ever company in Asia to bring curriculum mapped solutions to campus industry.',
        heroImage: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80',
        section1Title: 'Corporate Services',
        cards: [
            { title: 'Office Design', description: 'Modern office interiors and workspace solutions', image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80' },
            { title: 'Conference Facilities', description: 'Professional meeting rooms and boardrooms', image: 'https://images.unsplash.com/photo-1505373877841-8d25f7d46678?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80' },
            { title: 'Training Centers', description: 'Purpose-built training and learning centers', image: 'https://images.unsplash.com/photo-1573164713714-d95e436ab8d6?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80' },
            { title: 'Campus Canteens', description: 'Cafeteria and food court design and setup', image: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80' },
        ],
        features: [
            'Space planning and optimization',
            'Ergonomic and wellness-focused design',
            'Brand identity integration',
            'Sustainability and green design',
            'Technology integration',
            'Turnkey project delivery',
        ],
    },
    'ai-guide': {
        heroTitle: 'AI Implementation Guide',
        heroSubtitle: 'Your comprehensive guide to implementing AI solutions in educational institutions. Step-by-step roadmap for digital transformation.',
        heroImage: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80',
        section1Title: 'AI Implementation Steps',
        cards: [
            { title: 'Assessment', description: 'Evaluate your current infrastructure and readiness' },
            { title: 'Planning', description: 'Develop a customized AI integration roadmap' },
            { title: 'Implementation', description: 'Deploy AI solutions with expert guidance' },
            { title: 'Training', description: 'Empower teachers and staff with AI skills' },
        ],
    },
    'ai-stations': {
        heroTitle: 'AI Learning Stations',
        heroSubtitle: 'Dedicated AI-powered learning stations that bring artificial intelligence education into the classroom.',
        heroImage: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80',
        section1Title: 'Station Features',
        cards: [
            { title: 'Interactive AI Models', description: 'Hands-on AI model training and testing' },
            { title: 'Robotics Integration', description: 'AI-powered robotics kits and projects' },
            { title: 'Data Science Tools', description: 'Real-world data analysis and visualization tools' },
            { title: 'Course Content', description: 'Curriculum-aligned AI and ML modules' },
        ],
    },
    'campus-automation': {
        heroTitle: 'Campus Automation',
        heroSubtitle: 'Smart automation solutions that make your campus more efficient, secure, and sustainable.',
        heroImage: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80',
        section1Title: 'Automation Systems',
        cards: [
            { title: 'Smart Attendance', description: 'Biometric and RFID-based attendance systems' },
            { title: 'Energy Management', description: 'Automated lighting, HVAC and energy monitoring' },
            { title: 'Smart Security', description: 'Integrated CCTV and access control systems' },
            { title: 'Building Management', description: 'Centralized building management and control' },
        ],
    },
    'campus-design-execution': {
        heroTitle: 'Campus Design & Execution',
        heroSubtitle: 'From blueprints to completion — we handle every phase of your campus design and construction project.',
        heroImage: 'https://images.unsplash.com/photo-1562774053-701939374585?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80',
        section1Title: 'Our Execution Process',
        cards: [
            { title: 'Site Survey', description: 'Accurate site surveys and feasibility studies' },
            { title: 'Design & Planning', description: 'Architectural and interior design development' },
            { title: 'Construction', description: 'Quality-focused construction management' },
            { title: 'Handover', description: 'Final inspection, testing, and project handover' },
        ],
    },
    'digital-transformation': {
        heroTitle: 'Digital Transformation',
        heroSubtitle: "Accelerate your institution's digital transformation journey with our expert guidance and proven solutions.",
        heroImage: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80',
        section1Title: 'Transformation Areas',
        cards: [
            { title: 'Digital Learning', description: 'E-learning platforms and digital curriculum delivery' },
            { title: 'Administration', description: 'ERP and management information systems' },
            { title: 'Communication', description: 'Digital portals for students, parents and staff' },
            { title: 'Analytics', description: 'Data analytics and institution performance dashboards' },
        ],
    },
    'furniture-design-supply': {
        heroTitle: 'Furniture Design & Supply',
        heroSubtitle: 'End-to-end furniture solutions for educational institutions — from custom design to delivery and installation.',
        heroImage: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80',
        section1Title: 'Our Services',
        cards: [
            { title: 'Custom Design', description: 'Bespoke furniture tailored to your space and needs', image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80' },
            { title: 'Bulk Supply', description: 'Large-scale procurement with competitive pricing', image: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80' },
            { title: 'Modular Systems', description: 'Flexible modular furniture for dynamic spaces', image: 'https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80' },
            { title: 'Installation', description: 'Professional installation and assembly services', image: 'https://images.unsplash.com/photo-1484101403633-562f891dc89a?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80' },
        ],
    },
    'innovation-centres': {
        heroTitle: 'Innovation Centres',
        heroSubtitle: 'Build world-class innovation centres that empower students to create, experiment, and transform ideas into reality.',
        heroImage: 'https://images.unsplash.com/photo-1497366216548-37526070297c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80',
        section1Title: 'Centre Components',
        cards: [
            { title: 'Prototyping Lab', description: '3D printers, laser cutters, and fabrication tools' },
            { title: 'Ideation Lounge', description: 'Creative zones with whiteboards and collaboration tools' },
            { title: 'Demo Day Stage', description: 'Presentation and demo spaces for showcasing projects' },
            { title: 'Mentorship Hub', description: 'Dedicated space for mentoring and expert sessions' },
        ],
    },
    'library-management': {
        heroTitle: 'Library Management Systems',
        heroSubtitle: 'Digital library management solutions to automate cataloging, circulation, and patron management.',
        heroImage: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80',
        section1Title: 'System Features',
        cards: [
            { title: 'Digital Catalogue', description: 'Searchable digital catalogue for all resources' },
            { title: 'Book Issue & Return', description: 'Automated issue and return tracking' },
            { title: 'Member Portal', description: 'Self-service portal for students and faculty' },
            { title: 'Reports & Analytics', description: 'Detailed usage reports and borrowing trends' },
        ],
    },
    'lms': {
        heroTitle: 'Learning Management Systems',
        heroSubtitle: 'Powerful LMS platforms that bring your curriculum, teachers, and students together in one digital space.',
        heroImage: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80',
        section1Title: 'LMS Features',
        cards: [
            { title: 'Course Management', description: 'Create, organize and deliver digital courses easily' },
            { title: 'Assessments', description: 'Online quizzes, assignments and grading' },
            { title: 'Video Learning', description: 'Recorded lectures and live virtual classrooms' },
            { title: 'Progress Tracking', description: 'Real-time student performance and engagement analytics' },
        ],
    },
    'sports-design-execution': {
        heroTitle: 'Sports Design & Execution',
        heroSubtitle: 'Complete sports facility design and construction services — from concept to final handover.',
        heroImage: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80',
        section1Title: 'Our Approach',
        cards: [
            { title: 'Sport-Specific Design', description: 'Custom designs meeting international sports standards' },
            { title: 'Material Sourcing', description: 'High-quality certified sports surface materials' },
            { title: 'Construction', description: 'Expert construction with minimal disruption' },
            { title: 'Certification', description: 'Sports facilities certified to national/international standards' },
        ],
    },
    'partnership': {
        heroTitle: 'Partner with CampusMart',
        heroSubtitle: 'Join our network of trusted partners and together build better educational ecosystems across India.',
        heroImage: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80',
        section1Title: 'Partnership Models',
        cards: [
            { title: 'Vendor Partnership', description: 'Supply products through our campus marketplace' },
            { title: 'Design Collaboration', description: 'Partner on large campus design projects' },
            { title: 'Technology Alliance', description: 'Integrate your technology with our platforms' },
            { title: 'Academic Partnership', description: 'Educational and training program collaboration' },
        ],
        features: [
            'Access to 1000+ institutions nationwide',
            'Co-marketing and branding opportunities',
            'Priority project consideration',
            'Dedicated partner success manager',
            'Revenue sharing models',
        ],
    },
    'new-environments': {
        heroTitle: 'New Learning Environments',
        heroSubtitle: 'Reimagining educational spaces for the 21st century learner. Future-forward environments designed for creativity, collaboration, and exploration.',
        heroImage: 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80',
        section1Title: 'Environment Types',
        cards: [
            { title: 'Flexible Classrooms', description: 'Adaptable spaces that support multiple teaching modes', image: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80' },
            { title: 'Outdoor Learning', description: 'Nature-integrated learning spaces and gardens', image: 'https://images.unsplash.com/photo-1562774053-701939374585?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80' },
            { title: 'STEM Hubs', description: 'Dedicated science, technology, engineering and math hubs', image: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80' },
            { title: 'Wellness Zones', description: 'Meditation, mindfulness and mental wellness areas', image: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80' },
        ],
    },
    'assessment-system': {
        heroTitle: 'Assessment Systems',
        heroSubtitle: 'Modern assessment solutions that move beyond traditional exams. Holistic evaluation tools designed for 21st century education.',
        heroImage: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80',
        section1Title: 'Assessment Tools',
        cards: [
            { title: 'Online Assessments', description: 'Proctored online exams and quizzes' },
            { title: 'Continuous Assessment', description: 'Ongoing assessments aligned with NEP 2020' },
            { title: 'Portfolio Assessment', description: 'Student portfolio and project evaluation' },
            { title: 'Competency Mapping', description: 'Skills and competency based assessment frameworks' },
        ],
    },
    'ai-digital-design-supply': {
        heroTitle: 'AI-Enabled Digital Design & Supply',
        heroSubtitle: 'Transforming campus design and procurement with AI-powered tools for faster decisions and smarter supply chains.',
        heroImage: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80',
        section1Title: 'AI-Powered Services',
        cards: [
            { title: 'AI Space Planning', description: 'AI-optimized campus layout and space utilization analysis' },
            { title: 'Smart Procurement', description: 'Intelligent vendor selection and cost optimization' },
            { title: 'Predictive Maintenance', description: 'AI-driven maintenance scheduling and alerts' },
            { title: 'Digital Twin', description: 'Virtual campus simulation before construction begins' },
        ],
    },
    'setup-college': {
        heroTitle: 'Setup Your College',
        heroSubtitle: 'Your one-stop guide to setting up a new educational institution from scratch — infrastructure, technology, and compliance.',
        heroImage: 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80',
        section1Title: 'Setup Steps',
        cards: [
            { title: 'Regulatory Compliance', description: 'UGC, AICTE and state board compliance guidance' },
            { title: 'Infrastructure Planning', description: 'Campus planning, layout and specification development' },
            { title: 'Procurement', description: 'Furniture, labs, technology and library procurement' },
            { title: 'Launch Support', description: 'Operational support from day one' },
        ],
    },
    'lookbook': {
        heroTitle: 'CampusMart Lookbook',
        heroSubtitle: 'Explore our portfolio of completed campus transformations. Get inspired by real projects across India.',
        heroImage: 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80',
        section1Title: 'Featured Projects',
        cards: [
            { title: 'IIT Campus Revamp', description: 'Complete modernization of labs and library', image: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80' },
            { title: 'CBSE School Setup', description: 'New campus design and furniture supply', image: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80' },
            { title: 'Corporate University', description: 'Innovation center and collaboration spaces', image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80' },
            { title: 'Sports Academy', description: 'Full sports infrastructure development', image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80' },
        ],
    },
    'ugc-guidelines': {
        heroTitle: 'UGC Guidelines',
        heroSubtitle: 'Stay compliant with the latest University Grants Commission guidelines. Your comprehensive reference for UGC regulations and requirements.',
        heroImage: 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80',
        section1Title: 'Key Guidelines',
        cards: [
            { title: 'Infrastructure Standards', description: 'Minimum infrastructure requirements for colleges' },
            { title: 'Library Requirements', description: 'UGC minimum library and resource requirements' },
            { title: 'Lab Standards', description: 'Approved laboratory layouts and equipment standards' },
            { title: 'Digital Initiatives', description: 'SWAYAM, NPTEL and digital learning compliance' },
        ],
    },
    'product-catalog': {
        heroTitle: 'Product Catalog',
        heroSubtitle: 'Browse our comprehensive catalog of educational infrastructure products — furniture, lab equipment, technology, and more.',
        heroImage: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80',
        section1Title: 'Product Categories',
        cards: [
            { title: 'Furniture', description: 'School desks, chairs, lab benches and more', image: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80' },
            { title: 'Lab Equipment', description: 'Science apparatus and lab consumables', image: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80' },
            { title: 'Technology', description: 'Smartboards, computers, tablets and AV equipment', image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80' },
            { title: 'Sports Equipment', description: 'Sports goods for indoor and outdoor activities', image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80' },
        ],
    },
};

async function seed() {
    console.log('🌱 Running production seed...');

    // ── Admin user ────────────────────────────────────────────────────────
    const adminHash = await bcrypt.hash('Admin@1234', 10);
    await prisma.user.upsert({
        where: { email: 'admin@campusmart.in' },
        update: {},
        create: {
            name: 'CampusMart Admin',
            email: 'admin@campusmart.in',
            passwordHash: adminHash,
            role: 'admin',
            emailVerified: true,
            phone: '+91 98765 00000',
            institution: 'CampusMart',
        },
    });
    console.log('✓ Admin user ready: admin@campusmart.in / Admin@1234');

    // ── Hero banner ───────────────────────────────────────────────────────
    await prisma.siteContent.upsert({
        where: { key: 'home_hero' },
        update: {
            value: JSON.stringify({
                title: 'Your Complete Guide to Campus Infrastructure',
                subtitle: 'Physical + Digital',
                image: 'https://images.unsplash.com/photo-1562774053-701939374585?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80',
            }),
        },
        create: {
            key: 'home_hero',
            value: JSON.stringify({
                title: 'Your Complete Guide to Campus Infrastructure',
                subtitle: 'Physical + Digital',
                image: 'https://images.unsplash.com/photo-1562774053-701939374585?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80',
            }),
        },
    });

    // ── Service cards ─────────────────────────────────────────────────────
    await prisma.siteContent.upsert({
        where: { key: 'home_services' },
        update: {
            value: JSON.stringify([
                { title: 'Furniture Design+ Supply', bgColor: '#ef4444', textColor: '#ffffff', href: '/furniture-design-supply' },
                { title: 'Campus Design+ Execution', bgColor: '#a3e635', textColor: '#000000', href: '/campus-design-execution' },
                { title: 'Sports Design+ Execution', bgColor: '#06b6d4', textColor: '#ffffff', href: '/sports-design-execution' },
                { title: 'AI/Digital Design+ Supply', bgColor: '#a855f7', textColor: '#ffffff', href: '/ai-digital-design-supply' },
            ]),
        },
        create: {
            key: 'home_services',
            value: JSON.stringify([
                { title: 'Furniture Design+ Supply', bgColor: '#ef4444', textColor: '#ffffff', href: '/furniture-design-supply' },
                { title: 'Campus Design+ Execution', bgColor: '#a3e635', textColor: '#000000', href: '/campus-design-execution' },
                { title: 'Sports Design+ Execution', bgColor: '#06b6d4', textColor: '#ffffff', href: '/sports-design-execution' },
                { title: 'AI/Digital Design+ Supply', bgColor: '#a855f7', textColor: '#ffffff', href: '/ai-digital-design-supply' },
            ]),
        },
    });

    // ── Masonry feature cards ─────────────────────────────────────────────
    await prisma.siteContent.upsert({
        where: { key: 'home_features' },
        update: { value: JSON.stringify(HOME_FEATURES) },
        create: { key: 'home_features', value: JSON.stringify(HOME_FEATURES) },
    });

    // ── Sidebar ───────────────────────────────────────────────────────────
    await prisma.siteContent.upsert({
        where: { key: 'home_sidebar' },
        update: { value: JSON.stringify(HOME_SIDEBAR) },
        create: { key: 'home_sidebar', value: JSON.stringify(HOME_SIDEBAR) },
    });

    console.log('✓ Homepage content seeded (hero, services, features, sidebar)');

    // ── Pages ─────────────────────────────────────────────────────────────
    const corePages = [
        { slug: 'about-us', title: 'About Us', template: 'corporate' },
        { slug: 'ai-digital-design-supply', title: 'AI/Digital Design & Supply', template: 'ai-digital-design-supply' },
        { slug: 'ai-guide', title: 'AI Guide', template: 'ai-guide' },
        { slug: 'ai-ml', title: 'AI & ML Labs', template: 'ai-ml' },
        { slug: 'ai-stations', title: 'AI Stations', template: 'ai-stations' },
        { slug: 'assessment-system', title: 'Assessment System', template: 'assessment-system' },
        { slug: 'blog', title: 'Blog', template: 'blog' },
        { slug: 'campus-automation', title: 'Campus Automation', template: 'campus-automation' },
        { slug: 'campus-design-execution', title: 'Campus Design & Execution', template: 'campus-design-execution' },
        { slug: 'campus-design', title: 'Campus Design', template: 'campus-design' },
        { slug: 'catalogues', title: 'Catalogues', template: 'catalogues' },
        { slug: 'classifieds', title: 'Classifieds', template: 'classifieds' },
        { slug: 'collaboration', title: 'Collaboration Spaces', template: 'collaboration' },
        { slug: 'contact-us', title: 'Contact Us', template: 'contact-us' },
        { slug: 'corporate', title: 'Corporate Identity', template: 'corporate' },
        { slug: 'digital-transformation', title: 'Digital Transformation', template: 'digital-transformation' },
        { slug: 'furniture-design-supply', title: 'Furniture Design & Supply', template: 'furniture-design-supply' },
        { slug: 'furniture', title: 'Furniture Solutions', template: 'furniture' },
        { slug: 'innovation-centres', title: 'Innovation Centres', template: 'innovation-centres' },
        { slug: 'innovation', title: 'Innovation Ecosystems', template: 'innovation' },
        { slug: 'labs', title: 'Laboratories', template: 'labs' },
        { slug: 'libraries', title: 'Libraries', template: 'libraries' },
        { slug: 'library-management', title: 'Library Management', template: 'library-management' },
        { slug: 'lms', title: 'Learning Management System', template: 'lms' },
        { slug: 'lookbook', title: 'Lookbook', template: 'lookbook' },
        { slug: 'new-environments', title: 'New Learning Environments', template: 'new-environments' },
        { slug: 'partnership', title: 'Partnership', template: 'partnership' },
        { slug: 'privacy-policy', title: 'Privacy Policy', template: 'privacy-policy' },
        { slug: 'setup-college', title: 'Setup Your College', template: 'setup-college' },
        { slug: 'shop', title: 'Shop', template: 'shop' },
        { slug: 'sports-design-execution', title: 'Sports Design & Execution', template: 'sports-design-execution' },
        { slug: 'sports-infra', title: 'Sports Infrastructure', template: 'sports-infra' },
        { slug: 'tech-infra', title: 'Tech Infrastructure', template: 'tech-infra' },
        { slug: 'terms-of-use', title: 'Terms of Use', template: 'terms-of-use' },
        { slug: 'ugc-guidelines', title: 'UGC Guidelines', template: 'ugc-guidelines' },
        { slug: 'product-catalog', title: 'Product Catalog', template: 'product-catalog' },
        { slug: 'lookbook', title: 'Lookbook', template: 'lookbook' },
        { slug: 'assessment-system', title: 'Assessment System', template: 'assessment-system' },
    ];

    for (const page of corePages) {
        const pageData = PAGE_DATA[page.slug];
        await prisma.page.upsert({
            where: { slug: page.slug },
            update: {
                template: page.template,
                published: true,
                ...(pageData ? { pageData: JSON.stringify(pageData) } : {}),
            },
            create: {
                title: page.title,
                slug: page.slug,
                template: page.template,
                published: true,
                content: '',
                pageData: pageData ? JSON.stringify(pageData) : '{}',
            },
        });
    }

    console.log(`✓ ${corePages.length} pages seeded with pageData`);

    await prisma.$disconnect();
}

seed().catch((e) => {
    console.error('Seed error:', e);
    process.exit(1);
});
