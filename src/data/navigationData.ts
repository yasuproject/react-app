import { NavSection, Workspace } from '../types/navigation';

export const WORKSPACES: Workspace[] = [
  {
    id: 'acme-corp',
    name: 'Acme Systems Labs',
    plan: 'Enterprise Cloud',
    initials: 'AS',
    color: 'bg-indigo-600',
    active: true,
  },
  {
    id: 'design-collective',
    name: 'Design Collective',
    plan: 'Team Pro',
    initials: 'DC',
    color: 'bg-emerald-600',
  },
  {
    id: 'personal-sandbox',
    name: 'Personal Sandbox',
    plan: 'Hobbyist',
    initials: 'PS',
    color: 'bg-amber-600',
  },
];

export const NAV_SECTIONS: NavSection[] = [
  {
    title: 'Workspace',
    items: [
      {
        id: 'dashboard',
        label: 'Dashboard',
        iconName: 'LayoutDashboard',
        shortcut: '1',
      },
      {
        id: 'analytics',
        label: 'Analytics',
        iconName: 'BarChart3',
        badge: '+14%',
        badgeType: 'accent',
        shortcut: '2',
      },
      {
        id: 'projects',
        label: 'Projects',
        iconName: 'FolderKanban',
        shortcut: '3',
        subItems: [
          { id: 'proj-mobile', label: 'Mobile App v3.4', count: 8 },
          { id: 'proj-ds', label: 'Design Tokens 2026', count: 3 },
          { id: 'proj-infra', label: 'Cloud Infrastructure', count: 12 },
        ],
      },
      {
        id: 'tasks',
        label: 'Tasks & Sprints',
        iconName: 'CheckSquare',
        badge: 12,
        shortcut: '4',
      },
      {
        id: 'customers',
        label: 'Customers & CRM',
        iconName: 'Users',
        shortcut: '5',
      },
    ],
  },
  {
    title: 'Resources',
    items: [
      {
        id: 'documents',
        label: 'Documentation',
        iconName: 'FileText',
        shortcut: '6',
      },
      {
        id: 'integrations',
        label: 'Integrations',
        iconName: 'Blocks',
        badge: 4,
        shortcut: '7',
      },
      {
        id: 'media',
        label: 'Asset Library',
        iconName: 'Image',
      },
    ],
  },
  {
    title: 'System',
    items: [
      {
        id: 'settings',
        label: 'Settings & Config',
        iconName: 'Settings',
        shortcut: 'S',
      },
      {
        id: 'code-docs',
        label: 'Drawer Code & API',
        iconName: 'Code2',
        shortcut: 'C',
      },
      {
        id: 'activity',
        label: 'Audit Log',
        iconName: 'History',
      },
    ],
  },
];

export const USER_PROFILE = {
  name: 'Elena Rostova',
  role: 'Lead System Architect',
  email: 'elena.rostova@acme-labs.io',
  avatar: '/src/assets/images/avatar_drawer_user_1793910792359.jpg',
  status: 'Online',
};
