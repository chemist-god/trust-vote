"use client";
import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";

const MagicButton = ({
  title,
  icon,
  otherClasses,
  position,
}: {
  title: string;
  icon?: React.ReactNode;
  otherClasses?: string;
  position?: "left" | "right";
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative inline-block" ref={dropdownRef}>
      {/* Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative inline-flex h-12 w-full overflow-hidden rounded-[50px] p-[1px] focus:outline-none md:w-60 md:mt-10"
        aria-haspopup="true"
        aria-expanded={isOpen}
      >
        <span className="absolute inset-[-1000%] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)] animate-spin-slow" />
        <span
          className={`inline-flex h-full w-full cursor-pointer items-center justify-center rounded-[50px] bg-slate-950 px-3 text-sm font-medium text-white backdrop-blur-3xl gap-2 ${otherClasses}`}
        >
          {position === "left" && icon}
          {title}
          {position === "right" && icon}
        </span>
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <menu
          className="absolute top-full left-0 mt-2 w-full rounded-md bg-slate-800 shadow-lg z-10"
          role="menu"
        >
          <p className="p-2 text-xs font-semibold text-gray-400 uppercase">Select Role</p>
          <button
            className="block w-full text-left px-4 py-2 text-sm text-white hover:bg-slate-700 rounded"
            onClick={() => {
              router.push("/voter");
              setIsOpen(false);
            }}
            role="menuitem"
          >
            Voter
          </button>
          <button
            className="block w-full text-left px-4 py-2 text-sm text-white hover:bg-slate-700 rounded"
            onClick={() => {
              router.push("/candidate");
              setIsOpen(false);
            }}
            role="menuitem"
          >
            Candidate
          </button>
        </menu>
      )}
    </div>
  );
};

export default MagicButton;
