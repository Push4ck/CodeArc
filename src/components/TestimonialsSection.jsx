import React from "react";
import testimonials from "../data/testimonials";
import ColumnScroller from "./ColumnScroller";

const distributeTestimonials = (data) => {
  const columns = [[], [], []];
  data.forEach((item, idx) => {
    columns[idx % 3].push(item);
  });
  return columns;
};

const TestimonialsSection = () => {
  const repeated = [...testimonials, ...testimonials];
  const [col1, col2, col3] = distributeTestimonials(repeated);

  return (
    <>
      <section className="relative bg-[var(--clr-dark-a0)] text-[var(--clr-light-a0)] overflow-hidden">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-8">
          Loved by thousands of people
        </h2>
        <p className="text-center text-gray-400 max-w-2xl mx-auto mb-10">
          Here’s what some of our users have to say about CodeArc
        </p>

        <div className="relative h-[500px] overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-24 bg-gradient-to-b from-black via-black/50 to-transparent z-10" />

          <div className="absolute w-full h-full flex gap-4 px-4">
            <ColumnScroller testimonials={col1} duration={35} />
            <ColumnScroller testimonials={col2} duration={40} />
            <ColumnScroller testimonials={col3} duration={45} />
          </div>

          <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-black via-black/50 to-transparent z-10" />
        </div>
      </section>
    </>
  );
};

export default TestimonialsSection;
