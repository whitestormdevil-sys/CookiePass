export function TrustStrip() {
  const websites = [
    "Netflix", "GitHub", "Spotify", "Amazon", "Google", 
    "Slack", "Notion", "Figma", "Discord", "YouTube"
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="text-center mb-12">
          <p className="text-section-label text-gray-500 mb-4">Trusted Integration</p>
          <h2 className="text-xl text-gray-900 font-medium">
            Works with every website you use
          </h2>
        </div>
        
        <div className="flex flex-wrap justify-center items-center gap-x-12 gap-y-8">
          {websites.map((website) => (
            <div
              key={website}
              className="text-lg font-medium text-gray-400 hover:text-gray-600 transition-colors duration-200"
            >
              {website}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}