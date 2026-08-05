import evershopImg from "@/assets/project-evershop.jpg";
import saucedemoImg from "@/assets/project-saucedemo.jpg";
import luxoraImg from "@/assets/project-luxora.jpg";
import medichainImg from "@/assets/project-medichain.jpg";
import triptrackImg from "@/assets/project-triptrack.jpg";
import flappybirdImg from "@/assets/project-flappybird.jpg";

/**
 * Single source of truth for all portfolio content.
 * Every value here comes from Anona Ayshi Rozario's resume.
 * Edit this file to update the site — components read from it only.
 */

export const profile = {
  name: "Anona Ayshi Rozario",
  initials: "AR",
  title: "Software Quality Assurance Engineer",
  tagline:
    "Delivering reliable software through Manual Testing, API Testing, UI Automation and quality-driven validation. I focus on identifying defects early, improving product quality, and helping teams release software with confidence.",
  location: "Dhaka, Bangladesh",
  email: "ayshirozario5000@gmail.com",
  linkedin: "https://linkedin.com/in/ayshirozario",
  github: "https://github.com/Specroza",
  summary:
    "Software Quality Assurance Engineer with hands-on experience in Functional Testing, Manual Testing, REST API Testing and UI Test Automation gained through a QA Functional Testing Internship and practical testing projects. Skilled in designing test cases, executing structured testing, documenting defects and validating web applications using Playwright, Postman, Selenium and Jira. Familiar with SDLC, STLC and Agile methodologies, with a strong commitment to delivering reliable, high-quality software.",
} as const;

export const navLinks = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Experience", href: "#experience" },
  { label: "Projects", href: "#projects" },
  { label: "Skills", href: "#skills" },
  { label: "Certifications", href: "#certifications" },
  { label: "Contact", href: "#contact" },
] as const;

export const aboutStats = [
  { label: "Years of experience", value: 4, suffix: "+" },
  { label: "Completed projects", value: 5, suffix: "+" },
  { label: "Defect findings", value: 75, suffix: "+" },
  { label: "Testing types practiced", value: 9, suffix: "" },
] as const;

export const aboutStory = [
  "My journey into Software Quality Assurance didn't begin with testing. It began with solving problems.",
  "After completing my Bachelor's in Computer Science, I built more than four years of professional experience in customer service, risk and fraud management, where every decision relied on attention to detail, critical thinking and understanding how people interact with systems. Working closely with customers taught me that even the smallest issue can have a significant impact on the overall user experience.",
  "That perspective naturally led me to Software Quality Assurance. I discovered that I enjoy exploring applications, questioning assumptions, uncovering edge cases and ensuring software behaves exactly as users expect. Today, I work with Manual Testing, API Testing, UI Automation, test case design, defect reporting, and quality documentation, always with the goal of helping teams deliver reliable, high-quality products.",
  "For me, quality is more than finding bugs. It's about building confidence in every release, improving processes and creating software that users can trust. I'm committed to continuous learning and enjoy taking on new challenges that help me grow as a QA professional.",
] as const;

export type Position = {
  role: string;
  duration: string;
  achievements: string[];
  tools: string[];
};

export type Experience = {
  company: string;
  positions: Position[];
};

export const experiences: Experience[] = [
  {
    company: "foodpanda Bangladesh",
    positions: [
      {
        role: "Risk & Fraud Management Specialist",
        duration: "05/2025 – Present",
        achievements: [
          "Analyzed customer and vendor transaction data to validate accuracy, investigate anomalies and identify operational issues through structured analysis.",
          "Conducted Root Cause Analysis on 100+ high-risk cases, identifying recurring failure patterns and recommending preventive process improvements.",
          "Collaborated with technical and operations teams to improve fraud investigation workflows, contributing to 100% compliance and a 30% reduction in average case resolution time.",
          "Documented investigation findings and maintained detailed reports to support operational quality, process verification and continuous improvement.",
        ],
        tools: ["Root Cause Analysis", "Data Validation", "Excel", "Google Sheets", "Process Audit"],
      },
      {
        role: "Rider Service Agent",
        duration: "12/2021 – 04/2025",
        achievements: [
          "Verified onboarding documentation for 2,500+ riders, ensuring data accuracy and compliance with operational standards.",
          "Reviewed and validated onboarding information to identify discrepancies and maintain documentation quality throughout the verification process.",
          "Identified recurring workflow issues through structured process analysis and recommended improvements to streamline onboarding activities.",
        ],
        tools: ["Document Verification", "Process Analysis", "Cross-functional Collaboration"],
      },
    ],
  },
  {
    company: "a1qa",
    positions: [
      {
        role: "QA Functional Testing Intern",
        duration: "06/2026 – 07/2026",
        achievements: [
          "Executed manual and REST API testing across 5+ web applications, including e-commerce, booking and portfolio applications.",
          "Designed and executed test cases, test scenarios and checklists using Boundary Value Analysis (BVA) and Equivalence Partitioning (EP).",
          "Reported 75+ functional, UI and API defects in Jira, validated fixes through retesting and tracked defects throughout the Defect Lifecycle.",
          "Prepared Acceptance Sheets, Test Surveys, Quality Reports and detailed bug reports to support structured QA activities.",
        ],
        tools: ["Jira", "BVA", "Equivalence Partitioning", "Test Documentation", "Quality Report", "Linear"],
      },
    ],
  },
];

