import 'react-lazy-load-image-component/src/effects/blur.css';
import 'react-toastify/dist/ReactToastify.css';
import '@/styles/global.css';
import 'react-quill/dist/quill.snow.css';

import { Open_Sans } from 'next/font/google';

import Provider from './providers';

const openSans = Open_Sans({ subsets: ['latin'] });

export default function RootLayout(props: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={openSans.className}>
        <Provider>{props.children}</Provider>
      </body>
    </html>
  );
}

// Enable edge runtime but you are required to disable the `migrate` function in `src/libs/DB.ts`
// Unfortunately, this also means it will also disable the automatic migration of the database
// And, you will have to manually migrate it with `drizzle-kit push`
// export const runtime = 'edge';
