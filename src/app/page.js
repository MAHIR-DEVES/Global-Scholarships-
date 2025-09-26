import Bachelors from '@/components/bachelors/Bachelors';
import PublicLayout from './(public)/layout';
import Banner from '@/components/banner/Banner';
import Diploma from '@/components/diploma/Diploma';
import UniversityLogo from '@/components/universityLogo/UniversityLogo';
import Masters from '@/components/masters/Masters';

export default function Home() {
  return (
    <PublicLayout>
      <Banner></Banner>
      <UniversityLogo></UniversityLogo>
      <Diploma></Diploma>
      <Bachelors></Bachelors>
      <Masters></Masters>
    </PublicLayout>
  );
}
