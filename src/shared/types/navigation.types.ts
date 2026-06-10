export interface NavLink {
  href: string;
  label: string;
  subLinks?: Omit<NavLink, 'subLinks'>[];
}

export interface FooterLink {
  href: string;
  label: string;
}
