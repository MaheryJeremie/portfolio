export default function SectionRail({ marker, label }) {
  return (
    <div className="section__rail" aria-hidden="true">
      <span className="section__marker">{marker}</span>
      <span className="section__label">{label}</span>
    </div>
  );
}
