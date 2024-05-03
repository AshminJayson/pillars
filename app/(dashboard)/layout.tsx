import UserSessionComponent from '@/components/auth/user';

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <div className="min-h-screen">
      <UserSessionComponent>{children}</UserSessionComponent>
    </div>
  );
}
