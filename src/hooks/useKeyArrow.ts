import React, { useCallback, useState } from "react";

const ARROW_DOWN = "ArrowDown";
const ARROW_UP = "ArrowUp";
const ESCAPE = "Escape";

export const useKeyArrow = (
  items: Array<any>
): [number, (e: React.KeyboardEvent<HTMLInputElement>) => void] => {
  const [activeIdx, setActiveIdx] = useState(0);

  const handleKeyArrow = useCallback(
    (e: React.KeyboardEvent) => {
      switch (e.key) {
        case ARROW_DOWN:
          setActiveIdx((idx) => idx + 1);
          if (activeIdx === items.length - 1) setActiveIdx(0);
          break;
        case ARROW_UP:
          setActiveIdx((idx) => idx - 1);
          if (activeIdx <= 0) setActiveIdx(items.length - 1);
          break;
        case ESCAPE:
          setActiveIdx(-1);
          break;
        default:
          setActiveIdx(-1);
      }
    },
    [items, activeIdx]
  );

  return [activeIdx, handleKeyArrow];
};
