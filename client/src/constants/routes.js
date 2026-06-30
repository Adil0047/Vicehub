/**
 * Primary navigation links shown in the Navbar and referenced across the app.
 * Centralized here so route paths never get hardcoded in components.
 */
export const ROUTES = {
  HOME: '/',
  CHEATS: '/cheats',
  GUIDES: '/guides',
  NEWS: '/news',
  VEHICLES: '/vehicles',
  WEAPONS: '/weapons',
  CHARACTERS: '/characters',
  SEARCH: '/search',
  LOGIN: '/login',
  REGISTER: '/register',
  PROFILE: '/profile',
  DASHBOARD: '/dashboard',
  ADMIN: '/admin',
};

export const NAV_LINKS = [
  { label: 'Cheats', path: ROUTES.CHEATS },
  { label: 'Guides', path: ROUTES.GUIDES },
  { label: 'News', path: ROUTES.NEWS },
  { label: 'Vehicles', path: ROUTES.VEHICLES },
  { label: 'Weapons', path: ROUTES.WEAPONS },
  { label: 'Characters', path: ROUTES.CHARACTERS },
];
