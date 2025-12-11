import { FaYoutube } from "react-icons/fa";
import {
  RxDiscordLogo,
  RxGithubLogo,
  RxInstagramLogo,
  RxTwitterLogo,
  RxLinkedinLogo,
} from "react-icons/rx";

export const BACKEND_SKILL = [
  {
    skill_name: "Node.js",
    image: "node.png",
    width: 80,
    height: 80,
  },
  {
    skill_name: "Dotnet",
    image: "c-sharp.png",
    width: 80,
    height: 80,
  },
  {
    skill_name: "MongoDB",
    image: "mongodb.png",
    width: 40,
    height: 40,
  },
  {
    skill_name: "MySQL",
    image: "mysql.png",
    width: 70,
    height: 70,
  },
] as const;

export const SKILL_DATA = [
  {
    skill_name: "Wordpress",
    image: "wordpress.png",
    width: 80,
    height: 80,
  },
  {
    skill_name: "JavaScript",
    image: "js.png",
    width: 65,
    height: 65,
  },
  {
    skill_name: "TypeScript",
    image: "ts.png",
    width: 80,
    height: 80,
  },
] as const;

export const SOCIALS = [
  {
    name: "LinkedIn",
    icon: RxLinkedinLogo,
    link: "https://www.linkedin.com/in/diogo-henrique-silva/",
  },
  {
    name: "Instagram",
    icon: RxInstagramLogo,
    link: "https://www.instagram.com/diogo_wordpress/",
  },
] as const;

export const FRONTEND_SKILL = [
  {
    skill_name: "Angular",
    image: "angular.png",
    width: 80,
    height: 80,
  },
  {
    skill_name: "VueJS",
    image: "vuejs.png",
    width: 80,
    height: 80,
  },
] as const;

export const FULLSTACK_SKILL = [
  {
    skill_name: "Flutter",
    image: "flutter.png",
    width: 70,
    height: 70,
  },
  {
    skill_name: "Docker",
    image: "docker.png",
    width: 70,
    height: 70,
  },
] as const;

export const OTHER_SKILL = [
  {
    skill_name: null,
    image: null,
    width: 0,
    height: 0,
  },
] as const;

export const PROJECTS = [
  {
    title: "147.digital - Interactive Agency Website",
    description:
      "Modern digital agency website built with custom WordPress from scratch, featuring dynamic GSAP-powered animations and interactive elements. Showcases immersive user experience with smooth scroll animations, parallax effects, and engaging visual storytelling that brings the digital agency's identity to life.",
    image: "/projects/147-digital.png",
    link: "https://147.digital",
  },
  {
    title: "Ayrton Senna Tribute - Custom WordPress Landing Page",
    description:
      "A fully custom WordPress landing page built from scratch based on Figma designs, honoring the legendary F1 champion Ayrton Senna. Features immersive hero sections and custom-built sliders using Swiper.js library, showcasing a jewelry collection inspired by his legacy. Combines elegant design with smooth animations to celebrate Brazilian motorsport history.",
    image: "/projects/okubo.png",
    link: "https://www.okubomen.com/senna/",
  },
  {
    title: "Space Themed Website",
    description:
      'Embark on an interstellar journey with my "Space Themed Website", a mesmerizing space-themed website that invites you to explore the cosmic wonders beyond our world. Immerse yourself in an awe-inspiring digital experience that blends cutting-edge design with the mysteries of the universe.',
    image: "/projects/project-3.png",
    link: "diogohenrique.site",
  },
  {
    title: "Fluke Solar Solutions - Clean Energy Initiative",
    description:
      "Institutional landing page developed for Fluke Brasil's clean energy project, showcasing professional solar tools and solutions for the photovoltaic industry. Built with Vue.js 2, the site highlights technological advances in solar power and addresses the growing demand for skilled workforce in renewable energy. Features responsive design and intuitive navigation to educate professionals about solar installation and maintenance tools.",
    image: "/projects/fluke-solar.png",
    link: "https://energialimpafluke.com/en/solar",
  },
  {
    title: "Interproject - Engineering Solutions Landing Page",
    description:
      "Professional landing page developed for an engineering company specializing in electromechanical fabrication and assembly solutions. Features a clean, corporate design that effectively communicates their technical expertise and custom engineering services. Integrated with RD Station CRM to streamline lead capture and management, enabling efficient client acquisition and automated marketing workflows.",
    image: "/projects/interproject.png",
    link: "https://interproject.com.br",
  },
  {
    title: "Fiocruz Collaborative Portal - News & NGO Network",
    description:
      "Comprehensive news portal built with custom WordPress theme from scratch for Fiocruz, Brazil's leading public health institution. Developed to facilitate collaboration with NGOs across Brazil, featuring dynamic content management and interactive elements powered by PHP, jQuery, and Vue.js. The platform serves as a central hub for health news, research updates, and strengthening partnerships between institutions and civil society organizations.",
    image: "/projects/humanamente.png",
    link: "https://humanamente.fiocruz.br/",
  },
] as const;

export const FOOTER_DATA = [
  {
    title: "Community",
    data: [
      {
        name: "YouTube",
        icon: FaYoutube,
        link: "https://www.youtube.com/@WPcomDiogoHenrique",
      },
      {
        name: "GitHub",
        icon: RxGithubLogo,
        link: "https://github.com/diogo138",
      },
    ],
  },
  {
    title: "Social Media",
    data: [
      {
        name: "Instagram",
        icon: RxInstagramLogo,
        link: "https://www.instagram.com/diogo_wordpress/",
      },
      {
        name: "Linkedin",
        icon: RxLinkedinLogo,
        link: "https://www.linkedin.com/in/diogo-henrique-silva/",
      },
    ],
  },
  {
    title: "About",
    data: [
      {
        name: "Become Sponsor",
        icon: null,
        link: "https://www.youtube.com/@WPcomDiogoHenrique",
      },
      {
        name: "Contact Me",
        icon: null,
        link: "mailto:diogomike138@gmail.com",
      },
    ],
  },
] as const;

export const NAV_LINKS = [
  {
    title: "About me",
    link: "#about-me",
  },
  {
    title: "Skills",
    link: "#skills",
  },
  {
    title: "Projects",
    link: "#projects",
  },
] as const;

export const LINKS = {
  sourceCode: "https://github.com/diogo138/space-portfolio",
};
