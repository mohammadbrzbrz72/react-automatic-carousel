export const clsx = (...clss) => clss.filter(Boolean).join(" ");

export const isPositiveNumber = (dir, moveDirection) => {
  const direction = moveDirection === "forward" ? -1 : 1;
  const amounts = {
    top: -1 * direction,
    right: 1 * direction,
    bottom: 1 * direction,
    left: -1 * direction,
  };

  return amounts[dir];
};

export const setTransitionPerMilliSeconds = transition => ({
  transition: `${transition / 1000}s`,
});

export const setMoveSpeed = speeds =>
  Object.assign({ touch: 2, mouse: 3 }, speeds);

export const selectMovementByDirection = (dir, movement) => {
  const isVertical = ["top", "bottom"].some(direction => direction === dir);
  return movement[Number(isVertical)];
};

export const setPosition = (position, element, dir, val) => {
  position[dir] = val;
  element.current.style[dir] = val + "px";
};

export const getPropertyByRef = (ref, property) => {
  return getComputedStyle(ref.current, null).getPropertyValue(property);
};

const getOffsetByDirection = (
  offsetDirection,
  offsetDimension,
  parentRef,
  child,
) => {
  const parentWidth = parentRef.current[offsetDimension];
  const childOffset = child[offsetDirection];
  const childWidth = child[offsetDimension];

  return parentWidth - (childOffset + childWidth);
};

export class getOffsetByParentRef {
  static right(parentRef, child) {
    return getOffsetByDirection("offsetLeft", "offsetWidth", parentRef, child);
  }
  static bottom(parentRef, child) {
    return getOffsetByDirection("offsetTop", "offsetHeight", parentRef, child);
  }
}

export function debounce(func, timeout = 300) {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      func.apply(this, args);
    }, timeout);
  };
}

export const nullishCoalescingOperator = (nullishData, data) =>
  nullishData === undefined || nullishData === null ? data : nullishData;
