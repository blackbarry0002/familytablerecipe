import { useLayoutEffect, useRef, useCallback } from "react";
import "./ScrollStack.css";

export const ScrollStackItem = ({ children, itemClassName = "" }) => (
  <div className={`scroll-stack-card ${itemClassName}`.trim()}>{children}</div>
);

const ScrollStack = ({
  children,
  className = "",
  itemDistance = 100,
  itemScale = 0.03,
  itemStackDistance = 30,
  stackPosition = "20%",
  scaleEndPosition = "10%",
  baseScale = 0.85,
  rotationAmount = 0,
  blurAmount = 0,
  useWindowScroll = false,
  onStackComplete,
}) => {
  const scrollerRef = useRef(null);
  const stackCompletedRef = useRef(false);
  const rafRef = useRef(null);
  const tickingRef = useRef(false);

  // Cached natural offsets — computed once at init, never during scroll
  const cardOffsetsRef = useRef([]);
  const endOffsetRef = useRef(0);
  const cardsRef = useRef([]);
  const lastTransformsRef = useRef([]);

  const parsePercentage = useCallback((value, containerHeight) => {
    if (typeof value === "string" && value.includes("%")) {
      return (parseFloat(value) / 100) * containerHeight;
    }
    return parseFloat(value);
  }, []);

  // Compute document-relative top of an element WITHOUT any transforms applied.
  // We do this by temporarily clearing the transform, reading offsetTop, then restoring.
  const getNaturalOffset = (element) => {
    const prev = element.style.transform;
    element.style.transform = "none";
    let offset = 0;
    let el = element;
    while (el) {
      offset += el.offsetTop || 0;
      el = el.offsetParent;
    }
    element.style.transform = prev;
    return offset;
  };

  const updateCardTransforms = useCallback(() => {
    const cards = cardsRef.current;
    if (!cards.length) return;

    const scrollTop = useWindowScroll ? window.scrollY : (scrollerRef.current?.scrollTop ?? 0);
    const containerHeight = useWindowScroll
      ? window.innerHeight
      : (scrollerRef.current?.clientHeight ?? 0);

    const stackPx = parsePercentage(stackPosition, containerHeight);
    const scaleEndPx = parsePercentage(scaleEndPosition, containerHeight);
    const endElTop = endOffsetRef.current;

    cards.forEach((card, i) => {
      if (!card) return;

      // Use pre-cached natural offset — never getBoundingClientRect during scroll
      const cardTop = cardOffsetsRef.current[i] ?? 0;

      const triggerStart = cardTop - stackPx - itemStackDistance * i;
      const triggerEnd = cardTop - scaleEndPx;
      const pinStart = triggerStart;
      const pinEnd = endElTop - containerHeight / 2;

      // Scale 0→1
      let scaleProgress = 0;
      if (scrollTop > triggerStart) {
        scaleProgress = Math.min(
          1,
          (scrollTop - triggerStart) / Math.max(1, triggerEnd - triggerStart),
        );
      }

      const targetScale = baseScale + i * itemScale;
      const scale = 1 - scaleProgress * (1 - targetScale);
      const rotation = rotationAmount ? i * rotationAmount * scaleProgress : 0;

      // Pin — card sticks at stackPx from top
      let translateY = 0;
      if (scrollTop >= pinStart && scrollTop <= pinEnd) {
        translateY = scrollTop - cardTop + stackPx + itemStackDistance * i;
      } else if (scrollTop > pinEnd) {
        translateY = pinEnd - cardTop + stackPx + itemStackDistance * i;
      }

      // Quantise to avoid sub-pixel jitter
      const ty = Math.round(translateY * 100) / 100;
      const sc = Math.round(scale * 10000) / 10000;
      const ro = Math.round(rotation * 100) / 100;

      const last = lastTransformsRef.current[i];
      if (last && last.ty === ty && last.sc === sc && last.ro === ro) return;

      card.style.transform = `translate3d(0,${ty}px,0) scale(${sc})${ro ? ` rotate(${ro}deg)` : ""}`;
      lastTransformsRef.current[i] = { ty, sc, ro };

      if (i === cards.length - 1) {
        const inView = scrollTop >= pinStart && scrollTop <= pinEnd;
        if (inView && !stackCompletedRef.current) {
          stackCompletedRef.current = true;
          onStackComplete?.();
        } else if (!inView) stackCompletedRef.current = false;
      }
    });
  }, [
    itemScale,
    itemStackDistance,
    stackPosition,
    scaleEndPosition,
    baseScale,
    rotationAmount,
    blurAmount,
    useWindowScroll,
    onStackComplete,
    parsePercentage,
  ]);

  const onScroll = useCallback(() => {
    if (tickingRef.current) return;
    tickingRef.current = true;
    rafRef.current = requestAnimationFrame(() => {
      updateCardTransforms();
      tickingRef.current = false;
    });
  }, [updateCardTransforms]);

  useLayoutEffect(() => {
    const scroller = scrollerRef.current;
    if (!scroller) return;

    const root = useWindowScroll ? document : scroller;
    const cards = Array.from(root.querySelectorAll(".scroll-stack-card"));
    if (!cards.length) return;

    cardsRef.current = cards;
    lastTransformsRef.current = new Array(cards.length).fill(null);

    // Style cards
    cards.forEach((card, i) => {
      if (i < cards.length - 1) card.style.marginBottom = `${itemDistance}px`;
      card.style.willChange = "transform";
      card.style.transformOrigin = "top center";
      card.style.backfaceVisibility = "hidden";
    });

    const recalculateLayout = () => {
      const inner = scroller.querySelector(".scroll-stack-inner");
      if (inner) inner.style.paddingBottom = "0px";

      cardOffsetsRef.current = cards.map((card) => getNaturalOffset(card));
      const endEl = root.querySelector(".scroll-stack-end");
      const naturalEndOffset = endEl ? getNaturalOffset(endEl) : 0;
      endOffsetRef.current = naturalEndOffset;

      const containerHeight = useWindowScroll ? window.innerHeight : scroller.clientHeight;
      const stackPx = parsePercentage(stackPosition, containerHeight);

      const pinEnd = naturalEndOffset - containerHeight / 2;

      // Calculate how much the visual bottom of the stacked cards overflows the container's natural end
      const lastCard = cards[cards.length - 1];
      const lastCardHeight = lastCard ? lastCard.offsetHeight : 360;
      const visualBottom =
        pinEnd + stackPx + (cards.length - 1) * itemStackDistance + lastCardHeight;
      const overflowAmount = Math.max(0, visualBottom - naturalEndOffset);

      if (inner) {
        // Set dynamic padding-bottom to push next section down with a clean 80px safety gap
        inner.style.paddingBottom = `${overflowAmount + 80}px`;
      }

      updateCardTransforms();
    };

    // Use rAF to wait for paint so offsets are stable
    const initRaf = requestAnimationFrame(recalculateLayout);

    // Also recache on resize
    const onResize = () => {
      recalculateLayout();
    };

    const scrollTarget = useWindowScroll ? window : scroller;
    scrollTarget.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize, { passive: true });

    return () => {
      cancelAnimationFrame(initRaf);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      scrollTarget.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
      stackCompletedRef.current = false;
      cardsRef.current = [];
      cardOffsetsRef.current = [];
      lastTransformsRef.current = [];
      tickingRef.current = false;
    };
  }, [
    itemDistance,
    useWindowScroll,
    onScroll,
    updateCardTransforms,
    parsePercentage,
    stackPosition,
    scaleEndPosition,
  ]);

  return (
    <div className={`scroll-stack-scroller ${className}`.trim()} ref={scrollerRef}>
      <div className="scroll-stack-inner">
        {children}
        <div className="scroll-stack-end" />
      </div>
    </div>
  );
};

export default ScrollStack;
