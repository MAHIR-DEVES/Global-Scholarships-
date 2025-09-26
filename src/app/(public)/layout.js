import Footer from '@/components/footer/Footer';
import Navbar from '@/components/navbar/Navbar';

export default function PublicLayout({ children }) {
  return (
    <div className="flex flex-col min-h-screen bg-[#f8f7ff]">
      <Navbar />
      <main className="flex-grow pt-20">{children}</main>
      <Footer />
    </div>
  );
}
