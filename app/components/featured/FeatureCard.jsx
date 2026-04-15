// components/FeatureCard.jsx
export function FeatureCard({ icon, title, description, className = "" }) {
  return (
    <div
      className={`rounded-2xl border bg-card p-6 shadow-sm transition-all hover:shadow-md hover:-translate-y-1 ${className}`}
    >
      <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
        {icon}
      </div>
      <h3 className="mb-2 text-lg font-semibold">{title}</h3>
      <p className="text-sm text-muted-foreground">{description}</p>
    </div>
  );
}
