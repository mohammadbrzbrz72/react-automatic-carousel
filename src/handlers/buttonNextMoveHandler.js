import { dimensionByCarouselDirection } from "../constants/index.js";

export default function buttonNextMoveHandler({
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
}) {
  const handleMoveToNextSteps = moveCount => {
    moveCount = typeof moveCount === "number" ? moveCount : 1;
    const childrenLength = childrensOffset.current.length - 2;
    const positionPoint = -position[dir];
    let counter = childrenLength;

    const handleSetNextDisable = () => {
      if (disableButton.current !== "next") {
        setDisableButton("next");
        switchIsActiveIndexChanged();
      }
    };

    if (positionPoint < childrensOffset.current[0]) {
      setActiveIndex(childrenLength + 1);
      handleSetNextDisable();
      return;
    }

    const handleLastMove = childPosition => {
      const getDimension = ref =>
        ref.current[dimensionByCarouselDirection[dir]];

      const rootOffset = getDimension(rootRef);
      const wrapperOffset = getDimension(wrapperRef);
      const dimensionDifference = wrapperOffset - rootOffset;

      if (dimensionDifference <= -position[dir]) {
        handleSetNextDisable();
        return () => -dimensionDifference;
      } else {
        if (disableButton !== "") {
          setDisableButton("");
          switchIsActiveIndexChanged();
        }
        setActiveIndex(counter + moveCount);
        return childPosition;
      }
    };

    while (true) {
      if (positionPoint >= childrensOffset.current[counter]) {
        const toLastChildCount = counter + moveCount;
        const lastChildIndex =
          toLastChildCount >= childrenLength
            ? childrenLength
            : toLastChildCount;

        const childPosition = () => -childrensOffset.current[lastChildIndex];

        handleMove(handleLastMove(childPosition));
        setActiveIndex(lastChildIndex);
        return;
      } else if (counter === 0) {
        setActiveIndex(childrenLength + 1);
        handleSetNextDisable();
        return;
      }
      --counter;
    }
  };

  return handleMoveToNextSteps;
}
