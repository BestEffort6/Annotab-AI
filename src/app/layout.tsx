import 'react-lazy-load-image-component/src/effects/blur.css';
import 'react-toastify/dist/ReactToastify.css';
import '@/styles/global.css';

import Provider from './providers';

export default function RootLayout(props: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  let { locale } = props.params;
  // Using internationalization in Client Components
  if (!props.params.locale) {
    locale = 'en';
  }

  return (
    <html lang={locale}>
      <body>
        <Provider>{props.children}</Provider>
      </body>
    </html>
  );
}

// Enable edge runtime but you are required to disable the `migrate` function in `src/libs/DB.ts`
// Unfortunately, this also means it will also disable the automatic migration of the database
// And, you will have to manually migrate it with `drizzle-kit push`
// export const runtime = 'edge';
