const proofs = [
  { value: 'UL / cUL', label: 'Listed product platforms' },
  { value: 'E504391', label: 'UL file on record' },
  { value: 'ISO 9001', label: 'Quality management' },
  { value: 'US Support', label: 'Warehouse coordination' }
];

export default function TrustStrip() {
  return (
    <section className="home-trust" aria-label="Fahint manufacturing credentials">
      <div className="container home-trust__grid">
        {proofs.map((proof) => (
          <div key={proof.value}>
            <strong>{proof.value}</strong>
            <span>{proof.label}</span>
          </div>
        ))}
      </div>
    </section>
  );
}

