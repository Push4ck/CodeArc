import React from "react";
import { Link } from "react-router-dom";
import { FaCode, FaBolt, FaTools } from "react-icons/fa";
import FeatureCard from "../components/FeatureCard";
import TestimonialsSection from "../components/TestimonialsSection";
import { Typewriter } from "react-simple-typewriter";

const HomePage = () => {
  return (
    <>
      <div className="bg-[var(--clr-dark-a0)] text-[var(--clr-light-a0)] min-h-screen">
        {/* Hero Section */}
        <section className="relative h-screen w-full">
          <div className="absolute inset-0 bg-[var(--clr-dark-a0)]">
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]"></div>
          </div>

          <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-6 text-center">
            <h1 className="text-7xl font-extrabold gradient-text">CodeArc</h1>
            <p className="text-2xl text-gray-300 mt-4 max-w-3xl">
              Your all-in-one front‐end toolkit for live coding, Tailwind
              conversion, and code minification.
            </p>
            <Link to="/code-editor">
              <button className="mt-6 bg-[var(--clr-light-a0)] text-[var(--clr-dark-a0)] hover:bg-[var(--clr-primary-a0)] hover:text-[var(--clr-light-a0)] px-8 py-3 rounded-xl text-lg font-medium shadow-lg transform transition hover:scale-105 cursor-pointer">
                Start Coding
              </button>
            </Link>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-20 px-20">
          <h2 className="text-4xl font-bold text-center mb-12">Why CodeArc?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 max-w-6xl mx-auto">
            <FeatureCard
              icon={<FaCode size={50} />}
              title="Sleek & Powerful"
              desc="Write and preview code with a premium editor experience."
            />
            <FeatureCard
              icon={<FaBolt size={50} />}
              title="Blazing Fast"
              desc="Optimized for speed and performance without any lags."
            />
            <FeatureCard
              icon={<FaTools size={50} />}
              title="More Features Coming"
              desc="Future tools like AI code suggestions & Tailwind to CSS conversion."
            />
          </div>
        </section>

        {/* Working Section */}
        <section className="py-20 px-20">
          <h2 className="text-4xl font-bold text-center mb-12">How It Works</h2>
          <div className="flex gap-8 items-center">
            <div className="w-full text-9xl font-extrabold">
              <Typewriter
                words={["Write Code", "Live Preview", "Download Code"]}
                loop={true}
                cursor
                cursorStyle="|"
                typeSpeed={75}
                deleteSpeed={50}
                delaySpeed={1000}
              />
            </div>

            <div className="w-full h-72 flex items-center justify-center">
              <video
                src="/your-video.mp4"
                controls
                className="w-full h-full object-cover rounded-lg"
              />
            </div>
          </div>
        </section>

        {/* testimonials section */}
        <section className="py-20 px-36">
          <TestimonialsSection />
        </section>
      </div>
    </>
  );
};

export default HomePage;
