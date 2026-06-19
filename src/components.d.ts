declare module "@/components/ScrollStack" {
  import * as React from "react";
  export interface ScrollStackItemProps {
    children: React.ReactNode;
    itemClassName?: string;
  }
  export const ScrollStackItem: React.FC<ScrollStackItemProps>;
  export interface ScrollStackProps {
    children: React.ReactNode;
    className?: string;
    itemDistance?: number;
    itemScale?: number;
    itemStackDistance?: number;
    stackPosition?: string | number;
    scaleEndPosition?: string | number;
    baseScale?: number;
    rotationAmount?: number;
    blurAmount?: number;
    useWindowScroll?: boolean;
    onStackComplete?: () => void;
  }
  const ScrollStack: React.FC<ScrollStackProps>;
  export default ScrollStack;
}

declare module "@/components/CurvedLoop" {
  import * as React from "react";
  export interface CurvedLoopProps {
    marqueeText?: string;
    speed?: number;
    className?: string;
    curveAmount?: number;
    direction?: "left" | "right";
    interactive?: boolean;
  }
  const CurvedLoop: React.FC<CurvedLoopProps>;
  export default CurvedLoop;
}

declare module "@/components/ClickSpark" {
  import * as React from "react";
  export interface ClickSparkProps {
    sparkColor?: string;
    sparkSize?: number;
    sparkRadius?: number;
    sparkCount?: number;
    duration?: number;
    easing?: "linear" | "ease-in" | "ease-in-out" | "ease-out";
    extraScale?: number;
    children?: React.ReactNode;
  }
  const ClickSpark: React.FC<ClickSparkProps>;
  export default ClickSpark;
}

declare module "@/components/CircularGallery" {
  import * as React from "react";
  export interface CircularGalleryItem {
    image: string;
    text: string;
  }
  export interface CircularGalleryProps {
    items?: CircularGalleryItem[];
    bend?: number;
    textColor?: string;
    borderRadius?: number;
    font?: string;
    fontUrl?: string;
    scrollSpeed?: number;
    scrollEase?: number;
  }
  const CircularGallery: React.FC<CircularGalleryProps>;
  export default CircularGallery;
}
