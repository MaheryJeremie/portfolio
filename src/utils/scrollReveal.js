// Scroll reveal utility
export const initScrollReveal = () => {
  const revealElements = document.querySelectorAll('.reveal');
  
  const revealOnScroll = () => {
    const windowHeight = window.innerHeight;
    const revealPoint = 150;
    
    revealElements.forEach(element => {
      const elementTop = element.getBoundingClientRect().top;
      
      if (elementTop < windowHeight - revealPoint) {
        element.classList.add('active');
      } else {
        element.classList.remove('active');
      }
    });
  };
  
  // Initial check
  revealOnScroll();
  
  // Add scroll event listener
  window.addEventListener('scroll', revealOnScroll);
  
  // Cleanup function
  return () => {
    window.removeEventListener('scroll', revealOnScroll);
  };
};