import { Card, CardContent } from '@/components/ui/card';
import Lottie from 'lottie-react';
import loadingAnimation from '@/../public/animations/loading.json'; // Đường dẫn đúng với project của bạn

export default function CardLoader() {
  return (
    <div className='relative flex min-h-[200px] flex-col items-center justify-center space-y-4'>
      <div className='h-24 w-24'>
        <Lottie animationData={loadingAnimation} loop autoplay />
      </div>
    </div>
  );
}
