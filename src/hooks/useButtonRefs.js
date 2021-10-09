import { useState } from "react";

import { useRefStore } from "./useRefStore.js";
import { nullishCoalescingOperator } from "../utils/index.js";

export default function useButtonRefs({ defaultIndex }) {
  const [disableButton, setDisableButton] = useRefStore("prev");
  const [activeIndex, setActiveIndex] = useRefStore(
    nullishCoalescingOperator(defaultIndex, 0),
  );
  const [isActiveIndexChanged, setIsActiveIndexChanged] = useState(true);
  const switchIsActiveIndexChanged = () =>
    setIsActiveIndexChanged(!isActiveIndexChanged);

  return {
    disableButton,
    setDisableButton,
    activeIndex,
    setActiveIndex,
    isActiveIndexChanged,
    switchIsActiveIndexChanged,
  };
}
