import { getTranslations } from 'next-intl/server';

const Hello = async () => {
  const t = await getTranslations('Dashboard');

  return <p>👋 {t('hello_message', { email: 'testuser@gmail.com' })}</p>;
};

export { Hello };
