// FadeInWhenVisible.tsx
'use client';
import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const fadeUpVariants = {
    hidden: { opacity: 0, y: 30 }, // Daha aşağıdan başlasın
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 1.2, // Bir az daha uzun
        ease: [0.22, 1, 0.36, 1] as const, // Daha “axıcı” ease – easeOutCubic kimi
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
