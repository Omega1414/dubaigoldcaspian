// FadeInWhenVisible.tsx
'use client';
import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const fadeUpVariants = {
  hidden: { opacity: 0, y: 40 }, 
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 2, 
      ease: [0.25, 1, 0.5, 1] as const, 
    },
  },
};


const FadeInWhenVisible = ({
  children,
  className = '',
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <motion.div
      ref={ref}
      className={className}
      variants={fadeUpVariants}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
    >
      {children}
    </motion.div>
  );
};

export default FadeInWhenVisible;
