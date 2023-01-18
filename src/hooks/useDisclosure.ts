import { useCallback, useState } from "react";

function useDisclosure(defaultValue?: boolean) {
  const [isOpen, setIsOpen] = useState(!!defaultValue);

  const close = useCallback(
    function close() {
      isOpen && setIsOpen(false);
    },
    [isOpen, setIsOpen]
  );

  const open = useCallback(
    function open() {
      !isOpen && setIsOpen(true);
    },
    [isOpen, setIsOpen]
  );

  const toggle = useCallback(
    function toggle() {
      setIsOpen((state) => !state);
    },
    [setIsOpen]
  );

  return { isOpen, close, toggle, open };
}

export default useDisclosure;
