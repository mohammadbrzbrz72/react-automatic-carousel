import { useState, useEffect } from "react";

import useWindowResize from "./useWindowResize.js";
import { selectDimension } from "../constants/index.js";

export default function useElementsRef(rootRef, wrapperRef, dir) {
  const [dimensions, setDimensions] = useState({
    root: 0,
    wrapper: 0,
  });
  const windowWidth = useWindowResize(1000);

  const currentDimention = selectDimension[dir];

  const getWrapperDimensions = () => {
    setDimensions({
      root:
        rootRef && rootRef.current.getBoundingClientRect()[currentDimention],
      wrapper:
        wrapperRef &&
        wrapperRef.current.getBoundingClientRect()[currentDimention],
    });
  };

  useEffect(() => {
    if (dir === "bottom") {
      rootRef.current.scrollTop = rootRef.current.scrollHeight;
    }
  }, []);

  useEffect(() => {
    getWrapperDimensions();
  }, [windowWidth]);

  return { dimensions };
}
