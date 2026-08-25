import EditorialHomepageFront from '../components/home/EditorialHomepageFront.jsx';
import HomeCertifications from '../components/home/HomeCertifications.jsx';
import HomepageCta from '../components/home/HomepageCta.jsx';
import HomeInsights from '../components/home/HomeInsights.jsx';
import HomeFaqInquiry from '../components/home/HomeFaqInquiry.jsx';

export default function Home() {
  return (
    <>
      <EditorialHomepageFront />
      <HomeCertifications />
      <HomepageCta />
      <HomeInsights />
      <HomeFaqInquiry />
    </>
  );
}
