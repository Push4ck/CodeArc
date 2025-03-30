import React from "react";

const FeatureCard = ({ img, title, desc }) => {
  return (
    <div className="relative rounded-2xl">
      <div className="relative bg-[var(--clr-surface-tonal-a0)] rounded-2xl p-6">
        <div className="absolute -top-8 -left-8 w-16 h-16 p-3 flex items-center justify-center rounded-full bg-[var(--clr-primary-a0)] border-8 border-[var(--clr-dark-a0)] shadow-lg">
          <img src={img} alt={title} className="w-full object-cover" />
        </div>
        <div className="mt-8">
          <h3 className="text-2xl font-bold text-[var(--clr-primary-a0)]">
            {title}
          </h3>
          <p className="mt-2 text-[var(--clr-light-a0)]">{desc}</p>
        </div>
      </div>
    </div>
  );
};

export default FeatureCard;