export const skillGroups = [
  {
    group: "Testing",
    items: [
      "Manual Testing",
      "Functional Testing",
      "Regression Testing",
      "Smoke Testing",
      "GUI Testing",
      "UI Testing",
      "API Testing",
      "End-to-End Testing",
      "Cross-Browser Testing",
    ],
  },
  {
    group: "Automation",
    items: [
      "Playwright",
      "Selenium WebDriver",
      "JavaScript",
      "Node.js",
      "HTML Reporter",
      "Allure Reporter",
    ],
  },
  {
    group: "API Testing",
    items: [
      "Postman",
      "Newman",
      "REST API Testing",
      "CRUD Validation",
      "Status Code Verification",
    ],
  },
  {
    group: "Test Management",
    items: [
      "Test Planning",
      "Test Cases",
      "Test Scenarios",
      "Test Execution",
      "Defect Tracking",
      "Bug Reporting",
      "Test Documentation",
      "Checklists",
      "Quality Reporting",
    ],
  },
  {
    group: "Methodologies",
    items: ["SDLC", "STLC", "Agile", "Scrum", "Waterfall"],
  },
  {
    group: "Other Tools",
    items: [
      "Jira",
      "Linear",
      "Git",
      "GitHub",
      "SQL",
      "MongoDB",
      "Figma",
      "ClickUp",
      "Trello",
      "Microsoft Excel",
      "Google Sheets",
    ],
  },
] as const;

export type Project = {
  name: string;
  image: string;
  kind: string;
  description: string;
  responsibilities: string[];
  challenges: string;
  results: string[];
  tech: string[];
  github?: string;
  demo?: string;
};

