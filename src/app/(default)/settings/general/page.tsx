import { redirect } from 'next/navigation';
import { getServerSession } from 'next-auth';

import Loading from '@/components/annotab/loading';
import GeneralSettings from '@/components/annotab/settings/general';
import { authOptions } from '@/libs/auth';

const fetchCurrentWorkspace = async (accessToken: string) => {
  const response = await fetch(
    `${process.env.BACKEND_URL}/api/v1/workspace/current`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
    }
  ).then((res) => res.json());

  return response;
};

export default async function GeneralSettingsPage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect('/sign-in');
  }
  const accessToken = session.user.access.token;

  const { data } = await fetchCurrentWorkspace(accessToken);

  if (!data) {
    return <Loading />;
  }

  return <GeneralSettings currentWorkspace={data} />;
}
