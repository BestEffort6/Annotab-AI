import { redirect } from 'next/navigation';
import { getServerSession } from 'next-auth';

import SignUpForm from '@/components/annotab/auth/sign-up';
import { authOptions } from '@/libs/auth';

const fetchDocuments = async () => {
  const response = await fetch(
    `${process.env.CMS_API_URL}/api/document-files?populate=file`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.CMS_API_KEY}`,
      },
    }
  );
  const document = await response.json();
  return document;
};

export default async function SignUp() {
  const session = await getServerSession(authOptions);
  const { data } = await fetchDocuments();

  if (session) {
    redirect('/');
  }

  return <SignUpForm documents={data} />;
}
