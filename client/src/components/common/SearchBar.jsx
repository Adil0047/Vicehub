import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaSearch } from 'react-icons/fa';

/**
 * Rounded search input with orange focus ring, per UI guidelines section 14.
 * Navigates to the search results page on submit.
 */
function SearchBar({ placeholder = 'Search cheats, guides, vehicles...', className = '' }) {
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    const trimmed = query.trim();
    if (trimmed.length === 0) return;
    navigate(`/search?q=${encodeURIComponent(trimmed)}`);
  };

  return (
    <form onSubmit={handleSubmit} className={`relative w-full ${className}`} role="search">
      <FaSearch
        className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-text-muted"
        size={16}
        aria-hidden="true"
      />
      <input
        type="search"
        value={query}
        onChange={(event) => setQuery(event.target.value)}
        placeholder={placeholder}
        aria-label="Search ViceHub"
        className="
          w-full rounded-input border border-border bg-background-secondary
          py-4 pl-11 pr-4 text-body text-text-primary
          placeholder:text-text-muted
          transition-colors duration-base
          focus:border-orange focus:outline-none focus:ring-2 focus:ring-orange/25
        "
      />
    </form>
  );
}

export default SearchBar;
