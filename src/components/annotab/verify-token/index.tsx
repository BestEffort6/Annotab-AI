'use client';

import { useSearchParams } from 'next/navigation';

const VerifyToken = () => {
  const searchParams = useSearchParams();

  const token = searchParams.get('token');
  const type = searchParams.get('type');

  return (
    <>
      Token: {token}, Type: {type}
    </>
  );
};

export default VerifyToken;
