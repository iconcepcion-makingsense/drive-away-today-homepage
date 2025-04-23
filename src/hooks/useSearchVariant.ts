
import { useEffect, useState } from 'react';

type SearchVariant = 'default' | 'separate-dates';

export const useSearchVariant = () => {
  const [variant, setVariant] = useState<SearchVariant>('default');

  useEffect(() => {
    // Check if user already has an assigned variant in localStorage
    const storedVariant = localStorage.getItem('search-variant');
    
    if (storedVariant === 'default' || storedVariant === 'separate-dates') {
      setVariant(storedVariant);
    } else {
      // Randomly assign variant (50/50)
      const newVariant: SearchVariant = Math.random() < 0.5 ? 'default' : 'separate-dates';
      localStorage.setItem('search-variant', newVariant);
      setVariant(newVariant);
    }
  }, []);

  return variant;
};
