import { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { FaBars, FaTimes, FaSearch, FaUserCircle, FaSignOutAlt } from 'react-icons/fa';
import useScrollPosition from '@hooks/useScrollPosition';
import useAuth from '@hooks/useAuth';
import { NAV_LINKS, ROUTES } from '@constants/routes';
import Button from '@components/ui/Button';
import SearchBar from '@components/common/SearchBar';

/**
 * Sticky navbar. Transparent over the hero, solid once the user scrolls.
 * Per UI guidelines: Logo, Navigation, Search, Login, Mobile Menu.
 */
function Navbar() {
  const isScrolled = useScrollPosition(24);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const { isAuthenticated, user, logout } = useAuth();
  const navigate = useNavigate();

  const closeMobileMenu = () => setIsMobileOpen(false);

  const handleLogout = async () => {
    closeMobileMenu();
    await logout();
    navigate(ROUTES.HOME);
  };

  return (
    <header
      className={`
        fixed top-0 left-0 right-0 z-50
        transition-colors duration-base
        ${isScrolled ? 'bg-background-primary/95 backdrop-blur-sm border-b border-border shadow-card' : 'bg-transparent'}
      `}
    >
      <nav className="container-page flex h-20 items-center justify-between" aria-label="Main navigation">
        <Link
          to={ROUTES.HOME}
          className="text-cardTitle font-bold text-text-primary tracking-tight"
          onClick={closeMobileMenu}
        >
          Vice<span className="text-orange">Hub</span>
        </Link>

        <ul className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map((link) => (
            <li key={link.path}>
              <NavLink
                to={link.path}
                className={({ isActive }) =>
                  `text-body font-medium transition-colors duration-fast hover:text-orange ${
                    isActive ? 'text-orange' : 'text-text-secondary'
                  }`
                }
              >
                {link.label}
              </NavLink>
            </li>
          ))}
        </ul>

        <div className="hidden md:flex items-center gap-4">
          <button
            type="button"
            aria-label="Toggle search"
            onClick={() => setIsSearchOpen((prev) => !prev)}
            className="p-2 text-text-secondary hover:text-orange transition-colors duration-fast"
          >
            <FaSearch size={18} />
          </button>
          {isAuthenticated ? (
            <div className="flex items-center gap-3">
              <Link to={ROUTES.DASHBOARD} className="flex items-center gap-2 text-small font-medium text-text-secondary hover:text-orange transition-colors duration-fast">
                <FaUserCircle size={18} />
                {user?.username}
              </Link>
              <Button variant="secondary" size="sm" onClick={handleLogout}>
                <FaSignOutAlt size={14} />
                Log Out
              </Button>
            </div>
          ) : (
            <Link to={ROUTES.LOGIN}>
              <Button variant="secondary" size="sm">
                <FaUserCircle size={16} />
                Login
              </Button>
            </Link>
          )}
        </div>

        <button
          type="button"
          aria-label="Toggle mobile menu"
          aria-expanded={isMobileOpen}
          onClick={() => setIsMobileOpen((prev) => !prev)}
          className="md:hidden p-2 text-text-primary"
        >
          {isMobileOpen ? <FaTimes size={22} /> : <FaBars size={22} />}
        </button>
      </nav>

      {isSearchOpen && (
        <div className="hidden md:block border-t border-border bg-background-secondary">
          <div className="container-page py-4">
            <SearchBar />
          </div>
        </div>
      )}

      {isMobileOpen && (
        <div className="md:hidden bg-background-primary border-t border-border">
          <div className="container-page flex flex-col gap-1 py-6">
            <div className="mb-4">
              <SearchBar />
            </div>
            {NAV_LINKS.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                onClick={closeMobileMenu}
                className={({ isActive }) =>
                  `py-3 text-body font-medium border-b border-border last:border-0 ${
                    isActive ? 'text-orange' : 'text-text-secondary'
                  }`
                }
              >
                {link.label}
              </NavLink>
            ))}
            {isAuthenticated ? (
              <div className="mt-4 flex flex-col gap-3">
                <Link to={ROUTES.DASHBOARD} onClick={closeMobileMenu}>
                  <Button variant="secondary" className="w-full">
                    <FaUserCircle size={16} />
                    {user?.username}
                  </Button>
                </Link>
                <Button variant="primary" className="w-full" onClick={handleLogout}>
                  <FaSignOutAlt size={16} />
                  Log Out
                </Button>
              </div>
            ) : (
              <Link to={ROUTES.LOGIN} onClick={closeMobileMenu} className="mt-4">
                <Button variant="primary" className="w-full">
                  <FaUserCircle size={16} />
                  Login
                </Button>
              </Link>
            )}
          </div>
        </div>
      )}
    </header>
  );
}

export default Navbar;
