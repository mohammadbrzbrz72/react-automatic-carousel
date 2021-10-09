import usePosition from "./usePosition.js";
import useHolders from "./useHolders.js";
import { setPosition } from "../utils/index.js";

export default function useTotalRefs(dir) {
  const { dimensions, rootRef, wrapperRef } = useHolders(dir);
  const { position, touchStartX } = usePosition(dir);

  const handleMove = val => {
    if (typeof val === "number") {
      position[dir] += val;
    } else {
      position[dir] = val();
    }
    wrapperRef.current.style[dir] = position[dir] + "px";
  };

  const setWrapperPosition = val => {
    setPosition(position, wrapperRef, dir, val);
  };

  const handleBackToLastNormallPosition = () => {
    const widthDifference = dimensions.wrapper - dimensions.root;
    switch (dir) {
      case "left":
      case "top":
        if (position[dir] > 0) {
          setWrapperPosition(0);
          return;
        }

        if (-1 * position[dir] > widthDifference && widthDifference > 0) {
          position[dir] = -widthDifference;
          setWrapperPosition(-widthDifference);
        } else if (widthDifference < 0) {
          position[dir] = 0;
        }
        break;

      case "right":
      case "bottom":
        if (position[dir] > 0 || widthDifference < 0) {
          setWrapperPosition(0);
          return;
        } else if (-1 * position[dir] > widthDifference) {
          setWrapperPosition(-widthDifference);
        }
        break;

      default:
        break;
    }
  };

  return {
    dimensions,
    rootRef,
    wrapperRef,
    position,
    touchStartX,
    handleMove,
    handleBackToLastNormallPosition,
  };
}
