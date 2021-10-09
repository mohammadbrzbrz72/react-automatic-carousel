export default function buttonPrevMoveHandler({
  position,
  dir,
  childrensOffset,
  disableButton,
  setDisableButton,
  handleMove,
  setActiveIndex,
  switchIsActiveIndexChanged,
}) {
  const handleMoveToPrevSteps = moveCount => {
    moveCount = typeof moveCount === "number" ? moveCount : 1;
    const childrenLength = childrensOffset.current.length - 1;
    const positionPoint = -position[dir];
    let counter = 0;

    const handleSetPrevDisable = () => {
      if (disableButton.current !== "prev") {
        setDisableButton("prev");
        switchIsActiveIndexChanged();
      }
    };

    if (positionPoint <= childrensOffset.current[0]) {
      setActiveIndex(0);
      handleSetPrevDisable();
      return;
    }

    while (true) {
      if (positionPoint <= childrensOffset.current[counter]) {
        const toLastChildCount = counter - moveCount;
        const lastChildIndex = toLastChildCount <= 0 ? 0 : toLastChildCount;

        handleMove(() => -childrensOffset.current[lastChildIndex]);
        setActiveIndex(lastChildIndex);
        if (disableButton.current !== "") {
          setDisableButton("");
        } else if (!lastChildIndex) {
          setDisableButton("prev");
        }

        switchIsActiveIndexChanged();

        return;
      } else if (counter === childrenLength) {
        setActiveIndex(counter);
        handleSetPrevDisable();
        return;
      }
      ++counter;
    }
  };

  return handleMoveToPrevSteps;
}
