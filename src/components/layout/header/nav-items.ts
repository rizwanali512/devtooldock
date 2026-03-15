export const navItems = [
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
] satisfies NavItem[];

type NavItem = Record<string, string | unknown> &
  (
    | {
        type: 'link';
        href: string;
      }
    | {
        type: 'dropdown';
      }
  );
