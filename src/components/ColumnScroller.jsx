import React from "react";
import TestimonialCard from "./TestimonialCard";

const ColumnScroller = ({ testimonials, duration }) => {
  return (
    <>
      <div className="flex-1 h-full overflow-hidden">
        <div
          className="flex flex-col gap-1 animate-scroll-column"
          style={{ animationDuration: `${duration}s` }}
        >
          {testimonials.map((t, idx) => (
            <div key={t.id + "-" + idx} className="mb-4">
              <TestimonialCard
                avatar={t.avatar}
                name={t.name}
                handle={t.handle}
                content={t.content}
              />
            </div>
          ))}
          {testimonials.map((t, idx) => (
            <div key={`dup-${t.id}-${idx}`} className="mb-4">
              <TestimonialCard
                avatar={t.avatar}
                name={t.name}
                handle={t.handle}
                content={t.content}
              />
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default ColumnScroller;
