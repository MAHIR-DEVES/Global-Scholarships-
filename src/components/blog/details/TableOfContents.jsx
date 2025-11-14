// components/blog/TableOfContents.jsx
"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

export function TableOfContents({ content }) {
  const [headings, setHeadings] = useState([]);
  const [activeId, setActiveId] = useState("");

  useEffect(() => {
    // Parse headings from content
    const tempDiv = document.createElement("div");
    tempDiv.innerHTML = content;
    const elements = tempDiv.querySelectorAll("h2, h3");

    const headingsList = Array.from(elements).map((elem, index) => ({
      id: `heading-${index}`,
      text: elem.textContent,
      level: elem.tagName.toLowerCase(),
    }));

    setHeadings(headingsList);

    // Add IDs to actual headings in the DOM
    setTimeout(() => {
      const actualHeadings = document.querySelectorAll(".prose h2, .prose h3");
      actualHeadings.forEach((heading, index) => {
        heading.id = `heading-${index}`;
      });
    }, 100);
  }, [content]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: "-100px 0px -70% 0px" }
    );

    const elements = document.querySelectorAll(".prose h2, .prose h3");
    elements.forEach((elem) => observer.observe(elem));

    return () => observer.disconnect();
  }, [headings]);

  if (headings.length === 0) return null;

  const scrollToHeading = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <nav className="rounded-xl bg-white p-6 shadow-sm">
      <h3 className="mb-4 text-lg font-bold text-gray-900">
        Table of Contents
      </h3>
      <ul className="space-y-2">
        {headings.map((heading) => (
          <li key={heading.id} className={cn(heading.level === "h3" && "ml-4")}>
            <button
              onClick={() => scrollToHeading(heading.id)}
              className={cn(
                "block w-full text-left text-sm transition-colors hover:text-blue-600",
                activeId === heading.id
                  ? "font-medium text-blue-600"
                  : "text-gray-600"
              )}
            >
              {heading.text}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
}
