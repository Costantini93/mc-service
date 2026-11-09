"use client";

// Base: "Segmented Control" di kuratlielia su 21st.dev, adattato a MCservice.
import {
  useEffect,
  useId,
  useLayoutEffect,
  useRef,
  type KeyboardEvent,
  type ReactNode,
} from "react";
import { LayoutGroup, motion, useReducedMotion } from "motion/react";

export interface Segment {
  value: string;
  label: string;
  accessory?: ReactNode;
}
export interface SegmentedControlProps {
  options: Segment[];
  value: string;
  onValueChange: (value: string) => void;
  label?: string;
  className?: string;
}

const spring = { type: "spring", stiffness: 420, damping: 36, mass: 0.9 } as const;

export default function SegmentedControl({
  options,
  value,
  onValueChange,
  label,
  className,
}: SegmentedControlProps) {
  const id = useId();
  const reduced = useReducedMotion();
  const track = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const node = track.current;
    if (!node) return;
    const edges = () => {
      const rest = node.scrollWidth - node.clientWidth - node.scrollLeft;
      node.toggleAttribute("data-fade-start", node.scrollLeft > 1);
      node.toggleAttribute("data-fade-end", rest > 1);
    };
    edges();
    node.addEventListener("scroll", edges, { passive: true });
    const observer = typeof ResizeObserver === "undefined" ? null : new ResizeObserver(edges);
    observer?.observe(node);
    return () => {
      node.removeEventListener("scroll", edges);
      observer?.disconnect();
    };
  }, [options.length]);

  const first = useRef(true);
  useEffect(() => {
    const node = track.current;
    const button = node?.querySelector<HTMLElement>('[aria-pressed="true"]');
    if (!node || !button || node.scrollWidth <= node.clientWidth) {
      first.current = false;
      return;
    }
    const room = 20;
    const start = button.offsetLeft - room;
    const end = button.offsetLeft + button.offsetWidth + room - node.clientWidth;
    const left = node.scrollLeft > start ? start : node.scrollLeft < end ? end : node.scrollLeft;
    if (left !== node.scrollLeft)
      node.scrollTo({ left: Math.max(0, left), behavior: first.current || reduced ? "auto" : "smooth" });
    first.current = false;
  }, [value, reduced]);

  const selectedIndex = Math.max(0, options.findIndex((o) => o.value === value));
  const onKeyDown = (event: KeyboardEvent<HTMLButtonElement>) => {
    const last = options.length - 1;
    const k = event.key;
    const target =
      k === "ArrowRight" || k === "ArrowDown"
        ? selectedIndex === last ? 0 : selectedIndex + 1
        : k === "ArrowLeft" || k === "ArrowUp"
          ? selectedIndex === 0 ? last : selectedIndex - 1
          : k === "Home" ? 0 : k === "End" ? last : -1;
    if (target < 0 || !options[target]) return;
    event.preventDefault();
    onValueChange(options[target].value);
    track.current
      ?.querySelector<HTMLElement>(`[data-value="${CSS.escape(options[target].value)}"]`)
      ?.focus({ preventScroll: true });
  };

  return (
    <div className={`relative max-w-full ${className ?? ""}`} role="group" aria-label={label}>
      <LayoutGroup id={id}>
        <motion.div ref={track} layoutScroll className="seg-track flex w-fit max-w-full gap-1.5 overflow-x-auto rounded-full border border-rule bg-paper p-1">
          {options.map((option, index) => (
            <button
              key={option.value}
              className="relative min-h-11 flex-none cursor-pointer rounded-full px-4.5 py-2 text-base font-medium text-ink transition-colors hover:bg-mist aria-pressed:text-paper aria-pressed:hover:bg-transparent focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-ink"
              type="button"
              data-value={option.value}
              aria-pressed={value === option.value}
              tabIndex={index === selectedIndex ? 0 : -1}
              onClick={() => onValueChange(option.value)}
              onKeyDown={onKeyDown}
            >
              {value === option.value && (
                <motion.span
                  className="absolute inset-0 rounded-full bg-ink"
                  layoutId="selection"
                  layoutDependency={value}
                  transition={reduced ? { duration: 0 } : spring}
                  aria-hidden="true"
                />
              )}
              <span className="relative whitespace-nowrap">
                {option.label}
                {option.accessory}
              </span>
            </button>
          ))}
        </motion.div>
      </LayoutGroup>
    </div>
  );
}
