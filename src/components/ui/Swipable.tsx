"use client";

import { motion, PanInfo } from "framer-motion";
import { PropsWithChildren } from "react";

interface SwipableProps {
  onSwipeLeft: () => void;
  onSwipeRight: () => void;
  className?: string;
  swipeKey?: string;
}

export function Swipable({
  children,
  onSwipeLeft,
  onSwipeRight,
  className = "",
  swipeKey,
}: PropsWithChildren<SwipableProps>) {
  const handleSwipe = (info: PanInfo) => {
    const threshold = 50;
    if (info.offset.x < -threshold) {
      onSwipeLeft();
    } else if (info.offset.x > threshold) {
      onSwipeRight();
    }
  };

  return (
    <motion.div
      key={swipeKey}
      drag="x"
      dragConstraints={{ left: 0, right: 0 }}
      onDragEnd={(_, info) => handleSwipe(info)}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
