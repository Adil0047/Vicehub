import { Link } from 'react-router-dom';
import { FaTwitter, FaDiscord, FaYoutube, FaReddit } from 'react-icons/fa';
import { ROUTES } from '@constants/routes';

const QUICK_LINKS = [
  { label: 'Cheats', path: ROUTES.CHEATS },
  { label: 'Guides', path: ROUTES.GUIDES },
  { label: 'News', path: ROUTES.NEWS },
  { label: 'Search', path: ROUTES.SEARCH },
];

const RESOURCES = [
  { label: 'Vehicles', path: ROUTES.VEHICLES },
  { label: 'Weapons', path: ROUTES.WEAPONS },
  { label: 'Characters', path: ROUTES.CHARACTERS },
  { label: 'About', path: '/about' },
];

const SOCIAL_LINKS = [
  { label: 'Twitter', href: 'https://twitter.com', icon: FaTwitter },
  { label: 'Discord', href: 'https://discord.com', icon: FaDiscord },
  { label: 'YouTube', href: 'https://youtube.com', icon: FaYoutube },
  { label: 'Reddit', href: 'https://reddit.com', icon: FaReddit },
];

/**
 * Dark 4-column footer per UI guidelines section 12:
 * Quick Links, Resources, Social, Copyright.
 */
function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-background-secondary border-t border-border">
      <div className="container-page grid grid-cols-1 gap-10 py-16 sm:grid-cols-2 md:grid-cols-4">
        <div>
          <Link to={ROUTES.HOME} className="text-cardTitle font-bold text-text-primary">
            Vice<span className="text-orange">Hub</span>
          </Link>
          <p className="mt-4 text-small text-text-muted max-w-xs">
            The ultimate GTA VI companion. Cheats, guides, and everything Vice City has to
            offer.
          </p>
        </div>

        <div>
          <h3 className="text-small font-semibold uppercase tracking-wide text-text-primary mb-4">
            Quick Links
          </h3>
          <ul className="flex flex-col gap-3">
            {QUICK_LINKS.map((link) => (
              <li key={link.path}>
                <Link
                  to={link.path}
                  className="text-small text-text-secondary hover:text-orange transition-colors duration-fast"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-small font-semibold uppercase tracking-wide text-text-primary mb-4">
            Resources
          </h3>
          <ul className="flex flex-col gap-3">
            {RESOURCES.map((link) => (
              <li key={link.path}>
                <Link
                  to={link.path}
                  className="text-small text-text-secondary hover:text-orange transition-colors duration-fast"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-small font-semibold uppercase tracking-wide text-text-primary mb-4">
            Social
          </h3>
          <div className="flex gap-4">
            {SOCIAL_LINKS.map(({ label, href, icon: Icon }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="
                  flex h-10 w-10 items-center justify-center rounded-full
                  bg-surface text-text-secondary
                  hover:text-orange hover:bg-orange/10
                  transition-colors duration-fast
                "
              >
                <Icon size={18} />
              </a>
            ))}
          </div>
        </div>
      </div>

      <div className="border-t border-border">
        <div className="container-page flex flex-col sm:flex-row items-center justify-between gap-4 py-6">
          <p className="text-caption text-text-muted">
            &copy; {year} ViceHub. Not affiliated with Rockstar Games or Take-Two Interactive.
          </p>
          <div className="flex gap-6">
            <Link to="/privacy" className="text-caption text-text-muted hover:text-orange transition-colors duration-fast">
              Privacy Policy
            </Link>
            <Link to="/terms" className="text-caption text-text-muted hover:text-orange transition-colors duration-fast">
              Terms
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
