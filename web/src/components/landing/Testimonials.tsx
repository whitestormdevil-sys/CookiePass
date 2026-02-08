const testimonials = [
  {
    name: "Sarah Chen",
    role: "DevOps Engineer",
    company: "TechFlow Inc",
    avatar: "SC",
    content: "CookiePass has revolutionized how our team shares staging environment access. No more shared passwords in Slack – just secure, time-limited shares. It's a security game-changer.",
    rating: 5,
    featured: true
  },
  {
    name: "Marcus Rodriguez",
    role: "Freelance Developer",
    company: "Independent",
    avatar: "MR",
    content: "I use CookiePass daily to share client demos and staging sites. My clients love how professional and secure it feels, and I love not having to create new accounts for everyone.",
    rating: 5,
    featured: true
  },
  {
    name: "Emily Johnson",
    role: "Product Manager",
    company: "StreamlineApp",
    avatar: "EJ",
    content: "Finally, a way to share Netflix with the family without giving out my password. The time limits and usage controls give me peace of mind. Simple and secure!",
    rating: 5,
    featured: true
  },
  {
    name: "David Kim",
    role: "Security Engineer",
    company: "CyberSafe Solutions",
    avatar: "DK",
    content: "As a security professional, I was skeptical at first. But after reviewing the open source code and crypto implementation, I'm impressed. Zero-knowledge done right.",
    rating: 5,
    featured: false
  },
  {
    name: "Jennifer Walsh",
    role: "Agency Owner",
    company: "Digital Creative Co",
    avatar: "JW",
    content: "Our clients can preview their websites before launch without us sharing admin credentials. It's professional, secure, and saves so much time in client communications.",
    rating: 5,
    featured: false
  },
  {
    name: "Alex Thompson",
    role: "Remote Worker",
    company: "GlobalTeam Ltd",
    avatar: "AT",
    content: "Managing access for my virtual assistants used to be a nightmare. CookiePass makes it simple – they get temporary access exactly when needed, nothing more.",
    rating: 5,
    featured: false
  }
];

const companyLogos = [
  { name: "TechFlow", logo: "TF" },
  { name: "StreamlineApp", logo: "SA" },
  { name: "CyberSafe", logo: "CS" },
  { name: "DigitalCo", logo: "DC" },
  { name: "GlobalTeam", logo: "GT" },
  { name: "DevStudio", logo: "DS" }
];

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <svg
          key={star}
          className={`h-4 w-4 ${
            star <= rating ? "text-yellow-400" : "text-gray-300 dark:text-gray-600"
          }`}
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
}

