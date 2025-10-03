// app/(protected)/layout.js

import Navbar from '@/components/admin/navbar/Navbar';

export default function ProtectedLayout({ children }) {
  return (
    <>
      <Navbar />
      <main>{children}</main>
      {/* Footer নেই */}
    </>
  );
}
