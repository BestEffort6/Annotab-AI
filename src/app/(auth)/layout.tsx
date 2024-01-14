'use client';

import { LazyLoadImage } from 'react-lazy-load-image-component';

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative flex min-h-screen w-full flex-row items-center justify-center bg-light-purple ">
      {children}
      <div className="absolute inset-x-0 bottom-0 h-1/4 w-full overflow-hidden md:h-auto">
        <LazyLoadImage
          src="/images/svg/auth-bg.svg"
          alt="wave"
          className="h-full w-full object-cover"
        />
      </div>
    </div>
  );
}
