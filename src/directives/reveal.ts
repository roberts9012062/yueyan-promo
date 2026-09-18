// v-reveal 指令：元素进入视口时加 .is-in 触发进场动画（一次性）
import type { Directive } from 'vue';

const observer = new IntersectionObserver(
  (entries: IntersectionObserverEntry[]) => {
    for (const entry of entries) {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-in');
        observer.unobserve(entry.target);
      }
    }
  },
  { threshold: 0.12, rootMargin: '0px 0px -36px 0px' },
);

export const vReveal: Directive<HTMLElement> = {
  mounted: (el: HTMLElement): void => {
    el.classList.add('reveal');
    observer.observe(el);
  },
  unmounted: (el: HTMLElement): void => {
    observer.unobserve(el);
  },
};
