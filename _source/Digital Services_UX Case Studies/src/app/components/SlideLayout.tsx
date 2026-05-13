import { ReactNode } from 'react';

interface SlideLayoutProps {
  children: ReactNode;
  background?: string;
  className?: string;
}

export function SlideLayout({ children, background = 'bg-white', className = '' }: SlideLayoutProps) {
  return (
    <div className={`w-full h-screen ${background} ${className} relative overflow-hidden flex items-center justify-center`}>
      {children}
    </div>
  );
}