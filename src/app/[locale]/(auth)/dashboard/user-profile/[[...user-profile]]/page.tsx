import { getTranslations } from 'next-intl/server';

export async function generateMetadata(props: { params: { locale: string } }) {
  const t = await getTranslations({
    locale: props.params.locale,
    namespace: 'UserProfile',
  });

  return {
    title: t('meta_title'),
  };
}

const UserProfilePage = () => (
  <div className="my-6 -ml-16">
    <h1 className="text-3xl font-bold">User Profile</h1>
  </div>
);

export default UserProfilePage;
