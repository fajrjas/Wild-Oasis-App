import { useEffect, useRef } from "react";

export function useOutsideClick(handler, listenCapturing = true) {
  const ref = useRef();
  useEffect(
    function () {
      function handleClick(e) {
        // console.log(e.target, "e.target");
        // console.log(ref.current, "ref.current outside of if");
        if (ref.current && !ref.current.contains(e.target)) {
          // console.log(ref.current, "inside of if");
          // console.log(ref.current.contains(e.target), "inside of if");
          handler();
        }
        // close();
      }

      document.addEventListener("click", handleClick, listenCapturing);

      return () =>
        document.removeEventListener("click", handleClick, listenCapturing);
    },
    [handler, listenCapturing]
  );

  return ref;
}
