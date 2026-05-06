import { Variants } from 'framer-motion';

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 34 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] },
  },
};

// Enforce max width and optimized webp format for all assets
const imageParams = 'auto=format&fit=crop&fm=webp&q=75&sat=-100&w=1200';
const pexelsParams = 'auto=compress&cs=tinysrgb&fm=webp&w=1200';

export const images = {
  financeDashboard: `https://images.unsplash.com/photo-1460925895917-afdab827c52f?${imageParams}`,
  financeData: `https://images.unsplash.com/photo-1551288049-bebda4e38f71?${imageParams}`,
  blackAbstract: `https://images.unsplash.com/photo-1541701494587-cb58502866ab?${imageParams}`,
  blackAbstractField: `https://images.unsplash.com/photo-1557672172-298e090bd0f1?${imageParams}`,
  darkCity: `https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?${imageParams}`,
  darkCityNight: `https://images.unsplash.com/photo-1519501025264-65ba15a82390?${imageParams}`,
  darkTechnology: `https://images.pexels.com/photos/2582937/pexels-photo-2582937.jpeg?${pexelsParams}`,
  darkTechnologyAlt: `https://images.pexels.com/photos/3861969/pexels-photo-3861969.jpeg?${pexelsParams}`,
  darkTechnologyGrid: `https://images.pexels.com/photos/5380642/pexels-photo-5380642.jpeg?${pexelsParams}`,
  avatarOne: `https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&fm=webp&q=80&w=200`,
  avatarTwo: `https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&fm=webp&q=80&w=200`,
  avatarThree: `https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&fm=webp&q=80&w=200`,
  avatarFour: `https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&fm=webp&q=80&w=200`,
};

export const introMetricsLabels = ['Vetted', 'Global', 'On-demand'];

export const parallaxImages = [
  images.darkTechnology,
  images.darkTechnologyAlt,
  images.financeDashboard,
  images.blackAbstract,
  images.financeData,
  images.darkCityNight,
  images.darkTechnologyGrid,
  images.blackAbstractField,
  images.darkCity,
];

export const testimonialsList = [
  {
    quote: 'Sharvex brought the exact technical rigor and speed we needed when every product decision mattered.',
    name: 'Michael R.',
    title: 'CTO, Global Tech Platform',
    avatar: images.avatarOne,
  },
  {
    quote: 'They operate like a strategy room, product team, and founder ally in one disciplined network.',
    name: 'Sarah J.',
    title: 'Founder and CEO, E-Commerce Group',
    avatar: images.avatarTwo,
  },
  {
    quote: 'The design work felt surgical. Fewer revisions, better questions, stronger outcomes.',
    name: 'David W.',
    title: 'VP of Product, FinTech Portfolio',
    avatar: images.avatarThree,
  },
  {
    quote: 'Their talent model turns complex engineering growth into a system the whole organization can scale.',
    name: 'Elena T.',
    title: 'Head of Engineering, Enterprise Software',
    avatar: images.avatarFour,
  },
];

export const handleCTAClick = () => {
  alert("Thank you for your interest! We will open the dialogue shortly.");
};