export function Testimonials() {
  const featuredTestimonials = testimonials.filter(t => t.featured);
  const otherTestimonials = testimonials.filter(t => !t.featured);

  return (
    <section className="py-24 bg-gradient-to-br from-gray-50 via-white to-primary-50/30 dark:from-gray-950 dark:via-gray-900 dark:to-primary-950/30">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Header */}
        <div className="mx-auto max-w-3xl text-center mb-20">
          <h2 className="text-sm font-semibold uppercase tracking-wider text-primary-600 dark:text-primary-400 mb-4">
            Testimonials
          </h2>
          <h3 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-5xl mb-6">
            Loved by{" "}
            <span className="bg-gradient-to-r from-primary-500 to-indigo-500 bg-clip-text text-transparent">
              developers
            </span>{" "}
            and teams worldwide
          </h3>
          <p className="text-xl text-gray-600 dark:text-gray-300 leading-relaxed">
            Don't just take our word for it. See what our users have to say about
            CookiePass and how it's transformed their workflow.
          </p>
        </div>

        {/* Overall rating */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-4 bg-white/60 backdrop-blur-sm dark:bg-gray-900/60 rounded-2xl border border-gray-200/50 dark:border-gray-700/50 px-8 py-4">
            <div className="text-4xl font-bold text-primary-600 dark:text-primary-400">4.8</div>
            <div>
              <StarRating rating={5} />
              <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                Based on 500+ reviews
              </div>
            </div>
            <div className="h-8 w-px bg-gray-300 dark:bg-gray-600" />
            <div className="text-sm text-gray-600 dark:text-gray-400">
              Chrome Web Store Rating
            </div>
          </div>
        </div>

        {/* Featured testimonials */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
          {featuredTestimonials.map((testimonial, index) => (
            <div
              key={index}
              className="relative group"
            >
              {/* Glow effect */}
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-primary-500/10 via-indigo-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl" />
              
              <div className="relative h-full rounded-3xl border border-gray-200/50 bg-white/80 backdrop-blur-sm p-8 transition-all duration-300 hover:shadow-2xl hover:border-primary-200 dark:border-gray-700/50 dark:bg-gray-900/80 dark:hover:border-primary-800">
                {/* Quote icon */}
                <div className="absolute top-6 right-6 text-4xl text-primary-200 dark:text-primary-800">
                  "
                </div>
                
                {/* Rating */}
                <div className="mb-4">
                  <StarRating rating={testimonial.rating} />
                </div>
                
                {/* Content */}
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-6 text-lg">
                  "{testimonial.content}"
                </p>
                
                {/* Author */}
                <div className="flex items-center gap-4">
                  <div className="h-12 w-12 rounded-full bg-gradient-to-br from-primary-500 to-indigo-500 text-white flex items-center justify-center font-semibold">
                    {testimonial.avatar}
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900 dark:text-white">
                      {testimonial.name}
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">
                      {testimonial.role} at {testimonial.company}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Additional testimonials */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {otherTestimonials.map((testimonial, index) => (
            <div
              key={index}
              className="rounded-2xl border border-gray-200/50 bg-white/60 backdrop-blur-sm p-6 transition-all duration-300 hover:shadow-lg hover:border-primary-200 dark:border-gray-700/50 dark:bg-gray-900/60 dark:hover:border-primary-800"
            >
              {/* Rating */}
              <div className="mb-3">
                <StarRating rating={testimonial.rating} />
              </div>
              
              {/* Content */}
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-4">
                "{testimonial.content}"
              </p>
              
              {/* Author */}
              <div className="flex items-center gap-3">
                <div className="h-8 w-8 rounded-full bg-gradient-to-br from-primary-500 to-indigo-500 text-white flex items-center justify-center text-sm font-semibold">
                  {testimonial.avatar}
                </div>
                <div>
                  <div className="text-sm font-semibold text-gray-900 dark:text-white">
                    {testimonial.name}
                  </div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">
                    {testimonial.role}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Company logos */}
        <div className="text-center mb-12">
          <div className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-8">
            Trusted by teams at
          </div>
          <div className="flex flex-wrap items-center justify-center gap-8">
            {companyLogos.map((company, index) => (
              <div
                key={index}
                className="flex items-center gap-2 text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-400 transition-colors"
              >
                <div className="h-8 w-8 rounded bg-gray-200 dark:bg-gray-700 flex items-center justify-center text-xs font-bold">
                  {company.logo}
                </div>
                <span className="font-medium">{company.name}</span>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="text-center">
          <div className="bg-gradient-to-r from-primary-50 to-indigo-50 dark:from-primary-950/50 dark:to-indigo-950/50 rounded-3xl p-8 border border-primary-200/50 dark:border-primary-800/50">
            <h4 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Join thousands of satisfied users
            </h4>
            <p className="text-gray-600 dark:text-gray-300 mb-6 max-w-2xl mx-auto">
              Experience secure session sharing for yourself. Install CookiePass today 
              and see why developers and teams worldwide trust us with their security.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-gray-500 dark:text-gray-400">
              <span className="flex items-center gap-2">
                <svg className="h-4 w-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                500+ 5-star reviews
              </span>
              <span className="flex items-center gap-2">
                <svg className="h-4 w-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                10,000+ active users
              </span>
              <span className="flex items-center gap-2">
                <svg className="h-4 w-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                Zero security incidents
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}