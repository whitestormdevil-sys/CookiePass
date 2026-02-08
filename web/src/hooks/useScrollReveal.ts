"use client";
import { useEffect, useRef, useCallback } from "react";

export function useScrollReveal() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    
    const elements = container.querySelectorAll('.reveal');
    
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -60px 0px' }
    );
    
    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);
  
  return containerRef;
}