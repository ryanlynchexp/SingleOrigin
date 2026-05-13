import { useEffect, useState, RefObject } from 'react';

interface UseResponsiveScaleOptions {
  minScale?: number;
  maxScale?: number;
  enabled?: boolean;
}

export function useResponsiveScale(
  ref: RefObject<HTMLElement>,
  options: UseResponsiveScaleOptions = {}
) {
  const { minScale = 0.5, maxScale = 1, enabled = true } = options;
  const [scale, setScale] = useState(1);
  const [isOverflowing, setIsOverflowing] = useState(false);

  useEffect(() => {
    if (!enabled || !ref.current) return;

    const calculateScale = () => {
      const element = ref.current;
      if (!element) return;

      const container = element.parentElement;
      if (!container) return;

      const containerWidth = container.clientWidth;
      const containerHeight = container.clientHeight;
      const contentWidth = element.scrollWidth;
      const contentHeight = element.scrollHeight;

      // Check if content is overflowing
      const overflowingWidth = contentWidth > containerWidth;
      const overflowingHeight = contentHeight > containerHeight;
      const overflow = overflowingWidth || overflowingHeight;
      
      setIsOverflowing(overflow);

      if (overflow) {
        // Calculate scale needed to fit content
        const scaleX = containerWidth / contentWidth;
        const scaleY = containerHeight / contentHeight;
        const newScale = Math.min(scaleX, scaleY, maxScale);
        
        // Apply minimum scale constraint
        const finalScale = Math.max(newScale, minScale);
        setScale(finalScale);
      } else {
        setScale(1);
      }
    };

    // Initial calculation
    calculateScale();

    // Recalculate on resize
    const resizeObserver = new ResizeObserver(calculateScale);
    if (ref.current.parentElement) {
      resizeObserver.observe(ref.current.parentElement);
    }
    resizeObserver.observe(ref.current);

    // Also listen to window resize
    window.addEventListener('resize', calculateScale);

    return () => {
      resizeObserver.disconnect();
      window.removeEventListener('resize', calculateScale);
    };
  }, [ref, minScale, maxScale, enabled]);

  return { scale, isOverflowing };
}
