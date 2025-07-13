'use client';

import React from 'react';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

interface LoadingSkeletonProps {
  width?: string | number;
  height?: string | number;
  count?: number;
  className?: string;
}

const LoadingSkeleton: React.FC<LoadingSkeletonProps> = ({
  width = '100%',
  height = '100%',
  count = 1,
  className = '',
}) => {
  return (
    <Skeleton
      baseColor="#e2e8f0"
      highlightColor="#f1f5f9"
      duration={1.5}
      width={width}
      height={height}
      count={count}
      className={`rounded-lg ${className}`}
    />
  );
};

export default LoadingSkeleton;