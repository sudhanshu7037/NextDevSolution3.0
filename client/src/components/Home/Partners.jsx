import React from 'react';

const Partners = ({ data }) => {
  const partners = data?.list || [];

  return (
    <div className="bg-gray-50 py-12 border-y border-gray-100">
      <div className="max-w-7xl mx-auto px-4 overflow-hidden">
        <h2 className="text-center text-gray-400 text-sm font-semibold uppercase tracking-widest mb-10">
          {data?.title || 'Partnership & Collaborations'}
        </h2>
        <div className="flex flex-wrap justify-center items-center gap-x-16 gap-y-10 opacity-50 grayscale hover:grayscale-0 transition-all duration-700">
          {partners.map((partner) => (
            <div key={partner.name} className="flex items-center justify-center min-w-[120px]">
              <img 
                src={partner.logo} 
                alt={partner.name} 
                className="h-10 md:h-12 w-auto object-contain max-w-[150px]"
                onError={(e) => { e.target.src = 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw=='; }}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Partners;
