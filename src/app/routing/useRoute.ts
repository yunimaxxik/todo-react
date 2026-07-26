import { useEffect, useState } from 'react';
import { BASE_URL } from '@/shared/constants/index.ts';

const getCurrentPath = () => {
  const pathname = window.location.pathname;

  return pathname.startsWith(BASE_URL)
    ? pathname.slice(BASE_URL.length - 1) || '/'
    : pathname;
};

const useRoute = () => {
  const [path, setPath] = useState(getCurrentPath());

  useEffect(() => {
    const onLocationChange = () => {
      setPath(getCurrentPath());
    };

    window.addEventListener('popstate', onLocationChange);

    return () => {
      window.removeEventListener('popstate', onLocationChange);
    };
  }, []);

  return path;
};

export default useRoute;
