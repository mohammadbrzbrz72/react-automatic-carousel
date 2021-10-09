import { useEffect, useRef } from "react";

import useHoldersDimensions from "./useHoldersDimensions.js";

export default function useHolders(dir) {
  const rootRef = useRef();
  const wrapperRef = useRef();
  const { dimensions } = useHoldersDimensions(rootRef, wrapperRef, dir);

  useEffect(() => {
    if (dir === "bottom") {
      rootRef.current.scrollTop = rootRef.current.scrollHeight;
    }
  }, []);

  return { dimensions, rootRef, wrapperRef };
}
