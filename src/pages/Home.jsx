import EditorialHomepageFront from '../components/home/EditorialHomepageFront.jsx';
import HomeFaqInquiry from '../components/home/HomeFaqInquiry.jsx';

export default function Home() {
  return (
    <div id="homepage" data-home-version="classic">
      <EditorialHomepageFront />
      <HomeFaqInquiry />
    </div>
  );
}
