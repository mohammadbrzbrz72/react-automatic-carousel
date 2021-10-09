import { selectMovementByDirection, isPositiveNumber } from "../utils/index.js";

export default function actionsHandler(
  permissionForMouseWrapMove,
  setPermissionForMouseWrapMove,
  handleBackToLastNormallPosition,
  swipeable,
  position,
  touchStartX,
  dir,
  speed,
  handleMove,
  moveDirection,
) {
  const handleExitFromRoot = () => {
    if (swipeable) {
      setPermissionForMouseWrapMove(false);
      handleBackToLastNormallPosition(position[dir]);
    }
  };

  const handleMouseDown = e => {
    swipeable && setPermissionForMouseWrapMove(true);
  };

  const handleMouseMove = ({ movementX: x, movementY: y }) => {
    const movement = selectMovementByDirection(dir, [x, y]);

    if (swipeable && permissionForMouseWrapMove) {
      handleMove(movement * isPositiveNumber(dir, moveDirection) * speed.mouse);
    }
  };

  // handle touch movement
  const handleTouchStart = e => {
    if (swipeable) touchStartX = e.touches[0].clientX;
  };

  const handleTouchMove = e => {
    if (swipeable) {
      const touchMove = e.touches[0].clientX - touchStartX;
      handleMove(
        (isPositiveNumber(dir, moveDirection) * touchMove * speed.touch) / 10,
      );
    }
  };

  const handleTouchEnd = e => {
    swipeable && handleBackToLastNormallPosition(position[dir]);
  };

  return {
    handleExitFromRoot,
    handleMouseDown,
    handleMouseMove,
    handleTouchStart,
    handleTouchMove,
    handleTouchEnd,
  };
}
