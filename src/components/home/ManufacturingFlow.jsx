import Reveal from '../Reveal.jsx';

const stages = [
  {
    title: 'Select',
    detail: 'Choose product families, ratings and market-ready models.',
    image: '/assets/images/company/facility-sampleroom.webp',
    alt: 'Fahint sample room'
  },
  {
    title: 'Customize',
    detail: 'Align finishes, logo placement and retail packaging.',
    image: '/assets/images/company/team-meeting.webp',
    alt: 'Private-label project review'
  },
  {
    title: 'Approve',
    detail: 'Confirm samples, markings and technical documents.',
    image: '/assets/images/company/facility-lab.webp',
    alt: 'Fahint testing laboratory'
  },
  {
    title: 'Produce',
    detail: 'Manufacture, inspect and prepare the approved range for shipment.',
    image: '/assets/images/company/facility-workshop.webp',
    alt: 'Fahint production workshop'
  }
];

export default function ManufacturingFlow() {
  return (
    <section className="home-flow" data-title-align="right">
      <div className="container">
        <div className="home-flow__head">
          <div className="home-flow__title">
            <p className="home-section-label">Production path</p>
            <h2>A Clear Path from Selection to Production.</h2>
          </div>
          <p>One team coordinates the product, brand details and manufacturing handoff.</p>
        </div>
        <ol className="home-flow__grid">
          {stages.map((stage, index) => (
            <Reveal as="li" className="home-flow__item" key={stage.title} delay={index * 70}>
              <div className="home-flow__media">
                <img src={stage.image} alt={stage.alt} loading="lazy" />
              </div>
              <div className="home-flow__body">
                <h3>{stage.title}</h3>
                <p>{stage.detail}</p>
              </div>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
