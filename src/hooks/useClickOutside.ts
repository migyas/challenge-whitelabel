import React, { useEffect } from "react";

export default function useClickOutside<T>(
  ref: React.MutableRefObject<T | any>,
  onClickOutside: (e: MouseEvent) => void,
  onClickInside?: (e: MouseEvent) => void
) {
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (ref.current && !ref.current.contains(event.target)) {
        onClickOutside(event);
      }
      if (ref.current && ref.current.contains(event.target)) {
        onClickInside && onClickInside(event);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref, onClickOutside, onClickInside]);
}
