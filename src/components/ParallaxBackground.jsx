import { useEffect, useState } from 'react';
import Box from '@mui/material/Box';

const ParallaxBackground = ({ image = '/background.jpg', blur = '2px', speed = 0.3 }) => {
  const [offsetY, setOffsetY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setOffsetY(window.scrollY * speed);
    };

    window.addEventListener('scroll', handleScroll);

    return () => window.removeEventListener('scroll', handleScroll);
  }, [speed]);

  return (
    <Box
      sx={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '200vh', // must be taller than viewport to scroll
        backgroundImage: `url(${image})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        transform: `translateY(${offsetY}px)`,
        filter: `blur(${blur})`,
        zIndex: -1,
      }}
    />
  );
};

export default ParallaxBackground;