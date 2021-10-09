import { useRef, useCallback } from "react";

export function useRefStore(initialState) {
  const refStore = useRef(initialState);

  const setRefStore = useCallback(data => (refStore.current = data), []);

  return [refStore, setRefStore];
}
