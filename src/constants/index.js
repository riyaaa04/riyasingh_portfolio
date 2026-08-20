import { meta, shopify, starbucks, tesla } from "../assets/images";
import {
    car,
    contact,
    css,
    express,
    git,
    github,
    html,
    javascript,
    linkedin,
    mongodb,
    motion,
    mui,
    nextjs,
    nodejs,
    pricewise,
    react,
    redux,
    sass,
    snapgram,
    summiz,
    tailwindcss,
    threads,
    typescript
} from "../assets/icons";

import {
    python,
    java,
    cpp,
    vite,
    framer,
    uiux,
    apiIntegration,
    graphql,
    restfulApi,
    mernStack,
    sql,
    postgresql,
    firebase,
    figma,
    wireframing,
    prototyping,
    awsEc2,
    awsS3,
    docker,
    postman,
    dsa
} from "../assets/icons/customIcons";

export const skills = [
    // Languages
    { imageUrl: javascript, name: "JavaScript", type: "Languages" },
    { imageUrl: python, name: "Python", type: "Languages" },
    { imageUrl: html, name: "HTML", type: "Languages" },
    { imageUrl: css, name: "CSS", type: "Languages" },
    { imageUrl: java, name: "Java", type: "Languages" },
    { imageUrl: cpp, name: "C++", type: "Languages" },

    // Frontend Stack
    { imageUrl: react, name: "React.js", type: "Frontend Stack" },
    { imageUrl: vite, name: "Vite", type: "Frontend Stack" },
    { imageUrl: nextjs, name: "Next.js", type: "Frontend Stack" },
    { imageUrl: framer, name: "Framer", type: "Frontend Stack" },
    { imageUrl: uiux, name: "UI/UX", type: "Frontend Stack" },
    { imageUrl: apiIntegration, name: "API Integration", type: "Frontend Stack" },

    // Backend & Databases
    { imageUrl: nodejs, name: "Node.js", type: "Backend & Databases" },
    { imageUrl: express, name: "Express.js", type: "Backend & Databases" },
    { imageUrl: graphql, name: "GraphQL", type: "Backend & Databases" },
    { imageUrl: restfulApi, name: "RESTful APIs", type: "Backend & Databases" },
    { imageUrl: mernStack, name: "MERN Stack", type: "Backend & Databases" },
    { imageUrl: mongodb, name: "MongoDB", type: "Backend & Databases" },
    { imageUrl: sql, name: "SQL", type: "Backend & Databases" },
    { imageUrl: postgresql, name: "PostgreSQL", type: "Backend & Databases" },
    { imageUrl: firebase, name: "Firebase", type: "Backend & Databases" },

    // UI/UX Design & Prototyping
    { imageUrl: figma, name: "Figma", type: "UI/UX Design & Prototyping" },
    { imageUrl: wireframing, name: "Wireframing", type: "UI/UX Design & Prototyping" },
    { imageUrl: prototyping, name: "Prototyping", type: "UI/UX Design & Prototyping" },

    // DevOps and Cloud
    { imageUrl: awsEc2, name: "AWS EC2", type: "DevOps and Cloud" },
    { imageUrl: awsS3, name: "AWS S3", type: "DevOps and Cloud" },
    { imageUrl: docker, name: "Docker", type: "DevOps and Cloud" },
    { imageUrl: git, name: "Git", type: "DevOps and Cloud" },
    { imageUrl: postman, name: "Postman", type: "DevOps and Cloud" },

    // Fundamental Skill
    { imageUrl: dsa, name: "DSA", type: "Fundamental Skill" },
];

