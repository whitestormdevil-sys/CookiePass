import { useScrollAnimation } from "@/hooks/useScrollAnimation";

export function Stats() {
  const { ref, isVisible } = useScrollAnimation();

  const stats = [
    {
      number: "10,000+",
      label: "Sessions shared",
      description: "Users trust us with their access",
    },
    {
      number: "256-bit",
      label: "Encryption",
      description: "Military-grade security standard",
    },
    {
      number: "Zero",
      label: "Data breaches",
      description: "Perfect security track record",
    },
    {
      number: "100%",
      label: "Open source",
      description: "Transparent and auditable code",
    },
  ];

  return (
    <section className="py-24 sm:py-32 bg-slate-50">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center mb-16">
          <p className="text-section-label text-slate-600 mb-4">Trusted Worldwide</p>
          <h2 className="text-section-heading font-semibold text-gray-900 mb-6">
            Powering secure sharing globally
          </h2>
        </div>

        <div 
          ref={ref}
          className={`animate-on-scroll ${isVisible ? 'visible' : ''}`}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-5xl lg:text-6xl font-bold text-gray-900 mb-2">
                  {stat.number}
                </div>
                <div className="text-lg font-semibold text-gray-700 mb-2">
                  {stat.label}
                </div>
                <div className="text-sm text-gray-600">
                  {stat.description}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}