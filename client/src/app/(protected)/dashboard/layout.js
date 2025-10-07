import Navbar from '@/components/admin/navbar/Navbar';
import Sidebar from '@/components/admin/sidebar/Sidebar';

export default function DashboardLayout({ children }) {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <div className="flex flex-1">
        <Sidebar />
        <main className="flex-1 p-6 bg-gray-100">{children}</main>
      </div>
    </div>
  );
}
