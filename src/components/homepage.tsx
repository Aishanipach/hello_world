import { useState, useEffect } from 'react';

const Homepage = () => {
  const [dimensions, setDimensions] = useState({
    width: typeof window !== 'undefined' ? window.innerWidth : 1024,
    height: typeof window !== 'undefined' ? window.innerHeight : 768
  });

  const [actionWord, setActionWord] = useState('scroll');

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      
      setDimensions({ width, height });
      
      // Mobile interface detection logic
      // Consider it mobile if width is small OR if it's a touch device with portrait orientation
      const isMobile = width <= 768 || (width <= 1024 && height > width);
      
      setActionWord(isMobile ? 'swipe' : 'scroll');
    };

    // Set initial value
    handleResize();

    // Add event listener
    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
  return (
    <div className="homepage">
      <div className="homepage-content">
        <>
          {/* Desktop image */}
          <img 
            src="/src/assets/home.png" 
            alt="Aishani" 
            className="homepage-image hidden sm:block"
          />

          {/* Mobile image */}
          <img 
            src="/src/assets/camera-v.png" 
            alt="Aishani" 
            className="homepage-image block sm:hidden"
          />
        </>
        <p className="homepage-subtitle">
          i am <b>aishani</b>; {actionWord} to see more, or click here <i><u>to get in touch</u></i>
        </p>
      </div>
    </div>
  );
};

export default Homepage;