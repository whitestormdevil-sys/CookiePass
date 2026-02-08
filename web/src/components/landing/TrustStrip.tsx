export function TrustStrip() {
  const websites = [
    { name: "Netflix", color: "bg-red-50 border-red-200/50 text-red-700 hover:bg-red-100" },
    { name: "GitHub", color: "bg-gray-50 border-gray-200/50 text-gray-700 hover:bg-gray-100" },
    { name: "Spotify", color: "bg-green-50 border-green-200/50 text-green-700 hover:bg-green-100" },
    { name: "Amazon", color: "bg-orange-50 border-orange-200/50 text-orange-700 hover:bg-orange-100" },
    { name: "Google", color: "bg-blue-50 border-blue-200/50 text-blue-700 hover:bg-blue-100" },
    { name: "Slack", color: "bg-purple-50 border-purple-200/50 text-purple-700 hover:bg-purple-100" },
    { name: "Notion", color: "bg-gray-50 border-gray-200/50 text-gray-700 hover:bg-gray-100" },
    { name: "Figma", color: "bg-pink-50 border-pink-200/50 text-pink-700 hover:bg-pink-100" },
    { name: "Discord", color: "bg-indigo-50 border-indigo-200/50 text-indigo-700 hover:bg-indigo-100" },
    { name: "YouTube", color: "bg-red-50 border-red-200/50 text-red-700 hover:bg-red-100" }
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
        
        <div className="flex flex-wrap justify-center items-center gap-4">
          {websites.map((website, index) => (
            <div
              key={website.name}
              className={`px-4 py-2 rounded-full border backdrop-blur-sm font-medium text-sm transition-all duration-300 hover:scale-105 animate-fade-in-up stagger-${(index % 6) + 1} ${website.color}`}
            >
              {website.name}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}