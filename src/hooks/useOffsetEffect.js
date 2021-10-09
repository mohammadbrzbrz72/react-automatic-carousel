import { useEffect } from "react";

import { getOffsetByParentRef } from "../utils/index.js";

export default function useOffsetEffect({
  dir,
  wrapperRef,
  defaultIndex,
  handleMove,
  setChildrensOffset,
}) {
  return useEffect(() => {
    let offsets;

    switch (dir) {
      case "left":
        offsets = [...wrapperRef.current.children].map(
          elm => elm[`offsetLeft`],
        );
        break;

      case "right":
        offsets = [...wrapperRef.current.children].map(elm =>
          getOffsetByParentRef.right(wrapperRef, elm),
        );
        break;

      case "top":
        offsets = [...wrapperRef.current.children].map(elm => elm[`offsetTop`]);
        break;

      case "bottom":
        offsets = [...wrapperRef.current.children].map(elm =>
          getOffsetByParentRef.bottom(wrapperRef, elm),
        );
        break;

      default:
        break;
    }

    if (defaultIndex) {
      handleMove(() => (dir === "top" ? 1 : -1) * offsets[defaultIndex]);
    }

    setChildrensOffset(offsets);
  }, []);
}
