'use client';

import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { usePathname } from 'next/navigation';
import { signOut, useSession } from 'next-auth/react';
import { useEffect, useMemo } from 'react';

import Loading from '@/components/annotab/loading';
import SettingsNavbar from '@/components/annotab/settings/layout/navbar';
import SettingsSidebar from '@/components/annotab/settings/layout/sidebar';
import WorkspaceSidebar from '@/components/annotab/workspace/layout/sidebar';
import Navbar from '@/components/layout/navbar';
import Sidebar from '@/components/layout/sidebar';
import { useLayout } from '@/components/providers/LayoutProvider';

export default function DefaultLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  dayjs.extend(relativeTime);
  const path = usePathname();
  const { data, status } = useSession();
  const { loading } = useLayout();

  useEffect(() => {
    if (dayjs().isAfter(dayjs(data?.expires))) {
      signOut();
    }
  }, [status, path, data]);

  const renderSidebar = useMemo(() => {
    switch (true) {
      case path.includes('dataset/create'):
        return <div className="h-full w-full overflow-hidden">{children}</div>;
      default:
        return (
          <div className="flex h-full w-full flex-row overflow-hidden">
            <WorkspaceSidebar />
            <div className="h-full w-full overflow-auto">{children}</div>
          </div>
        );
    }
  }, [path, children]);

  const renderLayout = useMemo(() => {
    switch (true) {
      case path.includes('image'):
        return (
          <div className="min-h-screen w-full bg-light-greyish">{children}</div>
        );
      case path.includes('settings/billing'):
      case path.includes('settings/general'):
      case path.includes('settings/notification'):
      case path.includes('settings/dataset-management'):
      case path.includes('settings/account'):
      case path.includes('settings/role-permission'):
        return (
          <div className="min-h-screen w-full bg-mostly-white">
            <SettingsNavbar />
            <div className="flex flex-row justify-center">
              <SettingsSidebar currentRoute={path} />
              {children}
            </div>
          </div>
        );
      default:
        return (
          <div className="relative flex min-h-screen w-full flex-row overflow-hidden bg-light-greyish">
            <Sidebar />
            <div className="flex h-screen w-full flex-col overflow-hidden">
              <Navbar />
              {renderSidebar}
            </div>
          </div>
        );
    }
  }, [path, children, renderSidebar]);

  return (
    <>
      <Loading loading={loading} />
      {renderLayout}
    </>
  );
}
