import { Rocket, BarChart3, Crown, Shield, Zap, Search, Layout, Layers, RefreshCw, TrendingUp, Cloud } from 'lucide-react';

export const SERVICE_TIERS = [
  {
    id: 'tier-1',
    title: 'Foundation',
    subtitle: 'Tier I',
    price: 50000,
    description: 'For businesses getting started with their online presence.',
    icon: Rocket,
    image: '/images/services/tier-1.webp',
    features: [
      '5–7 page responsive website',
      'Clean, modern design',
      'Mobile optimization',
      'Lead capture system (forms / WhatsApp integration)',
      'Basic SEO setup',
      'Speed optimization',
      '1 revision cycle',
      'Hosting and Deployment'
    ],
  },
  {
    id: 'tier-2',
    title: 'Signature',
    subtitle: 'Tier II',
    price: 110000,
    description: 'For businesses looking to scale and generate consistent leads.',
    icon: BarChart3,
    image: '/images/services/tier-2.webp',
    popular: true,
    features: [
      '10–20 page custom website',
      'Conversion-focused UI/UX',
      'Strategic site architecture',
      'SEO-ready structure',
      'CMS integration (easy content management)',
      'Analytics & tracking setup',
      'Landing pages for campaigns',
      '2–3 revision cycles',
      'Hosting and Deployment'
    ],
  },
  {
    id: 'tier-3',
    title: 'Pinnacle',
    subtitle: 'Tier III',
    price: 250000,
    description: 'For brands looking to dominate their market.',
    icon: Crown,
    image: '/images/services/tier-3.webp',
    features: [
      'Complete brand identity system',
      'Fully custom UI/UX design',
      'Advanced interactions & animations',
      'Conversion funnel design',
      'High-impact copywriting',
      'SEO strategy & content structure',
      'CRM & automation integration',
      'Hosting and Deployment'
    ],
  },
];

export const ADDONS = [
  {
    id: 'addon-growth',
    title: 'Ongoing Growth Support',
    subtitle: 'Growth Retainer',
    price: 15000,
    isMonthly: true,
    popular: true,
    description: 'Continuous optimization & performance improvement to keep your digital ecosystem scaling.',
    icon: TrendingUp,
    features: [
      'Website updates & enhancements',
      'Conversion optimization (CRO)',
      'SEO improvements',
      'Landing page creation',
      'Performance monitoring'
    ],
    outcome: 'Your website continues to evolve and improve, driving better results over time.'
  },
  {
    id: 'addon-hosting',
    title: 'Hosting and Deployment',
    price: 6000,
    isMonthly: true,
    popular: true,
    description: 'Managed enterprise-grade cloud hosting and continuous deployment pipeline.',
    icon: Cloud,
    features: [
      'Managed cloud infrastructure (Foundation: ₹6K/mo, Signature: ₹10K/mo, Pinnacle: ₹20K/mo)',
      'SSL security and custom domain configuration',
      'Continuous deployment pipeline from Git',
      'Daily automated backups and performance monitoring'
    ],
    outcome: 'Seamless uptime, high-speed delivery, and zero server maintenance overhead.'
  },
  {
    id: 'addon-architecture',
    title: 'Strategic site architecture',
    price: 15000,
    description: 'A la Carte Item',
    icon: Layout,
  },
  {
    id: 'addon-seo-structure',
    title: 'SEO-ready structure',
    price: 12000,
    description: 'A la Carte Item',
    icon: Search,
  },
  {
    id: 'addon-analytics',
    title: 'Analytics & tracking setup',
    price: 10000,
    description: 'A la Carte Item',
    icon: BarChart3,
  },
  {
    id: 'addon-revisions',
    title: 'Increase number of revision cycles',
    price: 5000,
    description: 'Per cycle',
    icon: RefreshCw,
  },
  {
    id: 'addon-interactions',
    title: 'Advanced interactions & animations',
    price: 35000,
    description: 'A la Carte Item',
    icon: Zap,
  },
  {
    id: 'addon-seo-strategy',
    title: 'SEO strategy & content structure',
    price: 25000,
    description: 'A la Carte Item',
    icon: Search,
  },
  {
    id: 'addon-crm',
    title: 'CRM & automation integration',
    price: 45000,
    description: 'A la Carte Item',
    icon: Layers,
  },
];

export const getAddonPrice = (addon, tierId) => {
  if (addon.id === 'addon-hosting') {
    if (tierId === 'tier-2') return 10000;
    if (tierId === 'tier-3') return 20000;
    return 6000; // default for tier-1
  }
  return addon.price;
};
