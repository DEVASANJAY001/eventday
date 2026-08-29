import { useEffect, useRef } from 'react';
import { useLocation, useNavigationType } from 'react-router-dom';

/**
 * ScrollManager handles intelligent scroll behavior:
 * 1. Navigating to a new page (PUSH / REPLACE) -> scrolls instantly to the top (0, 0).
 * 2. Navigating back/forward (POP) -> restores the exact previous scroll position where the user left off.
 */
export default function ScrollManager() {
  const location = useLocation();
  const navigationType = useNavigationType();
  const scrollPositions = useRef(new Map());
  const currentKey = useRef(location.key);

  // Disable browser's native automatic scroll restoration to avoid conflicts
  useEffect(() => {
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }
  }, []);

  // Continuously record scroll position for current page
  useEffect(() => {
    const handleScroll = () => {
      if (currentKey.current) {
        scrollPositions.current.set(currentKey.current, {
          x: window.scrollX,
          y: window.scrollY,
        });
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Handle location changes
  useEffect(() => {
    const targetKey = location.key;
    currentKey.current = targetKey;

    if (navigationType === 'POP') {
      // User navigated back or forward - restore saved scroll position
      const savedPosition = scrollPositions.current.get(targetKey);
      if (savedPosition) {
        // Use requestAnimationFrame to ensure DOM is updated before restoring scroll
        requestAnimationFrame(() => {
          window.scrollTo({
            top: savedPosition.y,
            left: savedPosition.x,
            behavior: 'instant',
          });
        });
      } else {
        window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
      }
    } else {
      // User navigated to a new page (PUSH / REPLACE) - scroll to top
      if (location.hash) {
        const el = document.getElementById(location.hash.slice(1));
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' });
          return;
        }
      }
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    }
  }, [location.pathname, location.search, location.hash, location.key, navigationType]);

  return null;
}
