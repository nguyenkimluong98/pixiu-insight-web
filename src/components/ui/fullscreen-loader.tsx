'use client';

import Lottie from 'lottie-react';
import loadingAnimation from '@/../public/animations/loading.json';

export default function FullScreenLoader() {
  return (
    <div className='fixed inset-0 z-50 flex items-center justify-center overflow-hidden bg-black/80 backdrop-blur-sm'>
      {/* Background trail wind effect */}
      <div className='absolute inset-0 z-0 overflow-hidden'>
        <div className='animate-slideX absolute top-1/3 h-1 w-[150%] bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-40 blur-lg' />
        <div className='animate-slideX absolute top-2/3 h-1 w-[150%] bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-30 blur-md delay-1000' />
      </div>

      <div className='relative z-10 flex flex-col items-center space-y-4'>
        <div className='h-32 w-32'>
          <Lottie animationData={loadingAnimation} loop autoplay />
        </div>
        <div className='animate-pulse text-sm font-semibold tracking-wide text-white'>
          PREPARING YOUR DATA ...
        </div>
      </div>
    </div>
  );
}
