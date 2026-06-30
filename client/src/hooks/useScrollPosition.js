import { useEffect, useState } from 'react';

/**
 * Tracks whether the page has been scrolled past a threshold.
 * Used to switch the Navbar from transparent to solid background.
 */
function useScrollPosition(threshold = 24) {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > threshold);
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [threshold]);

  return isScrolled;
}

export default useScrollPosition;
