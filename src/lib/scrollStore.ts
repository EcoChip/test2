// Direct mutable store for scroll-driven animations (Zero React state updates during scroll)
export interface IntroScrollState {
  progress: number;
  velocity: number;
  isScrolling: boolean;
  lastScrollTime: number;
  qualityTier: "high" | "medium" | "low";
}

export const introScroll: IntroScrollState = {
  progress: 0,
  velocity: 0,
  isScrolling: false,
  lastScrollTime: 0,
  qualityTier: "high",
};

// Listener callbacks for 3D engine render-on-demand triggers
type ScrollListener = (progress: number) => void;
const listeners = new Set<ScrollListener>();

export function subscribeIntroScroll(fn: ScrollListener): () => void {
  listeners.add(fn);
  return () => listeners.delete(fn);
}

export function notifyIntroScroll(p: number) {
  introScroll.progress = p;
  introScroll.lastScrollTime = performance.now();
  introScroll.isScrolling = true;
  listeners.forEach((fn) => fn(p));
}
