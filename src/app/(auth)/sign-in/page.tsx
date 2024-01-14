import { redirect } from 'next/navigation';
import { getServerSession } from 'next-auth/next';

import SignInForm from '@/components/annotab/auth/sign-in';
import { authOptions } from '@/libs/auth';

export default async function SignIn() {
  const session = await getServerSession(authOptions);

  if (session) {
    redirect('/');
  }

  return <SignInForm />;
}
