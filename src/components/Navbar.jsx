import React from "react";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  return (
    <>
      <nav className="py-4 px-20 flex justify-between items-center border-b-2 border-[var(--clr-surface-tonal-a0)]">
        <NavLink
          to="/"
          className="text-xl font-bold text-[var(--clr-primary-a0)]"
        >
          CodeArc
        </NavLink>
        <div className="flex gap-4 font-medium">
          <NavLink
            to="/code-editor"
            className={({ isActive }) =>
              isActive
                ? "text-[var(--clr-primary-a0)] border-b-2 border-[var(--clr-primary-a0)] hover:text-[var(--clr-primary-a0)]"
                : "text-[var(--clr-light-a0)] border-b-2 border-transparent hover:text-[var(--clr-primary-a30)] hover:border-b-2 hover:border-[var(--clr-primary-a30)]"
            }
          >
            Editor
          </NavLink>
          <NavLink
            to="/tailwind-to-css-convertor"
            className={({ isActive }) =>
              isActive
                ? "text-[var(--clr-primary-a0)] border-b-2 border-[var(--clr-primary-a0)] hover:text-[var(--clr-primary-a0)]"
                : "text-[var(--clr-light-a0)] border-b-2 border-transparent hover:text-[var(--clr-primary-a30)] hover:border-b-2 hover:border-[var(--clr-primary-a30)]"
            }
          >
            Convertor
          </NavLink>
          <NavLink
            to="/code-minifier"
            className={({ isActive }) =>
              isActive
                ? "text-[var(--clr-primary-a0)] border-b-2 border-[var(--clr-primary-a0)] hover:text-[var(--clr-primary-a0)]"
                : "text-[var(--clr-light-a0)] border-b-2 border-transparent hover:text-[var(--clr-primary-a30)] hover:border-b-2 hover:border-[var(--clr-primary-a30)]"
            }
          >
            Minifier
          </NavLink>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
