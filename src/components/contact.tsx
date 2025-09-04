import React from 'react';

export default function Contact() {
  const contentData = [
    {
      heading: "Existing corporate entity",
      linkText: "https://www.linkedin.com/in/aishanipachauri/",
      href: "https://www.linkedin.com/in/aishanipachauri/"
    },
    {
      heading: "Find actual cool stuff on",
      linkText: "https://github.com/Aishanipach",
      href: "https://github.com/Aishanipach"
    },
    {
      heading: "Drop your AI generated emails at",
      linkText: "aishani.pachauri@gmail.com",
      href: "mailto:aishani.pachauri@gmail.com"
    }
  ];

  return (
  <div className="flex flex-col md:flex-row">
      {/* Left Column - GIF */}
      <div className="flex-1 flex items-center justify-center p-1">
        <div className="max-w-md w-full">
          <img 
            src="src/assets/lips.gif" 
            alt="Animated GIF"
            className="w-full h-auto"
          />
        </div>
      </div>

      {/* Right Column - Content Rows */}
      <div className="flex-1 flex flex-col justify-center p-8 space-y-12">
        {contentData.map((item, index) => (
          <div key={index} className="text-right">
            <h2 className="text-3xl font-bold text-gray-800 mb-2">
              {item.heading}
            </h2>
            <div className="flex items-center justify-end">
              <a href={item.href} className="text-lg text-blue-600 hover:text-blue-800 transition-colors">
                {item.linkText}
              </a>
              <span className="ml-2 text-s">↗</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}