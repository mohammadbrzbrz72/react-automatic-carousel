import { useState, useEffect } from "react";

import { debounce } from "../utils/index.js";

export default function useWindowResize(milliseconds = 100) {
  const [state, setState] = useState(false);

  useEffect(() => {
    const handleWindowResize = debounce(() => {
      setState(data => !data);
    }, milliseconds);

    window.addEventListener("resize", handleWindowResize);
    return () => {
      window.removeEventListener("resize", handleWindowResize);
    };
  }, []);

  return state;
}
