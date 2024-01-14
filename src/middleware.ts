import Middleware from 'next-auth/middleware';

export default Middleware;
export const config = {
  matcher: ['/'],
};
