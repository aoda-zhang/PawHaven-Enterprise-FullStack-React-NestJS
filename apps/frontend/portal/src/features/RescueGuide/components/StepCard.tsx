import React from 'react';

interface StepCardProps {
  icon: string;
  title: string;
  desc: string;
}

export const StepCard: React.FC<StepCardProps> = ({ icon, title, desc }) => {
  return (
    <div
      className="
        bg-white rounded-2xl shadow-md mb-4 p-6
        transition-transform duration-200 hover:-translate-y-1 hover:shadow-lg
        border border-gray-100
      "
    >
      <div className="text-4xl">{icon}</div>

      <h3 className="text-xl font-semibold mt-3 text-gray-800">{title}</h3>

      <p className="text-gray-600 mt-2 leading-relaxed">{desc}</p>
    </div>
  );
};
