import Navbar from '@/components/admin/navbar/Navbar';

export default function ProtectedLayout({ children }) {
  return (
    <>
      <main>{children}</main>
      {/* Footer নেই */}
    </>
  );
}