export const projects: Project[] = [
  {
    name: "EverShop E-Commerce Testing",
    image: evershopImg,
    kind: "Manual & REST API Testing",
    description:
      "Performed manual functional testing and REST API testing for an e-commerce web application. Designed and executed test cases, conducted exploratory testing, validated REST API endpoints using Postman, and reported functional and API defects in Jira to ensure application quality and reliability.",
    responsibilities: [
      "Designed and executed test cases covering Search, Product, Cart and Checkout workflows.",
      "Conducted exploratory testing across storefront modules to uncover unspecified behaviour.",
      "Validated REST API endpoints using Postman (GET, POST, PATCH, DELETE) against expected status codes and payloads.",
      "Reported functional and API defects in Jira with reproduction detail and severity.",
    ],
    challenges:
      "Isolating a server-side failure surfaced during checkout and separating API-level defects from UI symptoms.",
    results: [
      "13+ UI, functional and API defects reported, including a Critical HTTP 500 server error",
      "GET, POST, PATCH and DELETE endpoints verified in Postman",
      "Search, Product, Cart and Checkout workflows covered end to end",
    ],
    tech: ["Manual Testing", "REST API", "Postman", "Jira"],
    github: "https://github.com/Specroza/manualTesting",
  },
  {
    name: "SauceDemo Automation",
    image: saucedemoImg,
    kind: "Playwright UI Automation",
    description:
      "Developed an end-to-end UI automation framework for the SauceDemo application using Playwright and JavaScript. Automated login, inventory, cart, and checkout workflows while performing cross-browser testing to ensure consistent functionality across multiple browsers.",
    responsibilities: [
      "Built an end-to-end UI automation framework with Playwright and JavaScript.",
      "Automated login, inventory, cart and checkout workflows.",
      "Executed cross-browser testing to confirm consistent behaviour across engines.",
    ],
    challenges:
      "Keeping the suite stable across multiple browser engines while validating cart and checkout state between steps.",
    results: [
      "Login, inventory, cart and checkout journeys fully automated",
      "Cross-browser execution across Chromium, Firefox and WebKit",
      "Reusable page-object structure for maintainable specs",
    ],
    tech: ["Playwright", "JavaScript", "Cross-Browser Testing", "Automation Testing"],
    github: "https://github.com/Specroza/playwrightAutomation",
  },
  {
    name: "Luxora",
    image: luxoraImg,
    kind: "Booking Platform",
    description:
      "Premium multi-role booking platform for luxury services. Features a dual Dark/Light mode UI with micro-interaction-focused design and robust admin/provider dashboards.",
    responsibilities: [
      "Built a multi-role booking experience for customers, providers and admins.",
      "Designed a dual Dark/Light mode interface focused on micro-interactions.",
      "Implemented admin and provider dashboards for managing bookings and services.",
    ],
    challenges:
      "Keeping role-specific dashboards consistent while supporting both light and dark themes across every surface.",
    results: [
      "Multi-role booking flow with admin and provider dashboards",
      "Dual Dark/Light mode design system",
      "Live demo deployed at luxorabd.vercel.app",
    ],
    tech: ["TypeScript", "PLpgSQL", "CSS", "Vite"],
    github: "https://github.com/Specroza/Luxora",
    demo: "https://luxorabd.vercel.app/",
  },
  {
    name: "MediChain",
    image: medichainImg,
    kind: "Blockchain Application",
    description:
      "MediChain is a Blockchain-based Medical Management System designed to securely manage medical records, patient data, and prescription history with transparency, traceability, and tamper-resistance.",
    responsibilities: [
      "Implemented smart contracts in Solidity for medical record management.",
      "Built the web interface for patient data and prescription history.",
      "Ensured traceability and tamper-resistance of stored medical records.",
    ],
    challenges:
      "Balancing on-chain transparency with the privacy expectations of sensitive medical data.",
    results: [
      "Secure management of medical records and prescription history",
      "Tamper-resistant, traceable data layer on blockchain",
      "Smart-contract driven access to patient data",
    ],
    tech: ["JavaScript", "Solidity", "HTML", "CSS"],
    github: "https://github.com/Specroza/MediChain",
  },
  {
    name: "Trip-Track",
    image: triptrackImg,
    kind: "Travel Management App",
    description:
      "Trip-Track is a modern and intuitive travel and tourism management application designed to streamline trip planning, bookings, and customer interactions.",
    responsibilities: [
      "Developed trip planning and booking workflows.",
      "Built customer interaction and management screens.",
      "Modelled and queried trip and booking data in SQL.",
    ],
    challenges:
      "Keeping trip planning, booking and customer data in sync across the application.",
    results: [
      "Streamlined trip planning and booking flow",
      "Customer interaction management built in",
      "SQL-backed data layer for trips and bookings",
    ],
    tech: ["React.js", "Node.js", "SQL", "HTML"],
    github: "https://github.com/Specroza/Trip-Track",
  },
  {
    name: "Flappy-Bird",
    image: flappybirdImg,
    kind: "Game Development",
    description:
      "A simple Flappy Bird clone developed using Python and the Pygame library. The game simulates the classic Flappy Bird mechanics where the player controls a bird navigating through a series of pipes, staying alive by avoiding collisions while chasing the highest score.",
    responsibilities: [
      "Implemented core game mechanics with Python and Pygame.",
      "Built collision detection between the bird and pipes.",
      "Added scoring and game-over handling.",
    ],
    challenges:
      "Tuning gravity, jump physics and pipe spacing so the game stays fair but challenging.",
    results: [
      "Playable Flappy Bird clone with classic mechanics",
      "Collision detection and score tracking",
      "Built entirely in Python with Pygame",
    ],
    tech: ["Python", "Pygame"],
    github: "https://github.com/Specroza/Flappy-Bird",
  },
];

export const dashboardMetrics = [
  { label: "Defects reported in Jira", value: 75, suffix: "+" },
  { label: "Applications tested", value: 5, suffix: "+" },
  { label: "Manual test cases executed", value: 30, suffix: "+" },
  { label: "Critical defects caught", value: 5, suffix: "" },
  { label: "Defect fix verification rate", value: 100, suffix: "%" },
  { label: "Root cause analyses", value: 100, suffix: "+" },
] as const;

