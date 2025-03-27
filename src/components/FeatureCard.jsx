import React from "react";

const FeatureCard = ({ icon, title, desc }) => {
  return (
    <>
      <div className="flex overflow-hidden rounded-xl shadow-lg transform transition-all hover:scale-105">
        <div className="flex items-center justify-center bg-gradient-to-br from-purple-600 to-indigo-600 p-4">
          <div className="text-[var(--clr-light-a0)] text-4xl">{icon}</div>
        </div>
        <div className="flex flex-col justify-center p-6 bg-gray-800">
          <h3 className="text-2xl font-bold text-[var(--clr-light-a0)]">
            {title}
          </h3>
          <p className="mt-2 text-gray-300">{desc}</p>
        </div>
      </div>
    </>
  );
};

export default FeatureCard;
