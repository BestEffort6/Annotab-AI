import { useQuery } from '@tanstack/react-query';

const fetchInvitations = async () => {};

const useInvitations = () => {
  return useQuery({
    queryKey: ['invitations'],
    queryFn: () => fetchInvitations(),
  });
};

export { fetchInvitations, useInvitations };