export const experiences = [
    {
        title: "Full Stack Development Intern",
        company_name: "NRK INFOTECH",
        type: "Internship",
        date: "Jun 2026 - Present · 2 mos",
        location: "Remote",
        icon: react,
        iconBg: "#38ef7d",
        skillsApplied: ["React.js", "Node.js", "Express.js", "MongoDB", "Full Stack"],
        points: [
            "Developing full-stack web applications and custom software solutions using modern frontend and backend frameworks.",
            "Building scalable APIs, database schemas, and responsive user interfaces.",
            "Collaborating remotely with cross-functional engineering teams to ship production-ready features."
        ],
    },
    {
        title: "Big Data Automation",
        company_name: "Jio Platforms Limited (JPL)",
        type: "Internship",
        date: "Oct 2025 - Dec 2025 · 3 mos",
        location: "Navi Mumbai, Maharashtra, India · On-site",
        icon: python,
        iconBg: "#00c6ff",
        skillsApplied: ["Front-End Development", "Back-End Web Development", "Big Data Automation", "Python", "SQL"],
        points: [
            "Automated big data processing pipelines and analytics workflows across enterprise infrastructure.",
            "Built full-stack internal dashboards using Front-End and Back-End web development technologies.",
            "Optimized data transformation scripts and database query performance."
        ],
    },
    {
        title: "UI/UX Designer",
        company_name: "Auroville Investment Management (HK) Limited",
        type: "Freelance",
        date: "Jul 2025 - Dec 2025 · 6 mos",
        location: "Mumbai, Maharashtra, India · Remote",
        icon: figma,
        iconBg: "#a259ff",
        skillsApplied: ["UI/UX Design", "Figma", "Wireframing", "Prototyping"],
        points: [
            "Designed intuitive user interfaces and high-fidelity prototypes for financial & investment platforms.",
            "Created interactive wireframes, component design systems, and user journey maps.",
            "Collaborated with overseas product teams to streamline design-to-development handoffs."
        ],
    },
    {
        title: "Full-stack Developer",
        company_name: "Winvesta",
        type: "Internship",
        date: "Jul 2025 - Sep 2025 · 3 mos",
        location: "Mumbai, Maharashtra, India · On-site",
        icon: nodejs,
        iconBg: "#f57c00",
        skillsApplied: ["KYC Development", "GitHub Migration", "Front-End", "Leadership", "RESTful APIs"],
        points: [
            "KYC System Development: Assisted in developing and enhancing user verification onboarding systems, document upload logic, and backend KYC API integrations.",
            "Repository Migration (Bitbucket → GitHub): Supported complete migration of multiple project repositories to GitHub, configured branch protection rules, and verified commit histories.",
            "Developer Workflows & Quality: Documented migration best practices, improved Git/GitHub Actions workflows, and resolved UI/UX & functional bugs during staging/UAT testing."
        ],
    },
    {
        title: "Marketing Intern",
        company_name: "Lets Upgrade",
        type: "Internship",
        date: "Dec 2023 - Jan 2024 · 2 mos",
        location: "On-Site",
        icon: uiux,
        iconBg: "#ec4899",
        skillsApplied: ["Digital Marketing", "Brand Strategy", "SEO Analytics", "Content Campaign", "User Growth"],
        points: [
            "Spearheaded digital marketing campaigns, market research, and brand positioning strategies to drive user acquisition.",
            "Analyzed campaign performance metrics, SEO rankings, and conversion funnels to optimize outreach ROI.",
            "Collaborated with design and engineering teams to craft high-converting landing pages and promotional assets."
        ],
    },
    {
        title: "UI UX Designer",
        company_name: "ELDII",
        type: "Internship",
        date: "Jul 2024 - Sep 2024 · 3 mos",
        location: "Remote",
        icon: wireframing,
        iconBg: "#ff007f",
        skillsApplied: ["UI/UX Design", "Figma", "User Research", "Wireframing"],
        points: [
            "Worked as a UI/UX Designer, where I designed an EdTech platform, learning user research, wireframing, prototyping, and creating user-focused interfaces.",
            "Conducted user research and wireframing sessions to enhance user engagement."
        ],
    },
];

export const socialLinks = [
    {
        name: 'Contact',
        iconUrl: contact,
        link: '/contact',
    },
    {
        name: 'GitHub',
        iconUrl: github,
        link: 'https://github.com/riyaaa04',
    },
    {
        name: 'LinkedIn',
        iconUrl: linkedin,
        link: 'https://www.linkedin.com/in/riya-singh-061788291/',
    }
];

export const projects = [
    {
        name: 'PayTM Clone',
        buildingType: 'Bank',
        iconEmoji: '🏦',
        theme: 'btn-back-blue',
        iconBg: '#00c6ff',
        description: 'Full-stack fintech & digital wallet application featuring peer-to-peer money transfers, balance management, secure authentication, and payment transactions.',
        tech: ['React.js', 'Node.js', 'Express.js', 'MongoDB', 'CSS'],
        link: 'https://github.com/riyaaa04/Paytm_MernStack_Clone',
        repo: 'https://github.com/riyaaa04/Paytm_MernStack_Clone',
    },
    {
        name: 'ZoomCar Clone',
        buildingType: 'Car Showroom',
        iconEmoji: '🚗',
        theme: 'btn-back-green',
        iconBg: '#10b981',
        description: 'Self-drive car booking platform featuring real-time vehicle availability, location search, date pickers, dynamic pricing, and car rental reservations.',
        tech: ['React.js', 'Next.js', 'Node.js', 'Express.js', 'SQL'],
        link: 'https://rent-ease-navy.vercel.app/home',
        repo: 'https://github.com/riyaaa04/Cab_Booking_Website',
    },
    {
        name: 'GlamGrove No-Code App',
        buildingType: 'Parlour',
        iconEmoji: '💇‍♀️',
        theme: 'btn-back-pink',
        iconBg: '#ec4899',
        description: 'Luxury beauty parlour and salon booking platform with service catalogs, artist appointment scheduling, slot booking, and interactive UI design.',
        tech: ['Wix, AppSheet'],
        link: 'https://www.appsheet.com/template/AppDef?appName=Untitledspreadsheet-933138624-23-11-22&appId=8d42283d-37d4-4844-a1c2-cc9f1ac01484&quickStart=False#Home',
        repo: null,
    },
    {
        name: 'Telemedicine App',
        buildingType: 'Hospital',
        iconEmoji: '🏥',
        theme: 'btn-back-red',
        iconBg: '#ef4444',
        description: 'Digital healthcare platform facilitating online doctor consultations, appointment booking, medical records management, and video consultation.',
        tech: ['React.js', 'WebRTC', 'Node.js', 'Express.js', 'MongoDB'],
        link: 'https://omni-doctor.vercel.app/',
        repo: 'https://github.com/riyaaa04/Telemedicine_Frontend_Website',
    }
];