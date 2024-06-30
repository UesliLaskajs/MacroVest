import { useState, useEffect } from "react";

function Testing() {
  const [pointer, setPointer] = useState({ x: 0, y: 0 });

  const eventPointerHandler = (e) => {
    setPointer({ x: e.clientX, y: e.clientY }); 
  };


  useEffect(() => {
    window.addEventListener("pointermove", eventPointerHandler);

    return () => {
      window.removeEventListener("pointermove", eventPointerHandler);
    };
  }, []);

  return (
    <div
      style={{
        position: "absolute",
        backgroundColor: "pink",
        borderRadius: "50%",
        opacity: 0.6,
        transform: `translate(${pointer.x}px, ${pointer.y}px)`,
        pointerEvents: "none",
        left: -20,
        top: -20,
        width: 40,
        height: 40,
      }}
    />
  );
}

export default Testing;
