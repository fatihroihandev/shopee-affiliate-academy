import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * Ensures that whenever a route or hash changes, the window and main
 * scrolling container reset immediately to the top of the screen.
 */
export const ScrollToTop = () => {
  const { pathname, search } = useLocation();

  useEffect(() => {
    // Reset window scroll position immediately
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'instant',
    });

    // Reset document scroll elements
    if (document.documentElement) {
      document.documentElement.scrollTop = 0;
    }
    if (document.body) {
      document.body.scrollTop = 0;
    }
  }, [pathname, search]);

  return null;
};
