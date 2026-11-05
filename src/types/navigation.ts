export interface SubNavItem {
  id: string;
  label: string;
  count?: number;
  icon?: string;
}

export interface NavItemType {
  id: string;
  label: string;
  iconName: string;
  badge?: string | number;
  badgeType?: 'default' | 'accent' | 'warning';
  subItems?: SubNavItem[];
  shortcut?: string;
  section?: string;
}

export interface NavSection {
  title: string;
  items: NavItemType[];
}

export interface Workspace {
  id: string;
  name: string;
  plan: string;
  initials: string;
  color: string;
  active?: boolean;
}

export type DrawerPosition = 'left' | 'right';
export type DrawerVariant = 'docked' | 'floating';
export type MobileVariant = 'slide' | 'bottom-sheet';
export type ViewportMode = 'responsive' | 'mobile' | 'tablet' | 'desktop';
