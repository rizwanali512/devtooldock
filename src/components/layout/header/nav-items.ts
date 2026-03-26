export type NavItem =
  | { type: 'link'; href: string; label: string }
  | { type: 'dropdown'; label: string; items: { href: string; label: string }[] };

export const navItems: NavItem[] = [
  {
    type: 'link',
    href: '/',
    label: 'Home',
  },
  {
    type: 'link',
    label: 'Tools',
    href: '/tools',
  },
  {
    type: 'link',
    label: 'AI Tools',
    href: '/ai-tools',
  },
  {
    type: 'link',
    label: 'Categories',
    href: '/categories',
  },
  {
    type: 'link',
    label: 'Legal Tools',
    href: '/legal-tools',
  },
  {
    type: 'link',
    label: 'Blog',
    href: '/blog',
  },
  {
    type: 'link',
    label: 'About',
    href: '/about',
  },
  {
    type: 'link',
    label: 'Contact',
    href: '/contact',
  },
];
