import { useRef } from "react";

export default function usePosition(dir) {
  const positionRef = useRef({
    position: { [dir]: 0 },
  });
  const touchStartXRef = useRef({ touchStartX: 0 });

  let { position } = positionRef.current;
  let { touchStartX } = touchStartXRef.current;

  return { position, touchStartX };
}
