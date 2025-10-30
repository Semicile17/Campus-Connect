export type UserRole = 'student' | 'faculty' | 'admin';

export interface SidebarLink {
  href: string;
  label: string;
  icon: React.ReactElement;
}

export type SidebarLinks = Record<UserRole, SidebarLink[]>;