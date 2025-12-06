"use client";

import Link from "next/link";
import "./../../styles/not-found.css";

export default function NotFoundView() {
  return (
    <div className="font-albert-sans">
      <div className="error-page">
        <h1 className="error-title">
          404
          <span className="error-shadow">404</span>
        </h1>

        <div className="error-info">
          <h2 className="error-subtitle">We can't find that page</h2>
          <p className="error-description">
            We're fairly sure that page used to be here, but seems to have gone
            missing. We do apologise on it's behalf.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center items-center mt-8">
            <Link
              href="/"
              className="inline-block uppercase no-underline bg-[hsl(44,0%,70%)] text-[hsl(0,0%,4%)] px-8 md:px-12 py-3 rounded-full text-xs md:text-sm tracking-wider hover:bg-[hsl(44,0%,75%)] transition-colors font-medium min-w-[140px] text-center"
            >
              Home
            </Link>
            <button
              onClick={() => window.history.back()}
              className="inline-block uppercase no-underline bg-transparent border-2 border-[hsl(44,0%,70%)] text-[hsl(0,0%,98%)] px-8 md:px-12 py-3 rounded-full text-xs md:text-sm tracking-wider hover:bg-[hsl(44,0%,70%)] hover:text-[hsl(0,0%,4%)] transition-colors font-medium min-w-[140px] text-center cursor-pointer"
            >
              Go Back
            </button>
          </div>
        </div>

        <div className="cloak-wrapper">
          <div className="cloak-container">
            <div className="cloak" />
          </div>
        </div>
      </div>
    </div>
  );
}
