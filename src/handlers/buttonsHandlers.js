import buttonNextMoveHandler from "./buttonNextMoveHandler.js";
import buttonPrevMoveHandler from "./buttonPrevMoveHandler.js";

function buttonsMoveToHandler(
  handleMoveToPrevSteps,
  handleMoveToNextSteps,
  moveCount,
) {
  if (moveCount > 0) handleMoveToNextSteps(moveCount);
  else if (moveCount < 0) handleMoveToPrevSteps(-1 * moveCount);
}

export default function buttonsHandler(data) {
  const handleMoveToPrevSteps = buttonPrevMoveHandler(data);
  const handleMoveToNextSteps = buttonNextMoveHandler(data);
  const handleButtonsMoveTo = buttonsMoveToHandler.bind(
    null,
    handleMoveToPrevSteps,
    handleMoveToNextSteps,
  );

  return {
    handleMoveToPrevSteps,
    handleMoveToNextSteps,
    handleButtonsMoveTo,
  };
}
