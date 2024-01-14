import { redirect } from 'next/navigation';
import { getServerSession } from 'next-auth';

import Home from '@/components/annotab/home';
import { authOptions } from '@/libs/auth';

export default async function Homepage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect('/sign-in');
  }

  return <Home />;
}
