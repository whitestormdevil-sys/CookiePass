import { useScrollAnimation } from "@/hooks/useScrollAnimation";

export function Testimonials() {
  const { ref, isVisible } = useScrollAnimation();

  const testimonials = [
    {
      quote: "CookiePass has revolutionized how our team shares access to various platforms. No more password sharing in Slack - just secure, time-limited access that we can revoke instantly.",
      name: "Sarah Chen",
      role: "Engineering Manager",
      company: "TechFlow",
      rating: 5,
      color: "from-blue-500 to-indigo-600",
    },
    {
      quote: "As a freelancer working with multiple clients, CookiePass makes it easy to give temporary access to dashboards and admin panels without compromising security. It's become essential to my workflow.",
      name: "Michael Rodriguez",
      role: "Full Stack Developer",
      company: "Independent",
      rating: 5,
      color: "from-emerald-500 to-teal-600",
    },
    {
      quote: "We use CookiePass to share Netflix and other streaming services within our family. It's so much easier than sharing passwords, and we love the usage tracking features.",
      name: "Priya Sharma",
      role: "Product Designer",
      company: "DesignCorp",
      rating: 5,
      color: "from-purple-500 to-pink-600",
    },
  ];

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <svg
        key={i}
        className={`h-4 w-4 ${i < rating ? 'text-amber-400' : 'text-gray-300'}`}
        fill="currentColor"
        viewBox="0 0 20 20"
      >
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
      </svg>
    ));
  };

  return (
    <section className="py-24 sm:py-32 bg-gray-50">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center mb-16">
          <p className="text-section-label text-indigo-600 mb-4">Testimonials</p>
          <h2 className="text-section-heading font-semibold text-gray-900 mb-6">
            Loved by users worldwide
          </h2>
          <p className="text-lg text-gray-600">
            See what our community has to say about CookiePass.
          </p>
        </div>

        <div 
          ref={ref}
          className={`animate-on-scroll ${isVisible ? 'visible' : ''}`}
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div
                key={testimonial.name}
                className={`glass backdrop-blur-xl rounded-3xl p-8 border border-gray-200/50 transition-all duration-300 hover:scale-[1.02] hover:shadow-xl animate-fade-in-up stagger-${index + 1}`}
                style={{ 
                  transform: `rotate(${index === 0 ? -1 : index === 1 ? 0 : 1}deg)`,
                  transformOrigin: 'center'
                }}
              >
                {/* Large decorative quote mark watermark */}
                <div className="relative">
                  <div className="absolute top-0 left-0 text-8xl font-serif text-gray-100 leading-none select-none pointer-events-none -translate-y-4 -translate-x-2">
                    "
                  </div>
                  
                  {/* Stars with enhanced styling */}
                  <div className="flex gap-1 mb-4 relative z-10">
                    {renderStars(testimonial.rating)}
                  </div>

                  {/* Quote */}
                  <blockquote className="text-gray-700 mb-6 leading-7 relative z-10">
                    {testimonial.quote}
                  </blockquote>

                  {/* Author with enhanced avatar */}
                  <div className="flex items-center gap-4 relative z-10">
                    <div className={`h-14 w-14 rounded-full bg-gradient-to-br ${testimonial.color} flex items-center justify-center shadow-lg hover:scale-110 transition-transform`}>
                      <span className="text-white font-semibold text-lg">
                        {testimonial.name.split(' ').map(n => n[0]).join('')}
                      </span>
                    </div>
                    <div>
                      <div className="font-semibold text-gray-900">
                        {testimonial.name}
                      </div>
                      <div className="text-sm text-gray-600">
                        {testimonial.role}
                        {testimonial.company !== "Independent" && (
                          <>, {testimonial.company}</>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Trust indicator */}
        <div className="mt-16 text-center">
          <div className="flex items-center justify-center gap-2 text-sm text-gray-500">
            <svg className="h-4 w-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
            <span>Verified testimonials from real CookiePass users</span>
          </div>
        </div>
      </div>
    </section>
  );
}