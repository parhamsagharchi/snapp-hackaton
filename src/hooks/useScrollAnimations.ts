import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * Hook for subtle scroll-based animations
 * Creates gentle fade-in and slide-up effects without distracting the user
 */
export function useScrollAnimations() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Subtle fade-in for sections
      gsap.utils.toArray<HTMLElement>("[data-animate='section']").forEach((section) => {
        gsap.fromTo(
          section,
          {
            opacity: 0,
            y: 30,
          },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power2.out",
            scrollTrigger: {
              trigger: section,
              start: "top 85%",
              toggleActions: "play none none none",
            },
          }
        );
      });

      // Gentle stagger for list items
      gsap.utils.toArray<HTMLElement>("[data-animate='stagger']").forEach((container) => {
        const items = container.querySelectorAll("[data-animate='stagger-item']");
        gsap.fromTo(
          items,
          {
            opacity: 0,
            y: 20,
          },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            stagger: 0.1,
            ease: "power2.out",
            scrollTrigger: {
              trigger: container,
              start: "top 85%",
              toggleActions: "play none none none",
            },
          }
        );
      });

      // Subtle fade-in for headings
      gsap.utils.toArray<HTMLElement>("[data-animate='heading']").forEach((heading) => {
        gsap.fromTo(
          heading,
          {
            opacity: 0,
            y: 15,
          },
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
            ease: "power2.out",
            scrollTrigger: {
              trigger: heading,
              start: "top 90%",
              toggleActions: "play none none none",
            },
          }
        );
      });

      // Gentle scale-in for icons/emojis
      gsap.utils.toArray<HTMLElement>("[data-animate='icon']").forEach((icon) => {
        gsap.fromTo(
          icon,
          {
            opacity: 0,
            scale: 0.8,
          },
          {
            opacity: 1,
            scale: 1,
            duration: 0.6,
            ease: "back.out(1.2)",
            scrollTrigger: {
              trigger: icon,
              start: "top 90%",
              toggleActions: "play none none none",
            },
          }
        );
      });

      // Subtle fade-in for paragraphs
      gsap.utils.toArray<HTMLElement>("[data-animate='text']").forEach((text) => {
        gsap.fromTo(
          text,
          {
            opacity: 0,
          },
          {
            opacity: 1,
            duration: 0.8,
            ease: "power2.out",
            scrollTrigger: {
              trigger: text,
              start: "top 90%",
              toggleActions: "play none none none",
            },
          }
        );
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return containerRef;
}