/** Severity distribution across all defects reported during the QA internship. */
export const severityBreakdown = [
  { label: "Critical", value: 5, tone: "destructive" as const },
  { label: "Major", value: 28, tone: "warning" as const },
  { label: "Minor", value: 42, tone: "primary" as const },
];

/** Defect classification by type across reported issues. */
export const defectByType = [
  { label: "Functional", value: 34 },
  { label: "UI / Visual", value: 21 },
  { label: "API", value: 12 },
  { label: "Usability", value: 8 },
];

export const defectByProject = [
  { label: "EverShop E-Commerce", value: 13 },
  { label: "Booking application", value: 23 },
  { label: "Other internship applications", value: 39 },
];

/** Test execution outcome across manual cycles. */
export const executionSummary = [
  { label: "Passed", value: 24, tone: "primary" as const },
  { label: "Failed", value: 5, tone: "destructive" as const },
  { label: "Blocked", value: 2, tone: "warning" as const },
];


/** Editable showcase bug report — from the Evershop E-Commerce test cycle. */
export const featuredBug = {
  id: "EVS-014",
  summary: "HTTP 500 server error returned during checkout request on Evershop storefront",
  project: "Evershop E-Commerce",
  environment:
    "Evershop demo storefront · Windows 11 · Chrome (latest) · Desktop 1920×1080 · Postman for API verification",
  severity: "Critical",
  priority: "Highest",
  status: "Reported",
  type: "Functional / API",
  reporter: profile.name,
  steps: [
    "Open the Evershop storefront and add an available product to the cart.",
    "Open the cart and proceed to the checkout page.",
    "Fill in the required shipping and contact fields with valid data.",
    "Submit the checkout request and observe the server response.",
  ],
  expected:
    "The checkout request is accepted and the application returns a successful response with the order confirmation.",
  actual:
    "The request fails and the server returns HTTP 500, so the checkout workflow cannot be completed.",
} as const;

export const automation = {
  repo: "https://github.com/Specroza/playwrightAutomation",
  runner: "Playwright Test · JavaScript · Node.js",
  browsers: ["Chromium", "Firefox", "WebKit"],
  coverage: ["Login", "Inventory & sorting", "Cart", "Checkout", "End-to-end user journey"],
  tree: [
    "saucedemo-playwright/",
    "├─ tests/",
    "│  ├─ login.spec.js",
    "│  ├─ inventory.spec.js",
    "│  ├─ cart.spec.js",
    "│  └─ checkout.spec.js",
    "├─ pages/",
    "│  ├─ LoginPage.js",
    "│  ├─ InventoryPage.js",
    "│  └─ CheckoutPage.js",
    "├─ playwright.config.js",
    "└─ package.json",
  ],
} as const;


export const certifications = [
  {
    name: "SQA: Manual & Automated Testing",
    issuer: "Ostad",
    note: "Issued Jun 2026",
    url: "https://drive.google.com/file/d/1Tk6mVT1fKFjp3iQY4VzQwQuZ6U3f45uE/view",
  },
  {
    name: "Postman API Fundamentals Student Expert",
    issuer: "Postman",
    note: "Issued Feb 2026",
    url: "https://drive.google.com/file/d/1o_Hw_pwhb-YzlTEBLx-txu5hLX1oG4pO/view?usp=sharing",
  },
  {
    name: "Design System in Figma",
    issuer: "Grameenphone Academy",
    note: "Issued Oct 2025",
    url: "https://www.grameenphone.academy/cert/ed8189231df9",
  },
  {
    name: "Blockchain Professional Certification",
    issuer: "Institute of Management, Technology and Finance",
    note: "Issued Feb 2025",
    url: "https://edu.gtf.pt/pluginfile.php/1/tool_certificate/issues/1739918827/5762442893AR.pdf",
  },
  {
    name: "2nd Runner-Up — Poster Presentation Category",
    issuer: "Recognition",
    note: "Award · Issued Feb 2026",
    url: "https://drive.google.com/file/d/1r3BnVl2gdRcTQXYTnhodRuGXzyZvN-lj/view",
  },
] as const;


export const education = {
  degree: "BSc in Computer Science and Engineering",
  school: "University of Information Technology and Sciences (UITS), Dhaka",
  duration: "2022 – 2026",
} as const;
