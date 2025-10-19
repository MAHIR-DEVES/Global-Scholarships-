import Footer from '@/components/footer/Footer';
import Navbar from '@/components/navbar/Navbar';

export default function PublicLayout({ children }) {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Navbar />
      <main className="flex-grow pt-20">{children}</main>
      <Footer />
    </div>
  );
}
