import React from "react";
import { FaXTwitter } from "react-icons/fa6";

const TestimonialCard = ({ avatar, name, handle, content }) => {
  return (
    <>
      <div className="bg-gray-800 p-4 rounded-xl shadow-md text-[var(--clr-light-a0)] break-inside-avoid">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center">
            <img
              src={avatar}
              alt={name}
              className="w-10 h-10 rounded-full mr-3"
            />
            <div>
              <p className="font-semibold">{name}</p>
              <p className="text-gray-400 text-sm">{handle}</p>
            </div>
          </div>
          <FaXTwitter />
        </div>
        <p className="text-gray-300 italic leading-relaxed">{content}</p>
      </div>
    </>
  );
};

export default TestimonialCard;
