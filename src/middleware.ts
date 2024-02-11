import Middleware from 'next-auth/middleware';

export default Middleware;
export const config = {
  matcher: ['/((?!.+\\.[\\w]+$|_next|sign-in|sign-up|verify-token).*)', '/'],
};
