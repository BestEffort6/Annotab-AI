import { useQuery } from '@tanstack/react-query';
import { getServerSession } from 'next-auth';

import { authOptions } from '@/libs/auth';
import { Env } from '@/libs/Env.mjs';

const fetchWorkspaceDetails = async () => {
  const session = await getServerSession(authOptions);

  const response = await fetch(`${Env.BACKEND_URL}/api/v1/invitation`, {
    headers: {
      Authorization: `Bearer ${session?.user.access.token}`,
    },
  }).then((res) => res.json());

  return response;
};

const useWorkspaceDetails = (initialData?: any) => {
  return useQuery({
    queryKey: ['invitations'],
    queryFn: () => fetchWorkspaceDetails(),
    initialData,
  });
};

export { fetchWorkspaceDetails, useWorkspaceDetails };
