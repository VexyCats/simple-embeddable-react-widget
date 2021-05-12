import React, { useEffect } from "react";
import useMeasure from "react-use-measure";

function Measure({ children, onChange }) {
  const [ref, bounds] = useMeasure();
  useEffect(() => {
    onChange(bounds);
  }, [bounds]);

  return <div ref={ref}>{children}</div>;
}

export default Measure;
