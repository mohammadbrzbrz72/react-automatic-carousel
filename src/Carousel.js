import React, { useCallback, useState, useEffect, Fragment } from "react";

import { useRefStore } from "./hooks/useRefStore.js";
import useOffsetEffect from "./hooks/useOffsetEffect.js";
import useTotalRefs from "./hooks/useTotalRefs.js";
import useButtonRefs from "./hooks/useButtonRefs.js";
import actionsHandler from "./handlers/actionsHandler.js";
import buttonsHandlers from "./handlers/buttonsHandlers.js";
import {
  carouselDirection,
  carouselRootOverFlow,
  wrapperWidthByDirection,
  wrapperHeightByDirection,
  wrapperFlexDirection,
} from "./constants/index.js";
import {
  setMoveSpeed,
  setTransitionPerMilliSeconds,
  clsx,
} from "./utils/index.js";
import "./style/automaticCarousel.css";

export function AutomaticCarousel({
  className,
  offUserSelect,
  speeds, // touch | mouse swiple | mouse wheels
  swipeable,
  dir, // top, right , bottom, left
  transition,
  moveDirection,
  children,
  movesInfo,
  defaultIndex, // set current item by index
  moveTo,
  Button = Fragment,
}) {
  const rootClass = clsx(
    "automatic-carousel-root",
    offUserSelect && "automatic-carousel-root-unselectable",
    `automatic-carousel-${carouselDirection[dir]}`,
    className,
  );

  // styles
  const rootStyles = carouselRootOverFlow[dir];
  const wrapperStyles = {
    width: wrapperWidthByDirection[dir],
    height: wrapperHeightByDirection[dir],
    flexDirection: wrapperFlexDirection[dir],
    ...setTransitionPerMilliSeconds(transition),
  };

  const speed = setMoveSpeed(speeds);

  const [permissionForMouseWrapMove, _setPermissionForMouseWrapMove] = useState(
    false,
  );
  const setPermissionForMouseWrapMove = useCallback(
    data => _setPermissionForMouseWrapMove(data),
    [],
  );

  const [childrensOffset, setChildrensOffset] = useRefStore([]);

  const {
    disableButton,
    setDisableButton,
    activeIndex,
    setActiveIndex,
    isActiveIndexChanged,
    switchIsActiveIndexChanged,
  } = useButtonRefs({ defaultIndex });

  const {
    rootRef,
    wrapperRef,
    position,
    touchStartX,
    handleMove,
    handleBackToLastNormallPosition,
  } = useTotalRefs(dir);

  const {
    handleExitFromRoot,
    handleMouseDown,
    handleMouseMove,
    handleTouchStart,
    handleTouchMove,
    handleTouchEnd,
  } = actionsHandler(
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
  );

  useOffsetEffect({
    dir,
    wrapperRef,
    defaultIndex,
    handleMove,
    setChildrensOffset,
  });

  useEffect(() => {
    moveTo && moveTo(handleButtonsMoveTo);
  }, []);

  useEffect(() => {
    movesInfo &&
      movesInfo({
        activeIndex: activeIndex.current,
        disableButton: disableButton.current,
      });
  }, [isActiveIndexChanged]);

  const {
    handleMoveToPrevSteps,
    handleMoveToNextSteps,
    handleButtonsMoveTo,
  } = buttonsHandlers({
    position,
    dir,
    rootRef,
    wrapperRef,
    childrensOffset,
    disableButton,
    setDisableButton,
    handleMove,
    setActiveIndex,
    switchIsActiveIndexChanged,
  });

  return (
    <>
      <div
        ref={rootRef}
        className={rootClass}
        style={rootStyles}
        onMouseMove={handleMouseMove}
        onMouseDown={handleMouseDown}
        onMouseUp={handleExitFromRoot}
        onMouseLeave={handleExitFromRoot}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <div
          ref={wrapperRef}
          className="automatic-carousel-wrapper"
          unselectable={offUserSelect ? "off" : "on"}
          style={wrapperStyles}
        >
          {children}
        </div>
      </div>
      <Button
        prev={handleMoveToPrevSteps}
        next={handleMoveToNextSteps}
        moveTo={handleButtonsMoveTo}
      />
    </>
  );
}

AutomaticCarousel.defaultProps = {
  offUserSelect: true,
  dir: "left",
  swipeable: true,
  overflow: "normal", // normal | dropdown
  transition: 200, // number or false
  moveDirection: "reverse", // reverse | forward
};
