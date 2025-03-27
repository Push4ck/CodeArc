import React from "react";
import { Link } from "react-router-dom";
import { FaTwitter, FaLinkedinIn, FaGithub } from "react-icons/fa";

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <>
      <div className="text-[var(--clr-light-a0)] py-4 px-20 flex justify-between items-center">
        <div>
          <p>&copy; {year} CodeArc. All rights reserved.</p>
        </div>
        <div className="flex items-center gap-12">
          <div className="flex items-center justify-center xl:mt-0">
            <ul className="flex gap-4">
              <li>
                <Link
                  to="https://www.twitter.com/push4ck/"
                  target="_blank"
                  className="text-[var(--clr-light-a0)] hover:text-[var(--clr-primary-a0)]"
                >
                  <FaTwitter size={24} />
                </Link>
              </li>
              <li>
                <Link
                  to="https://www.linkedin.com/company/push4ck/"
                  target="_blank"
                  className="text-[var(--clr-light-a0)] hover:text-[var(--clr-primary-a0)]"
                >
                  <FaLinkedinIn size={24} />
                </Link>
              </li>
              <li>
                <Link
                  to="https://www.github.com/push4ck"
                  target="_blank"
                  className="text-[var(--clr-light-a0)] hover:text-[var(--clr-primary-a0)]"
                >
                  <FaGithub size={24} />
                </Link>
              </li>
            </ul>
          </div>
          <div className="flex items-center justify-center">
            <ul className="flex gap-4">
              <li>
                <Link
                  to="/terms"
                  className="text-[var(--clr-light-a0)] hover:text-[var(--clr-primary-a0)]"
                >
                  Terms
                </Link>
              </li>
              <li>
                <Link
                  to="/privacy"
                  className="text-[var(--clr-light-a0)] hover:text-[var(--clr-primary-a0)]"
                >
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default Footer;
