import React, { useState, useEffect } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

const CustomCursor = () => {
  const [isHovered, setIsHovered] = useState(false);
  const [isHeadingHovered, setIsHeadingHovered] = useState(false);
  const [isTextHovered, setIsTextHovered] = useState(false);
  const [cursorColor, setCursorColor] = useState('#17a2a2');
  const [isVisible, setIsVisible] = useState(false);

  // Mouse position
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth spring physics for the circle
  const springConfig = { damping: 25, stiffness: 150, mass: 0.5 };
  const circleX = useSpring(mouseX, springConfig);
  const circleY = useSpring(mouseY, springConfig);

  useEffect(() => {
    const handleMouseMove = (e) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseOver = (e) => {
      const target = e.target;
      
      // 1. Detect Interactive Elements (Buttons, Links)
      const isInteractive = 
        target.closest('button') || 
        target.closest('a') || 
        target.closest('input') || 
        target.closest('select') || 
        target.closest('textarea') ||
        window.getComputedStyle(target).cursor === 'pointer';
      
      // 2. Detect Headings for Spotlight
      const isHeading = target.closest('h1') || target.closest('h2') || target.closest('h3');
      
      // 3. Detect General Text for Emphasize
      const isText = target.closest('p') || target.closest('li') || target.closest('span') || target.closest('h4') || target.closest('h5');

      // 4. Dynamic Color Logic (Section-based or brand cycling)
      const section = target.closest('section');
      const customColor = section?.getAttribute('data-cursor-color');
      
      // Internal logic: Hero and Services get Teal, About gets Dark, Products gets Orange/Teal etc.
      // For now, let's use a dynamic mapping if no data-attribute exists
      if (customColor) {
        setCursorColor(customColor);
      } else if (isHeading) {
        setCursorColor('#17a2a2'); // Primary Teal
      } else if (isInteractive) {
        setCursorColor('#000000'); // Bold Black
      } else {
        setCursorColor('#17a2a2'); // Default
      }
      
      setIsHovered(!!isInteractive);
      setIsHeadingHovered(!!isHeading);
      setIsTextHovered(!!isText && !isHeading);
    };

    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseover', handleMouseOver);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseover', handleMouseOver);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
    };
  }, [mouseX, mouseY, isVisible]);

  if (!isVisible) return null;

  return (
    <div className="fixed top-0 left-0 w-full h-full pointer-events-none z-[9999] hidden md:block">
      {/* Small Dot */}
      <motion.div
        className="fixed top-0 left-0 w-2 h-2 bg-black rounded-full z-50"
        style={{
          x: mouseX,
          y: mouseY,
          translateX: "-50%",
          translateY: "-50%",
        }}
      />

      {/* Big Smooth Circle */}
      <motion.div
        className="fixed top-0 left-0 rounded-full z-40"
        animate={{
          width: isHeadingHovered ? 150 : (isTextHovered ? 80 : (isHovered ? 60 : 30)),
          height: isHeadingHovered ? 150 : (isTextHovered ? 80 : (isHovered ? 60 : 30)),
          backgroundColor: isHeadingHovered 
            ? `${cursorColor}26` // 15% opacity
            : (isTextHovered ? `${cursorColor}1A` : (isHovered ? `${cursorColor}0D` : "rgba(0,0,0,0)")),
          borderColor: isHeadingHovered ? cursorColor : `${cursorColor}4D`, // 30% vs 100%
          borderWidth: isHeadingHovered ? 1 : 2,
          mixBlendMode: isHeadingHovered ? "difference" : "normal",
        }}
        transition={{ type: "spring", damping: 20, stiffness: 200, mass: 0.5 }}
        style={{
          x: circleX,
          y: circleY,
          translateX: "-50%",
          translateY: "-50%",
        }}
      />
    </div>
  );
};

export default CustomCursor;
