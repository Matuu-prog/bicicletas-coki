import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    // Cuando la ruta (pathname) cambie, sube a la posición 0,0
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

export default ScrollToTop;